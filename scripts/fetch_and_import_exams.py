#!/usr/bin/env python3
"""
Tự động tải, bóc tách và chuẩn hóa đề thi chuẩn Trần Đại Nghĩa & Sở GD&ĐT TP.HCM
từ các nguồn công khai (onthitdn.com, gdphothong.hcm.edu.vn) vào ngân hàng đề TypeScript.
Không gọi AI/LLM — chỉ dùng requests, BeautifulSoup, pypdf và Regex.
"""

import json
import os
import re
import urllib3
from typing import Dict, List, Optional, Set, Tuple

import bs4
import pypdf
import requests

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMP_DIR = os.path.join(ROOT_DIR, "scripts", "temp_pdfs")
DATA_DIR = os.path.join(ROOT_DIR, "src", "data")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

IMAGE_ONLY_HINTS = [
    "hình bên",
    "hình dưới",
    "hình vẽ",
    "bảng dưới đây",
    "biểu đồ",
    "picture on the right",
    "following picture",
    "look at the picture",
    "in the diagram",
    "hãy quan sát",
]


def ensure_temp_dir() -> None:
    os.makedirs(TEMP_DIR, exist_ok=True)


def download_pdf(filename: str, url: str) -> Optional[str]:
    path = os.path.join(TEMP_DIR, filename)
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return path
    try:
        resp = requests.get(url, headers=HEADERS, timeout=25, verify=False)
        if resp.status_code == 200 and len(resp.content) > 1000:
            with open(path, "wb") as f:
                f.write(resp.content)
            return path
        print(f"[WARN] HTTP {resp.status_code} khi tải {url}")
    except Exception as exc:
        print(f"[WARN] Lỗi tải {url}: {exc}")
    return None


def read_pdf_text(path: str) -> str:
    reader = pypdf.PdfReader(path)
    pages = [(page.extract_text() or "") for page in reader.pages]
    return "\n".join(pages)


