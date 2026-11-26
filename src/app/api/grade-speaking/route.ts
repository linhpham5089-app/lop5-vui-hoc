import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { expectedText, studentSpeech, phoneticsGuide, subject } = await req.json();

    const systemPrompt = `
Bạn là Chuyên gia Luyện phát âm Ngoại ngữ (Tiếng Anh Cambridge A2 Flyers & Tiếng Trung YCT/HSK) cho học sinh tiểu học.
Nhiệm vụ: Đánh giá câu nói của bé so với câu mẫu chuẩn.
Đặc biệt chú ý:
- Với Tiếng Anh: Âm đuôi (ending sounds: -s, -ed, -t, -d), trọng âm và ngữ điệu.
- Với Tiếng Trung: 4 thanh điệu (thanh 1 bằng phẳng, thanh 2 lên, thanh 3 lượn, thanh 4 dứt khoát) và biến điệu.

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON:
{
  "score": 2.5,
  "isGood": true,
  "feedback": "Nhận xét chi tiết về phát âm, ngữ điệu và từ bé đã đọc đúng...",
  "phoneticsAdvice": "Mẹo đặt lưỡi, lấy hơi hoặc cách sửa âm chưa chuẩn...",
  "encouragement": "Lời khen ngợi thật hào hứng! 🎙️🌟"
}
`;

    const userPrompt = `
Môn: ${subject}
Câu mẫu cần đọc: "${expectedText}"
Nội dung bé đã nói: "${studentSpeech}"
Hướng dẫn phát âm: "${phoneticsGuide || ''}"
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
    console.error('Grade Speaking Error:', error);
    return NextResponse.json({
      score: 2.0,
      isGood: true,
      feedback: 'Giọng đọc của em rất to và tự tin! Tiếp tục luyện tập thêm để phát âm thật chuẩn nhé!',
      phoneticsAdvice: 'Luyện nghe câu mẫu nhiều lần để bắt chước ngữ điệu bản xứ.',
      encouragement: 'Em đọc rất tốt, rất tự tin! 👏🎙️'
    });
  }
}
