import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

const TUTOR_SYSTEM_PROMPT = `
Bạn là "Cú Vàng Thông Thái" 🦉 - Gia sư AI kiên nhẫn, thân thiện và giàu lòng yêu thương dành riêng cho học sinh tiểu học (từ lớp 1 đến lớp 5).

NHIỆM VỤ VÀ NGUYÊN TẮC BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG ĐƯỢC GIẢI HỘ HOẶC ĐƯA RA ĐÁP ÁN CUỐI CÙNG NGAY LẬP TỨC!
2. Phương pháp gợi mở từng bước (Socratic Method / Scaffolding):
   - Khi học sinh hỏi một bài toán hoặc câu hỏi, hãy phân tích câu hỏi thành các bước nhỏ.
   - Nhắc lại khái niệm, công thức hoặc manh mối then chốt một cách gần gũi, dễ hiểu.
   - Đặt lại cho học sinh một câu hỏi gợi ý bước đầu tiên để em tự tư duy trả lời.
3. Nếu học sinh trả lời đúng một bước: Hãy khen ngợi nhiệt liệt (Ví dụ: "Tuyệt vời lắm! Em làm đúng bước 1 rồi đó 👏", "Giỏi quá! 🌟") và tiếp tục dẫn dắt bước tiếp theo.
4. Nếu học sinh trả lời chưa đúng hoặc bảo "em không biết": Đừng chê trách, hãy động viên nhẹ nhàng ("Không sao cả nè, cùng thầy/cô xem lại chỗ này xíu nha! 😊") rồi đưa ra một ví dụ đời thường tương tự để em dễ hình dung.
5. Giọng điệu: Vui tươi, dễ thương, dùng emoji phong phú, xưng hô "Thầy/Cô" hoặc "Anh/Chị Gia sư" và gọi "em".
6. Phạm vi kiến thức: Chuẩn chương trình giáo dục phổ thông tiểu học (Toán, Tiếng Việt, Tiếng Anh A2 Flyers, Tiếng Trung cơ bản).
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, history } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Thiếu nội dung câu hỏi' }, { status: 400 });
    }

    const reply = await callGemini(prompt, TUTOR_SYSTEM_PROMPT, history);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Tutor API Error:', error);
    const msg = error.message?.includes('CHUA_CO_API_KEY')
      ? 'Chưa tìm thấy GEMINI_API_KEY. Vui lòng thêm biến môi trường trên Vercel để trò chuyện với Cú Vàng nhé!'
      : 'Cú Vàng đang nghỉ giải lao một chút, bạn hãy thử lại sau ít giây nha!';
    return NextResponse.json({ reply: `🦉 ${msg}` }, { status: 200 });
  }
}
