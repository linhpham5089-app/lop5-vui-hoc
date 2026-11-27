#!/usr/bin/env python3
"""
Sinh hàng loạt câu hỏi chuẩn Lớp 5 lưu cứng vào các file Seed TypeScript
sử dụng Gemini API (gemini-3.5-flash / gemini-3.5-flash-lite).
"""

import concurrent.futures
import json
import os
import re
import time
from typing import Dict, List, Set, Tuple

import requests

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT_DIR, "src", "data")
ENV_LOCAL = os.path.join(ROOT_DIR, ".env.local")

MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite"]

SEED_FILES = {
    "Toán": os.path.join(DATA_DIR, "mathSeed.ts"),
    "Tiếng Việt": os.path.join(DATA_DIR, "vietnameseSeed.ts"),
    "Tiếng Anh": os.path.join(DATA_DIR, "flyersSeed.ts"),
    "Tiếng Trung": os.path.join(DATA_DIR, "fourSkillsSeed.ts"),
}

# Phân bổ >= 65 câu mới cho mỗi môn học (trong đó >= 15 câu cho mỗi chuyên đề bài thi chuẩn)
EXPANSION_PLAN: Dict[str, List[Tuple[str, int, str]]] = {
    "Toán": [
        ("Ôn tập và bổ sung về phân số, hỗn số", 6, "Phân số, hỗn số, so sánh và phép tính phân số"),
        ("Số thập phân và các phép tính với số thập phân", 6, "Số thập phân, đổi đơn vị đo, tính nhanh"),
        ("Tỉ số phần trăm và giải toán tỉ số phần trăm", 6, "Tìm tỉ số %, lãi suất, giảm giá, tăng giá"),
        ("Hình học: Diện tích hình tam giác, hình thang, hình tròn", 6, "Diện tích tam giác, hình thang, hình tròn (thuần văn bản, không cần hình vẽ)"),
        ("Toán chuyển động đều: Vận tốc, quãng đường, thời gian", 6, "Cùng chiều, ngược chiều, tính vận tốc trung bình"),
        ("Bài thi chuẩn của Hồ Chí Minh", 16, "Đề khảo sát năng lực chuẩn Sở GD&ĐT TP.HCM: toán thực tế đời sống, đổi đơn vị, tỉ số %, hình khối"),
        ("Bài thi chuẩn của Trần Đại Nghĩa", 16, "Toán tư duy logic kiểu Trần Đại Nghĩa: dãy số quy luật, suy luận logic, toán giả thiết tạm, chia hết, đồng hồ"),
        ("Bài thi tổng hợp", 16, "Tổng hợp toàn diện Toán lớp 5 từ cơ bản đến nâng cao"),
    ],
    "Tiếng Việt": [
        ("Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình", 6, "Từ đồng nghĩa, trái nghĩa, mở rộng vốn từ theo chủ điểm"),
        ("Luyện từ và câu: Đại từ, Quan hệ từ", 6, "Đại từ xưng hô, đại từ thay thế, cặp quan hệ từ câu ghép"),
        ("Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)", 6, "Phân biệt danh từ, động từ, tính từ, xác định chủ ngữ vị ngữ"),
        ("Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam", 6, "Ý nghĩa thành ngữ, tục ngữ về ý chí, chăm chỉ, nhân ái"),
        ("Bài thi chuẩn của Hồ Chí Minh", 16, "Đề kiểm tra Tiếng Việt chuẩn Sở GD&ĐT TP.HCM: từ loại, câu ghép, từ nhiều nghĩa, cảm thụ đoạn văn ngắn"),
        ("Bài thi chuẩn của Trần Đại Nghĩa", 16, "Tiếng Việt tư duy & cảm thụ kiểu Trần Đại Nghĩa: từ đồng âm, nghĩa chuyển, biện pháp tu từ, đọc hiểu suy luận"),
        ("Bài thi tổng hợp", 16, "Tổng hợp luyện từ và câu, chính tả, cảm thụ văn học Lớp 5"),
    ],
    "Tiếng Anh": [
        ("🏆 [Cambridge Flyers] Dạng 1: Vocabulary & Definitions (Đoán từ qua định nghĩa)", 6, "Cambridge A2 Flyers vocabulary definitions"),
        ("🏆 [Cambridge Flyers] Dạng 2: Dialogue Completion (Hoàn thành hội thoại giao tiếp)", 6, "Cambridge A2 Flyers natural everyday dialogues"),
        ("🏆 [Cambridge Flyers] Dạng 3: Flyers Grammar (Ngữ pháp A2: Quá khứ, HTHT, Mệnh đề quan hệ)", 6, "Past Simple, Present Perfect, Relative Clauses, Comparatives"),
        ("🏆 [Cambridge Flyers] Dạng 4: Story Reading & Cloze (Đọc hiểu đoạn văn & Chọn từ)", 6, "Short reading comprehension paragraphs and cloze"),
        ("Bài thi chuẩn của Hồ Chí Minh", 16, "Đề Tiếng Anh lớp 5 chuẩn Sở GD&ĐT TP.HCM: ngữ pháp, giao tiếp, đọc hiểu tình huống thực tế"),
        ("Bài thi chuẩn của Trần Đại Nghĩa", 16, "Tiếng Anh tư duy & liên môn kiểu Trần Đại Nghĩa: câu hỏi Khoa học - Địa lý - Lịch sử - Logic bằng Tiếng Anh"),
        ("Bài thi tổng hợp", 16, "Tổng hợp từ vựng, ngữ pháp và đọc hiểu Tiếng Anh Lớp 5"),
    ],
    "Tiếng Trung": [
        ("Bính âm (Pinyin), Thanh điệu và quy tắc ghép âm cơ bản", 6, "Pinyin, thanh điệu, phân biệt âm đầu/vận mẫu (kèm Pinyin rõ ràng)"),
        ("Chào hỏi, giới thiệu bản thân và xưng hô trong gia đình", 6, "Giao tiếp chào hỏi, gia đình, xưng hô cơ bản (chữ Hán + Pinyin)"),
        ("Số đếm từ 1-100, ngày tháng, thứ trong tuần và giờ giấc", 6, "Số đếm, thứ ngày tháng, hỏi giờ (chữ Hán + Pinyin)"),
        ("Hỏi giá cả và mua sắm đơn giản (多少钱, 苹果)", 6, "Mua sắm, hỏi giá cả, tiền tệ (chữ Hán + Pinyin)"),
        ("Bài thi chuẩn của Hồ Chí Minh", 16, "Tiếng Trung tiểu học chuẩn giao tiếp thực tế: nghe hiểu qua hội thoại text, từ vựng trường học, gia đình"),
        ("Bài thi chuẩn của Trần Đại Nghĩa", 16, "Tiếng Trung tư duy & thực hành: suy luận ngày tháng, tính nhẩm giá tiền bằng tiếng Trung, sắp xếp câu"),
        ("Bài thi tổng hợp", 16, "Tổng hợp từ vựng YCT 1-2 / HSK 1-2 và ngữ pháp cơ bản"),
    ],
}

