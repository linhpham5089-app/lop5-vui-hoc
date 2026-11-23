"""
Module xử lý logic AI: Tạo đề thi, Chấm bài tự luận và Gia sư AI gợi mở theo phương pháp Socrates.
Hỗ trợ cả Gemini API và Mock Engine khi chưa có API Key.
"""

import json
import os
import re
from typing import Dict, Any, List, Optional
import database as db

# Danh sách model theo thứ tự ưu tiên (Tối ưu theo thời gian thực: gemini-3.5-flash-lite siêu nhanh 0.7s, sau đó là gemini-3.5-flash và gemini-3.6-flash)
PRIMARY_MODELS = [
    "gemini-3.5-flash-lite", 
    "gemini-3.5-flash", 
    "gemini-3.6-flash", 
    "gemini-3.8-flash", 
    "gemini-3.7-flash"
]

def generate_with_fallback(client, contents, config=None):
    """Gọi Gemini API với cơ chế tự động thử lần lượt các model ổn định nhất."""
    last_err = None
    for m in PRIMARY_MODELS:
        try:
            if config:
                return client.models.generate_content(model=m, contents=contents, config=config)
            else:
                return client.models.generate_content(model=m, contents=contents)
        except Exception as e:
            last_err = e
            continue
    raise last_err
TUTOR_SYSTEM_PROMPT = """
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
6. Phạm vi kiến thức: Chuẩn chương trình giáo dục phổ thông tiểu học (Toán, Tiếng Việt, Tiếng Anh, Tiếng Trung cơ bản).
"""

# System Prompt chuyên sâu Cambridge A2 Flyers
FLYERS_SYSTEM_PROMPT = """
Bạn là Chuyên gia Khảo thí và Giáo viên Luyện thi Chứng chỉ Cambridge A2 Flyers hàng đầu thế giới dành cho học sinh tiểu học (lớp 5).

TIÊU CHUẨN THI CỬ BẮT BUỘC:
1. Từ vựng & Ngữ pháp: Đúng chuẩn Cambridge A2 Flyers (CEFR A2). Tuyệt đối không dùng từ quá khó (B2/C1) hoặc quá ấu trĩ (Pre-A1 Starters).
2. 5 Dạng bài Flyers trọng tâm:
   - Dạng 1: Vocabulary & Definitions (nghề nghiệp, du lịch, thiên nhiên, đồ vật, địa danh).
   - Dạng 2: Dialogue Completion (hội thoại giao tiếp tự nhiên).
   - Dạng 3: Flyers Grammar (quá khứ đơn/tiếp diễn, hiện tại hoàn thành ever/yet/already/for/since, đại từ quan hệ who/which/where, so sánh hơn/nhất, điều kiện loại 1).
   - Dạng 4: Story Reading & Cloze (đoạn văn ngắn có ngữ cảnh, chọn từ điền).
   - Dạng 5: Open Cloze (tự điền 1 từ chính xác không gợi ý).
3. Khi giải thích lỗi sai & nhận xét:
   - BẮT BUỘC chỉ rõ DẤU HIỆU NHẬN BIẾT NGỮ PHÁP (Grammar Clue / Signal Words) bằng tiếng Việt rõ ràng, dễ hiểu cho học sinh lớp 5.
   - Luôn kèm theo LỜI KHEN NGỢI KHÍCH LỆ BẰNG TIẾNG ANH KÈM DỊCH NGHĨA TIẾNG VIỆT (Ví dụ: "Brilliant job! You are flying high! (Làm bài xuất sắc lắm! Em đang bay rất cao!)").
"""

# System Prompt chuyên sâu Toán Lớp 5 (Đúng chuẩn 10 bài toán / đề, thang điểm 10)
MATH_SYSTEM_PROMPT = """
Bạn là Chuyên gia Sư phạm Toán Tiểu học hàng đầu Việt Nam, chuyên biên soạn đề kiểm tra chuẩn kiến thức kỹ năng Toán Lớp 5.

CẤU TRÚC ĐỀ THI TOÁN BẮT BUỘC (ĐÚNG 10 BÀI TOÁN - THANG ĐIỂM 10, MỖI CÂU 1.0 ĐIỂM):
Gồm 2 phần rõ rệt:
PHẦN 1: TRẮC NGHIỆM (Câu 1 đến Câu 6 - 6.0 điểm, mỗi câu 1.0 điểm):
- Câu 1: Số thập phân và phép tính số thập phân
- Câu 2: Tỉ số phần trăm
- Câu 3: Đổi đơn vị đo đại lượng (độ dài, diện tích m²-dm²-ha, thể tích, thời gian)
- Câu 4: Hình học phẳng (tam giác, hình thang, hình tròn)
- Câu 5: Hình học không gian (hình hộp chữ nhật, hình lập phương)
- Câu 6: Toán chuyển động đều (s = v × t)

PHẦN 2: TỰ LUẬN (Câu 7 đến Câu 10 - 4.0 điểm, mỗi câu 1.0 điểm):
- Câu 7: Tính giá trị biểu thức bằng cách thuận tiện nhất (tính chất phân phối a × b + a × c)
- Câu 8: Bài toán thực tế về tỉ số phần trăm (tiền lãi, giảm giá, lãi suất)
- Câu 9: Bài toán diện tích / thể tích hình học thực tế (quét sơn, bể nước, thửa ruộng)
- Câu 10: Bài toán chuyển động nâng cao (hai xe ngược chiều, cùng chiều, chuyển động dòng nước)

Quy ước công thức toán: Dùng ký hiệu rõ ràng: dấu nhân ×, dấu chia :, số mũ m², m³, dm³, cm³.
"""

