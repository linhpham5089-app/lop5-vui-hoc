"""
Quản lý cơ sở dữ liệu SQLite nâng cao cho ứng dụng Lớp 5 Vui Học.
Hỗ trợ:
1. question_bank: Ngân hàng câu hỏi tập trung cho cả 4 môn.
2. study_sessions: Quản lý từng phiên làm bài (in_progress, completed).
3. session_answers: Lưu nháp tức thì và kết quả chấm của từng câu hỏi.
4. Bảo toàn nguyên vẹn dữ liệu cũ (schedules, quiz_history, tutor_chat, math_seed, flyers_seed).
"""

import sqlite3
import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from config import DEFAULT_SCHEDULE
from flyers_data import FLYERS_SEED_DATA
from math_data import MATH_SEED_DATA
from riddles_data import FUN_RIDDLES_SEED_DATA

DB_PATH = Path(__file__).parent / "study_tracker.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Bảng thời khóa biểu
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_of_week TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        subject TEXT NOT NULL,
        topic TEXT,
        room TEXT
    )
    """)

    # 2. Bảng lịch sử bài tập & điểm số (dữ liệu cũ & tổng hợp)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        score REAL NOT NULL,
        mcq_correct INTEGER NOT NULL,
        mcq_total INTEGER NOT NULL,
        essay_score REAL NOT NULL,
        essay_total REAL NOT NULL,
        ai_feedback TEXT,
        details_json TEXT
    )
    """)

    # 3. Bảng lịch sử trò chuyện gia sư AI
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tutor_chat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL
    )
    """)

    # 4. Bảng Cambridge Flyers cũ
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS flyers_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        question TEXT NOT NULL,
        options_json TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        explanation TEXT NOT NULL,
        grammar_clue TEXT,
        encouragement TEXT
    )
    """)

    # 5. Bảng Toán Lớp 5 cũ
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS math_seed_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_category TEXT NOT NULL,
        type TEXT NOT NULL,
        question TEXT NOT NULL,
        options_json TEXT,
        correct_answer TEXT NOT NULL,
        explanation TEXT NOT NULL,
        guide TEXT,
        reference_answer TEXT,
        points REAL DEFAULT 1.0
    )
    """)

    # =========================================================================
    # 6. CÁC BẢNG MỚI NÂNG CẤP (THEO YÊU CẦU 1)
    # =========================================================================

    # Bảng question_bank: Lưu toàn bộ câu hỏi tập trung của 4 môn
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS question_bank (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        question_type TEXT NOT NULL, -- 'mcq' hoặc 'essay'
        content TEXT NOT NULL,
        options_json TEXT,
        correct_answer TEXT NOT NULL,
        explanation TEXT,
        guide TEXT,
        points REAL DEFAULT 1.0,
        grammar_clue TEXT,
        encouragement TEXT,
        created_at TEXT NOT NULL
    )
    """)

    # Bảng study_sessions: Quản lý từng lần làm bài (in_progress, completed)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS study_sessions (
        session_id TEXT PRIMARY KEY,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        status TEXT NOT NULL, -- 'in_progress' hoặc 'completed'
        total_questions INTEGER NOT NULL,
        score REAL DEFAULT 0.0,
        started_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT
    )
    """)

    # Bảng session_answers: Lưu chi tiết câu hỏi & câu trả lời (lưu nháp & chấm điểm)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS session_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        question_id INTEGER NOT NULL,
        question_order INTEGER NOT NULL,
        user_answer TEXT DEFAULT '',
        is_correct INTEGER DEFAULT 0,
        ai_score REAL DEFAULT 0.0,
        ai_feedback TEXT,
        unit_warning TEXT,
        grammar_clue TEXT,
        encouragement TEXT,
        FOREIGN KEY (session_id) REFERENCES study_sessions(session_id),
        FOREIGN KEY (question_id) REFERENCES question_bank(id)
    )
    """)

    # Bảng daily_assignments: Quản lý bài tập được giao theo từng ngày
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS daily_assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assigned_date TEXT NOT NULL, -- Định dạng YYYY-MM-DD
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        session_id TEXT,
        status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
        score REAL DEFAULT 0.0,
        completed_at TEXT
    )
    """)

    # Bảng fun_riddles: Đố Vui Trí Tuệ & Giải Trí
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS fun_riddles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL, -- 'Đố mẹo', 'Đố chữ', 'Toán logic', 'Khoa học vui', 'Đố vui Tiếng Anh'
        question TEXT NOT NULL,
        hint TEXT,
        answer TEXT NOT NULL,
        explanation TEXT,
        is_solved INTEGER DEFAULT 0, -- 0: chưa giải, 1: đã giải đúng
        solved_at TEXT,
        created_at TEXT
    )
    """)

    conn.commit()

    # Di trú các cột bổ sung cho question_bank (Hỗ trợ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết)
    for col, col_type in [
        ("skill", "TEXT"),
        ("audio_text", "TEXT"),
        ("audio_prompt", "TEXT"),
        ("phonetics_guide", "TEXT"),
        ("pinyin", "TEXT"),
        ("vietnamese_meaning", "TEXT")
    ]:
        try:
            cursor.execute(f"ALTER TABLE question_bank ADD COLUMN {col} {col_type}")
        except Exception:
            pass

    # Di trú các cột bổ sung cho session_answers (Hỗ trợ 4 Kỹ Năng)
    for col, col_type in [
        ("skill", "TEXT"),
        ("audio_transcription", "TEXT"),
        ("phonetic_analysis", "TEXT")
    ]:
        try:
            cursor.execute(f"ALTER TABLE session_answers ADD COLUMN {col} {col_type}")
        except Exception:
            pass

    conn.commit()

    # Nạp dữ liệu mặc định thời khóa biểu
    cursor.execute("SELECT COUNT(*) FROM schedules")
    if cursor.fetchone()[0] == 0:
        for s in DEFAULT_SCHEDULE:
            parts = s["time"].split(" - ")
            start_t = parts[0].strip()
            end_t = parts[1].strip() if len(parts) > 1 else "20:30"
            cursor.execute("""
                INSERT INTO schedules (day_of_week, start_time, end_time, subject, topic, room)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (s["day"], start_t, end_t, s["subject"], s["topic"], s["room"]))
        conn.commit()

    # Nạp Seed Data Flyers nếu bảng rỗng
    cursor.execute("SELECT COUNT(*) FROM flyers_questions")
    if cursor.fetchone()[0] == 0:
        for q in FLYERS_SEED_DATA:
            cursor.execute("""
                INSERT INTO flyers_questions (category, type, question, options_json, correct_answer, explanation, grammar_clue, encouragement)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                q["category"], q["type"], q["question"],
                json.dumps(q["options"], ensure_ascii=False),
                q["correct_answer"], q["explanation"],
                q.get("grammar_clue", ""), q.get("encouragement", "")
            ))
        conn.commit()

    # Nạp Seed Data Toán nếu bảng rỗng
    cursor.execute("SELECT COUNT(*) FROM math_seed_questions")
    if cursor.fetchone()[0] == 0:
        for q in MATH_SEED_DATA:
            cursor.execute("""
                INSERT INTO math_seed_questions (topic_category, type, question, options_json, correct_answer, explanation, guide, reference_answer, points)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                q["topic_category"], q["type"], q["question"],
                json.dumps(q.get("options", []), ensure_ascii=False),
                q.get("correct_answer", q.get("reference_answer", "")),
                q.get("explanation", ""), q.get("guide", ""),
                q.get("reference_answer", q.get("correct_answer", "")),
                q.get("points", 1.0)
            ))
        conn.commit()

    # Nạp Seed Data fun_riddles nếu bảng rỗng
    cursor.execute("SELECT COUNT(*) FROM fun_riddles")
    if cursor.fetchone()[0] == 0:
        now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        for r in FUN_RIDDLES_SEED_DATA:
            cursor.execute("""
                INSERT INTO fun_riddles (category, question, hint, answer, explanation, is_solved, created_at)
                VALUES (?, ?, ?, ?, ?, 0, ?)
            """, (
                r["category"], r["question"], r.get("hint", ""),
                r["answer"], r.get("explanation", ""), now_time
            ))
        conn.commit()

    # =========================================================================
    # NẠP DỮ LIỆU TẬP TRUNG VÀO question_bank TỪ TOÁN, TIẾNG ANH, TIẾNG VIỆT, TIẾNG TRUNG
    # =========================================================================
    cursor.execute("SELECT COUNT(*) FROM question_bank")
    if cursor.fetchone()[0] == 0:
        now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 1. Nạp từ MATH_SEED_DATA
        for q in MATH_SEED_DATA:
            cursor.execute("""
                INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                "Toán", q["topic_category"], q["type"], q["question"],
                json.dumps(q.get("options", []), ensure_ascii=False),
                q.get("correct_answer", q.get("reference_answer", "")),
                q.get("explanation", ""), q.get("guide", ""),
                q.get("points", 1.0), now_time
            ))

        # 2. Nạp từ FLYERS_SEED_DATA
        for q in FLYERS_SEED_DATA:
            cursor.execute("""
                INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, grammar_clue, encouragement, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                "Tiếng Anh", q["category"], q["type"], q["question"],
                json.dumps(q["options"], ensure_ascii=False),
                q["correct_answer"], q["explanation"], q.get("grammar_clue", ""),
                1.0 if q["type"] == "essay" else 2.0,
                q.get("grammar_clue", ""), q.get("encouragement", ""), now_time
            ))

        # 3. Nạp các câu hỏi mẫu Tiếng Việt
        tv_questions = [
            {
                "topic": "Đại từ & Quan hệ từ",
                "type": "mcq",
                "question": "Trong câu 'Nam rất chăm chỉ, cậu ấy luôn đạt điểm cao', từ 'cậu ấy' dùng để thay thế cho từ nào?",
                "options": ["A. chăm chỉ", "B. Nam", "C. điểm cao", "D. lớp học"],
                "correct_answer": "B",
                "explanation": "'cậu ấy' là đại từ xưng hô dùng thay thế cho danh từ riêng 'Nam' để tránh lặp từ."
            },
            {
                "topic": "Đại từ & Quan hệ từ",
                "type": "mcq",
                "question": "Cặp quan hệ từ nào trong các đáp án sau biểu thị quan hệ 'Nguyên nhân - Kết quả'?",
                "options": ["A. Tuy... nhưng...", "B. Nếu... thì...", "C. Vì... nên...", "D. Chẳng những... mà còn..."],
                "correct_answer": "C",
                "explanation": "Cặp 'Vì... nên...' thể hiện nguyên nhân và kết quả dẫn tới."
            },
            {
                "topic": "Mở rộng vốn từ",
                "type": "mcq",
                "question": "Từ nào sau đây đồng nghĩa với từ 'Tổ quốc'?",
                "options": ["A. Quê hương", "B. Xóm làng", "C. Giang sơn", "D. Đồng bào"],
                "correct_answer": "C",
                "explanation": "'Giang sơn' đồng nghĩa với đất nước, Tổ quốc."
            },
            {
                "topic": "Từ loại",
                "type": "mcq",
                "question": "Trong câu 'Mặt trời tỏa ánh nắng rực rỡ', từ 'rực rỡ' thuộc từ loại nào?",
                "options": ["A. Danh từ", "B. Động từ", "C. Tính từ", "D. Đại từ"],
                "correct_answer": "C",
                "explanation": "'Rực rỡ' là tính từ miêu tả đặc điểm, màu sắc tươi sáng."
            },
            {
                "topic": "Thành ngữ & Tục ngữ",
                "type": "mcq",
                "question": "Thành ngữ nào sau đây nói về truyền thống đoàn kết của dân tộc ta?",
                "options": ["A. Uống nước nhớ nguồn", "B. Lá lành đùm lá rách", "C. Ăn quả nhớ kẻ trồng cây", "D. Học đi đôi với hành"],
                "correct_answer": "B",
                "explanation": "'Lá lành đùm lá rách' khuyên con người biết yêu thương, đùm bọc, giúp đỡ lẫn nhau."
            },
            {
                "topic": "Tập làm văn miêu tả",
                "type": "essay",
                "question": "Em hãy đặt một câu ghép có sử dụng cặp quan hệ từ biểu thị quan hệ tương phản (Tuy... nhưng...) nói về tinh thần vượt khó trong học tập.",
                "guide": "Cần có hai vế câu có quan hệ tương phản, nối bởi cặp từ 'Tuy... nhưng...'.",
                "correct_answer": "Ví dụ: 'Tuy hoàn cảnh gia đình còn nhiều khó khăn, nhưng bạn Nam vẫn luôn nỗ lực vươn lên đạt danh hiệu học sinh xuất sắc.'"
            },
            {
                "topic": "Tập làm văn miêu tả",
                "type": "essay",
                "question": "Viết một đoạn văn ngắn (từ 3 đến 4 câu) tả vẻ đẹp của buổi sáng sớm ở quê hương em, trong đó có sử dụng 1 hình ảnh so sánh.",
                "guide": "Đoạn văn có 3-4 câu, đúng chủ đề buổi sáng và có chứa biện pháp so sánh (như, là, tựa...).",
                "correct_answer": "Mỗi sớm mai thức dậy, làng quê em như được khoác lên mình một tấm áo sương mỏng manh. Giọt sương long lanh như những hạt ngọc trời ban tặng. Chim cất tiếng hót chào ngày mới ngập tràn sức sống."
            }
        ]
        for q in tv_questions:
            cursor.execute("""
                INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                "Tiếng Việt", q["topic"], q["type"], q["question"],
                json.dumps(q.get("options", []), ensure_ascii=False),
                q["correct_answer"], q.get("explanation", ""), q.get("guide", ""),
                2.0, now_time
            ))

        # 4. Nạp các câu hỏi mẫu Tiếng Trung
        zh_questions = [
            {
                "topic": "Bính âm và Chào hỏi",
                "type": "mcq",
                "question": "Từ '你好' (Nǐ hǎo) trong tiếng Trung có nghĩa là gì?",
                "options": ["A. Tạm biệt", "B. Cảm ơn", "C. Xin chào", "D. Xin lỗi"],
                "correct_answer": "C",
                "explanation": "你好 (Nǐ hǎo) có nghĩa là 'Xin chào'."
            },
            {
                "topic": "Số đếm & Ngày tháng",
                "type": "mcq",
                "question": "Số '8' trong tiếng Trung phát âm là gì?",
                "options": ["A. Yī (一)", "B. Sān (三)", "C. Wǔ (五)", "D. Bā (八)"],
                "correct_answer": "D",
                "explanation": "Số 8 viết là 八, phát âm là 'bā'."
            },
            {
                "topic": "Giao tiếp cơ bản",
                "type": "mcq",
                "question": "Khi người khác nói '谢谢' (Xièxie - Cảm ơn), em nên đáp lại bằng câu nào lịch sự nhất?",
                "options": ["A. 不客气 (Bú kèqi)", "B. 再见 (Zàijiàn)", "C. 对不起 (Duìbuqǐ)", "D. 没关系 (Méi guānxi)"],
                "correct_answer": "A",
                "explanation": "Đáp lại lời cảm ơn dùng '不客气' (Không có chi)."
            },
            {
                "topic": "Giới thiệu bản thân",
                "type": "essay",
                "question": "Em hãy viết câu giới thiệu tên của mình bằng tiếng Trung kèm phiên âm Pinyin (Ví dụ: 我叫... - Wǒ jiào...).",
                "guide": "Sử dụng cấu trúc: 我叫 + [Tên em] (Phiên âm: Wǒ jiào...).",
                "correct_answer": "Ví dụ: 我叫明。(Wǒ jiào Míng - Tôi tên là Minh)."
            },
            {
                "topic": "Số đếm & Ngày tháng",
                "type": "essay",
                "question": "Hãy viết phiên âm Pinyin có thanh điệu cho các số đếm sau: 1, 2, 3, 4, 5.",
                "guide": "Số 1: yī, Số 2: èr, Số 3: sān, Số 4: sì, Số 5: wǔ.",
                "correct_answer": "1: yī, 2: èr, 3: sān, 4: sì, 5: wǔ."
            }
        ]
        for q in zh_questions:
            cursor.execute("""
                INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                "Tiếng Trung", q["topic"], q["type"], q["question"],
                json.dumps(q.get("options", []), ensure_ascii=False),
                q["correct_answer"], q.get("explanation", ""), q.get("guide", ""),
                2.0, now_time
            ))

        conn.commit()

    # Nạp dữ liệu 4 Kỹ Năng (Nghe - Nói - Đọc - Viết) vào question_bank
    from four_skills_data import FOUR_SKILLS_DATA
    for q in FOUR_SKILLS_DATA:
        exists = cursor.execute("SELECT id FROM question_bank WHERE content = ?", (q["content"],)).fetchone()
        if not exists:
            cursor.execute("""
                INSERT INTO question_bank (
                    subject, topic, question_type, content, options_json, 
                    correct_answer, explanation, guide, points, grammar_clue, 
                    encouragement, skill, audio_text, audio_prompt, phonetics_guide, 
                    pinyin, vietnamese_meaning, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                q["subject"], q["topic"], q["question_type"], q["content"],
                json.dumps(q.get("options", []), ensure_ascii=False),
                q["correct_answer"], q.get("explanation", ""), q.get("guide", ""),
                q.get("points", 2.5), q.get("grammar_clue", ""),
                q.get("encouragement", ""), q.get("skill", ""),
                q.get("audio_text", ""), q.get("audio_prompt", ""),
                q.get("phonetics_guide", ""), q.get("pinyin", ""),
                q.get("vietnamese_meaning", ""), datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            ))
    conn.commit()

    # Nạp các bài tập hoàn thành mẫu nếu cần để học sinh/phụ huynh có thể xem lại ngay lập tức
    seed_completed_sessions_if_needed(conn)

    conn.close()