IMAGE_BANNED = [
    "hình bên", "hình dưới", "hình vẽ bên", "hình sau", "quan sát hình",
    "look at the picture", "in the picture", "picture below", "diagram"
]


def load_api_key() -> str:
    if os.path.exists(ENV_LOCAL):
        for line in open(ENV_LOCAL, "r", encoding="utf-8"):
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("GEMINI_API_KEY", "")


def call_gemini(api_key: str, prompt: str) -> str:
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.8, "maxOutputTokens": 4096},
    }
    for model in MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        for attempt in range(2):
            try:
                resp = requests.post(url, json=payload, timeout=35)
                if resp.status_code != 200:
                    time.sleep(1.5)
                    continue
                data = resp.json()
                parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
                text = "".join(p.get("text", "") for p in parts if p.get("text") is not None and p.get("thought") is not True)
                if text.strip():
                    return text
            except Exception:
                time.sleep(1.5)
    return ""


def normalize_key(text: str) -> str:
    return re.sub(r"[^a-z0-9àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]", "", text.lower())[:90]


def generate_batch(api_key: str, subject: str, topic: str, count: int, focus: str, batch_idx: int) -> List[dict]:
    extra_zh = ', "pinyin": "phiên âm pinyin nếu là Tiếng Trung"' if subject == "Tiếng Trung" else ""
    prompt = f"""Bạn là chuyên gia ra đề thi Lớp 5 hàng đầu Việt Nam.
Hãy biên soạn ĐÚNG {count} câu hỏi MỚI hoàn toàn cho môn "{subject}", chuyên đề "{topic}".
Trọng tâm: {focus}. (Đợt sinh số {batch_idx} — hãy tạo tình huống và số liệu đa dạng, không trùng lặp).

QUY TẮC BẮT BUỘC:
1. THUẦN VĂN BẢN: Tuyệt đối KHÔNG tạo câu hỏi phụ thuộc hình ảnh vẽ ("hình bên", "như hình dưới", "look at the picture"...).
2. Chủ yếu là trắc nghiệm 4 lựa chọn ("type": "mcq") với 4 phương án A, B, C, D rõ ràng (khoảng 80% mcq, 20% "essay").
3. Với "mcq": "options" phải là mảng đúng 4 chuỗi bắt đầu bằng "A. ", "B. ", "C. ", "D. "; "correct_answer" là đúng 1 chữ cái "A", "B", "C", hoặc "D".
4. "explanation" phải giải thích chi tiết từng bước dễ hiểu cho học sinh lớp 5.
5. Trả về ĐÚNG MỘT JSON ARRAY (không viết chữ nào ngoài JSON):
[
  {{
    "type": "mcq",
    "question": "Nội dung câu hỏi...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correct_answer": "B",
    "explanation": "Lời giải chi tiết...",
    "grammar_clue": "Công thức / mẹo ghi nhớ ngắn...",
    "points": 1.0{extra_zh}
  }}
]"""

    raw = call_gemini(api_key, prompt)
    if not raw:
        return []
    clean = raw.strip()
    if "```json" in clean:
        clean = clean.split("```json", 1)[1].split("```", 1)[0].strip()
    elif "```" in clean:
        clean = clean.split("```", 1)[1].split("```", 1)[0].strip()

    try:
        arr = json.loads(clean)
        if not isinstance(arr, list):
            return []
    except Exception:
        return []

    valid: List[dict] = []
    for item in arr:
        if not isinstance(item, dict):
            continue
        q_text = str(item.get("question", "")).strip()
        q_type = item.get("type", "mcq")
        if len(q_text) < 15 or any(b in q_text.lower() for b in IMAGE_BANNED):
            continue
        if q_type == "mcq":
            opts = item.get("options")
            ca = str(item.get("correct_answer", "")).strip().upper()[:1]
            if not isinstance(opts, list) or len(opts) != 4 or ca not in {"A", "B", "C", "D"}:
                continue
            valid.append({
                "subject": subject,
                "topic": topic,
                "type": "mcq",
                "question": q_text,
                "options": [str(o).strip() for o in opts],
                "correct_answer": ca,
                "explanation": str(item.get("explanation", "")).strip() or f"Đáp án đúng là {ca}.",
                "grammar_clue": str(item.get("grammar_clue", "")).strip(),
                "pinyin": str(item.get("pinyin", "")).strip() if subject == "Tiếng Trung" else "",
                "points": float(item.get("points", 1.0) or 1.0),
            })
        elif q_type == "essay":
            ca = str(item.get("correct_answer", "")).strip()
            if not ca:
                continue
            valid.append({
                "subject": subject,
                "topic": topic,
                "type": "essay",
                "question": q_text,
                "guide": str(item.get("grammar_clue", "")).strip() or "Trình bày rõ ràng các bước làm.",
                "correct_answer": ca,
                "explanation": str(item.get("explanation", "")).strip() or ca,
                "pinyin": str(item.get("pinyin", "")).strip() if subject == "Tiếng Trung" else "",
                "points": float(item.get("points", 2.0) or 2.0),
            })
    return valid


