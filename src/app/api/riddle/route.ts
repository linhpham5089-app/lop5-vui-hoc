import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export const maxDuration = 15;

export async function POST(req: NextRequest) {
  try {
    const { action, question, correctAnswer, userAnswer, category } = await req.json();

    if (action === 'generate') {
      const chosenCat = category || 'Đố mẹo';
      const systemPrompt = `
Bạn là "Vua Đố Vui Trí Tuệ" dành cho thiếu nhi và học sinh Lớp 5.
Hãy sáng tác 1 câu đố mới toanh, thông minh, chính xác, kích thích tư duy thuộc ĐÚNG chủ đề được yêu cầu: "${chosenCat}".
Các chủ đề hỗ trợ gồm: Địa lý Việt Nam, Lịch sử Việt Nam, Đố mẹo, Đố chữ, Toán logic, Khoa học vui hoặc Đố vui Tiếng Anh.

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON:
{
  "category": "${chosenCat}",
  "question": "Nội dung câu đố dí dỏm, rõ ràng...",
  "hint": "Gợi ý nhỏ cho bé nếu bí...",
  "answer": "Đáp án chuẩn...",
  "keywords": ["từ khóa 1", "từ khóa 2"],
  "explanation": "Giải thích súc tích, thú vị kèm emoji sinh động..."
}
`;
      const raw = await callGemini(`Hãy sáng tác một câu đố vui mới lạ và hấp dẫn thuộc chủ đề "${chosenCat}"!`, systemPrompt);

      let cleanJson = raw.trim();
      if (cleanJson.includes('```json')) {
        cleanJson = cleanJson.split('```json')[1].split('```')[0].trim();
      } else if (cleanJson.includes('```')) {
        cleanJson = cleanJson.split('```')[1].split('```')[0].trim();
      }

      const riddle = JSON.parse(cleanJson);
      return NextResponse.json({ riddle });
    }

    if (action === 'check') {
      // Semantic check of user answer
      const systemPrompt = `
Bạn là Giám khảo Cuộc thi Đố Vui Vui Nhộn dành cho học sinh tiểu học.
Nhiệm vụ: Kiểm tra câu trả lời của bé xem có đúng ý với đáp án chuẩn hay không.
NGUYÊN TẮC: Chấp nhận mọi cách diễn đạt đồng nghĩa, viết tắt, không bắt bẻ dấu câu hay lỗi chính tả nhỏ.

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON:
{
  "isCorrect": true,
  "feedback": "Lời nhận xét dí dỏm, chúc mừng nhiệt liệt nếu đúng hoặc gợi ý nhẹ nhàng nếu chưa đúng..."
}
`;

      const userPrompt = `
Câu đố: ${question}
Đáp án chuẩn: ${correctAnswer}
Câu trả lời của bé: ${userAnswer}
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
    }

    return NextResponse.json({ error: 'Hành động không hợp lệ' }, { status: 400 });
  } catch (error: any) {
    console.error('Riddle API Error:', error);
    return NextResponse.json({
      isCorrect: true,
      feedback: 'Đáp án của bé rất hay và thông minh! Chúc mừng bé nhé! 🎉'
    });
  }
}