def seed_completed_sessions_if_needed(existing_conn=None):
    """Tự động nạp các bài tập mẫu đã hoàn thành cho 4 môn nếu chưa có, giúp học sinh và phụ huynh xem lại ngay."""
    conn = existing_conn if existing_conn else get_connection()

    # 1. Kiểm tra Tiếng Anh (Cambridge Flyers)
    flyers_done = conn.execute("SELECT COUNT(*) FROM study_sessions WHERE subject = 'Tiếng Anh' AND status = 'completed'").fetchone()[0]
    if flyers_done == 0:
        flyers_sess_id = "sess_flyers_completed_sample"
        flyers_q = conn.execute("SELECT * FROM question_bank WHERE subject = 'Tiếng Anh' ORDER BY id ASC LIMIT 5").fetchall()
        if len(flyers_q) >= 5:
            conn.execute("""
                INSERT OR IGNORE INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                VALUES (?, 'Tiếng Anh', 'Luyện thi Cambridge Flyers (Tổng hợp 5 dạng)', 'completed', 5, 9.0, '2026-11-22 20:00:00', '2026-11-22 20:25:00', '2026-11-22 20:25:00')
            """, (flyers_sess_id,))
            
            sample_answers = [
                ("A. vet", 1, 2.0, "Chính xác! Bác sĩ thú y (vet) chăm sóc động vật bị ốm.", "look after sick animals -> vet", "Em nhớ từ vựng rất chuẩn xác!"),
                ("B. I went to the cinema.", 1, 2.0, "Đáp lại câu hỏi về hoạt động cuối tuần bằng thì Quá khứ đơn rất chuẩn xác.", "Where did you go? -> I went to...", "Giao tiếp rất tự nhiên!"),
                ("C. has eaten", 1, 2.0, "Sử dụng đúng thì Hiện tại hoàn thành với 'already'.", "already -> Present Perfect", "Nắm chắc cấu trúc ngữ pháp A2!"),
                ("B. beautiful", 1, 2.0, "Chọn đúng tính từ miêu tả cảnh vật trong đoạn văn.", "context clue: weather", "Đọc hiểu rất tốt!"),
                ("at", 1, 1.0, "Điền đúng giới từ 'at' đi cùng giờ (at 7 o'clock).", "at + specific time", "Điền từ không gợi ý (Open Cloze) rất xuất sắc!")
            ]
            for order, (q_row, ans_info) in enumerate(zip(flyers_q, sample_answers), 1):
                conn.execute("""
                    INSERT OR IGNORE INTO session_answers (session_id, question_id, question_order, user_answer, is_correct, ai_score, ai_feedback, grammar_clue, encouragement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (flyers_sess_id, q_row["id"], order, ans_info[0], ans_info[1], ans_info[2], ans_info[3], ans_info[4], ans_info[5]))

    # 2. Kiểm tra Tiếng Việt
    tv_done = conn.execute("SELECT COUNT(*) FROM study_sessions WHERE subject = 'Tiếng Việt' AND status = 'completed'").fetchone()[0]
    if tv_done == 0:
        tv_sess_id = "sess_tiengviet_completed_sample"
        tv_q = conn.execute("SELECT * FROM question_bank WHERE subject = 'Tiếng Việt' ORDER BY id ASC LIMIT 5").fetchall()
        if len(tv_q) >= 5:
            conn.execute("""
                INSERT OR IGNORE INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                VALUES (?, 'Tiếng Việt', 'Đại từ & Quan hệ từ', 'completed', 5, 8.5, '2026-11-21 19:30:00', '2026-11-21 19:50:00', '2026-11-21 19:50:00')
            """, (tv_sess_id,))
            
            sample_answers_tv = [
                ("B. Nam", 1, 2.0, "Đúng rồi, 'cậu ấy' thay thế cho danh từ riêng 'Nam' đứng trước.", "", "Nhận biết đại từ rất tốt!"),
                ("C. Vì... nên...", 1, 2.0, "Chính xác, cặp từ 'Vì... nên...' biểu thị quan hệ Nguyên nhân - Kết quả.", "", "Nắm chắc cặp quan hệ từ!"),
                ("C. Giang sơn", 1, 2.0, "'Giang sơn' đồng nghĩa với Tổ quốc, giang sơn gấm vóc.", "", "Vốn từ phong phú lắm!"),
                ("Tuy nhà bạn Nam ở xa trường, nhưng bạn ấy chưa bao giờ đi học muộn.", 1, 1.5, "Câu ghép đủ 2 vế biểu thị quan hệ tương phản, đúng ngữ pháp. Cần thêm dấu chấm câu ở cuối nhé.", "", "Diễn đạt lưu loát, ý tứ rõ ràng!"),
                ("Buổi sáng ở làng quê em thật yên bình. Mặt trời như chiếc mâm đồng đỏ ối nhô lên sau lũy tre làng. Từng giọt sương mai long lanh như những hạt ngọc.", 1, 1.0, "Đoạn văn 3 câu giàu hình ảnh, sử dụng thành công 2 hình ảnh so sánh 'như chiếc mâm đồng' và 'như những hạt ngọc'.", "", "Văn phong mượt mà, giàu cảm xúc!")
            ]
            for order, (q_row, ans_info) in enumerate(zip(tv_q, sample_answers_tv), 1):
                conn.execute("""
                    INSERT OR IGNORE INTO session_answers (session_id, question_id, question_order, user_answer, is_correct, ai_score, ai_feedback, grammar_clue, encouragement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (tv_sess_id, q_row["id"], order, ans_info[0], ans_info[1], ans_info[2], ans_info[3], ans_info[4], ans_info[5]))

    # 3. Kiểm tra Tiếng Trung
    zh_done = conn.execute("SELECT COUNT(*) FROM study_sessions WHERE subject = 'Tiếng Trung' AND status = 'completed'").fetchone()[0]
    if zh_done == 0:
        zh_sess_id = "sess_tiengtrung_completed_sample"
        zh_q = conn.execute("SELECT * FROM question_bank WHERE subject = 'Tiếng Trung' ORDER BY id ASC LIMIT 5").fetchall()
        if len(zh_q) >= 5:
            conn.execute("""
                INSERT OR IGNORE INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                VALUES (?, 'Tiếng Trung', 'Bính âm và Chào hỏi', 'completed', 5, 9.5, '2026-11-22 20:45:00', '2026-11-22 21:05:00', '2026-11-22 21:05:00')
            """, (zh_sess_id,))
            
            sample_answers_zh = [
                ("C. Xin chào", 1, 2.0, "你好 (Nǐ hǎo) có nghĩa là 'Xin chào'.", "", "Phát âm và nhớ nghĩa rất chuẩn!"),
                ("D. Bā (八)", 1, 2.0, "Số 8 phát âm là 'bā', thanh 1.", "", "Nhớ thanh điệu rất tốt!"),
                ("A. 不客气 (Bú kèqi)", 1, 2.0, "Đáp lại lời cảm ơn 谢谢 bằng 不客气 là chuẩn mực lịch sự nhất.", "", "Giao tiếp tự tin nhé!"),
                ("我叫小明。(Wǒ jiào Xiǎomíng).", 1, 2.0, "Cấu trúc câu hoàn chỉnh, có phiên âm Pinyin đúng thanh điệu.", "", "Viết câu tiếng Trung rất đẹp!"),
                ("1: yī, 2: èr, 3: sān, 4: sì, 5: wǔ", 1, 1.5, "Đúng cả 5 số và thanh điệu tương ứng.", "", "Nắm chắc hệ thống số đếm!")
            ]
            for order, (q_row, ans_info) in enumerate(zip(zh_q, sample_answers_zh), 1):
                conn.execute("""
                    INSERT OR IGNORE INTO session_answers (session_id, question_id, question_order, user_answer, is_correct, ai_score, ai_feedback, grammar_clue, encouragement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (zh_sess_id, q_row["id"], order, ans_info[0], ans_info[1], ans_info[2], ans_info[3], ans_info[4], ans_info[5]))

    # 4. Kiểm tra đề 4 Kỹ Năng Tiếng Anh (Cambridge Flyers)
    en_4s_done = conn.execute("SELECT COUNT(*) FROM study_sessions WHERE subject = 'Tiếng Anh' AND topic LIKE '%4 Kỹ Năng%' AND status = 'completed'").fetchone()[0]
    if en_4s_done == 0:
        sess_4s_en = "sess_en_4skills_sample"
        q_4s_en = conn.execute("SELECT * FROM question_bank WHERE subject = 'Tiếng Anh' AND topic LIKE '%A Day at the Zoo%' ORDER BY CASE skill WHEN 'listening' THEN 1 WHEN 'speaking' THEN 2 WHEN 'reading' THEN 3 WHEN 'writing' THEN 4 ELSE 5 END, id ASC").fetchall()
        if len(q_4s_en) >= 4:
            conn.execute("""
                INSERT OR IGNORE INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                VALUES (?, 'Tiếng Anh', 'Cambridge Flyers: A Day at the Zoo (4 Kỹ Năng)', 'completed', 4, 10.0, '2026-11-23 09:00:00', '2026-11-23 09:30:00', '2026-11-23 09:30:00')
            """, (sess_4s_en,))
            
            sample_answers_4s_en = [
                ("B", 1, 2.5, "Nghe chính xác chi tiết Helen yêu thích nhất chú kangaroo con.", "", "Kỹ năng nghe xuất sắc! 🎧", "", "", "listening"),
                ("Yesterday, I visited the zoo with my family and saw many wild animals.", 1, 2.5, "Phát âm rõ ràng các âm đuôi /ɪd/ trong 'visited' và /z/ trong 'animals'. Ngữ điệu câu chuẩn Anh - Anh.", "", "Giọng đọc rất tự tin! 🎙️", "Yesterday, I visited the zoo with my family and saw many wild animals.", "Âm đuôi và trọng âm chuẩn Cambridge A2.", "speaking"),
                ("B", 1, 2.5, "Đọc hiểu và trích xuất đúng lý do lạc đà đi dễ dàng trên cát nóng (chân to và phẳng).", "", "Đọc hiểu tuyệt vời! 📖", "", "", "reading"),
                ("We should protect animals because they are endangered.", 1, 2.5, "Sắp xếp câu đúng 100% ngữ pháp và cấu trúc should + V.", "", "Viết câu hoàn hảo! ✍️", "", "", "writing")
            ]
            for order, (q_row, ans_info) in enumerate(zip(q_4s_en, sample_answers_4s_en), 1):
                conn.execute("""
                    INSERT OR IGNORE INTO session_answers (
                        session_id, question_id, question_order, user_answer, 
                        is_correct, ai_score, ai_feedback, grammar_clue, 
                        encouragement, audio_transcription, phonetic_analysis, skill
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    sess_4s_en, q_row["id"], order, ans_info[0], 
                    ans_info[1], ans_info[2], ans_info[3], ans_info[4], 
                    ans_info[5], ans_info[6], ans_info[7], ans_info[8]
                ))

    # 5. Kiểm tra đề 4 Kỹ Năng Tiếng Trung (YCT / HSK)
    zh_4s_done = conn.execute("SELECT COUNT(*) FROM study_sessions WHERE subject = 'Tiếng Trung' AND topic LIKE '%4 Kỹ Năng%' AND status = 'completed'").fetchone()[0]
    if zh_4s_done == 0:
        sess_4s_zh = "sess_zh_4skills_sample"
        q_4s_zh = conn.execute("SELECT * FROM question_bank WHERE subject = 'Tiếng Trung' AND topic LIKE '%Gia Đình%' ORDER BY CASE skill WHEN 'listening' THEN 1 WHEN 'speaking' THEN 2 WHEN 'reading' THEN 3 WHEN 'writing' THEN 4 ELSE 5 END, id ASC").fetchall()
        if len(q_4s_zh) >= 4:
            conn.execute("""
                INSERT OR IGNORE INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                VALUES (?, 'Tiếng Trung', 'Tiếng Trung YCT 1-2: Gia Đình & Sở Thích (4 Kỹ Năng)', 'completed', 4, 10.0, '2026-11-23 10:00:00', '2026-11-23 10:25:00', '2026-11-23 10:25:00')
            """, (sess_4s_zh,))
            
            sample_answers_4s_zh = [
                ("B. 四口人 (Sì kǒu rén - 4 người)", 1, 2.5, "Nghe chuẩn số lượng thành viên trong gia đình: 4 người (bố, mẹ, anh trai, tôi).", "", "Nghe hiểu tiếng Trung rất tốt! 🎧", "", "", "listening"),
                ("我家有四口人，我爱我的爸爸妈妈。", 1, 2.5, "Thanh 4 trong 'sì', 'ài', 'bà' phát âm dứt khoát chuẩn xác, thanh 1 trong 'mā' kéo dài tự nhiên.", "", "Phát âm thanh điệu rất chuẩn! 🎙️", "我家有四口人，我爱我的爸爸妈妈。(Wǒ jiā yǒu sì kǒu rén, wǒ ài wǒ de bàba māma.)", "4 thanh điệu chuẩn YCT/HSK.", "speaking"),
                ("B. 公园 (Gōngyuán - Công viên)", 1, 2.5, "Đọc hiểu đoạn văn nhận diện đúng chữ Hán 公园 (công viên).", "", "Kỹ năng đọc chữ Hán xuất sắc! 📖", "", "", "reading"),
                ("我喜欢吃苹果。 (Wǒ xǐhuan chī píngguǒ.)", 1, 2.5, "Sắp xếp câu chuẩn trật tự ngữ pháp tiếng Trung S + 喜欢 + V + O.", "", "Ngữ pháp tiếng Trung vững vàng! ✍️", "", "", "writing")
            ]
            for order, (q_row, ans_info) in enumerate(zip(q_4s_zh, sample_answers_4s_zh), 1):
                conn.execute("""
                    INSERT OR IGNORE INTO session_answers (
                        session_id, question_id, question_order, user_answer, 
                        is_correct, ai_score, ai_feedback, grammar_clue, 
                        encouragement, audio_transcription, phonetic_analysis, skill
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    sess_4s_zh, q_row["id"], order, ans_info[0], 
                    ans_info[1], ans_info[2], ans_info[3], ans_info[4], 
                    ans_info[5], ans_info[6], ans_info[7], ans_info[8]
                ))

    conn.commit()
    if not existing_conn:
        conn.close()


# =========================================================================
# QUẢN LÝ QUESTION BANK & CÁC HÀM TRUY VẤN
# =========================================================================

def add_questions_to_bank(subject: str, topic: str, questions: list):
    """Lưu thêm các câu hỏi mới vào question_bank (tránh trùng lặp nội dung)."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    added_ids = []
    for q in questions:
        # Kiểm tra trùng nội dung
        existing = conn.execute("SELECT id FROM question_bank WHERE content = ?", (q["question"],)).fetchone()
        if existing:
            added_ids.append(existing["id"])
            continue
        
        cur = conn.execute("""
            INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, grammar_clue, encouragement, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            subject, topic, q["type"], q["question"],
            json.dumps(q.get("options", []), ensure_ascii=False),
            q.get("correct_answer", q.get("reference_answer", "")),
            q.get("explanation", ""), q.get("guide", ""),
            q.get("points", 1.0), q.get("grammar_clue", ""),
            q.get("encouragement", ""), now_time
        ))
        added_ids.append(cur.lastrowid)
    conn.commit()
    conn.close()
    return added_ids

def get_unattempted_questions(subject: str, topic: str = None, count: int = 10):
    """
    Truy vấn các câu hỏi chưa từng làm hoặc làm cách đây xa nhất từ question_bank.
    Ưu tiên các câu hỏi chưa có trong session_answers.
    Sắp xếp chuẩn 4 kỹ năng (Nghe -> Nói -> Đọc -> Viết).
    """
    conn = get_connection()
    skill_order = "CASE skill WHEN 'listening' THEN 1 WHEN 'speaking' THEN 2 WHEN 'reading' THEN 3 WHEN 'writing' THEN 4 ELSE 5 END"
    
    # Danh sách ID các câu đã làm trong session_answers
    attempted_rows = conn.execute("SELECT DISTINCT question_id FROM session_answers").fetchall()
    attempted_ids = [r["question_id"] for r in attempted_rows]

    # Kiểm tra xem có phải yêu cầu bộ đề 4 kỹ năng không
    is_4skills_request = topic and any(k in topic for k in ["4 Kỹ Năng", "Nghe - Nói - Đọc - Viết", "YCT", "HSK", "A Day at the Zoo", "Travelling and Holidays"])

    # Xử lý lọc theo topic nếu có
    topic_clause = ""
    topic_params = []
    if topic:
        clean_topic = topic.replace("🎧 ", "").replace("🏆 ", "").strip()
        # Trích xuất từ khóa chủ đề cốt lõi nếu có
        sub_kw = ""
        if "A Day at the Zoo" in topic or "Zoo" in topic:
            sub_kw = "%Zoo%"
        elif "Travelling" in topic or "Holidays" in topic:
            sub_kw = "%Travelling%"
        elif "Gia Đình" in topic:
            sub_kw = "%Gia Đình%"
        elif "Trường Học" in topic:
            sub_kw = "%Trường Học%"

        if sub_kw:
            topic_clause = " AND topic LIKE ?"
            topic_params = [sub_kw]
        else:
            cnt_match = conn.execute("SELECT COUNT(*) FROM question_bank WHERE subject = ? AND (topic = ? OR ? LIKE '%' || topic || '%' OR topic LIKE '%' || ? || '%')", (subject, topic, clean_topic, clean_topic)).fetchone()[0]
            if cnt_match > 0:
                topic_clause = " AND (topic = ? OR ? LIKE '%' || topic || '%' OR topic LIKE '%' || ? || '%')"
                topic_params = [topic, clean_topic, clean_topic]

    # Nếu yêu cầu 4 kỹ năng, mỗi kỹ năng (listening, speaking, reading, writing) lấy đúng 1 câu
    if is_4skills_request:
        four_skills = ["listening", "speaking", "reading", "writing"]
        collected_rows = []
        for sk in four_skills:
            sk_query = f"SELECT * FROM question_bank WHERE subject = ?{topic_clause} AND skill = ?"
            sk_params = [subject] + topic_params + [sk]
            if attempted_ids:
                sk_not_in = f"{sk_query} AND id NOT IN ({','.join('?' for _ in attempted_ids)})"
                sk_row = conn.execute(f"{sk_not_in} ORDER BY id ASC LIMIT 1", sk_params + attempted_ids).fetchone()
            else:
                sk_row = None
            if not sk_row:
                sk_row = conn.execute(f"{sk_query} ORDER BY id ASC LIMIT 1", sk_params).fetchone()
            if not sk_row: # fallback môn
                sk_row = conn.execute("SELECT * FROM question_bank WHERE subject = ? AND skill = ? ORDER BY RANDOM() LIMIT 1", [subject, sk]).fetchone()
            if sk_row:
                collected_rows.append(dict(sk_row))
        if len(collected_rows) == 4:
            conn.close()
            return collected_rows

    query = f"SELECT * FROM question_bank WHERE subject = ?{topic_clause}"
    base_params = [subject] + topic_params

    # Nếu có attempted_ids, ưu tiên lấy các câu NOT IN attempted_ids
    if attempted_ids:
        placeholders = ",".join("?" for _ in attempted_ids)
        not_in_query = f"{query} AND id NOT IN ({placeholders})"
        not_in_params = base_params + attempted_ids
        rows = conn.execute(f"{not_in_query} ORDER BY {skill_order}, id ASC LIMIT ?", not_in_params + [count]).fetchall()
        if len(rows) >= count:
            conn.close()
            return [dict(r) for r in rows]

    # Nếu chưa đủ số lượng, lấy từ query cơ bản
    rows = conn.execute(f"{query} ORDER BY {skill_order}, id ASC LIMIT ?", base_params + [count]).fetchall()
    
    # Nếu vẫn chưa đủ (ví dụ topic lọc quá hẹp), lấy theo môn có skill tương ứng
    if len(rows) < count and (topic_clause or is_4skills_request):
        fallback_query = f"SELECT * FROM question_bank WHERE subject = ?{skill_filter} ORDER BY {skill_order}, RANDOM() LIMIT ?"
        rows = conn.execute(fallback_query, [subject, count]).fetchall()

    conn.close()
    return [dict(r) for r in rows]


# =========================================================================
# QUẢN LÝ PHIÊN LÀM BÀI (STUDY SESSIONS) & LƯU NHÁP TỰ ĐỘNG
# =========================================================================

def create_study_session(subject: str, topic: str, questions: list):
    """
    Tạo một phiên làm bài mới với status 'in_progress'.
    Lưu sẵn toàn bộ câu hỏi vào session_answers để sẵn sàng tự động lưu nháp.
    """
    conn = get_connection()
    session_id = f"sess_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}"
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Tạo record session
    conn.execute("""
        INSERT INTO study_sessions (session_id, subject, topic, status, total_questions, score, started_at, updated_at)
        VALUES (?, ?, ?, 'in_progress', ?, 0.0, ?, ?)
    """, (session_id, subject, topic, len(questions), now_time, now_time))

    # Nạp từng câu hỏi vào session_answers
    for order, q in enumerate(questions, 1):
        q_id = q.get("q_bank_id")
        # Nếu chưa có q_bank_id, tìm hoặc thêm vào question_bank
        if not q_id:
            row = conn.execute("SELECT id FROM question_bank WHERE content = ?", (q["question"],)).fetchone()
            if row:
                q_id = row["id"]
            else:
                cur = conn.execute("""
                    INSERT INTO question_bank (subject, topic, question_type, content, options_json, correct_answer, explanation, guide, points, grammar_clue, encouragement, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    subject, topic, q["type"], q["question"],
                    json.dumps(q.get("options", []), ensure_ascii=False),
                    q.get("correct_answer", q.get("reference_answer", "")),
                    q.get("explanation", ""), q.get("guide", ""),
                    q.get("points", 1.0), q.get("grammar_clue", ""),
                    q.get("encouragement", ""), now_time
                ))
                q_id = cur.lastrowid

        conn.execute("""
            INSERT INTO session_answers (
                session_id, question_id, question_order, user_answer, 
                is_correct, ai_score, ai_feedback, unit_warning, 
                grammar_clue, encouragement, skill
            ) VALUES (?, ?, ?, '', 0, 0.0, '', '', ?, ?, ?)
        """, (
            session_id, q_id, order,
            q.get("grammar_clue", ""), q.get("encouragement", ""),
            q.get("skill", "")
        ))

    conn.commit()
    conn.close()
    return session_id

def auto_save_draft_answer(session_id: str, question_id: Any, user_answer: str):
    """Tự động lưu nháp câu trả lời của học sinh khi đang làm bài (hỗ trợ cả question_id và question_order)."""
    if not session_id:
        return
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn.execute("""
        UPDATE session_answers
        SET user_answer = ?
        WHERE session_id = ? AND (question_id = ? OR question_order = ?)
    """, (user_answer if user_answer else "", session_id, question_id, question_id))

    conn.execute("""
        UPDATE study_sessions
        SET updated_at = ?
        WHERE session_id = ?
    """, (now_time, session_id))
    conn.commit()
    conn.close()

def get_in_progress_sessions():
    """Lấy danh sách các bài tập chưa hoàn thành (in_progress) để hiển thị tại Dashboard."""
    conn = get_connection()
    cursor = conn.execute("""
        SELECT s.*,
               COUNT(sa.id) AS total_q,
               SUM(CASE WHEN sa.user_answer IS NOT NULL AND sa.user_answer != '' THEN 1 ELSE 0 END) AS answered_q
        FROM study_sessions s
        LEFT JOIN session_answers sa ON s.session_id = sa.session_id
        WHERE s.status = 'in_progress'
        GROUP BY s.session_id
        ORDER BY s.updated_at DESC
    """)
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_completed_sessions():
    """Lấy danh sách các bài tập đã hoàn thành (completed) để xem lại lịch sử."""
    conn = get_connection()
    cursor = conn.execute("""
        SELECT * FROM study_sessions
        WHERE status = 'completed'
        ORDER BY completed_at DESC
    """)
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_session_full_details(session_id: str):
    """Lấy toàn bộ thông tin một session kèm danh sách câu hỏi và câu trả lời để làm tiếp hoặc xem lại."""
    conn = get_connection()
    session = conn.execute("SELECT * FROM study_sessions WHERE session_id = ?", (session_id,)).fetchone()
    if not session:
        conn.close()
        return None

    answers_rows = conn.execute("""
        SELECT sa.*, 
               COALESCE(qb.content, 'Câu hỏi luyện tập') AS content, 
               qb.options_json, 
               COALESCE(qb.correct_answer, '') AS correct_answer, 
               COALESCE(qb.explanation, '') AS explanation, 
               qb.guide, 
               COALESCE(qb.points, 1.0) AS points, 
               COALESCE(qb.question_type, 'mcq') AS question_type, 
               qb.topic AS q_topic,
               COALESCE(qb.skill, sa.skill, '') AS skill,
               qb.audio_text,
               qb.audio_prompt,
               qb.phonetics_guide,
               qb.pinyin,
               qb.vietnamese_meaning,
               sa.audio_transcription,
               sa.phonetic_analysis,
               COALESCE(sa.grammar_clue, qb.grammar_clue, '') AS grammar_clue,
               COALESCE(sa.encouragement, qb.encouragement, '') AS encouragement
        FROM session_answers sa
        LEFT JOIN question_bank qb ON sa.question_id = qb.id
        WHERE sa.session_id = ?
        ORDER BY sa.question_order ASC
    """, (session_id,)).fetchall()

    conn.close()

    result = dict(session)
    questions = []
    for r in answers_rows:
        d = dict(r)
        d["options"] = json.loads(d["options_json"]) if d.get("options_json") else []
        questions.append(d)
    result["questions"] = questions
    return result

def complete_study_session(session_id: str, final_score: float, detailed_results: list):
    """Hoàn thành phiên làm bài: lưu điểm, nhận xét AI và đổi status sang 'completed'."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Cập nhật kết quả từng câu (hỗ trợ cả question_id và question_order, lưu cả audio_transcription và phonetic_analysis)
    for idx, item in enumerate(detailed_results, 1):
        q_order = item.get("id") or idx
        q_id = item.get("question_id") or item.get("q_bank_id") or q_order
        conn.execute("""
            UPDATE session_answers
            SET user_answer = ?,
                is_correct = ?,
                ai_score = ?,
                ai_feedback = ?,
                unit_warning = ?,
                encouragement = ?,
                audio_transcription = ?,
                phonetic_analysis = ?
            WHERE session_id = ? AND (question_id = ? OR question_order = ?)
        """, (
            item.get("student_answer", ""),
            1 if item.get("is_correct") else 0,
            item.get("score", 0.0),
            item.get("feedback", item.get("explanation", "")),
            item.get("unit_warning", None),
            item.get("encouragement", ""),
            item.get("audio_transcription", ""),
            item.get("phonetic_analysis", ""),
            session_id, q_id, q_order
        ))

    # Cập nhật session
    conn.execute("""
        UPDATE study_sessions
        SET status = 'completed',
            score = ?,
            completed_at = ?,
            updated_at = ?
        WHERE session_id = ?
    """, (final_score, now_time, now_time, session_id))

    # Tự động cập nhật bảng daily_assignments nếu session_id thuộc nhiệm vụ hôm nay
    conn.execute("""
        UPDATE daily_assignments
        SET status = 'completed',
            score = ?,
            completed_at = ?
        WHERE session_id = ?
    """, (final_score, now_time, session_id))

    conn.commit()
    conn.close()

def delete_study_session(session_id: str):
    """Hủy/xóa một phiên làm bài."""
    conn = get_connection()
    conn.execute("DELETE FROM session_answers WHERE session_id = ?", (session_id,))
    conn.execute("DELETE FROM study_sessions WHERE session_id = ?", (session_id,))
    conn.commit()
    conn.close()

# =========================================================================
# QUẢN LÝ GIAO BÀI TẬP THEO NGÀY (DAILY ASSIGNMENTS & STREAK)
# =========================================================================

def init_today_assignments_if_needed():
    """Tự động kiểm tra và khởi tạo bài tập được giao cho ngày hôm nay căn cứ thời khóa biểu."""
    conn = get_connection()
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    cnt = conn.execute("SELECT COUNT(*) FROM daily_assignments WHERE assigned_date = ?", (today_str,)).fetchone()[0]
    if cnt == 0:
        weekday_map = {0: "Thứ Hai", 1: "Thứ Ba", 2: "Thứ Tư", 3: "Thứ Năm", 4: "Thứ Sáu", 5: "Thứ Bảy", 6: "Chủ Nhật"}
        current_day_name = weekday_map.get(datetime.now().weekday(), "Thứ Hai")
        
        sch_rows = conn.execute("SELECT * FROM schedules WHERE day_of_week = ?", (current_day_name,)).fetchall()
        if sch_rows:
            for s in sch_rows:
                conn.execute("""
                    INSERT INTO daily_assignments (assigned_date, subject, topic, status, score)
                    VALUES (?, ?, ?, 'pending', 0.0)
                """, (today_str, s["subject"], s["topic"] or "Ôn tập kiến thức trọng tâm"))
        else:
            conn.execute("""
                INSERT INTO daily_assignments (assigned_date, subject, topic, status, score)
                VALUES (?, 'Toán', 'Luyện tập tổng hợp Toán Lớp 5', 'pending', 0.0)
            """, (today_str,))
            conn.execute("""
                INSERT INTO daily_assignments (assigned_date, subject, topic, status, score)
                VALUES (?, 'Tiếng Anh', 'Cambridge Flyers Reading & Grammar', 'pending', 0.0)
            """, (today_str,))
            
        conn.commit()
    conn.close()

def get_daily_assignments(date_str=None):
    """Lấy danh sách nhiệm vụ được giao theo ngày (kèm đồng bộ trạng thái từ study_sessions)."""
    if not date_str:
        date_str = datetime.now().strftime("%Y-%m-%d")
    conn = get_connection()
    rows = conn.execute("""
        SELECT da.*, ss.updated_at, ss.total_questions,
               (SELECT COUNT(sa.id) FROM session_answers sa WHERE sa.session_id = da.session_id AND sa.user_answer != '') AS answered_count
        FROM daily_assignments da
        LEFT JOIN study_sessions ss ON da.session_id = ss.session_id
        WHERE da.assigned_date = ?
        ORDER BY da.id ASC
    """, (date_str,)).fetchall()
    
    results = []
    for r in rows:
        d = dict(r)
        if d.get("session_id"):
            sess = conn.execute("SELECT status, score, completed_at FROM study_sessions WHERE session_id = ?", (d["session_id"],)).fetchone()
            if sess:
                if sess["status"] == "completed" and d["status"] != "completed":
                    d["status"] = "completed"
                    d["score"] = sess["score"]
                    d["completed_at"] = sess["completed_at"]
                    conn.execute("UPDATE daily_assignments SET status = 'completed', score = ?, completed_at = ? WHERE id = ?", (sess["score"], sess["completed_at"], d["id"]))
                    conn.commit()
                elif sess["status"] == "in_progress" and d["status"] == "pending":
                    d["status"] = "in_progress"
                    conn.execute("UPDATE daily_assignments SET status = 'in_progress' WHERE id = ?", (d["id"],))
                    conn.commit()
        results.append(d)

    conn.close()
    return results

def add_daily_assignment(date_str: str, subject: str, topic: str):
    """Phụ huynh hoặc học sinh bấm giao thêm nhiệm vụ trong ngày."""
    conn = get_connection()
    conn.execute("""
        INSERT INTO daily_assignments (assigned_date, subject, topic, status, score)
        VALUES (?, ?, ?, 'pending', 0.0)
    """, (date_str, subject, topic))
    conn.commit()
    conn.close()

def link_assignment_session(assignment_id: int, session_id: str):
    """Liên kết một phiên làm bài vào nhiệm vụ được giao."""
    conn = get_connection()
    conn.execute("""
        UPDATE daily_assignments
        SET session_id = ?, status = 'in_progress'
        WHERE id = ?
    """, (session_id, assignment_id))
    conn.commit()
    conn.close()

def calculate_streak():
    """Tính chuỗi ngày học liên tục (Streak): Đếm số ngày liên tiếp hoàn thành 100% nhiệm vụ được giao."""
    conn = get_connection()
    dates_rows = conn.execute("""
        SELECT DISTINCT assigned_date
        FROM daily_assignments
        ORDER BY assigned_date DESC
    """).fetchall()
    
    streak = 0
    today_str = datetime.now().strftime("%Y-%m-%d")

    for r in dates_rows:
        d_str = r["assigned_date"]
        stats = conn.execute("""
            SELECT COUNT(*) AS total,
                   SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS done
            FROM daily_assignments
            WHERE assigned_date = ?
        """, (d_str,)).fetchone()
        
        tot = stats["total"]
        done = stats["done"]

        if d_str == today_str:
            if tot > 0 and done == tot:
                streak += 1
            continue
        
        if tot > 0 and done == tot:
            streak += 1
        else:
            break

    conn.close()
    return streak

def get_assignment_history_by_date():
    """Lấy danh sách tất cả các ngày có bài tập được giao để phụ huynh xem nhật ký."""
    conn = get_connection()
    rows = conn.execute("""
        SELECT assigned_date,
               COUNT(*) AS total_tasks,
               SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks,
               AVG(CASE WHEN status = 'completed' THEN score ELSE NULL END) AS avg_score
        FROM daily_assignments
        GROUP BY assigned_date
        ORDER BY assigned_date DESC
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]


# =========================================================================
# QUẢN LÝ DỮ LIỆU CŨ (THỜI KHÓA BIỂU, LỊCH SỬ QUIZ, CHAT GIA SƯ)
# =========================================================================

def get_all_schedules():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM schedules ORDER BY id ASC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def add_schedule_item(day, start_time, end_time, subject, topic, room="Bàn học"):
    conn = get_connection()
    conn.execute("""
        INSERT INTO schedules (day_of_week, start_time, end_time, subject, topic, room)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (day, start_time, end_time, subject, topic, room))
    conn.commit()
    conn.close()

def delete_schedule_item(item_id):
    conn = get_connection()
    conn.execute("DELETE FROM schedules WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()

def save_quiz_result(subject, topic, score, mcq_correct, mcq_total, essay_score, essay_total, ai_feedback, details):
    conn = get_connection()
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn.execute("""
        INSERT INTO quiz_history (timestamp, subject, topic, score, mcq_correct, mcq_total, essay_score, essay_total, ai_feedback, details_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (now_str, subject, topic, score, mcq_correct, mcq_total, essay_score, essay_total, ai_feedback, json.dumps(details, ensure_ascii=False)))
    conn.commit()
    conn.close()

def get_quiz_history():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM quiz_history ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_tutor_messages():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM tutor_chat ORDER BY id ASC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def save_tutor_message(role, content):
    conn = get_connection()
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn.execute("""
        INSERT INTO tutor_chat (timestamp, role, content)
        VALUES (?, ?, ?)
    """, (now_str, role, content))
    conn.commit()
    conn.close()

def clear_tutor_messages():
    conn = get_connection()
    conn.execute("DELETE FROM tutor_chat")
    conn.commit()
    conn.close()

def get_flyers_questions_by_category(category_keyword: str, limit: int = 5):
    conn = get_connection()
    if category_keyword and "Tổng hợp" not in category_keyword:
        cursor = conn.execute("""
            SELECT * FROM flyers_questions
            WHERE category LIKE ? OR ? LIKE ('%' || category || '%')
            ORDER BY id ASC LIMIT ?
        """, (f"%{category_keyword}%", category_keyword, limit))
    else:
        cursor = conn.execute("SELECT * FROM flyers_questions ORDER BY id ASC LIMIT ?", (limit,))
    
    rows = cursor.fetchall()
    conn.close()
    results = []
    for r in rows:
        d = dict(r)
        d["options"] = json.loads(d["options_json"]) if d["options_json"] else []
        results.append(d)
    return results

def get_flyers_full_exam():
    conn = get_connection()
    categories = [
        "Dạng 1: Vocabulary & Definitions",
        "Dạng 2: Dialogue Completion",
        "Dạng 3: Flyers Grammar",
        "Dạng 4: Story Reading & Cloze",
        "Dạng 5: Open Cloze"
    ]
    exam_questions = []
    q_id = 1
    for cat in categories[:3]:
        row = conn.execute("SELECT * FROM flyers_questions WHERE category LIKE ? ORDER BY RANDOM() LIMIT 1", (f"%{cat}%",)).fetchone()
        if row:
            item = dict(row)
            exam_questions.append({
                "id": q_id,
                "type": "mcq",
                "question": f"[{cat.split(':')[0]}] {item['question']}",
                "options": json.loads(item["options_json"]),
                "correct_answer": item["correct_answer"],
                "explanation": item["explanation"],
                "grammar_clue": item["grammar_clue"],
                "encouragement": item["encouragement"]
            })
            q_id += 1

    for cat in categories[3:]:
        row = conn.execute("SELECT * FROM flyers_questions WHERE category LIKE ? ORDER BY RANDOM() LIMIT 1", (f"%{cat}%",)).fetchone()
        if row:
            item = dict(row)
            exam_questions.append({
                "id": q_id,
                "type": "essay",
                "question": f"[{cat.split(':')[0]}] {item['question']}",
                "guide": item["grammar_clue"],
                "reference_answer": item["correct_answer"],
                "explanation": item["explanation"],
                "grammar_clue": item["grammar_clue"],
                "encouragement": item["encouragement"]
            })
            q_id += 1

    conn.close()
    return exam_questions


# =========================================================================
# QUẢN LÝ ĐỐ VUI TRÍ TUỆ & GIẢI TRÍ (fun_riddles)
# =========================================================================

def get_fun_riddles(category: str = None, status_filter: str = "all") -> List[Dict[str, Any]]:
    """
    Lấy danh sách các câu đố vui từ bảng fun_riddles.
    status_filter: 'all', 'unsolved', 'solved'
    """
    conn = get_connection()
    query = "SELECT * FROM fun_riddles WHERE 1=1"
    params = []

    if category and category != "Tất cả":
        query += " AND category = ?"
        params.append(category)

    if status_filter == "unsolved":
        query += " AND is_solved = 0"
    elif status_filter == "solved":
        query += " AND is_solved = 1"

    query += " ORDER BY is_solved ASC, id ASC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_fun_riddle_by_id(riddle_id: int) -> Optional[Dict[str, Any]]:
    """Lấy chi tiết 1 câu đố theo id."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM fun_riddles WHERE id = ?", (riddle_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def mark_riddle_solved(riddle_id: int) -> bool:
    """Đánh dấu câu đố đã được giải đúng và thưởng sao."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn.execute("""
        UPDATE fun_riddles 
        SET is_solved = 1, solved_at = ? 
        WHERE id = ?
    """, (now_time, riddle_id))
    conn.commit()
    conn.close()
    return True

def add_new_riddle(category: str, question: str, hint: str, answer: str, explanation: str) -> int:
    """Thêm một câu đố mới (ví dụ do AI sinh ra) vào bảng fun_riddles."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO fun_riddles (category, question, hint, answer, explanation, is_solved, created_at)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    """, (category, question, hint, answer, explanation, now_time))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return new_id

def get_riddle_stats() -> Dict[str, int]:
    """Lấy thống kê số câu đố đã giải và tổng số câu đố để tính sao thưởng."""
    conn = get_connection()
    total = conn.execute("SELECT COUNT(*) FROM fun_riddles").fetchone()[0]
    solved = conn.execute("SELECT COUNT(*) FROM fun_riddles WHERE is_solved = 1").fetchone()[0]
    conn.close()
    return {
        "total": total,
        "solved": solved,
        "stars": solved  # Mỗi câu giải được = +1 Ngôi sao trí tuệ
    }


# =========================================================================
# SAO LƯU & KHÔI PHỤC DỮ LIỆU (DATA PERSISTENCE CHO CLOUD)
# =========================================================================

def export_database_json() -> str:
    """
    Xuất toàn bộ dữ liệu người dùng (lịch sử học, phiên làm bài, câu trả lời, nhiệm vụ, sao trí tuệ)
    sang định dạng chuỗi JSON để tải về máy hoặc lưu trữ đám mây.
    """
    conn = get_connection()
    export_data = {
        "export_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "version": "2.0-cloud",
        "quiz_history": [dict(r) for r in conn.execute("SELECT * FROM quiz_history").fetchall()],
        "study_sessions": [dict(r) for r in conn.execute("SELECT * FROM study_sessions").fetchall()],
        "session_answers": [dict(r) for r in conn.execute("SELECT * FROM session_answers").fetchall()],
        "daily_assignments": [dict(r) for r in conn.execute("SELECT * FROM daily_assignments").fetchall()],
        "fun_riddles": [dict(r) for r in conn.execute("SELECT * FROM fun_riddles").fetchall()],
        "tutor_chat": [dict(r) for r in conn.execute("SELECT * FROM tutor_chat").fetchall()]
    }
    conn.close()
    return json.dumps(export_data, ensure_ascii=False, indent=2)

def import_database_json(json_content: str) -> bool:
    """
    Khôi phục toàn vẹn dữ liệu học tập từ tệp JSON sao lưu.
    Sử dụng INSERT OR REPLACE để cập nhật hoặc giữ nguyên.
    """
    try:
        data = json.loads(json_content)
        conn = get_connection()
        cursor = conn.cursor()

        # 1. Khôi phục quiz_history
        if "quiz_history" in data:
            for row in data["quiz_history"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO quiz_history 
                    (id, timestamp, subject, topic, score, mcq_correct, mcq_total, essay_score, essay_total, ai_feedback, details_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("timestamp"), row.get("subject"), row.get("topic"),
                    row.get("score"), row.get("mcq_correct"), row.get("mcq_total"),
                    row.get("essay_score"), row.get("essay_total", row.get("essay_max", 4.0)), 
                    row.get("ai_feedback"), row.get("details_json", row.get("detailed_result"))
                ))

        # 2. Khôi phục study_sessions
        if "study_sessions" in data:
            for row in data["study_sessions"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO study_sessions
                    (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("session_id"), row.get("subject"), row.get("topic"), row.get("status"),
                    row.get("total_questions"), row.get("score"), row.get("started_at"),
                    row.get("updated_at"), row.get("completed_at")
                ))

        # 3. Khôi phục session_answers
        if "session_answers" in data:
            for row in data["session_answers"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO session_answers
                    (id, session_id, question_id, question_order, user_answer, is_correct, ai_score, ai_feedback, unit_warning, grammar_clue, encouragement, skill, audio_transcription, phonetic_analysis)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("session_id"), row.get("question_id"), row.get("question_order"),
                    row.get("user_answer"), row.get("is_correct"), row.get("ai_score"),
                    row.get("ai_feedback"), row.get("unit_warning"), row.get("grammar_clue"),
                    row.get("encouragement"), row.get("skill"), row.get("audio_transcription"),
                    row.get("phonetic_analysis")
                ))

        # 4. Khôi phục daily_assignments
        if "daily_assignments" in data:
            for row in data["daily_assignments"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO daily_assignments
                    (id, assigned_date, subject, topic, session_id, status, score, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("assigned_date"), row.get("subject"), row.get("topic"),
                    row.get("session_id"), row.get("status"), row.get("score"), row.get("completed_at")
                ))

        # 5. Khôi phục fun_riddles
        if "fun_riddles" in data:
            for row in data["fun_riddles"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO fun_riddles
                    (id, category, question, hint, answer, explanation, is_solved, solved_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("category"), row.get("question"), row.get("hint"),
                    row.get("answer"), row.get("explanation"), row.get("is_solved"),
                    row.get("solved_at"), row.get("created_at")
                ))

        # 6. Khôi phục tutor_chat
        if "tutor_chat" in data:
            for row in data["tutor_chat"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO tutor_chat
                    (id, role, content, timestamp)
                    VALUES (?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("role"), row.get("content"), row.get("timestamp")
                ))

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"[Import DB Error] {e}")
        return False