def load_existing_data(ts_path: str) -> Tuple[Set[str], Set[str]]:
    content = open(ts_path, "r", encoding="utf-8").read()
    q_keys = set()
    id_keys = set()
    for m in re.finditer(r"question:\s*(['\"`])((?:\\.|(?!\1).)*)\1", content, re.S):
        q_keys.add(normalize_key(m.group(2)))
    for m in re.finditer(r"id:\s*(['\"])(.*?)\1", content):
        id_keys.add(m.group(2))
    return q_keys, id_keys


def ts_escape(val: str) -> str:
    return json.dumps(val, ensure_ascii=False)


def format_ts_question(q: dict) -> str:
    lines = [
        "  {",
        f"    id: {ts_escape(q['id'])},",
        f"    subject: {ts_escape(q['subject'])},",
        f"    topic: {ts_escape(q['topic'])},",
        f"    type: {ts_escape(q['type'])},",
        f"    question: {ts_escape(q['question'])},",
    ]
    if q.get("options"):
        opts = ", ".join(ts_escape(o) for o in q["options"])
        lines.append(f"    options: [{opts}],")
    if q.get("pinyin"):
        lines.append(f"    pinyin: {ts_escape(q['pinyin'])},")
    if q.get("guide"):
        lines.append(f"    guide: {ts_escape(q['guide'])},")
    lines.append(f"    correct_answer: {ts_escape(q['correct_answer'])},")
    lines.append(f"    explanation: {ts_escape(q['explanation'])},")
    if q.get("grammar_clue"):
        lines.append(f"    grammar_clue: {ts_escape(q['grammar_clue'])},")
    lines.append(f"    points: {q.get('points', 1.0)}")
    lines.append("  }")
    return "\n".join(lines)