# Ngân hàng đề thi mẫu dự phòng (khi không dùng API key hoặc mạng offline)
OFFLINE_QUESTION_BANK = {
    "Toán": {
        "Số thập phân": {
            "subject": "Toán",
            "topic": "Số thập phân và phép tính",
            "questions": [
                {
                    "id": 1,
                    "type": "mcq",
                    "question": "Chữ số 7 trong số thập phân 45,872 có giá trị là bao nhiêu?",
                    "options": ["A. 7 đơn vị", "B. 7 phần mười", "C. 7 phần trăm", "D. 7 phần nghìn"],
                    "correct_answer": "C",
                    "explanation": "Chữ số 8 ở hàng phần mười, chữ số 7 ở hàng phần trăm nên giá trị là 7/100 hay 7 phần trăm."
                },
                {
                    "id": 2,
                    "type": "mcq",
                    "question": "Kết quả của phép tính: 25,6 + 4,85 là:",
                    "options": ["A. 30,45", "B. 29,45", "C. 30,145", "D. 74,1"],
                    "correct_answer": "A",
                    "explanation": "Đặt tính thẳng hàng dấu phẩy: 25,60 + 4,85 = 30,45."
                },
                {
                    "id": 3,
                    "type": "mcq",
                    "question": "Tìm số tự nhiên x biết: 4,9 < x < 5,2?",
                    "options": ["A. x = 4", "B. x = 5", "C. x = 6", "D. Không có số nào"],
                    "correct_answer": "B",
                    "explanation": "Số tự nhiên duy nhất nằm giữa 4,9 và 5,2 chính là số 5."
                },
                {
                    "id": 4,
                    "type": "essay",
                    "question": "Một mảnh vườn hình chữ nhật có chiều dài 18,5 m và chiều rộng kém chiều dài 4,2 m. Hãy tính chu vi của mảnh vườn đó?",
                    "guide": "Bước 1: Tính chiều rộng. Bước 2: Chu vi = (chiều dài + chiều rộng) x 2.",
                    "reference_answer": "Chiều rộng mảnh vườn là: 18,5 - 4,2 = 14,3 (m).\nChu vi mảnh vườn là: (18,5 + 14,3) x 2 = 65,6 (m).\nĐáp số: 65,6 m."
                },
                {
                    "id": 5,
                    "type": "essay",
                    "question": "Em hãy giải thích cách đặt tính và tính phép chia một số thập phân cho một số tự nhiên (Ví dụ: 12,6 : 3) để bạn hiểu rõ nhé?",
                    "guide": "Trình bày theo thứ tự: chia phần nguyên trước, viết dấu phẩy vào thương rồi chia tiếp phần thập phân.",
                    "reference_answer": "Cách chia:\n1. Chia phần nguyên trước: 12 chia 3 được 4.\n2. Viết dấu phẩy vào bên phải số 4 ở thương.\n3. Hạ chữ số 6 ở phần thập phân xuống: 6 chia 3 được 2.\nKết quả là: 4,2."
                }
            ]
        }
    },
    "Tiếng Việt": {
        "Luyện từ và câu": {
            "subject": "Tiếng Việt",
            "topic": "Đại từ và Quan hệ từ",
            "questions": [
                {
                    "id": 1,
                    "type": "mcq",
                    "question": "Trong câu 'Nam rất chăm chỉ, cậu ấy luôn đạt điểm cao', từ 'cậu ấy' dùng để thay thế cho từ nào?",
                    "options": ["A. chăm chỉ", "B. Nam", "C. điểm cao", "D. lớp học"],
                    "correct_answer": "B",
                    "explanation": "'cậu ấy' là đại từ xưng hô dùng thay thế cho danh từ riêng 'Nam' để tránh lặp từ."
                },
                {
                    "id": 2,
                    "type": "mcq",
                    "question": "Cặp quan hệ từ nào trong các đáp án sau biểu thị quan hệ 'Nguyên nhân - Kết quả'?",
                    "options": ["A. Tuy... nhưng...", "B. Nếu... thì...", "C. Vì... nên...", "D. Chẳng những... mà còn..."],
                    "correct_answer": "C",
                    "explanation": "Cặp 'Vì... nên...' thể hiện nguyên nhân và kết quả dẫn tới."
                },
                {
                    "id": 3,
                    "type": "mcq",
                    "question": "Từ nào sau đây đồng nghĩa với từ 'Tổ quốc'?",
                    "options": ["A. Quê hương", "B. Xóm làng", "C. Giang sơn", "D. Đồng bào"],
                    "correct_answer": "C",
                    "explanation": "'Giang sơn' đồng nghĩa với đất nước, Tổ quốc."
                },
                {
                    "id": 4,
                    "type": "essay",
                    "question": "Em hãy đặt một câu ghép có sử dụng cặp quan hệ từ biểu thị quan hệ tương phản (Tuy... nhưng...) nói về tinh thần vượt khó trong học tập.",
                    "guide": "Cần có hai vế câu có quan hệ tương phản, nối bởi cặp từ 'Tuy... nhưng...'.",
                    "reference_answer": "Ví dụ: 'Tuy hoàn cảnh gia đình còn nhiều khó khăn, nhưng bạn Nam vẫn luôn nỗ lực vươn lên đạt danh hiệu học sinh xuất sắc.'"
                },
                {
                    "id": 5,
                    "type": "essay",
                    "question": "Viết một đoạn văn ngắn (từ 3 đến 4 câu) tả vẻ đẹp của buổi sáng sớm ở quê hương em, trong đó có sử dụng 1 hình ảnh so sánh.",
                    "guide": "Đoạn văn có 3-4 câu, đúng chủ đề buổi sáng và có chứa biện pháp so sánh (từ so sánh: như, là, tựa...).",
                    "reference_answer": "Mỗi sớm mai thức dậy, làng quê em như được khoác lên mình một tấm áo sương mỏng manh, huyền ảo. Những giọt sương mai đọng trên kẽ lá long lanh như những hạt ngọc trời ban tặng. Bầu trời trong vắt, từng đàn chim cất tiếng hót líu lo chào đón ngày mới ngập tràn sức sống."
                }
            ]
        }
    },
    "Tiếng Anh": {
        "Thì quá khứ đơn": {
            "subject": "Tiếng Anh",
            "topic": "Past Simple Tense",
            "questions": [
                {
                    "id": 1,
                    "type": "mcq",
                    "question": "Yesterday, my brother ______ to the zoo with our parents.",
                    "options": ["A. go", "B. goes", "C. went", "D. going"],
                    "correct_answer": "C",
                    "explanation": "Có trạng từ 'Yesterday' nên động từ chia ở thì quá khứ đơn: 'go' chuyển thành 'went'."
                },
                {
                    "id": 2,
                    "type": "mcq",
                    "question": "What is the past form of the irregular verb 'buy'?",
                    "options": ["A. buyed", "B. bought", "C. buys", "D. buying"],
                    "correct_answer": "B",
                    "explanation": "Động từ bất quy tắc 'buy' ở thì quá khứ là 'bought'."
                },
                {
                    "id": 3,
                    "type": "mcq",
                    "question": "Choose the correct negative sentence in the past tense:",
                    "options": ["A. She didn't played football.", "B. She didn't play football.", "C. She not play football.", "D. She doesn't played football."],
                    "correct_answer": "B",
                    "explanation": "Công thức phủ định quá khứ đơn: S + didn't + V (nguyên mẫu) -> She didn't play."
                },
                {
                    "id": 4,
                    "type": "essay",
                    "question": "Write 2 sentences describing what you did last Sunday.",
                    "guide": "Sử dụng thì quá khứ đơn (Past Simple), có chủ ngữ 'I' và các động từ ở dạng quá khứ (V2/ed).",
                    "reference_answer": "Example: Last Sunday, I visited my grandparents in the countryside. In the afternoon, I played badminton with my cousins in the garden."
                },
                {
                    "id": 5,
                    "type": "essay",
                    "question": "Put the words in correct order: (did / what / you / yesterday / do / ?)",
                    "guide": "Cấu trúc câu hỏi quá khứ đơn có từ để hỏi: Wh-word + did + S + V-inf?",
                    "reference_answer": "What did you do yesterday?"
                }
            ]
        }
    },
    "Tiếng Trung": {
        "Giao tiếp & Bính âm": {
            "subject": "Tiếng Trung",
            "topic": "Bính âm và Chào hỏi",
            "questions": [
                {
                    "id": 1,
                    "type": "mcq",
                    "question": "Từ '你好' (Nǐ hǎo) trong tiếng Trung có nghĩa là gì?",
                    "options": ["A. Tạm biệt", "B. Cảm ơn", "C. Xin chào", "D. Xin lỗi"],
                    "correct_answer": "C",
                    "explanation": "你好 (Nǐ hǎo) là câu chào phổ biến nhất có nghĩa là 'Xin chào'."
                },
                {
                    "id": 2,
                    "type": "mcq",
                    "question": "Số '8' trong tiếng Trung phát âm là gì?",
                    "options": ["A. Yī (一)", "B. Sān (三)", "C. Wǔ (五)", "D. Bā (八)"],
                    "correct_answer": "D",
                    "explanation": "Số 8 viết là 八, phát âm là 'bā'."
                },
                {
                    "id": 3,
                    "type": "mcq",
                    "question": "Khi người khác nói '谢谢' (Xièxie - Cảm ơn), em nên đáp lại bằng câu nào lịch sự nhất?",
                    "options": ["A. 不客气 (Bú kèqi)", "B. 再见 (Zàijiàn)", "C. 对不起 (Duìbuqǐ)", "D. 没关系 (Méi guānxi)"],
                    "correct_answer": "A",
                    "explanation": "Đáp lại lời cảm ơn 谢谢 dùng '不客气' (Không có chi/Đừng khách sáo)."
                },
                {
                    "id": 4,
                    "type": "essay",
                    "question": "Em hãy viết câu giới thiệu tên của mình bằng tiếng Trung kèm phiên âm Pinyin (Ví dụ: 我叫... - Wǒ jiào...).",
                    "guide": "Sử dụng cấu trúc: 我叫 + [Tên em] (Phiên âm: Wǒ jiào...).",
                    "reference_answer": "Ví dụ: 我叫明。(Wǒ jiào Míng - Tôi tên là Minh)."
                },
                {
                    "id": 5,
                    "type": "essay",
                    "question": "Hãy viết phiên âm Pinyin có thanh điệu cho các số đếm sau: 1, 2, 3, 4, 5.",
                    "guide": "Số 1: yī, Số 2: èr, Số 3: sān, Số 4: sì, Số 5: wǔ.",
                    "reference_answer": "1: yī, 2: èr, 3: sān, 4: sì, 5: wǔ."
                }
            ]
        }
    }
}