def clean_ws(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def has_image_dependency(text: str) -> bool:
    low = text.lower()
    return any(hint in low for hint in IMAGE_ONLY_HINTS)


def is_clean_text(text: str) -> bool:
    if not text or len(text.strip()) < 15:
        return False
    # Reject garbled encoding or excessive replacement chars
    if text.count("\ufffd") > 2:
        return False
    return True


def normalize_key(text: str) -> str:
    return re.sub(r"[^a-z0-9àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]", "", text.lower())[:90]


def classify_mcq_subject(question_text: str) -> str:
    # Heuristic: detect Vietnamese diacritics vs English
    vi_chars = len(re.findall(r"[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]", question_text.lower()))
    if vi_chars == 0:
        return "Tiếng Anh"
    math_kw = ["tính", "số tự nhiên", "phân số", "tỉ số", "diện tích", "chu vi", "vận tốc", "km/giờ", "giờ", "phút", "đồng", "hình", "trung bình", "%", "gấp", "hơn", "kém"]
    low = question_text.lower()
    if any(k in low for k in math_kw):
        return "Toán"
    return "Tiếng Việt"


def parse_2016_answer_key(da_text: str) -> Dict[int, str]:
    # Extract Mã bài 132 block
    m = re.search(r"Mã bài\s*132(.*?)(?:Mã bài\s*485|$)", da_text, re.S)
    block = m.group(1) if m else da_text
    answers: Dict[int, str] = {}
    for num, ans in re.findall(r"(\d{1,2})\.\s*([A-D])", block):
        answers[int(num)] = ans.upper()
    return answers


def parse_2016_mcqs(q_text: str, ans_map: Dict[int, str], topic: str) -> Tuple[List[dict], int]:
    results: List[dict] = []
    skipped = 0

    # Split by Question N. or Câu N.
    pattern = re.compile(r"(?:Question|Câu)\s+(\d{1,2})\.\s*(.*?)(?=(?:Question|Câu)\s+\d{1,2}\.|$)", re.S)
    for match in pattern.finditer(q_text):
        num = int(match.group(1))
        body = clean_ws(match.group(2))
        # Remove page footers
        body = re.sub(r"Trang\s+\d+/\d+.*", "", body).strip()

        if num not in ans_map:
            skipped += 1
            continue

        # Parse A. ... B. ... C. ... D. ...
        opt_match = re.search(r"\bA\.\s*(.*?)\s*\bB\.\s*(.*?)\s*\bC\.\s*(.*?)\s*\bD\.\s*(.*)", body, re.S)
        if not opt_match:
            skipped += 1
            continue

        q_prompt = body[:opt_match.start()].strip()
        opt_a = clean_ws(opt_match.group(1))
        opt_b = clean_ws(opt_match.group(2))
        opt_c = clean_ws(opt_match.group(3))
        opt_d = clean_ws(opt_match.group(4))

        if not all([q_prompt, opt_a, opt_b, opt_c, opt_d]):
            skipped += 1
            continue
        if has_image_dependency(q_prompt) or not is_clean_text(q_prompt):
            skipped += 1
            continue

        subject = classify_mcq_subject(q_prompt)
        correct = ans_map[num]
        results.append({
            "id": f"tdn2016_q{num}",
            "subject": subject,
            "topic": topic,
            "type": "mcq",
            "question": q_prompt,
            "options": [f"A. {opt_a}", f"B. {opt_b}", f"C. {opt_c}", f"D. {opt_d}"],
            "correct_answer": correct,
            "explanation": f"Đáp án chuẩn theo đề khảo sát Trần Đại Nghĩa 2016 (Mã đề 132) là {correct}.",
            "points": 1.0,
        })
    return results, skipped


def parse_numbered_essays(
    q_text: str,
    da_text: str,
    subject: str,
    topic: str,
    prefix: str,
    marker: str = "Bài"
) -> Tuple[List[dict], int]:
    results: List[dict] = []
    skipped = 0

    q_pat = re.compile(rf"{marker}\s+(\d+)\.\s*(?:\([^)]+\))?\s*(.*?)(?={marker}\s+\d+\.|$)", re.S)
    da_pat = re.compile(rf"{marker}\s+(\d+)\.\s*(?:\([^)]+\))?\s*(.*?)(?={marker}\s+\d+\.|$)", re.S)

    da_map: Dict[int, str] = {}
    for m in da_pat.finditer(da_text):
        idx = int(m.group(1))
        ans_body = clean_ws(m.group(2))
        ans_body = re.sub(r"Trang\s+\d+/\d+.*", "", ans_body).strip()
        if len(ans_body) > 10:
            da_map[idx] = ans_body[:500]

    for m in q_pat.finditer(q_text):
        idx = int(m.group(1))
        prompt = clean_ws(m.group(2))
        prompt = re.sub(r"Trang\s+\d+/\d+.*", "", prompt).strip()
        # Trim dotted answer lines
        prompt = re.sub(r"\.{5,}", "______", prompt)

        if has_image_dependency(prompt) or not is_clean_text(prompt) or len(prompt) < 30:
            skipped += 1
            continue
        if idx not in da_map:
            skipped += 1
            continue

        results.append({
            "id": f"{prefix}_{idx}",
            "subject": subject,
            "topic": topic,
            "type": "essay",
            "question": prompt[:900],
            "guide": "Đọc kỹ đề bài, phân tích dữ kiện và trình bày các bước giải rõ ràng.",
            "correct_answer": da_map[idx][:350],
            "explanation": da_map[idx][:450],
            "points": 2.0,
        })
    return results, skipped


def parse_hcm_2020_essays(text: str, topic: str) -> Tuple[List[dict], int]:
    """Parse Sở GD&ĐT TP.HCM 2020 combined answer-key PDF."""
    results: List[dict] = []
    skipped = 0

    # Extract Question/Câu blocks with embedded answers
    pat = re.compile(r"(?:Question|Câu|Bài)\s+(\d+)\s*[:.]\s*(.*?)(?=(?:Question|Câu|Bài)\s+\d+\s*[:.]|$)", re.S)
    for m in pat.finditer(text):
        idx = int(m.group(1))
        block = clean_ws(m.group(2))
        if has_image_dependency(block) or not is_clean_text(block) or len(block) < 40:
            skipped += 1
            continue

        # Split question vs answer if "Đáp án" or "Hướng dẫn" appears
        parts = re.split(r"(?:Đáp án|Hướng dẫn chấm|Answer)\s*[:.]?", block, maxsplit=1, flags=re.I)
        if len(parts) < 2:
            skipped += 1
            continue
        q_part = clean_ws(parts[0])[:800]
        a_part = clean_ws(parts[1])[:400]
        if len(q_part) < 20 or len(a_part) < 3:
            skipped += 1
            continue

        subj = classify_mcq_subject(q_part)
        results.append({
            "id": f"hcm2020_q{idx}",
            "subject": subj,
            "topic": topic,
            "type": "essay",
            "question": q_part,
            "guide": "Vận dụng kiến thức trọng tâm Lớp 5 để giải quyết tình huống thực tế.",
            "correct_answer": a_part,
            "explanation": a_part,
            "points": 2.0,
        })
    return results, skipped


def load_existing_keys(ts_path: str) -> Set[str]:
    if not os.path.exists(ts_path):
        return set()
    content = open(ts_path, "r", encoding="utf-8").read()
    keys: Set[str] = set()
    for m in re.finditer(r"question:\s*(['\"`])((?:\\.|(?!\1).)*)\1", content, re.S):
        keys.add(normalize_key(m.group(2)))
    return keys


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
    if q.get("guide"):
        lines.append(f"    guide: {ts_escape(q['guide'])},")
    lines.append(f"    correct_answer: {ts_escape(q['correct_answer'])},")
    lines.append(f"    explanation: {ts_escape(q['explanation'])},")
    lines.append(f"    points: {q.get('points', 1.0)}")
    lines.append("  }")
    return "\n".join(lines)


def append_to_seed_file(ts_path: str, new_questions: List[dict]) -> int:
    if not new_questions:
        return 0
    existing_keys = load_existing_keys(ts_path)
    unique_qs: List[dict] = []
    for q in new_questions:
        k = normalize_key(q["question"])
        if k and k not in existing_keys:
            existing_keys.add(k)
            unique_qs.append(q)

    if not unique_qs:
        return 0

    content = open(ts_path, "r", encoding="utf-8").read()
    idx = content.rfind("];")
    if idx == -1:
        raise RuntimeError(f"Không tìm thấy '];' cuối file {ts_path}")

    formatted = ",\n".join(format_ts_question(q) for q in unique_qs)
    before = content[:idx].rstrip()
    if not before.endswith(","):
        before += ","
    updated = before + "\n" + formatted + "\n];\n"
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(updated)
    return len(unique_qs)


def main() -> None:
    ensure_temp_dir()
    sources = {
        "2016_tn": "https://onthitdn.com/de-thi-cac-nam/2016/2016-trac-nghiem.pdf",
        "2016_da": "https://onthitdn.com/de-thi-cac-nam/2016/2016-dap-an.pdf",
        "2023_toan": "https://onthitdn.com/de-thi-cac-nam/2023/2023-toan-logic.pdf",
        "2023_toan_da": "https://onthitdn.com/de-thi-cac-nam/2023/2023-toan-logic-dap-an.pdf",
        "2023_van": "https://onthitdn.com/de-thi-cac-nam/2023/2023-lam-van.pdf",
        "2023_van_da": "https://onthitdn.com/de-thi-cac-nam/2023/2023-lam-van-dap-an.pdf",
        "2023_en": "https://onthitdn.com/de-thi-cac-nam/2023/2023-tu-luan-tieng-anh.pdf",
        "2023_en_da": "https://onthitdn.com/de-thi-cac-nam/2023/2023-tieng-anh-dap-an.pdf",
        "2022_toan": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-de-tu-luan-toan-hoc-va-tu-duy-logic-1656237929519.pdf",
        "2022_toan_da": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-dap-an-de-tu-luan-toan-hoc-va-tu-duy-logic-dap-an-1656237490338.pdf",
        "2022_van": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-de-tu-luan-doc-hieu-va-lam-van-1656237651097.pdf",
        "2022_van_da": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-dap-an-de-tu-luan-doc-hieu-va-lam-van-dap-an-1656237437280.pdf",
        "2022_en": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-de-tu-luan-tieng-anh-1656237753149.pdf",
        "2022_en_da": "https://onthitdn.com/de-thi-cac-nam/2022/khao-sat-6-tdn-de-tu-luan-tieng-anh-dap-an-1656237704614.pdf",
        "hcm_2020_da": "https://onthitdn.com/de-thi-cac-nam/2020/de_tu_luan_-_vesion_3_final-_dap_an_287202018.pdf",
    }

    paths: Dict[str, str] = {}
    for key, url in sources.items():
        p = download_pdf(f"{key}.pdf", url)
        if p:
            paths[key] = p

    extracted: List[dict] = []
    total_skipped = 0

    # 1. 2016 MCQs (Trần Đại Nghĩa)
    if "2016_tn" in paths and "2016_da" in paths:
        ans_map = parse_2016_answer_key(read_pdf_text(paths["2016_da"]))
        qs, sk = parse_2016_mcqs(read_pdf_text(paths["2016_tn"]), ans_map, "Bài thi chuẩn của Trần Đại Nghĩa")
        extracted.extend(qs)
        total_skipped += sk

    # 2. 2022 & 2023 Toán Logic (Trần Đại Nghĩa)
    for yr in ["2023", "2022"]:
        if f"{yr}_toan" in paths and f"{yr}_toan_da" in paths:
            qs, sk = parse_numbered_essays(
                read_pdf_text(paths[f"{yr}_toan"]),
                read_pdf_text(paths[f"{yr}_toan_da"]),
                "Toán",
                "Bài thi chuẩn của Trần Đại Nghĩa",
                f"tdn{yr}_toan",
                marker="Bài",
            )
            extracted.extend(qs)
            total_skipped += sk

    # 3. 2022 & 2023 Văn (Trần Đại Nghĩa)
    for yr in ["2023", "2022"]:
        if f"{yr}_van" in paths and f"{yr}_van_da" in paths:
            qs, sk = parse_numbered_essays(
                read_pdf_text(paths[f"{yr}_van"]),
                read_pdf_text(paths[f"{yr}_van_da"]),
                "Tiếng Việt",
                "Bài thi chuẩn của Trần Đại Nghĩa",
                f"tdn{yr}_van",
                marker="Câu",
            )
            extracted.extend(qs)
            total_skipped += sk

    # 4. 2022 & 2023 Tiếng Anh (Trần Đại Nghĩa)
    for yr in ["2023", "2022"]:
        if f"{yr}_en" in paths and f"{yr}_en_da" in paths:
            qs, sk = parse_numbered_essays(
                read_pdf_text(paths[f"{yr}_en"]),
                read_pdf_text(paths[f"{yr}_en_da"]),
                "Tiếng Anh",
                "Bài thi chuẩn của Trần Đại Nghĩa",
                f"tdn{yr}_en",
                marker="Question",
            )
            extracted.extend(qs)
            total_skipped += sk

    # 5. Sở GD&ĐT TP.HCM 2020
    if "hcm_2020_da" in paths:
        qs, sk = parse_hcm_2020_essays(read_pdf_text(paths["hcm_2020_da"]), "Bài thi chuẩn của Hồ Chí Minh")
        extracted.extend(qs)
        total_skipped += sk

    by_subject: Dict[str, List[dict]] = {"Toán": [], "Tiếng Việt": [], "Tiếng Anh": []}
    for q in extracted:
        if q["subject"] in by_subject:
            by_subject[q["subject"]].append(q)

    added_math = append_to_seed_file(os.path.join(DATA_DIR, "mathSeed.ts"), by_subject["Toán"])
    added_vi = append_to_seed_file(os.path.join(DATA_DIR, "vietnameseSeed.ts"), by_subject["Tiếng Việt"])
    added_en = append_to_seed_file(os.path.join(DATA_DIR, "flyersSeed.ts"), by_subject["Tiếng Anh"])

    print("=== KẾT QUẢ BÓC TÁCH & NẠP ĐỀ ===")
    print(f"Toán (mathSeed.ts):        +{added_math} câu mới (trích xuất {len(by_subject['Toán'])})")
    print(f"Tiếng Việt (vietnamese):   +{added_vi} câu mới (trích xuất {len(by_subject['Tiếng Việt'])})")
    print(f"Tiếng Anh (flyersSeed.ts): +{added_en} câu mới (trích xuất {len(by_subject['Tiếng Anh'])})")
    print(f"Số câu bỏ qua (ảnh/thiếu đáp án): {total_skipped}")


if __name__ == "__main__":
    main()