def get_math_full_exam():
    conn = get_connection()
    exam_questions = []
    mcq_topics = [
        "Chuyên đề 1: Số thập phân",
        "Chuyên đề 2: Tỉ số phần trăm",
        "Chuyên đề 3: Đổi đơn vị đo",
        "Chuyên đề 4: Hình học phẳng",
        "Chuyên đề 5: Hình học không gian",
        "Chuyên đề 6: Chuyển động đều"
    ]
    q_id = 1
    for top in mcq_topics:
        row = conn.execute("""
            SELECT * FROM math_seed_questions 
            WHERE topic_category LIKE ? AND type = 'mcq'
            ORDER BY RANDOM() LIMIT 1
        """, (f"%{top}%",)).fetchone()
        if row:
            item = dict(row)
            exam_questions.append({
                "id": q_id,
                "part": 1,
                "topic_category": top,
                "type": "mcq",
                "question": item["question"],
                "options": json.loads(item["options_json"]),
                "correct_answer": item["correct_answer"],
                "explanation": item["explanation"],
                "points": 1.0
            })
            q_id += 1

    essay_topics = [
        "Dạng 7: Tính thuận tiện",
        "Dạng 8: Tỉ số phần trăm",
        "Dạng 9: Hình học thực tế",
        "Dạng 10: Chuyển động nâng cao"
    ]
    for top in essay_topics:
        row = conn.execute("""
            SELECT * FROM math_seed_questions 
            WHERE topic_category LIKE ? AND type = 'essay'
            ORDER BY RANDOM() LIMIT 1
        """, (f"%{top}%",)).fetchone()
        if row:
            item = dict(row)
            exam_questions.append({
                "id": q_id,
                "part": 2,
                "topic_category": top,
                "type": "essay",
                "question": item["question"],
                "guide": item.get("guide", ""),
                "reference_answer": item["reference_answer"],
                "explanation": item["explanation"],
                "points": 1.0
            })
            q_id += 1

    conn.close()
    return exam_questions