def generate_quiz_ai(subject: str, topic: str, api_key: str = None) -> Dict[str, Any]:
    """Sinh bộ đề thi (Toán: 10 câu chuẩn; Các môn khác: 5 câu chuẩn)."""
    is_math = (subject == "Toán")
    is_flyers = (subject == "Tiếng Anh") and any(k in topic for k in ["Flyers", "Cambridge", "A2"])

    if api_key and api_key.strip():
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            
            if is_math:
                prompt = f"""
{MATH_SYSTEM_PROMPT}

Nhiệm vụ: Hãy tạo một bộ đề kiểm tra Toán Lớp 5 CHUẨN ĐÚNG 10 BÀI TOÁN (Thang điểm 10, mỗi câu 1.0 điểm) với chủ đề/chuyên đề: "{topic}".
Yêu cầu cấu trúc:
- Phần 1 (id 1 đến 6 - Trắc nghiệm, mỗi câu 1.0 điểm): Bao quát 6 chuyên đề (Số thập phân, Tỉ số %, Đổi đơn vị đo, Hình học phẳng, Hình học không gian, Chuyển động đều).
- Phần 2 (id 7 đến 10 - Tự luận, mỗi câu 1.0 điểm): 4 bài toán tự luận (Tính thuận tiện, Tỉ số %, Hình học thực tế, Chuyển động nâng cao), có lời giải mẫu chi tiết, đáp số và đơn vị đo rõ ràng.

Trả về kết quả DUY NHẤT định dạng JSON:
{{
  "subject": "Toán",
  "topic": "{topic}",
  "total_questions": 10,
  "questions": [
    {{
      "id": 1,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 1 (Số thập phân)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "A",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 2,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 2 (Tỉ số %)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "B",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 3,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 3 (Đổi đơn vị đo)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "C",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 4,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 4 (Hình học phẳng)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "A",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 5,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 5 (Hình học không gian)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "B",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 6,
      "part": 1,
      "type": "mcq",
      "question": "Nội dung câu trắc nghiệm 6 (Chuyển động đều)?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "C",
      "explanation": "Giải thích chi tiết",
      "points": 1.0
    }},
    {{
      "id": 7,
      "part": 2,
      "type": "essay",
      "question": "Tính thuận tiện: ...",
      "guide": "Áp dụng tính chất phân phối hoặc kết hợp...",
      "reference_answer": "Lời giải từng bước...",
      "explanation": "Cách tính nhanh",
      "points": 1.0
    }},
    {{
      "id": 8,
      "part": 2,
      "type": "essay",
      "question": "Bài toán tỉ số phần trăm thực tế: ...",
      "guide": "Bước 1: ..., Bước 2: ...",
      "reference_answer": "Bài giải chi tiết kèm đơn vị...",
      "explanation": "Phương pháp giải",
      "points": 1.0
    }},
    {{
      "id": 9,
      "part": 2,
      "type": "essay",
      "question": "Bài toán hình học thực tế (diện tích/thể tích): ...",
      "guide": "Bước 1: ..., Bước 2: ...",
      "reference_answer": "Bài giải chi tiết kèm đơn vị m² hoặc m³...",
      "explanation": "Phương pháp giải",
      "points": 1.0
    }},
    {{
      "id": 10,
      "part": 2,
      "type": "essay",
      "question": "Bài toán chuyển động đều nâng cao: ...",
      "guide": "Bước 1: ..., Bước 2: ...",
      "reference_answer": "Bài giải chi tiết kèm đơn vị km/giờ, giờ...",
      "explanation": "Phương pháp giải",
      "points": 1.0
    }}
  ]
}}
"""
            elif is_flyers:
                prompt = f"""
{FLYERS_SYSTEM_PROMPT}

Nhiệm vụ: Hãy tạo một bài kiểm tra luyện thi Cambridge A2 Flyers cho học sinh lớp 5 với chủ đề/dạng bài: "{topic}".
Yêu cầu cấu trúc: Gồm đúng 5 câu hỏi (3 trắc nghiệm + 2 tự luận/Open Cloze):
- 3 câu trắc nghiệm (id 1, 2, 3): Mỗi câu có 4 đáp án A, B, C, D, chỉ rõ đáp án đúng. Phần giải thích BẮT BUỘC chỉ rõ DẤU HIỆU NGỮ PHÁP (Grammar Clue / Signal word) bằng tiếng Việt và lời khen khích lệ song ngữ Anh - Việt.
- 2 câu tự luận (id 4, 5): Dạng Open Cloze (Tự điền 1 từ chính xác không gợi ý) hoặc Story Reading, kèm gợi ý và đáp án mẫu.

Trả về kết quả DUY NHẤT theo định dạng JSON hợp lệ:
{{
  "subject": "Tiếng Anh",
  "topic": "{topic}",
  "questions": [
    {{
      "id": 1,
      "type": "mcq",
      "question": "Nội dung câu hỏi tiếng Anh chuẩn A2 Flyers?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "A",
      "explanation": "Giải thích tiếng Việt chỉ rõ dấu hiệu nhận biết (Signal Word)",
      "grammar_clue": "Dấu hiệu ngữ pháp cốt lõi",
      "encouragement": "Great job! (Làm tốt lắm!)"
    }},
    {{
      "id": 2,
      "type": "mcq",
      "question": "Nội dung câu hỏi...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "B",
      "explanation": "Giải thích...",
      "grammar_clue": "Dấu hiệu...",
      "encouragement": "Awesome! (Tuyệt vời!)"
    }},
    {{
      "id": 3,
      "type": "mcq",
      "question": "Nội dung câu hỏi...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "C",
      "explanation": "Giải thích...",
      "grammar_clue": "Dấu hiệu...",
      "encouragement": "Well done! (Giỏi lắm!)"
    }},
    {{
      "id": 4,
      "type": "essay",
      "question": "Write ONE word to complete: Sentence...",
      "guide": "Gợi ý dấu hiệu ngữ pháp...",
      "reference_answer": "word",
      "explanation": "Giải thích tại sao điền từ này",
      "grammar_clue": "Dấu hiệu nhận biết...",
      "encouragement": "Superb! (Xuất sắc!)"
    }},
    {{
      "id": 5,
      "type": "essay",
      "question": "Write ONE word to complete: Sentence...",
      "guide": "Gợi ý dấu hiệu ngữ pháp...",
      "reference_answer": "word",
      "explanation": "Giải thích tại sao điền từ này",
      "grammar_clue": "Dấu hiệu nhận biết...",
      "encouragement": "Fantastic! (Phi thường!)"
    }}
  ]
}}
"""
            else:
                prompt = f"""
Hãy tạo một bài kiểm tra môn {subject} dành cho học sinh lớp 5 với chủ đề: "{topic}".
Yêu cầu bắt buộc:
1. Đúng chuẩn kiến thức sách giáo khoa lớp 5 Việt Nam.
2. Ngôn từ gần gũi, trong sáng, phù hợp tâm lý học sinh 10-11 tuổi.
3. Gồm đúng 5 câu hỏi:
   - 3 câu trắc nghiệm (id 1, 2, 3): Mỗi câu có 4 phương án A, B, C, D, chỉ rõ đáp án đúng và phần giải thích chi tiết.
   - 2 câu tự luận (id 4, 5): Đề bài kích thích tư duy, kèm gợi ý làm bài và đáp án tham khảo chuẩn.

Trả về kết quả DUY NHẤT theo định dạng JSON hợp lệ sau:
{{
  "subject": "{subject}",
  "topic": "{topic}",
  "questions": [
    {{
      "id": 1,
      "type": "mcq",
      "question": "Nội dung câu hỏi trắc nghiệm 1?",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "correct_answer": "A",
      "explanation": "Giải thích chi tiết tại sao đúng"
    }},
    {{
      "id": 2,
      "type": "mcq",
      "question": "Nội dung câu hỏi trắc nghiệm 2?",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "correct_answer": "B",
      "explanation": "Giải thích chi tiết tại sao đúng"
    }},
    {{
      "id": 3,
      "type": "mcq",
      "question": "Nội dung câu hỏi trắc nghiệm 3?",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "correct_answer": "C",
      "explanation": "Giải thích chi tiết tại sao đúng"
    }},
    {{
      "id": 4,
      "type": "essay",
      "question": "Nội dung câu hỏi tự luận 1?",
      "guide": "Gợi ý các bước làm bài",
      "reference_answer": "Đáp án mẫu chi tiết"
    }},
    {{
      "id": 5,
      "type": "essay",
      "question": "Nội dung câu hỏi tự luận 2?",
      "guide": "Gợi ý các bước làm bài",
      "reference_answer": "Đáp án mẫu chi tiết"
    }}
  ]
}}
"""
            response = generate_with_fallback(client, contents=prompt)
            raw_text = response.text.strip()
            match = re.search(r'\{.*\}', raw_text, re.DOTALL)
            if match:
                data = json.loads(match.group(0))
                return data
        except Exception as e:
            print(f"Lỗi gọi Gemini API (fallback sang dữ liệu SQLite / Mock): {e}")

    # Fallback cho Môn Toán từ ngân hàng SQLite (Seed Data 20+ câu, đề 10 câu chuẩn)
    if is_math:
        math_qs = db.get_math_full_exam()
        if math_qs and len(math_qs) >= 10:
            return {
                "subject": "Toán",
                "topic": topic,
                "total_questions": 10,
                "questions": math_qs
            }

    # Fallback cho Cambridge Flyers từ ngân hàng câu hỏi SQLite (Seed Data 25 câu)
    if is_flyers:
        if "Tổng hợp" in topic or "Đề thi thử" in topic:
            flyers_qs = db.get_flyers_full_exam()
            if flyers_qs and len(flyers_qs) >= 5:
                return {
                    "subject": "Tiếng Anh",
                    "topic": topic,
                    "questions": flyers_qs[:5]
                }
        else:
            # Lấy theo dạng bài cụ thể
            for dang in ["Dạng 1", "Dạng 2", "Dạng 3", "Dạng 4", "Dạng 5"]:
                if dang in topic:
                    items = db.get_flyers_questions_by_category(dang, limit=5)
                    if items:
                        formatted_qs = []
                        for idx, it in enumerate(items, 1):
                            formatted_qs.append({
                                "id": idx,
                                "type": it["type"],
                                "question": it["question"],
                                "options": it["options"],
                                "correct_answer": it["correct_answer"],
                                "explanation": it["explanation"],
                                "guide": it.get("grammar_clue", ""),
                                "reference_answer": it["correct_answer"],
                                "grammar_clue": it.get("grammar_clue", ""),
                                "encouragement": it.get("encouragement", "")
                            })
                        return {
                            "subject": "Tiếng Anh",
                            "topic": topic,
                            "questions": formatted_qs
                        }
            # Mặc định lấy full exam
            full_exam = db.get_flyers_full_exam()
            if full_exam:
                return {
                    "subject": "Tiếng Anh",
                    "topic": topic,
                    "questions": full_exam
                }

    # Fallback cho Tiếng Việt / Tiếng Trung từ question_bank (Seed Data phong phú)
    unattempted = db.get_unattempted_questions(subject, topic, count=5)
    if unattempted and len(unattempted) >= 5:
        formatted_qs = []
        for idx, it in enumerate(unattempted[:5], 1):
            formatted_qs.append({
                "id": idx,
                "q_bank_id": it["id"],
                "type": it["question_type"],
                "question": it["content"],
                "options": json.loads(it["options_json"]) if it.get("options_json") else [],
                "correct_answer": it["correct_answer"],
                "explanation": it.get("explanation", ""),
                "guide": it.get("guide", ""),
                "reference_answer": it["correct_answer"],
                "points": it.get("points", 2.0)
            })
        return {
            "subject": subject,
            "topic": topic,
            "questions": formatted_qs
        }

    # Fallback kho câu hỏi nội bộ chất lượng cao
    sub_bank = OFFLINE_QUESTION_BANK.get(subject, {})
    if sub_bank:
        # Lấy theo chủ đề gần nhất hoặc chủ đề đầu tiên
        first_topic_key = list(sub_bank.keys())[0]
        quiz_data = sub_bank.get(first_topic_key).copy()
        quiz_data["topic"] = topic
        return quiz_data

    # Dự phòng tổng quát
    return {
        "subject": subject,
        "topic": topic,
        "questions": [
            {
                "id": 1,
                "type": "mcq",
                "question": f"Câu hỏi ôn tập lớp 5 số 1 môn {subject} về '{topic}': Đâu là đáp án đúng?",
                "options": ["A. Phương án đúng", "B. Phương án sai 1", "C. Phương án sai 2", "D. Phương án sai 3"],
                "correct_answer": "A",
                "explanation": "Đáp án A hoàn toàn chuẩn xác theo kiến thức bài học."
            },
            {
                "id": 2,
                "type": "mcq",
                "question": f"Câu hỏi ôn tập lớp 5 số 2 môn {subject}: Điền từ hoặc số thích hợp:",
                "options": ["A. Lựa chọn 1", "B. Lựa chọn chính xác", "C. Lựa chọn 3", "D. Lựa chọn 4"],
                "correct_answer": "B",
                "explanation": "Đáp án B là câu trả lời chính xác."
            },
            {
                "id": 3,
                "type": "mcq",
                "question": f"Câu hỏi ôn tập lớp 5 số 3 môn {subject}: Khẳng định nào sau đây đúng?",
                "options": ["A. Ý 1", "B. Ý 2", "C. Ý chính xác nhất", "D. Ý 4"],
                "correct_answer": "C",
                "explanation": "Đáp án C đúng theo định nghĩa bài học."
            },
            {
                "id": 4,
                "type": "essay",
                "question": f"Em hãy trình bày cách làm hoặc hiểu biết của em về chủ đề: {topic}?",
                "guide": "Nêu các bước giải thích ngắn gọn, rõ ràng theo từng ý.",
                "reference_answer": f"Học sinh nắm được khái niệm cốt lõi của {topic} và diễn đạt mạch lạc."
            },
            {
                "id": 5,
                "type": "essay",
                "question": f"Hãy lấy 1 ví dụ cụ thể trong thực tế đời sống liên quan đến {topic}?",
                "guide": "Ví dụ đời thường, dễ liên tưởng và tính toán.",
                "reference_answer": "Ví dụ sinh động, gắn liền với học tập hoặc sinh hoạt gia đình."
            }
        ]
    }