def append_questions(ts_path: str, sub_code: str, candidates: List[dict]) -> int:
    q_keys, id_keys = load_existing_data(ts_path)
    unique_qs: List[dict] = []
    counter = 1
    for q in candidates:
        nk = normalize_key(q["question"])
        if not nk or nk in q_keys:
            continue
        q_keys.add(nk)
        while f"exp_{sub_code}_{counter}" in id_keys:
            counter += 1
        q["id"] = f"exp_{sub_code}_{counter}"
        id_keys.add(q["id"])
        counter += 1
        unique_qs.append(q)

    if not unique_qs:
        return 0

    content = open(ts_path, "r", encoding="utf-8").read()
    idx = content.rfind("];")
    if idx == -1:
        raise RuntimeError(f"Missing '];' in {ts_path}")
    before = content[:idx].rstrip()
    if not before.endswith(","):
        before += ","
    updated = before + "\n" + ",\n".join(format_ts_question(q) for q in unique_qs) + "\n];\n"
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(updated)
    return len(unique_qs)


def main() -> None:
    api_key = load_api_key()
    if not api_key:
        raise RuntimeError("Không tìm thấy GEMINI_API_KEY trong .env.local")

    # Split topics > 8 into batches of 8 so JSON output stays fast and reliable
    tasks = []
    for subject, items in EXPANSION_PLAN.items():
        for topic, total_needed, focus in items:
            remaining = total_needed
            b_idx = 1
            while remaining > 0:
                batch_cnt = min(8, remaining)
                tasks.append((subject, topic, batch_cnt, focus, b_idx))
                remaining -= batch_cnt
                b_idx += 1

    print(f"Tổng số batch gọi Gemini: {len(tasks)} (chạy song song 4 luồng)...")
    collected: Dict[str, List[dict]] = {s: [] for s in EXPANSION_PLAN}

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        future_map = {
            executor.submit(generate_batch, api_key, s, t, c, f, bi): (s, t)
            for (s, t, c, f, bi) in tasks
        }
        for fut in concurrent.futures.as_completed(future_map):
            s, t = future_map[fut]
            try:
                res = fut.result()
                collected[s].extend(res)
                print(f"  + [{s}] {t[:38]}... -> {len(res)} câu hợp lệ")
            except Exception as exc:
                print(f"  ! [{s}] {t[:38]}... lỗi: {exc}")

    sub_codes = {"Toán": "math", "Tiếng Việt": "vi", "Tiếng Anh": "en", "Tiếng Trung": "zh"}
    print("\n=== TỔNG KẾT NẠP NGÂN HÀNG ĐỀ MỞ RỘNG ===")
    for subject, qs in collected.items():
        added = append_questions(SEED_FILES[subject], sub_codes[subject], qs)
        print(f"  - {subject}: +{added} câu mới (đã ghi vào {os.path.basename(SEED_FILES[subject])})")


if __name__ == "__main__":
    main()
