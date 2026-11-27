import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { Question } from '@/types';

export const maxDuration = 30;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CACHE_ENTRIES = 50;

interface ExamPoolEntry {
  questions: Question[];
  createdAt: number;
}

const examPoolCache = new Map<string, ExamPoolEntry>();

function shuffleQuestions(items: Question[]): Question[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function setPoolCache(key: string, questions: Question[]) {
  const now = Date.now();
  // Prune expired entries first
  examPoolCache.forEach((entry, k) => {
    if (now - entry.createdAt > CACHE_TTL_MS) {
      examPoolCache.delete(k);
    }
  });
  // Evict oldest if still at capacity
  if (examPoolCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = examPoolCache.keys().next().value;
    if (oldestKey !== undefined) {
      examPoolCache.delete(oldestKey);
    }
  }
  examPoolCache.set(key, { questions, createdAt: now });
}

function getExamStyleGuidance(subject: string, topic: string): string {
  const t = topic.toLowerCase();
  if (t.includes('hồ chí minh')) {
    return `ĐẶC THÙ ĐỀ THI: Bám sát chương trình giáo dục phổ thông của Bộ GD&ĐT và cấu trúc đề kiểm tra/khảo sát chuẩn của Sở GD&ĐT TP.HCM (tính thực tế cao, tình huống đời sống rõ ràng, chuẩn mực cho môn ${subject} Lớp 5).`;
  }
  if (t.includes('trần đại nghĩa')) {
    return `ĐẶC THÙ ĐỀ THI: Chuẩn kỳ khảo sát năng lực vào lớp 6 Trường THCS-THPT Trần Đại Nghĩa (TP.HCM). Tăng cường câu hỏi tư duy logic, suy luận nhanh, giải quyết vấn đề thực tiễn, đọc hiểu và vận dụng sáng tạo phù hợp môn ${subject} (Toán tư duy, Tiếng Việt cảm thụ/ngôn ngữ, Tiếng Anh giao tiếp/tư duy, Tiếng Trung thực hành).`;
  }
  if (t.includes('bài thi tổng hợp')) {
    return `ĐẶC THÙ ĐỀ THI: Đề ôn tập tổng hợp toàn diện môn ${subject} Lớp 5, phối hợp đều các mảng kiến thức trọng tâm từ cơ bản đến nâng cao.`;
  }
  return '';
}

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, count = 5, sampleQuestions } = await req.json();
    const requestedCount = Math.max(1, Number(count) || 5);
    const cacheKey = `${subject}::${topic}`;

    const cached = examPoolCache.get(cacheKey);
    if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS && cached.questions.length >= requestedCount) {
      const picked = shuffleQuestions(cached.questions).slice(0, requestedCount);
      return NextResponse.json({ questions: picked, cached: true });
    }

    // Pool Cache: generate 6 questions when count <= 5 so Gemini responds fast (<6s) while still shuffling subsets
    const poolSize = requestedCount <= 5 ? 6 : requestedCount;

    const systemPrompt = `
Bạn là Chuyên gia Khảo thí và Giáo viên Sư phạm Tiểu học hàng đầu Việt Nam.
Hãy tạo đề thi ôn tập cho học sinh Lớp 5 theo chủ đề được yêu cầu.

YÊU CẦU ĐỊNH DẠNG (viết ngắn gọn, súc tích 1-2 câu cho mỗi lời giải thích để phản hồi nhanh):
Trả về ĐÚNG MỘT JSON ARRAY chứa các object có cấu trúc:
[
  {
    "id": 1,
    "subject": "${subject}",
    "topic": "${topic}",
    "type": "mcq" (hoặc "essay"),
    "question": "Nội dung câu hỏi...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correct_answer": "A",
    "explanation": "Lời giải thích ngắn gọn, dễ hiểu...",
    "grammar_clue": "Công thức hoặc mẹo nhận biết ngắn...",
    "encouragement": "Lời khen khích lệ..."
  }
]
TUYỆT ĐỐI KHÔNG VIẾT CHỮ NÀO NGOÀI ĐOẠN JSON. Không kèm markdown block nếu không cần, nếu có dùng \`\`\`json.
`;

    const styleGuidance = getExamStyleGuidance(subject, topic);
    const fewShotSamples = Array.isArray(sampleQuestions) && sampleQuestions.length > 0
      ? `\n\nĐỀ MẪU THAM CHIẾU (Hãy biên soạn câu hỏi mới có cùng cấu trúc tư duy và độ khó nhưng THAY ĐỔI hoàn toàn bối cảnh, số liệu và mở rộng khía cạnh mới):\n${sampleQuestions
          .slice(0, 3)
          .map((q: any, idx: number) => `- Mẫu ${idx + 1} (${q.type || 'mcq'}): ${String(q.question || '').slice(0, 220)}`)
          .join('\n')}`
      : '';

    const userPrompt = `Hãy tạo một bộ đề gồm ${poolSize} câu hỏi bám sát chuẩn Lớp 5 cho môn "${subject}", chủ đề: "${topic}". ${styleGuidance}${fewShotSamples}\nĐảm bảo thuần văn bản (không phụ thuộc hình vẽ), có cả câu trắc nghiệm và câu tự luận thú vị.`;

    const raw = await callGemini(userPrompt, systemPrompt);
    
    // Parse JSON safely
    let cleanJson = raw.trim();
    if (cleanJson.includes('```json')) {
      cleanJson = cleanJson.split('```json')[1].split('```')[0].trim();
    } else if (cleanJson.includes('```')) {
      cleanJson = cleanJson.split('```')[1].split('```')[0].trim();
    }

    const parsed: Question[] = JSON.parse(cleanJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      setPoolCache(cacheKey, parsed);
    }

    const picked = shuffleQuestions(parsed).slice(0, requestedCount);
    return NextResponse.json({ questions: picked, cached: false });
  } catch (error: any) {
    console.error('Generate Exam Error:', error);
    return NextResponse.json(
      { error: 'Không thể tạo đề thi tự động lúc này.', details: error.message },
      { status: 500 }
    );
  }
}