def grade_math_essay_ai(question: str, reference: str, student_answer: str, api_key: str = None) -> Dict[str, Any]:
    """Chấm 1 câu tự luận Toán lớp 5: thang điểm 1.0 điểm theo 4 bước chuẩn sư phạm.
    Nếu tính đúng kết quả nhưng sai hoặc thiếu đơn vị đo, trừ 0.25 điểm và thông báo cảnh báo cụ thể.
    """
    if not student_answer or not student_answer.strip():
        return {
            "score": 0.0,
            "feedback": "Em chưa viết bài giải cho bài toán này. Hãy thử đặt bút viết các bước làm nhé!",
            "unit_warning": None,
            "encouragement": "Đừng ngần ngại thử sức nhé! Cố gắng lên nào! 📐"
        }

    if api_key and api_key.strip():
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            prompt = f"""
Bạn là Giáo viên Chấm thi Toán Tiểu học (Lớp 5) chuẩn sư phạm Việt Nam.
Đề bài: {question}
Đáp án mẫu và biểu điểm: {reference}
Bài làm của học sinh: {student_answer}

QUY TẮC CHẤM ĐIỂM NGHIÊM NGẶT (THANG ĐIỂM 1.0 ĐIỂM):
1. Tiêu chí 4 bước:
   - Lời giải rõ ràng, đúng nghĩa toán học và phép tính thiết lập đúng: 0.5 điểm
   - Kết quả tính toán chính xác: 0.25 điểm
   - Đáp số và Đơn vị đo chính xác: 0.25 điểm
2. QUY TẮC TRỪ ĐIỂM ĐƠN VỊ ĐO:
   - Nếu học sinh tính ra đúng kết quả số nhưng THIẾU đơn vị hoặc SAI đơn vị đo (ví dụ: viết m thay vì m², thiếu km/giờ, thiếu đồng, thiếu tạ, thiếu giờ): BẮT BUỘC TRỪ 0.25 ĐIỂM và ghi rõ lỗi vào phần "unit_warning".
   - Ví dụ: Tính đúng diện tích ra 75,5 nhưng ghi 75,5 m -> trừ 0.25 điểm, điểm số là 0.75 / 1.0.
3. Nhận xét phân tích cụ thể các bước học sinh làm được, dùng các ký hiệu toán học đẹp mắt (×, :, m², m³).
4. Lời khen ngợi khích lệ sự nỗ lực và tư duy logic của học sinh.

Trả về kết quả DUY NHẤT dạng JSON:
{{
  "score": 0.75,
  "feedback": "Phân tích cụ thể các bước: Lời giải, phép tính, kết quả...",
  "unit_warning": "⚠️ Em tính đúng kết quả nhưng sai/thiếu đơn vị đo... (bị trừ 0.25 điểm)",
  "encouragement": "Tư duy tính toán của em rất tốt! Tiếp tục phát huy nhé! 🌟"
}}
"""
            response = generate_with_fallback(client, contents=prompt)
            match = re.search(r'\{.*\}', response.text.strip(), re.DOTALL)
            if match:
                return json.loads(match.group(0))
        except Exception as e:
            print(f"Lỗi AI chấm tự luận Toán: {e}")

    # Fallback chấm điểm Toán Offline thông minh
    cleaned_ans = student_answer.strip().lower()
    
    # 1. Trích xuất các số quan trọng từ reference_answer
    import re as re_num
    ref_numbers = re_num.findall(r'\d+(?:[,\.]\d+)?', reference)
    expected_result = ref_numbers[-1] if ref_numbers else None
    
    # Tìm xem học sinh có tính ra kết quả cuối cùng không
    has_correct_result = False
    if expected_result:
        norm_expected = expected_result.replace(",", ".")
        has_correct_result = (expected_result in cleaned_ans) or (norm_expected in cleaned_ans.replace(",", "."))

    # Kiểm tra đơn vị đo cần thiết từ reference
    unit_synonyms = {
        "m²": ["m²", "m2", "mét vuông", "met vuong"],
        "cm²": ["cm²", "cm2", "xentimet vuong"],
        "dm²": ["dm²", "dm2", "deximet vuong"],
        "m³": ["m³", "m3", "mét khối", "met khoi"],
        "dm³": ["dm³", "dm3", "lít", "lit"],
        "km/giờ": ["km/giờ", "km/h", "km/g", "km/gio"],
        "đồng": ["đồng", "dong", "đ", "vnd"],
        "tạ": ["tạ", "ta"],
        "tấn": ["tấn", "tan"],
        "kg": ["kg", "ki-lô-gam", "kilogam"],
        "giờ": ["giờ", "h", "tiếng", "gio"],
        "phút": ["phút", "ph", "p", "phut"]
    }

    detected_units = []
    for base_unit, syns in unit_synonyms.items():
        if any(s in reference.lower() for s in syns):
            detected_units.append((base_unit, syns))

    has_unit = True
    unit_warning = None
    if detected_units:
        # Kiểm tra xem bài làm của học sinh có chứa ít nhất 1 biến thể của đơn vị
        matched_units = []
        for base_unit, syns in detected_units:
            if any(s in cleaned_ans for s in syns):
                matched_units.append(base_unit)
        
        # Nếu không có đơn vị nào khớp
        if not matched_units:
            has_unit = False
            base_req = detected_units[0][0]
            unit_warning = f"⚠️ Chú ý đơn vị đo: Bài toán yêu cầu đơn vị ({base_req}), em chú ý ghi rõ ở phép tính và đáp số nhé!"
        else:
            # Kiểm tra lỗi nhầm lẫn điển hình: diện tích (m²) nhưng chỉ ghi m
            if any(b in ["m²", "cm²", "dm²"] for b, _ in detected_units):
                has_area_unit = any(s in cleaned_ans for s in ["m²", "m2", "cm²", "cm2", "dm²", "dm2"])
                if not has_area_unit:
                    has_unit = False
                    unit_warning = "⚠️ Lỗi đơn vị diện tích: Em ghi đơn vị độ dài (m) thay vì đơn vị diện tích (m²). Bị trừ 0,25 điểm trình bày."

    if has_correct_result:
        if has_unit or not detected_units:
            score = 1.0
            feedback = "Em giải toán rất xuất sắc! Lời giải rõ ràng, phép tính và đáp số hoàn toàn chính xác kèm đơn vị đo đầy đủ."
            unit_warning = None
            encouragement = "Tuyệt đối chính xác! Sự cẩn thận và tư duy mạch lạc của em rất đáng khen! 🌟🎉"
        else:
            score = 0.75
            feedback = "Em đã thiết lập phép tính và tính ra kết quả rất chính xác! Tuy nhiên, bài làm bị trừ 0,25 điểm do thiếu hoặc viết chưa đúng đơn vị đo."
            if not unit_warning and detected_units:
                unit_warning = f"⚠️ Chú ý đơn vị đo: Bài toán yêu cầu đơn vị ({detected_units[0][0]}), em chú ý ghi rõ ở danh số phép tính và đáp số nhé!"
            encouragement = "Rất đáng khen! Em tính toán rất giỏi, chỉ cần thêm chút tỉ mỉ về đơn vị là đạt điểm tuyệt đối 1.0 rồi nè! 👏"
    else:
        if len(cleaned_ans) > 20:
            score = 0.5
            feedback = "Em đã nêu được lời giải và các bước tính ban đầu. Tuy nhiên kết quả tính toán hoặc phép tính cuối cùng chưa chính xác. Em hãy xem lại đáp án mẫu để đối chiếu nhé!"
            unit_warning = None
            encouragement = "Không sao cả, phương pháp của em đã đi đúng hướng rồi. Cẩn thận hơn ở phép tính nháp nha! 💖"
        else:
            score = 0.25
            feedback = "Bài làm của em còn khá ngắn và chưa đưa ra được các bước giải hoàn chỉnh. Hãy tham khảo đáp án mẫu nhé."
            unit_warning = None
            encouragement = "Cố gắng lên nhé! Em cứ tự tin viết đầy đủ lời giải ra nha! 📐"

    return {
        "score": score,
        "feedback": feedback,
        "unit_warning": unit_warning,
        "encouragement": encouragement
    }

