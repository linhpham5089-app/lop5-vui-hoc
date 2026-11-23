"""
Cấu hình hệ thống, kho chủ đề lớp 5 và giao diện CSS cho Trợ lý Học tập Lớp 5.
"""

SUBJECTS = {
    "Toán": {
        "icon": "📐",
        "color": "#4A90E2",
        "bg_color": "#EBF3FB",
        "topics": [
            "Ôn tập và bổ sung về phân số, hỗn số",
            "Số thập phân và các phép tính với số thập phân",
            "Tỉ số phần trăm và giải toán tỉ số phần trăm",
            "Hình học: Diện tích hình tam giác, hình thang, hình tròn",
            "Hình học: Thể tích hình hộp chữ nhật, hình lập phương",
            "Toán chuyển động đều: Vận tốc, quãng đường, thời gian",
        ]
    },
    "Tiếng Việt": {
        "icon": "📖",
        "color": "#E67E22",
        "bg_color": "#FDF2E9",
        "topics": [
            "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
            "Luyện từ và câu: Đại từ, Quan hệ từ",
            "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
            "Tập làm văn: Lập dàn ý bài văn tả cảnh thiên nhiên",
            "Tập làm văn: Miêu tả người (thầy cô, người thân)",
            "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
        ]
    },
    "Tiếng Anh": {
        "icon": "🇬🇧",
        "color": "#27AE60",
        "bg_color": "#EAFAF1",
        "topics": [
            "🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)",
            "🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 2: Travelling and Holidays)",
            "🏆 [Cambridge Flyers] Dạng 1: Vocabulary & Definitions (Đoán từ vựng qua định nghĩa)",
            "🏆 [Cambridge Flyers] Dạng 2: Dialogue Completion (Hoàn thành hội thoại giao tiếp)",
            "🏆 [Cambridge Flyers] Dạng 3: Flyers Grammar (Ngữ pháp A2: Quá khứ, Hiện tại hoàn thành, Mệnh đề quan hệ)",
            "🏆 [Cambridge Flyers] Dạng 4: Story Reading & Cloze (Đọc hiểu đoạn văn & Chọn từ điền)",
            "🏆 [Cambridge Flyers] Dạng 5: Open Cloze (Tự suy luận và điền 1 từ chính xác)",
            "🏆 [Cambridge Flyers] Đề thi thử Tổng hợp A2 Flyers (Đủ 5 dạng bài chuẩn)",
            "Unit: School Things & Subjects (Môn học và dụng cụ trường học)",
            "Unit: Daily Routine & Free Time (Lịch trình hàng ngày và sở thích)",
            "Grammar: Present Simple vs Present Continuous",
            "Grammar: Past Simple with regular and irregular verbs",
            "Unit: Directions, Places & Cities (Hỏi đường và địa danh)",
            "Vocabulary: Weather and Future Plans (Thời tiết và dự định)",
        ]
    },
    "Tiếng Trung": {
        "icon": "🇨🇳",
        "color": "#C0392B",
        "bg_color": "#FDEDEC",
        "topics": [
            "🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)",
            "🎧 [YCT 2-3 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 2: Trường Học & Bạn Bè)",
            "Bính âm (Pinyin), Thanh điệu và quy tắc ghép âm cơ bản",
            "Chào hỏi, giới thiệu bản thân và xưng hô trong gia đình",
            "Số đếm từ 1-100, ngày tháng, thứ trong tuần và giờ giấc",
            "Đồ dùng học tập, màu sắc và sở thích cơ bản (喜欢, 学习)",
            "Hỏi giá cả và mua sắm đơn giản (多少钱, 苹果)",
            "Các nét chữ Hán cơ bản và thứ tự viết nét đúng chuẩn",
        ]
    }
}