# =========================================================================
# QUẢN LÝ ĐỐ VUI TRÍ TUỆ & GIẢI TRÍ (fun_riddles)
# =========================================================================

def get_fun_riddles(category: str = None, status_filter: str = "all") -> List[Dict[str, Any]]:
    """
    Lấy danh sách các câu đố vui từ bảng fun_riddles.
    status_filter: 'all', 'unsolved', 'solved'
    """
    conn = get_connection()
    query = "SELECT * FROM fun_riddles WHERE 1=1"
    params = []

    if category and category != "Tất cả":
        query += " AND category = ?"
        params.append(category)

    if status_filter == "unsolved":
        query += " AND is_solved = 0"
    elif status_filter == "solved":
        query += " AND is_solved = 1"

    query += " ORDER BY is_solved ASC, id ASC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_fun_riddle_by_id(riddle_id: int) -> Optional[Dict[str, Any]]:
    """Lấy chi tiết 1 câu đố theo id."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM fun_riddles WHERE id = ?", (riddle_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def mark_riddle_solved(riddle_id: int) -> bool:
    """Đánh dấu câu đố đã được giải đúng và thưởng sao."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn.execute("""
        UPDATE fun_riddles 
        SET is_solved = 1, solved_at = ? 
        WHERE id = ?
    """, (now_time, riddle_id))
    conn.commit()
    conn.close()
    return True

def add_new_riddle(category: str, question: str, hint: str, answer: str, explanation: str) -> int:
    """Thêm một câu đố mới (ví dụ do AI sinh ra) vào bảng fun_riddles."""
    conn = get_connection()
    now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO fun_riddles (category, question, hint, answer, explanation, is_solved, created_at)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    """, (category, question, hint, answer, explanation, now_time))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return new_id