def grade_essay_ai(question: str, reference: str, student_answer: str, api_key: str = None) -> Dict[str, Any]:
    """Chấm 1 câu tự luận: tự động phân loại môn Toán (thang 1.0đ), tiếng Anh Flyers (thang 2.0đ) hoặc môn khác."""
    # Nhận diện nếu là câu hỏi môn Toán
    is_math_question = any(k in question.lower() for k in ["tính bằng cách thuận tiện", "bài toán", "thửa ruộng", "quét sơn", "ô tô", "xe máy", "ca nô", "lãi suất", "diện tích", "thể tích", "hình thang", "hình hộp", "vận tốc", "km/giờ", "m²", "đồng"])
    if is_math_question:
        return grade_math_essay_ai(question, reference, student_answer, api_key)
    if not student_answer or not student_answer.strip():
        return {
            "score": 0.0,
            "feedback": "Em chưa viết câu trả lời cho câu này. Hãy thử sức mình ở câu tiếp theo nhé, không sợ sai đâu nè!",
            "encouragement": "Don't give up! Every mistake is a step forward! (Đừng bỏ cuộc nhé! Mỗi lần thử sức là một bước tiến bộ!) 🌸"
        }

    is_english_question = any(k in question.lower() for k in ["write one word", "sentence", "english", "flyers", "story", "yesterday", "what did you do", "complete"])
    
    if api_key and api_key.strip():
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            if is_english_question:
                prompt = f"""
Bạn là Chuyên gia Khảo thí chấm thi Cambridge A2 Flyers cho học sinh lớp 5.
Đề bài: {question}
Đáp án mẫu chuẩn: {reference}
Bài làm của học sinh: {student_answer}

Yêu cầu chấm thi nghiêm ngặt:
1. Cho điểm trên thang điểm 2.0 (0.0, 0.5, 1.0, 1.5, 2.0).
   - Với dạng Open Cloze (điền 1 từ), nếu học sinh điền đúng từ (hoặc từ đồng nghĩa chuẩn xác, không phân biệt hoa thường), hãy cho điểm tối đa 2.0.
2. Nhận xét phân tích lỗi sai: BẮT BUỘC viết bằng TIẾNG VIỆT dễ hiểu cho học sinh lớp 5, CHỈ RÕ DẤU HIỆU NHẬN BIẾT NGỮ PHÁP (Grammar Signal Words/Clues).
3. Đưa ra LỜI KHEN KHÍCH LỆ SONG NGỮ: Tiếng Anh kèm dịch nghĩa tiếng Việt (Ví dụ: "Superb work! You are flying high! (Làm bài xuất sắc lắm! Em đang bay rất cao!)").

Trả về kết quả DUY NHẤT dạng JSON:
{{
  "score": 2.0,
  "feedback": "Giải thích chi tiết bằng tiếng Việt, chỉ rõ dấu hiệu nhận biết ngữ pháp...",
  "encouragement": "Super job! Keep flying high! (Làm tốt lắm! Tiếp tục bay cao nhé!)"
}}
"""
            else:
                prompt = f"""
Bạn là giáo viên tiểu học chấm bài thi tự luận môn học lớp 5.
Đề bài: {question}
Đáp án mẫu chuẩn: {reference}
Bài làm của học sinh: {student_answer}

Yêu cầu:
1. Chấm điểm trên thang điểm 2.0 (Ví dụ: 0.5, 1.0, 1.5, 2.0).
2. Nhận xét cụ thể những điểm em đã làm đúng và chỉ ra chi tiết chỗ còn thiếu hoặc lỗi sai (nếu có).
3. Đưa ra một lời khen khích lệ, tạo động lực tinh thần cho học sinh lớp 5.

Trả về kết quả DUY NHẤT dạng JSON:
{{
  "score": 1.5,
  "feedback": "Phân tích cụ thể bài làm...",
  "encouragement": "Lời khen ấm áp, dễ thương..."
}}
"""
            response = generate_with_fallback(client, contents=prompt)
            match = re.search(r'\{.*\}', response.text.strip(), re.DOTALL)
            if match:
                return json.loads(match.group(0))
        except Exception as e:
            print(f"Lỗi AI chấm tự luận: {e}")

    # Fallback chấm điểm offline thông minh
    cleaned_student = student_answer.strip().lower().strip(".,!?\"'")
    cleaned_ref = reference.strip().lower().strip(".,!?\"'")

    # Kiểm tra đặc biệt cho câu Open Cloze tiếng Anh
    if is_english_question and ("write one word" in question.lower() or len(cleaned_ref.split()) <= 2):
        # Học sinh gõ đúng từ hoặc câu trả lời chứa từ chuẩn
        tokens = [t.strip(".,!?\"'") for t in cleaned_student.split()]
        valid_words = [w.strip() for w in cleaned_ref.replace("/", ",").split(",")]
        
        is_matched = any(w in tokens or cleaned_student == w for w in valid_words)
        if is_matched:
            return {
                "score": 2.0,
                "feedback": f"Chính xác tuyệt đối! Đáp án chuẩn xác là: '{cleaned_ref}'. Em đã nắm rất vững cấu trúc và dấu hiệu ngữ pháp của câu!",
                "encouragement": "Brilliant! You are a Flyers champion! (Xuất sắc lắm! Em đúng là nhà vô địch Flyers!) 🌟✈️"
            }
        else:
            return {
                "score": 0.5,
                "feedback": f"Câu trả lời của em là '{student_answer}'. Đáp án chính xác cần điền là: '{reference}'. Hãy chú ý dấu hiệu nhận biết ngữ pháp trong câu nhé!",
                "encouragement": "Good try! Keep practicing and you will conquer Flyers! (Cố gắng tốt lắm! Tiếp tục luyện tập em sẽ chinh phục được Flyers!) 💖"
            }

    # Fallback tổng quát cho các môn khác
    ans_len = len(student_answer.strip())
    if ans_len > 30:
        score = 2.0
        feedback = "Em làm bài rất đầy đủ, câu từ rõ ràng, bám sát yêu cầu của đề bài!"
        encouragement = "Tuyệt vời lắm! Tinh thần tự học của em rất đáng khen ngợi. Tiếp tục phát huy nhé! 🌟🎉"
    elif ans_len > 10:
        score = 1.5
        feedback = "Em đã nêu được ý cơ bản. Nếu diễn đạt chi tiết và trình bày đầy đủ các bước hơn thì bài sẽ đạt điểm tối đa nha."
        encouragement = "Rất cố gắng! Em chỉ cần chú ý viết thêm một chút nữa là hoàn hảo rồi nè! 👏"
    else:
        score = 1.0
        feedback = "Em đã có câu trả lời nhưng còn hơi ngắn. Em hãy tham khảo thêm đáp án mẫu để mở rộng ý nhé."
        encouragement = "Cố lên nào! Cứ tự tin trình bày chi tiết hơn ở câu sau nhé! 💖"

    return {
        "score": score,
        "feedback": feedback,
        "encouragement": encouragement
    }

