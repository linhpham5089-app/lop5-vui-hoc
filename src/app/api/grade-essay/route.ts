import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export const maxDuration = 15;

export async function POST(req: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, guide, maxScore = 1.0 } = await req.json();

    const systemPrompt = `
Bạn là Giám khảo Chấm thi và Giáo viên Tiểu học tâm lý, yêu trẻ con.
Nhiệm vụ: Chấm điểm câu trả lời tự luận hoặc viết câu của học sinh lớp 5.

TIÊU CHÍ CHẤM:
1. Đánh giá sự hiểu bài, cách lập luận và độ chính xác của câu trả lời.
2. Với môn Tiếng Anh / Tiếng Trung: Soi chính tả, ngữ pháp, trật tự từ, thì động từ.
3. Với môn Toán / Tiếng Việt: Đánh giá cách trình bày, lời giải và kết quả.
4. Cho điểm công bằng từ 0 đến ${maxScore} (bước nhảy 0.25 hoặc 0.5).
5. Luôn kèm lời khen và hướng dẫn sửa lỗi nếu có.

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON:
{
  "score": ${maxScore},
  "feedback": "Nhận xét chi tiết, nhẹ nhàng chỉ ra điểm tốt và chỗ cần cải thiện...",
  "suggestedAnswer": "Cách viết tự nhiên và chuẩn mực nhất...",
  "encouragement": "Lời khen ngợi khích lệ tinh thần bé! 🌟"
}
`;

    const userPrompt = `
Câu hỏi: ${question}
Hướng dẫn / Đáp án mẫu: ${correctAnswer || guide || 'Không có'}
Câu trả lời của học sinh: ${userAnswer}
Điểm tối đa: ${maxScore}
`;

    const raw = await callGemini(userPrompt, systemPrompt);

    let cleanJson = raw.trim();
    if (cleanJson.includes('```json')) {
      cleanJson = cleanJson.split('```json')[1].split('```')[0].trim();
    } else if (cleanJson.includes('```')) {
      cleanJson = cleanJson.split('```')[1].split('```')[0].trim();
    }

    const result = JSON.parse(cleanJson);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Grade Essay Error:', error);
    return NextResponse.json(
      {
        score: 0.5,
        feedback: 'Bài làm đã được ghi nhận. Em hãy đối chiếu với đáp án mẫu và hướng dẫn nhé!',
        suggestedAnswer: '',
        encouragement: 'Cố gắng phát huy ở các bài tập tiếp theo nhé! 🌟'
      },
      { status: 200 }
    );
  }
}
