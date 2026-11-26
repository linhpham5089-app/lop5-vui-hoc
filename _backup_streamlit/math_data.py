"""
Ngân hàng câu hỏi Toán Lớp 5 chuẩn cấu trúc 10 bài/đề.
Bao gồm hơn 20 câu hỏi phân bổ đủ cho 6 chuyên đề trọng tâm:
1. Số thập phân và phép tính
2. Tỉ số phần trăm
3. Đổi đơn vị đo đại lượng
4. Hình học phẳng
5. Hình học không gian
6. Toán chuyển động đều
Kèm 4 dạng tự luận: Tính thuận tiện, Tỉ số phần trăm, Hình học và Chuyển động.
"""

MATH_SEED_DATA = [
    # --- PHẦN 1: TRẮC NGHIỆM (CHUYÊN ĐỀ 1 ĐẾN 6) ---
    # Chuyên đề 1: Số thập phân
    {
        "topic_category": "Chuyên đề 1: Số thập phân",
        "type": "mcq",
        "question": "Chữ số 5 trong số thập phân 84,259 thuộc hàng nào và có giá trị là bao nhiêu?",
        "options": [
            "A. Hàng phần mười, giá trị là 5/10",
            "B. Hàng phần trăm, giá trị là 5/100 (hay 0,05)",
            "C. Hàng phần nghìn, giá trị là 5/1000",
            "D. Hàng đơn vị, giá trị là 5"
        ],
        "correct_answer": "B",
        "explanation": "Chữ số 2 ở hàng phần mười, chữ số 5 ở hàng phần trăm nên giá trị là 5/100 hay 0,05.",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 1: Số thập phân",
        "type": "mcq",
        "question": "Tìm số tự nhiên y thỏa mãn điều kiện: 15,8 < y < 16,9?",
        "options": ["A. y = 15", "B. y = 16", "C. y = 17", "D. y = 16,5"],
        "correct_answer": "B",
        "explanation": "Số tự nhiên duy nhất nằm giữa 15,8 và 16,9 là số 16.",
        "points": 1.0
    },

    # Chuyên đề 2: Tỉ số phần trăm
    {
        "topic_category": "Chuyên đề 2: Tỉ số phần trăm",
        "type": "mcq",
        "question": "Lớp 5A có 40 học sinh, trong đó có 24 học sinh nữ. Tỉ số phần trăm của số học sinh nữ so với cả lớp là:",
        "options": ["A. 40%", "B. 50%", "C. 60%", "D. 70%"],
        "correct_answer": "C",
        "explanation": "Tỉ số phần trăm: (24 : 40) x 100% = 0,6 x 100% = 60%.",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 2: Tỉ số phần trăm",
        "type": "mcq",
        "question": "Một chiếc cặp sách có giá gốc 200 000 đồng, nay được giảm giá 15%. Số tiền được giảm giá là:",
        "options": ["A. 15 000 đồng", "B. 25 000 đồng", "C. 30 000 đồng", "D. 35 000 đồng"],
        "correct_answer": "C",
        "explanation": "Số tiền được giảm là: 200 000 x 15 : 100 = 30 000 (đồng).",
        "points": 1.0
    },

    # Chuyên đề 3: Đổi đơn vị đo đại lượng
    {
        "topic_category": "Chuyên đề 3: Đổi đơn vị đo",
        "type": "mcq",
        "question": "Điền số thích hợp vào chỗ chấm: 3 m² 45 dm² = ...... m²?",
        "options": ["A. 3,45", "B. 3,045", "C. 34,5", "D. 30,45"],
        "correct_answer": "A",
        "explanation": "Vì 1 m² = 100 dm² nên 45 dm² = 0,45 m². Vậy 3 m² 45 dm² = 3,45 m².",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 3: Đổi đơn vị đo",
        "type": "mcq",
        "question": "Điền số thích hợp vào chỗ chấm: 2 giờ 15 phút = ...... giờ?",
        "options": ["A. 2,15", "B. 2,25", "C. 2,3", "D. 2,5"],
        "correct_answer": "B",
        "explanation": "Đổi 15 phút = 15/60 giờ = 0,25 giờ. Do đó 2 giờ 15 phút = 2,25 giờ.",
        "points": 1.0
    },

    # Chuyên đề 4: Hình học phẳng
    {
        "topic_category": "Chuyên đề 4: Hình học phẳng",
        "type": "mcq",
        "question": "Một hình tam giác có độ dài đáy là 12 cm và chiều cao tương ứng là 8 cm. Diện tích tam giác đó là:",
        "options": ["A. 96 cm²", "B. 48 cm²", "C. 24 cm²", "D. 40 cm²"],
        "correct_answer": "B",
        "explanation": "Diện tích tam giác = (đáy x chiều cao) : 2 = (12 x 8) : 2 = 48 cm².",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 4: Hình học phẳng",
        "type": "mcq",
        "question": "Một hình tròn có đường kính d = 10 cm. Chu vi của hình tròn đó là:",
        "options": ["A. 31,4 cm", "B. 62,8 cm", "C. 78,5 cm", "D. 15,7 cm"],
        "correct_answer": "A",
        "explanation": "Chu vi hình tròn C = d x 3,14 = 10 x 3,14 = 31,4 cm.",
        "points": 1.0
    },

    # Chuyên đề 5: Hình học không gian
    {
        "topic_category": "Chuyên đề 5: Hình học không gian",
        "type": "mcq",
        "question": "Một hình lập phương có cạnh là 5 cm. Thể tích của hình lập phương đó là:",
        "options": ["A. 25 cm³", "B. 100 cm³", "C. 125 cm³", "D. 150 cm³"],
        "correct_answer": "C",
        "explanation": "Thể tích hình lập phương V = a x a x a = 5 x 5 x 5 = 125 cm³.",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 5: Hình học không gian",
        "type": "mcq",
        "question": "Một hình hộp chữ nhật có chiều dài 8 m, chiều rộng 5 m và chiều cao 3 m. Thể tích hình hộp là:",
        "options": ["A. 120 m³", "B. 40 m³", "C. 24 m³", "D. 160 m³"],
        "correct_answer": "A",
        "explanation": "Thể tích V = dài x rộng x cao = 8 x 5 x 3 = 120 m³.",
        "points": 1.0
    },

    # Chuyên đề 6: Toán chuyển động đều
    {
        "topic_category": "Chuyên đề 6: Chuyển động đều",
        "type": "mcq",
        "question": "Một xe máy đi trong 2,5 giờ được quãng đường 105 km. Vận tốc của xe máy đó là:",
        "options": ["A. 40 km/giờ", "B. 42 km/giờ", "C. 45 km/giờ", "D. 50 km/giờ"],
        "correct_answer": "B",
        "explanation": "Vận tốc v = s : t = 105 : 2,5 = 42 km/giờ.",
        "points": 1.0
    },
    {
        "topic_category": "Chuyên đề 6: Chuyển động đều",
        "type": "mcq",
        "question": "Một người chạy bộ với vận tốc 12 km/giờ trong thời gian 20 phút. Quãng đường người đó chạy được là:",
        "options": ["A. 240 km", "B. 6 km", "C. 4 km", "D. 8 km"],
        "correct_answer": "C",
        "explanation": "Đổi 20 phút = 1/3 giờ. Quãng đường s = v x t = 12 x 1/3 = 4 km.",
        "points": 1.0
    },

    # --- PHẦN 2: TỰ LUẬN (CÂU 7 ĐẾN CÂU 10) ---
    # Dạng 7: Tính thuận tiện
    {
        "topic_category": "Dạng 7: Tính thuận tiện",
        "type": "essay",
        "question": "Tính bằng cách thuận tiện nhất:\n   A = 3,45 × 4,8 + 3,45 × 5,2",
        "guide": "Áp dụng tính chất phân phối: a × b + a × c = a × (b + c). Chú ý tính tổng trong ngoặc tròn trước.",
        "reference_answer": "Lời giải chi tiết:\nA = 3,45 × (4,8 + 5,2)\nA = 3,45 × 10\nA = 34,5\nĐáp số: 34,5",
        "points": 1.0,
        "rubric": {
            "step1": "Áp dụng đúng tính chất phân phối: 3,45 × (4,8 + 5,2) (0.5 điểm)",
            "step2": "Tính đúng trong ngoặc = 10 và nhân ra 34,5 (0.5 điểm)"
        }
    },
    {
        "topic_category": "Dạng 7: Tính thuận tiện",
        "type": "essay",
        "question": "Tính giá trị biểu thức bằng cách hợp lý nhất:\n   B = 12,5 × 3,6 × 8",
        "guide": "Sử dụng tính chất giao hoán và kết hợp: ghép (12,5 × 8) để được số tròn trăm.",
        "reference_answer": "Lời giải chi tiết:\nB = (12,5 × 8) × 3,6\nB = 100 × 3,6\nB = 360\nĐáp số: 360",
        "points": 1.0,
        "rubric": {
            "step1": "Ghép (12,5 × 8) (0.5 điểm)",
            "step2": "Tính 100 × 3,6 = 360 (0.5 điểm)"
        }
    },

    # Dạng 8: Tỉ số phần trăm thực tế
    {
        "topic_category": "Dạng 8: Tỉ số phần trăm",
        "type": "essay",
        "question": "Một cửa hàng nhập về một chiếc xe đạp với giá vốn 1 200 000 đồng. Sau đó cửa hàng bán chiếc xe đó với lãi 20% so với giá vốn. Hỏi cửa hàng đã bán chiếc xe đạp đó với giá bao nhiêu tiền?",
        "guide": "Bước 1: Tính số tiền lãi (Giá vốn × 20 : 100). Bước 2: Giá bán = Giá vốn + Tiền lãi. Chú ý đơn vị 'đồng'.",
        "reference_answer": "Bài giải:\nSố tiền lãi cửa hàng thu được là:\n   1 200 000 × 20 : 100 = 240 000 (đồng)\nGiá bán của chiếc xe đạp đó là:\n   1 200 000 + 240 000 = 1 440 000 (đồng)\nĐáp số: 1 440 000 đồng.",
        "points": 1.0,
        "rubric": {
            "step1": "Tính số tiền lãi 240 000 đồng (0.5 điểm)",
            "step2": "Tính giá bán 1 440 000 đồng và ghi đúng đơn vị đồng (0.5 điểm, thiếu đơn vị trừ 0.25)"
        }
    },
    {
        "topic_category": "Dạng 8: Tỉ số phần trăm",
        "type": "essay",
        "question": "Bác An gửi tiết kiệm 50 000 000 đồng vào ngân hàng với lãi suất 6% một năm. Hỏi sau một năm, cả tiền gửi và tiền lãi của bác An nhận được là bao nhiêu tiền?",
        "guide": "Bước 1: Tính tiền lãi sau 1 năm (50 000 000 × 6 : 100). Bước 2: Tổng số tiền = Tiền gốc + Tiền lãi. Chú ý đơn vị 'đồng'.",
        "reference_answer": "Bài giải:\nSau một năm, số tiền lãi bác An nhận được là:\n   50 000 000 × 6 : 100 = 3 000 000 (đồng)\nSau một năm, cả tiền gửi và tiền lãi của bác An là:\n   50 000 000 + 3 000 000 = 53 000 000 (đồng)\nĐáp số: 53 000 000 đồng.",
        "points": 1.0,
        "rubric": {
            "step1": "Tính tiền lãi 3 000 000 đồng (0.5 điểm)",
            "step2": "Tính tổng tiền 53 000 000 đồng và đáp số kèm đơn vị (0.5 điểm)"
        }
    },

    # Dạng 9: Hình học thực tế
    {
        "topic_category": "Dạng 9: Hình học thực tế",
        "type": "essay",
        "question": "Một thửa ruộng hình thang có đáy lớn 120 m, đáy bé bằng 2/3 đáy lớn và chiều cao là 40 m.\na) Tính diện tích thửa ruộng đó?\nb) Biết rằng cứ 100 m² thì thu hoạch được 65 kg thóc. Hỏi trên cả thửa ruộng đó người ta thu hoạch được bao nhiêu tạ thóc?",
        "guide": "Bước 1: Đáy bé = 120 × 2/3. Bước 2: Diện tích = (đáy lớn + đáy bé) × chiều cao : 2 (đơn vị m²). Bước 3: Số thóc = Diện tích : 100 × 65 (kg). Bước 4: Đổi sang tạ (1 tạ = 100 kg).",
        "reference_answer": "Bài giải:\nĐáy bé của thửa ruộng là:\n   120 × 2/3 = 80 (m)\nDiện tích của thửa ruộng hình thang là:\n   (120 + 80) × 40 : 2 = 4000 (m²)\nSố thóc thu hoạch được trên thửa ruộng là:\n   4000 : 100 × 65 = 2600 (kg)\nĐổi: 2600 kg = 26 tạ\nĐáp số:\n   a) 4000 m²\n   b) 26 tạ thóc.",
        "points": 1.0,
        "rubric": {
            "step1": "Tính đáy bé và diện tích 4000 m² (0.5 điểm)",
            "step2": "Tính số thóc 2600 kg và đổi ra 26 tạ kèm đơn vị chính xác (0.5 điểm, sai đơn vị m² hay tạ trừ 0.25)"
        }
    },
    {
        "topic_category": "Dạng 9: Hình học thực tế",
        "type": "essay",
        "question": "Người ta quét sơn bên trong một căn phòng dạng hình hộp chữ nhật có chiều dài 7 m, chiều rộng 5 m và chiều cao 3,5 m (không quét sơn trần nhà và sàn nhà). Biết tổng diện tích các cửa sổ và cửa ra vào là 8,5 m².\nHãy tính diện tích cần quét sơn của căn phòng?",
        "guide": "Diện tích cần quét sơn = Diện tích xung quanh căn phòng - Diện tích các cửa. Công thức: S_xq = (dài + rộng) × 2 × chiều cao.",
        "reference_answer": "Bài giải:\nChu vi đáy căn phòng là:\n   (7 + 5) × 2 = 24 (m)\nDiện tích xung quanh của căn phòng là:\n   24 × 3,5 = 84 (m²)\nDiện tích cần quét sơn của căn phòng là:\n   84 - 8,5 = 75,5 (m²)\nĐáp số: 75,5 m².",
        "points": 1.0,
        "rubric": {
            "step1": "Tính diện tích xung quanh 84 m² (0.5 điểm)",
            "step2": "Trừ diện tích cửa ra 75,5 m² (0.5 điểm, bắt buộc đơn vị m²)"
        }
    },

    # Dạng 10: Chuyển động nâng cao
    {
        "topic_category": "Dạng 10: Chuyển động nâng cao",
        "type": "essay",
        "question": "Hai tỉnh A và B cách nhau 135 km. Lúc 7 giờ sáng, một ô tô đi từ A đến B với vận tốc 54 km/giờ, cùng lúc đó một xe máy đi từ B về A với vận tốc 36 km/giờ.\na) Hỏi sau bao lâu hai xe gặp nhau?\nb) Hai xe gặp nhau lúc mấy giờ?",
        "guide": "Chuyển động ngược chiều: Bước 1: Tính tổng vận tốc hai xe (km/giờ). Bước 2: Thời gian gặp nhau = Quãng đường : Tổng vận tốc (đơn vị giờ). Bước 3: Đổi sang giờ, phút. Bước 4: Thời điểm gặp = 7 giờ + thời gian đi.",
        "reference_answer": "Bài giải:\na) Sau mỗi giờ, cả ô tô và xe máy đi được quãng đường là:\n   54 + 36 = 90 (km)\nThời gian để hai xe gặp nhau là:\n   135 : 90 = 1,5 (giờ)\nĐổi: 1,5 giờ = 1 giờ 30 phút.\nb) Hai xe gặp nhau lúc:\n   7 giờ + 1 giờ 30 phút = 8 giờ 30 phút.\nĐáp số:\n   a) 1,5 giờ (hay 1 giờ 30 phút)\n   b) 8 giờ 30 phút.",
        "points": 1.0,
        "rubric": {
            "step1": "Tính thời gian gặp 1,5 giờ = 1 giờ 30 phút (0.5 điểm)",
            "step2": "Tính thời điểm gặp 8 giờ 30 phút kèm đơn vị thời gian (0.5 điểm)"
        }
    },
    {
        "topic_category": "Dạng 10: Chuyển động nâng cao",
        "type": "essay",
        "question": "Quãng đường sông từ bến A đến bến B dài 36 km. Một ca nô xuôi dòng từ A đến B hết 1,5 giờ. Biết vận tốc dòng nước là 3 km/giờ.\nHỏi vận tốc thực của ca nô (khi nước lặng) là bao nhiêu km/giờ?",
        "guide": "Vận tốc xuôi dòng = Quãng đường : Thời gian. Vận tốc thực của ca nô = Vận tốc xuôi dòng - Vận tốc dòng nước. Đơn vị: km/giờ.",
        "reference_answer": "Bài giải:\nVận tốc của ca nô khi xuôi dòng là:\n   36 : 1,5 = 24 (km/giờ)\nVận tốc thực của ca nô khi nước lặng là:\n   24 - 3 = 21 (km/giờ)\nĐáp số: 21 km/giờ.",
        "points": 1.0,
        "rubric": {
            "step1": "Tính vận tốc xuôi dòng 24 km/giờ (0.5 điểm)",
            "step2": "Tính vận tốc thực 21 km/giờ kèm đơn vị km/giờ (0.5 điểm)"
        }
    }
]
