import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { Question, SubjectKey } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, count = 5 } = await req.json();

    const systemPrompt = `
Bạn là Chuyên gia Khảo thí và Giáo viên Sư phạm Tiểu học hàng đầu Việt Nam.
Hãy tạo đề thi ôn tập cho học sinh Lớp 5 theo chủ đề được yêu cầu.

YÊU CẦU ĐỊNH DẠNG:
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
    "explanation": "Lời giải thích chi tiết, dễ hiểu cho học sinh lớp 5...",
    "grammar_clue": "Manh mối hoặc công thức nhận biết...",
    "encouragement": "Lời khen ngợi kích lệ..."
  }
]
TUYỆT ĐỐI KHÔNG VIẾT CHỮ NÀO NGOÀI ĐOẠN JSON. Không kèm markdown block nếu không cần, nếu có dùng \`\`\`json.
`;

    const userPrompt = `Hãy tạo một bộ đề gồm ${count} câu hỏi bám sát chuẩn Lớp 5 cho môn "${subject}", chủ đề: "${topic}". Đảm bảo có cả câu trắc nghiệm và câu tự luận thú vị.`;

    const raw = await callGemini(userPrompt, systemPrompt);
    
    // Parse JSON safely
    let cleanJson = raw.trim();
    if (cleanJson.includes('```json')) {
      cleanJson = cleanJson.split('```json')[1].split('```')[0].trim();
    } else if (cleanJson.includes('```')) {
      cleanJson = cleanJson.split('```')[1].split('```')[0].trim();
    }

    const parsed: Question[] = JSON.parse(cleanJson);
    return NextResponse.json({ questions: parsed });
  } catch (error: any) {
    console.error('Generate Exam Error:', error);
    return NextResponse.json(
      { error: 'Không thể tạo đề thi tự động lúc này.', details: error.message },
      { status: 500 }
    );
  }
}