def get_riddle_stats() -> Dict[str, int]:
    """Lấy thống kê số câu đố đã giải và tổng số câu đố để tính sao thưởng."""
    conn = get_connection()
    total = conn.execute("SELECT COUNT(*) FROM fun_riddles").fetchone()[0]
    solved = conn.execute("SELECT COUNT(*) FROM fun_riddles WHERE is_solved = 1").fetchone()[0]
    conn.close()
    return {
        "total": total,
        "solved": solved,
        "stars": solved  # Mỗi câu giải được = +1 Ngôi sao trí tuệ
    }


# =========================================================================
# SAO LƯU & KHÔI PHỤC DỮ LIỆU (DATA PERSISTENCE CHO CLOUD)
# =========================================================================

def export_database_json() -> str:
    """
    Xuất toàn bộ dữ liệu người dùng (lịch sử học, phiên làm bài, câu trả lời, nhiệm vụ, sao trí tuệ)
    sang định dạng chuỗi JSON để tải về máy hoặc lưu trữ đám mây.
    """
    conn = get_connection()
    export_data = {
        "export_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "version": "2.0-cloud",
        "quiz_history": [dict(r) for r in conn.execute("SELECT * FROM quiz_history").fetchall()],
        "study_sessions": [dict(r) for r in conn.execute("SELECT * FROM study_sessions").fetchall()],
        "session_answers": [dict(r) for r in conn.execute("SELECT * FROM session_answers").fetchall()],
        "daily_assignments": [dict(r) for r in conn.execute("SELECT * FROM daily_assignments").fetchall()],
        "fun_riddles": [dict(r) for r in conn.execute("SELECT * FROM fun_riddles").fetchall()],
        "tutor_chat": [dict(r) for r in conn.execute("SELECT * FROM tutor_chat").fetchall()]
    }
    conn.close()
    return json.dumps(export_data, ensure_ascii=False, indent=2)