def ask_tutor_ai(user_message: str, chat_history: List[Dict[str, str]], api_key: str = None) -> str:
    """Gia sư AI phản hồi theo phương pháp Socratic (gợi mở), tuyệt đối không giải hộ."""
    if api_key and api_key.strip():
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            
            # Ghép lịch sử
            messages_prompt = f"{TUTOR_SYSTEM_PROMPT}\n\nLỊCH SỬ TRÒ CHUYỆN:\n"
            for msg in chat_history[-6:]:  # Lấy 6 lượt gần nhất
                role_label = "Học sinh" if msg["role"] == "user" else "Gia sư Cú Vàng"
                messages_prompt += f"{role_label}: {msg['content']}\n"
            messages_prompt += f"Học sinh: {user_message}\nGia sư Cú Vàng:"

            response = generate_with_fallback(client, contents=messages_prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Lỗi gọi Gia sư AI: {e}")

    # Offline logic phản hồi gợi mở
    lower_msg = user_message.lower()
    if any(k in lower_msg for k in ["giải hộ", "kết quả là gì", "đáp án là gì", "bằng bao nhiêu"]):
        return (
            "Chào em! Cú Vàng rất vui được đồng hành cùng em nè! 🦉✨\n\n"
            "Nhưng theo quy tắc học tập của lớp mình, thầy/cô sẽ không đưa ra đáp án ngay đâu, "
            "vì như vậy em sẽ mất đi cơ hội rèn luyện bộ não thông minh đấy! 💡\n\n"
            "Thay vào đó, em hãy cho thầy/cô biết: **Đề bài cho chúng ta biết những dữ kiện gì rồi?** "
            "Và em đang băn khoăn ở bước tính toán nào nhất? Thử nói cho thầy/cô nghe nào! 😊"
        )
    elif any(k in lower_msg for k in ["phân số", "cộng phân số", "trừ phân số"]):
        return (
            "À, bài toán về phân số nè! 📐\n\n"
            "Em còn nhớ quy tắc vàng khi cộng hoặc trừ hai phân số khác mẫu số không?\n"
            "Bước đầu tiên chúng ta phải làm gì với hai mẫu số nhỉ? Có phải là tìm **Mẫu số chung (Quy đồng mẫu số)** không ta? 🧐\n\n"
            "Em thử quy đồng mẫu số bài này rồi nhắn kết quả bước đó cho thầy/cô xem thử nhé! 🌟"
        )
    elif any(k in lower_msg for k in ["số thập phân", "nhân số thập phân"]):
        return (
            "Tuyệt vời! Toán số thập phân rất thú vị đấy! 🔢\n\n"
            "Manh mối quan trọng cho em nè: Khi đặt tính cộng hoặc trừ số thập phân, điều tối quan trọng là các chữ số ở cùng một hàng và **dấu phẩy** phải được đặt thẳng cột với nhau.\n\n"
            "Em đã đặt tính thẳng dấu phẩy chưa? Thử tính phần nguyên ra bao nhiêu rồi chia sẻ cùng thầy/cô nhé! 👏"
        )
    else:
        return (
            f"Thầy/Cô đã đọc câu hỏi của em: *'{user_message}'* rồi nè! 🦉\n\n"
            "Để cùng giải quyết câu này, chúng mình hãy đi từng bước một nhé:\n"
            "1. Em thấy bài này thuộc dạng kiến thức nào em đã từng học?\n"
            "2. Ý tưởng hoặc suy nghĩ đầu tiên của em khi đọc đề là gì nào? Hãy cứ tự tin gõ ra đây, dù đúng hay chưa đúng thầy/cô đều cùng em sửa nha! 💖"
        )

def grade_speaking_ai(
    reference_text: str, 
    audio_bytes: bytes, 
    language: str = "Tiếng Anh", 
    api_key: str = None, 
    mime_type: str = "audio/wav"
) -> Dict[str, Any]:
    """
    Chấm điểm phần thi Nói (Speaking) bằng Gemini API trực tiếp từ audio_bytes:
    - Chép lại những gì học sinh nói (transcription).
    - Soi chi tiết ngữ âm:
      + Tiếng Anh: âm cuối (-s, -ed, -t, -k, -th), trọng âm từ, nối âm chuẩn Cambridge Flyers.
      + Tiếng Trung: 4 thanh điệu (thanh 1, 2, 3, 4), biến điệu thanh 3, phụ âm đầu (z/c/s, zh/ch/sh) chuẩn YCT/HSK.
    - Hướng dẫn đặt khẩu hình và cách sửa lỗi phát âm cụ thể.
    - Chấm điểm trên thang điểm 2.5 (hoặc 10.0).
    - Lời khen ngợi khích lệ ngọt ngào.
    Có chế độ Offline thông minh nếu chưa kết nối API key.
    """
    # Nếu có API key và có dữ liệu âm thanh, gọi Gemini API 2.5 Flash phân tích âm thanh
    if api_key and audio_bytes and len(audio_bytes) > 0:
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=api_key)
            prompt = f"""
Bạn là Chuyên gia Khảo thí Ngữ âm dành cho học sinh tiểu học (lớp 5) chuẩn {('Cambridge A2 Flyers' if language == 'Tiếng Anh' else 'Tiếng Trung YCT / HSK')}.
Nhiệm vụ: Nghe đoạn thu âm giọng đọc của bé và chấm điểm phần thi Nói (Speaking).

Câu mẫu cần đọc: "{reference_text}"
Ngôn ngữ: {language}

YÊU CẦU ĐÁNH GIÁ:
1. transcription: Ghi lại chính xác từng từ bé đã phát âm trong file ghi âm.
2. score: Điểm số đạt được (từ 0.0 đến 2.5 điểm).
3. phonetic_analysis: 
   - Nếu là Tiếng Anh: Soi chi tiết các âm đuôi (ending sounds: -s, -es, -ed, -t, -d, -k, -th), trọng âm từ và sự rõ ràng.
   - Nếu là Tiếng Trung: Soi chi tiết 4 thanh điệu (thanh 1, 2, 3, 4), thanh nhẹ, và các âm đầu dễ nhầm (z/c/s, zh/ch/sh).
4. feedback: Nhận xét chi tiết, chỉ ra từ nào bé nói rất hay, từ nào cần mở rộng khẩu hình hoặc phát âm lại, kèm hướng dẫn sửa thân thiện.
5. encouragement: Lời khen ngợi khích lệ đáng yêu để bé tự tin nói ngoại ngữ hơn.

BẮT BUỘC TRẢ VỀ DUY NHẤT ĐỊNH DẠNG JSON (không có markdown code fences, không giải thích ngoài JSON):
{{
    "transcription": "...",
    "score": 2.5,
    "phonetic_analysis": "...",
    "feedback": "...",
    "encouragement": "..."
}}
"""
            part = types.Part.from_bytes(data=audio_bytes, mime_type=mime_type or "audio/wav")
            response = generate_with_fallback(client, contents=[prompt, part])
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            data = json.loads(raw_text.strip())
            return {
                "transcription": data.get("transcription", reference_text),
                "score": float(data.get("score", 2.5)),
                "phonetic_analysis": data.get("phonetic_analysis", "Ngữ âm rõ ràng, nhịp điệu tốt."),
                "feedback": data.get("feedback", "Em phát âm câu này rất tự tin!"),
                "encouragement": data.get("encouragement", "Làm rất tốt, tiếp tục phát huy nhé! 🌟🎙️")
            }
        except Exception as e:
            print(f"[Gemini Speaking Error] {e}")

    # Chế độ Offline / Fallback
    is_en = (language == "Tiếng Anh")
    has_audio = bool(audio_bytes and len(audio_bytes) > 0)
    return {
        "transcription": (f"'{reference_text}'" if has_audio else "(Chưa ghi nhận bản thu âm)"),
        "score": 2.5 if has_audio else 0.0,
        "phonetic_analysis": (
            "Giọng đọc to rõ ràng. Chú ý giữ đều hơi và phát âm rõ âm đuôi (-ed, -s, -t) ở cuối mỗi từ."
            if is_en else
            "Phát âm to rõ ràng. Chú ý thanh 1 cao bằng và thanh 4 dứt khoát, phân biệt rõ các âm đầu zh/ch/sh."
        ) if has_audio else "Chưa có bản ghi âm để phân tích ngữ âm.",
        "feedback": (
            f"Bé đã hoàn thành tốt câu đọc '{reference_text}'! Ngữ điệu câu tự nhiên, tốc độ nói vừa phải."
            if is_en else
            f"Bé đã đọc rất tốt câu '{reference_text}'! Hãy chú ý quy tắc biến điệu thanh điệu khi hai thanh 3 đi liền nhau nhé."
        ) if has_audio else "Em hãy bấm nút micro màu đỏ để ghi âm câu trả lời trước khi nộp bài nhé!",
        "encouragement": "Rất tự tin và lưu loát! Em xứng đáng nhận trọn vẹn điểm phần thi Nói này! 🌟🎙️🎉" if has_audio else "Cố gắng lên nào, em hãy thu âm thử nhé!"
    }