DEFAULT_SCHEDULE = [
    {"day": "Thứ Hai", "subject": "Toán", "time": "19:30 - 20:30", "room": "Bàn học tại nhà", "topic": "Số thập phân"},
    {"day": "Thứ Ba", "subject": "Tiếng Việt", "time": "19:30 - 20:30", "room": "Bàn học tại nhà", "topic": "Luyện từ và câu: Đại từ"},
    {"day": "Thứ Tư", "subject": "Tiếng Anh", "time": "19:30 - 20:30", "room": "Bàn học tại nhà", "topic": "Past Simple Tense"},
    {"day": "Thứ Năm", "subject": "Tiếng Trung", "time": "19:30 - 20:30", "room": "Bàn học tại nhà", "topic": "Bính âm và Chào hỏi"},
    {"day": "Thứ Sáu", "subject": "Toán", "time": "19:30 - 20:30", "room": "Bàn học tại nhà", "topic": "Hình học & Thể tích"},
    {"day": "Thứ Bảy", "subject": "Tiếng Anh", "time": "09:00 - 10:00", "room": "Bàn học tại nhà", "topic": "Nghe nói phản xạ"},
    {"day": "Chủ Nhật", "subject": "Tiếng Việt", "time": "09:00 - 10:00", "room": "Bàn học tại nhà", "topic": "Tập làm văn miêu tả"},
]

KID_FRIENDLY_CSS = """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap');
    
    html, body, [class*="css"]  {
        font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        -webkit-font-smoothing: antialiased;
    }
    
    /* Tối ưu responsive container cho mọi màn hình (Điện thoại, iPad, Laptop) */
    .block-container {
        padding-top: 1.5rem !important;
        padding-bottom: 2rem !important;
        padding-left: 1.2rem !important;
        padding-right: 1.2rem !important;
        max-width: 1200px !important;
    }

    /* Thẻ giao diện dễ thương */
    .kid-card {
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border: 2px solid #F0F2F6;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .kid-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
    
    .badge-star {
        background: linear-gradient(135deg, #FFD166 0%, #FFB703 100%);
        color: #7A4100;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.9rem;
        display: inline-block;
    }
    
    .countdown-box {
        background: linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%);
        color: white;
        border-radius: 18px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
    }
    
    .highlight-answer {
        background-color: #E8F8F5;
        border-left: 5px solid #2ECC71;
        padding: 12px 16px;
        border-radius: 8px;
        margin: 10px 0;
    }
    
    .wrong-answer {
        background-color: #FDEDEC;
        border-left: 5px solid #E74C3C;
        padding: 12px 16px;
        border-radius: 8px;
        margin: 10px 0;
    }
    
    .tutor-avatar-box {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #F8F9FA;
        padding: 10px 16px;
        border-radius: 12px;
        border-left: 4px solid #3498DB;
        margin-bottom: 12px;
    }

    /* Tối ưu nút bấm cảm ứng lớn cho ngón tay trên điện thoại / iPad */
    button[kind="primary"], button[kind="secondary"], .stButton > button {
        border-radius: 12px !important;
        font-weight: 600 !important;
        min-height: 44px !important; /* Chuẩn Apple iOS touch target */
        font-size: 0.95rem !important;
        transition: all 0.15s ease-in-out !important;
    }

    /* Tương thích trình phát audio trên iOS Safari & Android */
    audio {
        width: 100% !important;
        height: 48px !important;
        border-radius: 24px !important;
        outline: none !important;
        margin: 6px 0 !important;
    }

    /* Responsive cho màn hình điện thoại dọc (< 768px) */
    @media (max-width: 768px) {
        .block-container {
            padding-left: 0.8rem !important;
            padding-right: 0.8rem !important;
        }
        h1 {
            font-size: 1.6rem !important;
        }
        h2 {
            font-size: 1.35rem !important;
        }
        h3 {
            font-size: 1.15rem !important;
        }
        .kid-card {
            padding: 14px !important;
            border-radius: 12px !important;
        }
        /* Nút bấm full width tiện bấm bằng ngón tay cái */
        .stButton > button {
            width: 100% !important;
        }
    }
</style>
"""