def import_database_json(json_content: str) -> bool:
    """
    Khôi phục toàn vẹn dữ liệu học tập từ tệp JSON sao lưu.
    Sử dụng INSERT OR REPLACE để cập nhật hoặc giữ nguyên.
    """
    try:
        data = json.loads(json_content)
        conn = get_connection()
        cursor = conn.cursor()

        # 1. Khôi phục quiz_history
        if "quiz_history" in data:
            for row in data["quiz_history"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO quiz_history 
                    (id, timestamp, subject, topic, score, mcq_correct, mcq_total, essay_score, essay_total, ai_feedback, details_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("timestamp"), row.get("subject"), row.get("topic"),
                    row.get("score"), row.get("mcq_correct"), row.get("mcq_total"),
                    row.get("essay_score"), row.get("essay_total", row.get("essay_max", 4.0)), 
                    row.get("ai_feedback"), row.get("details_json", row.get("detailed_result"))
                ))

        # 2. Khôi phục study_sessions
        if "study_sessions" in data:
            for row in data["study_sessions"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO study_sessions
                    (session_id, subject, topic, status, total_questions, score, started_at, updated_at, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("session_id"), row.get("subject"), row.get("topic"), row.get("status"),
                    row.get("total_questions"), row.get("score"), row.get("started_at"),
                    row.get("updated_at"), row.get("completed_at")
                ))

        # 3. Khôi phục session_answers
        if "session_answers" in data:
            for row in data["session_answers"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO session_answers
                    (id, session_id, question_id, question_order, user_answer, is_correct, ai_score, ai_feedback, unit_warning, grammar_clue, encouragement, skill, audio_transcription, phonetic_analysis)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("session_id"), row.get("question_id"), row.get("question_order"),
                    row.get("user_answer"), row.get("is_correct"), row.get("ai_score"),
                    row.get("ai_feedback"), row.get("unit_warning"), row.get("grammar_clue"),
                    row.get("encouragement"), row.get("skill"), row.get("audio_transcription"),
                    row.get("phonetic_analysis")
                ))

        # 4. Khôi phục daily_assignments
        if "daily_assignments" in data:
            for row in data["daily_assignments"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO daily_assignments
                    (id, assigned_date, subject, topic, session_id, status, score, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("assigned_date"), row.get("subject"), row.get("topic"),
                    row.get("session_id"), row.get("status"), row.get("score"), row.get("completed_at")
                ))

        # 5. Khôi phục fun_riddles
        if "fun_riddles" in data:
            for row in data["fun_riddles"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO fun_riddles
                    (id, category, question, hint, answer, explanation, is_solved, solved_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("category"), row.get("question"), row.get("hint"),
                    row.get("answer"), row.get("explanation"), row.get("is_solved"),
                    row.get("solved_at"), row.get("created_at")
                ))

        # 6. Khôi phục tutor_chat
        if "tutor_chat" in data:
            for row in data["tutor_chat"]:
                cursor.execute("""
                    INSERT OR REPLACE INTO tutor_chat
                    (id, role, content, timestamp)
                    VALUES (?, ?, ?, ?)
                """, (
                    row.get("id"), row.get("role"), row.get("content"), row.get("timestamp")
                ))

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"[Import DB Error] {e}")
        return False