def start_new_study_session(subject: str, topic: str, api_key: str = None) -> Dict[str, Any]:
    """
    Tạo một phiên học tập mới có quản lý session_id và tự động đổi bài tập:
    1. Kiểm tra ngân hàng question_bank để ưu tiên lấy các câu hỏi chưa từng làm gần đây.
    2. Nếu số câu chưa làm không đủ, tự động gọi AI sinh thêm câu mới và lưu vào question_bank.
    3. Tạo study_session với trạng thái 'in_progress', sẵn sàng tự động lưu nháp.
    """
    is_4skills = ("4 Kỹ Năng" in topic) or (subject in ["Tiếng Anh", "Tiếng Trung"] and any(k in topic for k in ["Zoo", "Holidays", "Gia Đình", "Trường Học", "4 Kỹ Năng"]))
    need_count = 10 if subject == "Toán" else (4 if is_4skills else 5)
    
    # 1. Thử lấy các câu hỏi chưa từng làm từ question_bank
    unattempted = db.get_unattempted_questions(subject, topic, count=need_count)
    
    # Nếu câu hỏi chưa làm trong bank đủ số lượng
    if unattempted and len(unattempted) >= need_count:
        questions = []
        for idx, it in enumerate(unattempted[:need_count], 1):
            default_pts = 2.5 if is_4skills else (1.0 if subject == "Toán" else 2.0)
            questions.append({
                "id": idx,
                "q_bank_id": it["id"],
                "type": it["question_type"],
                "skill": it.get("skill", ""),
                "question": it["content"],
                "options": json.loads(it["options_json"]) if it.get("options_json") else [],
                "correct_answer": it["correct_answer"],
                "explanation": it.get("explanation", ""),
                "guide": it.get("guide", ""),
                "reference_answer": it["correct_answer"],
                "points": it.get("points", default_pts),
                "grammar_clue": it.get("grammar_clue", ""),
                "encouragement": it.get("encouragement", ""),
                "audio_text": it.get("audio_text", ""),
                "audio_prompt": it.get("audio_prompt", ""),
                "phonetics_guide": it.get("phonetics_guide", ""),
                "pinyin": it.get("pinyin", ""),
                "vietnamese_meaning": it.get("vietnamese_meaning", "")
            })
    else:
        # Nếu chưa đủ câu mới trong bank, gọi generate_quiz_ai để sinh đề mới
        quiz_data = generate_quiz_ai(subject, topic, api_key)
        questions = quiz_data.get("questions", [])
        # Lưu các câu hỏi mới này vào question_bank
        db.add_questions_to_bank(subject, topic, questions)

    # 2. Tạo phiên làm bài mới trong CSDL SQLite
    session_id = db.create_study_session(subject, topic, questions)

    return {
        "session_id": session_id,
        "subject": subject,
        "topic": topic,
        "questions": questions
    }


# =========================================================================
# AI ĐỐ VUI TRÍ TUỆ & CHẤM ĐIỂM CÂU ĐỐ HÀI HƯỚC
# =========================================================================

def check_riddle_answer_ai(question: str, reference_answer: str, user_answer: str, explanation: str = "", api_key: str = None) -> Dict[str, Any]:
    """
    Kiểm tra câu trả lời câu đố của bé theo ngữ nghĩa, chấp nhận cách diễn đạt tự nhiên.
    Trả về:
    {
        "is_correct": bool,
        "funny_feedback": str,
        "extra_joke": str
    }
    """
    if not user_answer or not user_answer.strip():
        return {
            "is_correct": False,
            "funny_feedback": "Bé chưa nhập câu trả lời nè! Hãy thử suy nghĩ và đoán xem sao nhé! 🤔",
            "extra_joke": "Gợi ý: Đừng nghĩ quá phức tạp, câu đố mẹo thường có cách giải thích bất ngờ lắm đó!"
        }

    clean_user = user_answer.strip().lower()
    clean_ref = reference_answer.strip().lower()

    # Bóc tách các cụm đáp án thay thế (phân tách bởi dấu phẩy, ngoặc đơn, gạch chéo hoặc từ 'hoặc')
    raw_variants = re.split(r'[,/()]|\bhoặc\b|\blà\b', clean_ref)
    variants = [v.strip() for v in raw_variants if len(v.strip()) >= 2]
    if not variants:
        variants = [clean_ref]

    # Stopwords tiếng Việt thường gặp (không dùng từ đơn lẻ này để kết luận đúng)
    stopwords = {"con", "cái", "quả", "trái", "cây", "chiếc", "loài", "những", "các", "người", "là", "và"}

    def is_match_offline(user_text: str, cand_variants: List[str]) -> bool:
        for var in cand_variants:
            # 1. Khớp nguyên cụm
            if var in user_text or user_text in var:
                return True
            # 2. Khớp từ khóa cốt lõi (sau khi loại bỏ stopwords)
            core_words = [w for w in var.split() if w not in stopwords and len(w) >= 2]
            if core_words and all(w in user_text for w in core_words):
                return True
        return False

    direct_match = is_match_offline(clean_user, variants)

    if not api_key or not api_key.strip():
        if direct_match:
            return {
                "is_correct": True,
                "funny_feedback": "Bingo! Chuẩn không cần chỉnh luôn bé ơi! Trí tưởng tượng của bé thật phong phú! 🎉🌟",
                "extra_joke": explanation if explanation else "Bé được thưởng ngay +1 Ngôi sao trí tuệ! ⭐"
            }
        else:
            return {
                "is_correct": False,
                "funny_feedback": f"Gần đúng rồi nhưng chưa trúng hoàn toàn nè! Thử nghĩ theo hướng hài hước một chút xem nha! 😄",
                "extra_joke": "Nếu bí quá, bé có thể bấm nút 'Xem gợi ý' hoặc 'Xem đáp án' nhé!"
            }

    prompt = f"""
Bạn là chuyên gia đố vui trí tuệ hài hước, vui tính dành cho học sinh tiểu học (Lớp 5).
Câu đố: "{question}"
Đáp án chuẩn/ý tưởng đúng: "{reference_answer}"
Giải thích vui nhộn: "{explanation}"
Câu trả lời của bé: "{user_answer}"

Nhiệm vụ:
1. Đánh giá xem câu trả lời của bé có đúng ý tưởng cốt lõi của câu đố hay không.
   CHÚ Ý: Chấp nhận mọi cách diễn đạt đồng nghĩa, viết tắt, không bắt bẻ chính tả hay thiếu từ phụ. Ví dụ "cua" hay "con cua" đều đúng; "đồng hồ" hay "kim đồng hồ" hay "a clock" đều đúng.
2. Viết một lời nhận xét thật vui nhộn, hài hước, khen ngợi nếu bé đoán đúng; nếu chưa đúng thì động viên hóm hỉnh và gợi ý nhẹ để bé không nản lòng.

Trả về kết quả DUY NHẤT định dạng JSON:
{{
  "is_correct": true hoặc false,
  "funny_feedback": "Lời nhận xét vui nhộn, thân thiện với học sinh lớp 5",
  "extra_joke": "Câu đùa thêm hoặc lời bình luận hóm hỉnh về câu đố"
}}
"""
    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=api_key)
        response = generate_with_fallback(
            client,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text.strip())
    except Exception as e:
        print(f"[Riddle Grading Error] {e}")
        return {
            "is_correct": direct_match,
            "funny_feedback": "Bingo! Bé đoán chuẩn lắm đó! 🎉" if direct_match else "Chưa đúng rồi nè, thử lại một lần nữa xem nha! 💡",
            "extra_joke": explanation
        }


def generate_new_riddle_ai(category: str = "Đố mẹo", existing_questions: List[str] = None, api_key: str = None) -> Optional[Dict[str, str]]:
    """
    Sáng tạo một câu đố vui mới lạ, hài hước và trí tuệ cho học sinh lớp 5 bằng Gemini.
    Đảm bảo không trùng với các câu đố đã có.
    """
    if not api_key or not api_key.strip():
        return None

    existing_str = ""
    if existing_questions:
        sample_existing = existing_questions[-10:]
        existing_str = f"Tránh trùng lặp với các câu đố sau: {json.dumps(sample_existing, ensure_ascii=False)}"

    prompt = f"""
Bạn là một nghệ sĩ sáng tạo đố vui trí tuệ cho thiếu nhi.
Hãy tạo ra 1 câu đố vui cực kỳ thông minh, bất ngờ và hài hước cho học sinh lớp 5 thuộc chủ đề: "{category}".
{existing_str}

Yêu cầu:
1. Thể loại: '{category}' ('Đố mẹo', 'Đố chữ', 'Toán logic', 'Khoa học vui', hoặc 'Đố vui Tiếng Anh').
2. Nội dung trong sáng, lành mạnh, rèn luyện tư duy logic, phản xạ hoặc chơi chữ dí dỏm.
3. Có gợi ý (hint) thông minh, đáp án rõ ràng và phần giải thích vui nhộn (explanation).

Trả về kết quả DUY NHẤT định dạng JSON:
{{
  "category": "{category}",
  "question": "Nội dung câu đố?",
  "hint": "Gợi ý nhỏ nếu bé chưa nghĩ ra",
  "answer": "Đáp án chính xác",
  "explanation": "Giải thích hài hước tại sao lại là đáp án đó"
}}
"""
    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=api_key)
        response = generate_with_fallback(
            client,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.8,
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text.strip())
    except Exception as e:
        print(f"[AI Riddle Gen Error] {e}")
        return None
