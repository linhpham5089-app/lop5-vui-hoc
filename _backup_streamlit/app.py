"""
Ứng dụng Web Quản lý Học tập & Gia sư AI Lớp 5
Hỗ trợ:
1. Đổi bài tập tự động theo từng lần đăng nhập / phiên làm bài.
2. Tự động lưu nháp câu trả lời và khôi phục bài làm dở (in_progress).
3. Lưu trữ toàn bộ lịch sử bài đã làm và xem lại chi tiết (completed).
4. Chuẩn 10 bài Toán (thang 10) & Lộ trình Cambridge A2 Flyers.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import json
import time
import os
from pathlib import Path

from config import SUBJECTS, KID_FRIENDLY_CSS
import database as db
import ai_service as ai
import tts_service as tts

def load_env_key():
    """
    Tự động đọc GEMINI_API_KEY theo thứ tự ưu tiên chuẩn Cloud:
    1. Từ Streamlit Secrets (st.secrets["GEMINI_API_KEY"]) khi chạy trên Streamlit Cloud.
    2. Từ biến môi trường hệ thống os.environ.get("GEMINI_API_KEY").
    3. Từ tệp cấu hình .env (nếu chạy nội bộ).
    """
    # 1. Thử đọc từ Streamlit Secrets
    try:
        if hasattr(st, "secrets") and "GEMINI_API_KEY" in st.secrets:
            sec_val = str(st.secrets["GEMINI_API_KEY"]).strip()
            if sec_val and sec_val != "dien_api_key_cua_ban_vao_day":
                return sec_val
    except Exception:
        pass

    # 2. Thử đọc từ biến môi trường hệ thống
    env_val = os.environ.get("GEMINI_API_KEY", "").strip()
    if env_val and env_val != "dien_key_cua_ban_vao_day" and env_val != "dien_api_key_cua_ban_vao_day":
        return env_val

    # 3. Thử đọc từ tệp .env nội bộ
    env_file = Path(__file__).parent / ".env"
    if env_file.exists():
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        v = v.strip().strip("'\"")
                        if k.strip() == "GEMINI_API_KEY" and v and v not in ["dien_key_cua_ban_vao_day", "dien_api_key_cua_ban_vao_day"]:
                            return v
        except Exception:
            pass
            
    return ""

# Thiết lập cấu hình trang
st.set_page_config(
    page_title="Học Cùng AI - Lớp 5",
    page_icon="🎒",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Áp dụng CSS giao diện thân thiện
st.markdown(KID_FRIENDLY_CSS, unsafe_allow_html=True)

# Khởi tạo database
db.init_db()
db.init_today_assignments_if_needed()

# Quản lý điều hướng động (Tách biệt biến trạng thái và widget key theo chuẩn Streamlit)
if "current_page" not in st.session_state:
    st.session_state["current_page"] = "🏠 Bảng Điều Khiển (Dashboard)"

def set_active_page(page_name: str):
    """Điều hướng trang an toàn: chỉ cập nhật current_page và rerun, không gán vào widget key."""
    st.session_state["current_page"] = page_name
    st.rerun()

def on_nav_change():
    """Callback khi người dùng chọn trực tiếp menu trên sidebar."""
    if "_sidebar_nav_radio" in st.session_state:
        st.session_state["current_page"] = st.session_state["_sidebar_nav_radio"]

# --- SIDEBAR ---
with st.sidebar:
    st.markdown("""
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #6C5CE7; margin-bottom: 2px;">🎒 LỚP 5 VUI HỌC</h1>
            <p style="color: #636E72; font-size: 0.95rem;">Trợ lý Học tập & Gia sư AI Thông minh</p>
            <div class="badge-star">⭐ Cấp độ: Học sinh Lớp 5 ⭐</div>
        </div>
        <hr style="margin: 12px 0;">
    """, unsafe_allow_html=True)

    menu_options = [
        "🏠 Bảng Điều Khiển (Dashboard)",
        "📝 Luyện Tập & Tạo Bài Tập",
        "🦉 Gia Sư AI Gợi Mở (Hỏi - Đáp)",
        "📜 Bài Tập Đã Làm & Xem Lại",
        "🎮 Đố Vui Trí Tuệ",
        "📊 Báo Cáo Tiến Độ Học Tập"
    ]
    
    current_page = st.session_state["current_page"]

    # Đồng bộ giá trị khởi tạo của radio key TRƯỚC KHI widget được render
    if "_sidebar_nav_radio" not in st.session_state or st.session_state["_sidebar_nav_radio"] != current_page:
        st.session_state["_sidebar_nav_radio"] = current_page

    st.radio(
        "📌 Chọn Chức Năng:", 
        menu_options, 
        key="_sidebar_nav_radio",
        on_change=on_nav_change
    )
    menu = st.session_state["current_page"]

    st.markdown("<hr style='margin: 15px 0;'>", unsafe_allow_html=True)
    st.markdown("### ⚙️ Cài đặt Trí tuệ Nhân tạo")
    env_gemini_key = load_env_key()
    api_key_input = st.text_input(
        "Khóa Gemini API (Tùy chọn):",
        value=env_gemini_key if env_gemini_key else "",
        type="password",
        placeholder="AIzaSy...",
        help="Được tự động nạp từ file .env hoặc bạn có thể nhập trực tiếp tại đây!"
    )
    if api_key_input and api_key_input.strip() and api_key_input != "dien_key_cua_ban_vao_day":
        st.session_state["gemini_api_key"] = api_key_input.strip()
        st.success("✅ Đã kết nối Gemini API!")
    else:
        st.session_state["gemini_api_key"] = None
        st.info("💡 Đang dùng **Chế độ Offline / Kho Đề Chuẩn**.")

    st.markdown("""
        <div style="margin-top: 20px; padding: 12px; background: #FFF9DB; border-radius: 10px; font-size: 0.85rem; color: #7F5F00;">
            <b>4 Môn Học Trọng Tâm:</b><br>
            📐 Toán học (Chuẩn 10 bài)<br>
            🇬🇧 Tiếng Anh (Cambridge Flyers)<br>
            📖 Tiếng Việt & Luyện từ<br>
            🇨🇳 Tiếng Trung Bính âm
        </div>
    """, unsafe_allow_html=True)

    # Mục Đồng bộ & Sao lưu dữ liệu (Dành cho Cloud & Đa thiết bị)
    st.markdown("<hr style='margin: 18px 0 12px 0;'>", unsafe_allow_html=True)
    with st.expander("☁️ Đồng Bộ & Sao Lưu Dữ Liệu"):
        st.caption("Sao lưu điểm số, bài tập và sao trí tuệ về điện thoại/máy tính để bảo toàn dữ liệu khi chạy trên Cloud.")
        
        # 1. Nút Tải xuống file sao lưu JSON
        backup_json_str = db.export_database_json()
        timestamp_str = datetime.now().strftime("%Y%m%d_%H%M")
        st.download_button(
            label="📥 Tải Về Bản Sao Lưu (.json)",
            data=backup_json_str,
            file_name=f"lop5_ai_tutor_backup_{timestamp_str}.json",
            mime="application/json",
            use_container_width=True
        )

        # 2. Tải lên để khôi phục
        uploaded_backup = st.file_uploader("Khôi phục từ tệp sao lưu:", type=["json"], key="uploader_restore_db")
        if uploaded_backup is not None:
            if st.button("🔄 Khôi Phục Dữ Liệu Ngay", type="primary", use_container_width=True):
                try:
                    content_str = uploaded_backup.getvalue().decode("utf-8")
                    ok = db.import_database_json(content_str)
                    if ok:
                        st.success("🎉 Khôi phục dữ liệu học tập thành công!")
                        time.sleep(1)
                        st.rerun()
                    else:
                        st.error("❌ Tệp sao lưu không đúng định dạng.")
                except Exception as ex:
                    st.error(f"❌ Lỗi khi đọc tệp: {ex}")


# ==============================================================================
# 1. BẢNG ĐIỀU KHIỂN LỊCH HỌC (DASHBOARD)
# ==============================================================================
if menu == "🏠 Bảng Điều Khiển (Dashboard)":
    today_dt = datetime.now()
    today_str = today_dt.strftime("%Y-%m-%d")
    weekday_map = {0: "Thứ Hai", 1: "Thứ Ba", 2: "Thứ Tư", 3: "Thứ Năm", 4: "Thứ Sáu", 5: "Thứ Bảy", 6: "Chủ Nhật"}
    today_vn = f"{weekday_map.get(today_dt.weekday(), 'Thứ Hai')}, {today_dt.strftime('%d/%m/%Y')}"

    st.markdown(f"## 📅 Bảng Điều Khiển Học Tập - {today_vn}")
    st.caption("Theo dõi nhiệm vụ học tập được giao trong ngày, chuỗi ngày học liên tục và thời khóa biểu.")

    # 1. Widget Streak & Điểm thưởng & Đếm ngược
    streak_count = db.calculate_streak()
    col_cd1, col_cd2 = st.columns([2, 1])
    with col_cd1:
        st.markdown(f"""
            <div class="countdown-box">
                <h3 style="margin:0; font-size:1.3rem;">⏰ Tiết Học Tiếp Theo</h3>
                <h1 style="margin: 4px 0; font-size: 2.1rem; font-weight: 800;">19:30 - Hôm nay</h1>
                <p style="margin:0; font-size: 1.05rem;">Môn học: <b>📐 Toán - Số thập phân và chuyển động</b></p>
                <p style="margin: 4px 0 0 0; font-size: 0.9rem; opacity: 0.9;">Hãy chuẩn bị vở nháp, thước kẻ và bút sẵn sàng nhé!</p>
            </div>
        """, unsafe_allow_html=True)

    with col_cd2:
        streak_badge = "🔥" if streak_count > 0 else "🌱"
        st.markdown(f"""
            <div class="kid-card" style="text-align: center; border: 2px solid #FFD166;">
                <h4 style="margin-top:0; color:#2C3E50;">{streak_badge} Chuỗi Học Liên Tục</h4>
                <h1 style="color:#E67E22; margin: 4px 0;">{streak_count} Ngày</h1>
                <p style="color:#7F8C8D; font-size:0.85rem; margin:0;">Hoàn thành 100% nhiệm vụ hôm nay để nối dài chuỗi nhé!</p>
            </div>
        """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # =========================================================================
    # 2. KHU VỰC "BÀI TẬP ĐƯỢC GIAO HÔM NAY" (YÊU CẦU 2 & 3)
    # =========================================================================
    today_assignments = db.get_daily_assignments(today_str)
    total_assigned = len(today_assignments)
    completed_assigned = sum(1 for t in today_assignments if t["status"] == "completed")
    in_prog_assigned = sum(1 for t in today_assignments if t["status"] == "in_progress")
    pct_done = int((completed_assigned / total_assigned) * 100) if total_assigned > 0 else 0

    st.markdown(f"""
        <div style="background: linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%); color: white; border-radius: 14px; padding: 16px 20px; box-shadow: 0 4px 15px rgba(108, 92, 231, 0.25);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin: 0; font-size: 1.3rem;">🎯 BÀI TẬP ĐƯỢC GIAO HÔM NAY</h3>
                    <p style="margin: 4px 0 0 0; font-size: 0.95rem; opacity: 0.95;">
                        Ngày: <b>{today_vn}</b> &bull; Tiến độ: <b>{completed_assigned}/{total_assigned}</b> nhiệm vụ ({pct_done}%)
                    </p>
                </div>
                <div style="font-size: 2.2rem;">{'🎉' if pct_done == 100 else '📚'}</div>
            </div>
        </div>
    """, unsafe_allow_html=True)

    st.progress(pct_done / 100, text=f"Đã hoàn thành {completed_assigned}/{total_assigned} nhiệm vụ hôm nay")

    # Danh sách từng nhiệm vụ hôm nay
    for t in today_assignments:
        sub_icon = SUBJECTS.get(t["subject"], {}).get("icon", "📘")
        t_id = t["id"]
        t_status = t["status"]
        t_score = t.get("score", 0.0)
        t_completed_at = t.get("completed_at", "")
        t_session_id = t.get("session_id")

        with st.container():
            c_task1, c_task2, c_task3 = st.columns([3, 2, 1.5])
            with c_task1:
                st.markdown(f"#### {sub_icon} {t['subject']}")
                st.markdown(f"**Chủ đề:** *{t['topic']}*")
            
            with c_task2:
                if t_status == "completed":
                    comp_time = t_completed_at[11:16] if t_completed_at and len(t_completed_at) >= 16 else ""
                    st.markdown(f"""
                        <div style="background:#E8F8F5; border-left:4px solid #2ECC71; padding:6px 12px; border-radius:6px; margin-top:8px;">
                            <b style="color:#27AE60;">✅ ĐÃ HOÀN THÀNH</b><br>
                            <span style="font-size:0.9rem;">Điểm: <b>{t_score}/10.0 đ</b> {f'(Lúc {comp_time})' if comp_time else ''}</span>
                        </div>
                    """, unsafe_allow_html=True)
                elif t_status == "in_progress":
                    ans_c = t.get("answered_count", 0)
                    tot_q = t.get("total_questions", 10 if t["subject"] == "Toán" else 5)
                    st.markdown(f"""
                        <div style="background:#FFF9DB; border-left:4px solid #F39C12; padding:6px 12px; border-radius:6px; margin-top:8px;">
                            <b style="color:#D35400;">📝 ĐANG LÀM DỞ</b><br>
                            <span style="font-size:0.9rem;">Tiến độ: <b>{ans_c}/{tot_q} câu</b></span>
                        </div>
                    """, unsafe_allow_html=True)
                else:
                    st.markdown("""
                        <div style="background:#F2F3F4; border-left:4px solid #BDC3C7; padding:6px 12px; border-radius:6px; margin-top:8px;">
                            <b style="color:#7F8C8D;">⏳ CHƯA LÀM</b><br>
                            <span style="font-size:0.9rem;">Sẵn sàng làm bài</span>
                        </div>
                    """, unsafe_allow_html=True)

            with c_task3:
                st.markdown("<div style='height: 10px;'></div>", unsafe_allow_html=True)
                if t_status == "completed":
                    if st.button("🔍 Xem lại bài", key=f"view_comp_{t_id}", use_container_width=True):
                        st.session_state["review_target_session_id"] = t_session_id
                        set_active_page("📜 Bài Tập Đã Làm & Xem Lại")
                elif t_status == "in_progress":
                    if st.button("👉 Làm tiếp", key=f"resume_task_{t_id}", type="primary", use_container_width=True):
                        st.session_state["resume_session_id"] = t_session_id
                        set_active_page("📝 Luyện Tập & Tạo Bài Tập")
                else:
                    if st.button("🚀 Bắt đầu làm", key=f"start_task_{t_id}", type="primary", use_container_width=True):
                        # Khởi tạo session mới cho nhiệm vụ này
                        with st.spinner("Đang chuẩn bị đề bài..."):
                            api_key = st.session_state.get("gemini_api_key")
                            new_sess = ai.start_new_study_session(t["subject"], t["topic"], api_key)
                            db.link_assignment_session(t_id, new_sess["session_id"])
                            st.session_state["current_quiz"] = new_sess
                            st.session_state["active_session_id"] = new_sess["session_id"]
                            st.session_state["active_assignment_id"] = t_id
                            st.session_state["quiz_submitted"] = False
                            st.session_state["quiz_result"] = None
                            set_active_page("📝 Luyện Tập & Tạo Bài Tập")

            st.markdown("<hr style='margin: 8px 0;'>", unsafe_allow_html=True)

    # Phụ huynh giao thêm bài
    with st.expander("➕ Dành Cho Phụ Huynh: Giao Thêm Bài Hôm Nay"):
        with st.form("add_assignment_form"):
            col_ap1, col_ap2 = st.columns(2)
            with col_ap1:
                p_sub = st.selectbox("Môn học cần giao:", list(SUBJECTS.keys()))
            with col_ap2:
                p_topic = st.text_input("Nội dung / Chủ đề bài tập:", value="Luyện tập củng cố kiến thức")
            
            p_submit = st.form_submit_button("Giao Nhiệm Vụ Ngay")
            if p_submit:
                db.add_daily_assignment(today_str, p_sub, p_topic)
                st.success(f"🎉 Đã giao thêm nhiệm vụ môn {p_sub} cho bé!")
                st.rerun()

    st.markdown("---")

    # Hiển thị Thời khóa biểu
    st.subheader("📚 Lịch Học Trong Tuần")
    schedules = db.get_all_schedules()
    if schedules:
        df_sch = pd.DataFrame(schedules)
        days_order = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
        tab_list, tab_card = st.tabs(["🗂️ Dạng Thẻ Trực Quan", "📋 Dạng Bảng Chi Tiết"])
        
        with tab_list:
            cols = st.columns(len(days_order))
            for i, d in enumerate(days_order):
                with cols[i]:
                    st.markdown(f"<div style='text-align:center; font-weight:bold; background:#DFE6E9; padding:6px; border-radius:8px;'>{d}</div>", unsafe_allow_html=True)
                    day_items = [s for s in schedules if s["day_of_week"] == d]
                    if day_items:
                        for item in day_items:
                            sub_info = SUBJECTS.get(item["subject"], {"icon": "📘", "bg_color": "#F8F9FA", "color": "#333"})
                            st.markdown(f"""
                                <div style="background-color:{sub_info['bg_color']}; border-left: 4px solid {sub_info['color']}; padding: 8px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem;">
                                    <b>{sub_info['icon']} {item['subject']}</b><br>
                                    🕒 {item['start_time']} - {item['end_time']}<br>
                                    <i>{item['topic']}</i>
                                </div>
                            """, unsafe_allow_html=True)
                    else:
                        st.markdown("<p style='text-align:center; color:#B2BEC3; font-size:0.8rem; margin-top:10px;'>Nghỉ ngơi 🎮</p>", unsafe_allow_html=True)

        with tab_card:
            display_df = df_sch[["id", "day_of_week", "subject", "start_time", "end_time", "topic", "room"]].copy()
            display_df.columns = ["Mã", "Thứ", "Môn Học", "Bắt Đầu", "Kết Thúc", "Chủ Đề", "Địa Điểm"]
            st.dataframe(display_df, use_container_width=True, hide_index=True)

        # Banner giải trí Đố Vui Trí Tuệ trên Dashboard
        riddle_stats = db.get_riddle_stats()
        st.markdown(f"""
            <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); color: white; border-radius: 14px; padding: 16px 20px; margin-top: 25px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.25);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h3 style="margin:0; font-size:1.25rem;">🎮 GÓC NGHỈ GIẢI LAO: ĐỐ VUI TRÍ TUỆ</h3>
                        <p style="margin:4px 0 0 0; font-size:0.95rem; opacity:0.95;">
                            Thư giãn đầu óc sau giờ học với những câu đố mẹo, đố chữ, toán logic và đố vui Tiếng Anh vui nhộn!
                        </p>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:1.6rem; font-weight:bold;">⭐ {riddle_stats['stars']}</span>
                        <div style="font-size:0.85rem; opacity:0.9;">Ngôi sao trí tuệ</div>
                    </div>
                </div>
            </div>
        """, unsafe_allow_html=True)
        col_g1, col_g2 = st.columns([3, 1])
        with col_g2:
            if st.button("🚀 Vào Chơi Đố Vui Ngay!", type="primary", use_container_width=True, key="btn_go_riddles_dash"):
                set_active_page("🎮 Đố Vui Trí Tuệ")


# ==============================================================================
# 2. TRÌNH TẠO BÀI TẬP, TỰ ĐỘNG LƯU NHÁP & CHẤM ĐIỂM
# ==============================================================================
elif menu == "📝 Luyện Tập & Tạo Bài Tập":
    st.markdown("## 📝 Luyện Tập & Tạo Bài Tập Tự Động")
    st.caption("Tự động đổi câu hỏi mới theo từng phiên làm bài, lưu nháp câu trả lời tức thì và hỗ trợ khôi phục làm tiếp.")

    # 1. Kiểm tra nếu người dùng vừa bấm "Làm tiếp" một session từ Dashboard
    if "resume_session_id" in st.session_state and st.session_state["resume_session_id"]:
        sess_details = db.get_session_full_details(st.session_state["resume_session_id"])
        if sess_details:
            formatted_qs = []
            for item in sess_details["questions"]:
                formatted_qs.append({
                    "id": item["question_order"],
                    "question_id": item["question_id"],
                    "type": item["question_type"],
                    "question": item["content"],
                    "options": item["options"],
                    "correct_answer": item["correct_answer"],
                    "explanation": item["explanation"],
                    "guide": item.get("guide", ""),
                    "reference_answer": item["correct_answer"],
                    "points": item["points"],
                    "saved_answer": item["user_answer"],
                    "skill": item.get("skill"),
                    "audio_text": item.get("audio_text"),
                    "audio_prompt": item.get("audio_prompt"),
                    "phonetics_guide": item.get("phonetics_guide"),
                    "pinyin": item.get("pinyin"),
                    "vietnamese_meaning": item.get("vietnamese_meaning")
                })
            st.session_state["current_quiz"] = {
                "session_id": sess_details["session_id"],
                "subject": sess_details["subject"],
                "topic": sess_details["topic"],
                "questions": formatted_qs
            }
            st.session_state["active_session_id"] = sess_details["session_id"]
            st.session_state["quiz_submitted"] = False
            st.session_state["quiz_result"] = None
            st.info(f"🔄 Đã khôi phục bài làm dở: môn **{sess_details['subject']}** - *{sess_details['topic']}*!")
        del st.session_state["resume_session_id"]

    # Chọn môn học & chủ đề
    col_sub, col_top = st.columns([1, 2])
    with col_sub:
        selected_subject = st.selectbox(
            "Chọn môn học:",
            list(SUBJECTS.keys()),
            format_func=lambda x: f"{SUBJECTS[x]['icon']} {x}"
        )
    
    available_topics = SUBJECTS[selected_subject]["topics"]
    with col_top:
        selected_topic_choice = st.selectbox(
            "Chọn chủ đề kiến thức lớp 5:",
            available_topics + ["Tùy chỉnh chủ đề khác..."]
        )
        if selected_topic_choice == "Tùy chỉnh chủ đề khác...":
            final_topic = st.text_input("Nhập chủ đề em muốn luyện tập:", placeholder="Ví dụ: Ôn tập về từ đồng nghĩa...")
        else:
            final_topic = selected_topic_choice

    # Banner chuyên biệt
    is_math_selected = (selected_subject == "Toán")
    is_flyers_selected = (selected_subject == "Tiếng Anh") and any(k in final_topic for k in ["Cambridge", "Flyers", "A2"])
    is_4skills_selected = any(k in final_topic for k in ["4 Kỹ Năng", "Nghe - Nói - Đọc - Viết", "YCT", "HSK"]) or (selected_subject in ["Tiếng Anh", "Tiếng Trung"] and "4 Kỹ Năng" in final_topic)
    
    if is_math_selected:
        st.markdown("""
            <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; border-radius: 14px; padding: 14px 20px; margin: 10px 0 16px 0; box-shadow: 0 4px 12px rgba(30, 60, 114, 0.25);">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.15rem;">📐 BỘ ĐỀ TOÁN LỚP 5 CHUẨN 10 BÀI TOÁN (THANG ĐIỂM 10)</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.9rem; opacity: 0.95;">
                            <b>Phần 1:</b> 6 Câu Trắc nghiệm (6.0đ) &bull; <b>Phần 2:</b> 4 Bài Tự luận chấm từng bước & đơn vị đo (4.0đ).
                        </p>
                    </div>
                    <div style="font-size: 2.2rem;">📐</div>
                </div>
            </div>
        """, unsafe_allow_html=True)
    elif is_4skills_selected:
        lang_badge = "🇬🇧 Chuẩn Cambridge A2 Flyers" if selected_subject == "Tiếng Anh" else "🇨🇳 Chuẩn YCT 1-3 & HSK 1-2"
        st.markdown(f"""
            <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; border-radius: 14px; padding: 14px 20px; margin: 10px 0 16px 0; box-shadow: 0 4px 12px rgba(106, 17, 203, 0.25);">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.15rem;">🎧🎤 LUYỆN ĐỦ 4 KỸ NĂNG: NGHE - NÓI - ĐỌC - VIẾT ({lang_badge})</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.9rem; opacity: 0.95;">
                            <b>1. Nghe (2.5đ):</b> Phát âm bản xứ edge-tts &bull; <b>2. Nói (2.5đ):</b> Thu âm chấm phát âm AI &bull; <b>3. Đọc (2.5đ):</b> Đọc hiểu (Pinyin toggle) &bull; <b>4. Viết (2.5đ):</b> Sắp xếp từ & viết đoạn.
                        </p>
                    </div>
                    <div style="font-size: 2.2rem;">🌟</div>
                </div>
            </div>
        """, unsafe_allow_html=True)
    elif is_flyers_selected:
        st.markdown("""
            <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 14px; padding: 14px 20px; margin: 10px 0 16px 0; box-shadow: 0 4px 12px rgba(17, 153, 142, 0.25);">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.15rem;">🏆 LỘ TRÌNH LUYỆN THI CAMBRIDGE A2 FLYERS</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.9rem; opacity: 0.95;">
                            Chuẩn 5 dạng bài thi quốc tế: <b>Định nghĩa từ vựng</b>, <b>Hội thoại</b>, <b>Ngữ pháp A2</b>, <b>Đọc hiểu Cloze</b> & <b>Open Cloze</b>.
                        </p>
                    </div>
                    <div style="font-size: 2.2rem;">✈️</div>
                </div>
            </div>
        """, unsafe_allow_html=True)

    col_btn1, col_btn2 = st.columns([1, 1])
    with col_btn1:
        btn_label = "✨ Tạo Bộ Đề Mới (Đổi Câu Hỏi Tự Động)"
        generate_btn = st.button(btn_label, type="primary", use_container_width=True)
    with col_btn2:
        quick_btn = st.button("⚡ Bốc Đề Nhanh Từ Ngân Hàng Câu Hỏi", use_container_width=True)

    # Xử lý sinh bài tập có quản lý phiên làm bài
    if generate_btn or quick_btn:
        with st.spinner("🤖 Đang kiểm tra ngân hàng câu hỏi và tạo phiên bài tập mới..."):
            api_key = None if quick_btn else st.session_state.get("gemini_api_key")
            session_quiz = ai.start_new_study_session(selected_subject, final_topic, api_key)
            st.session_state["current_quiz"] = session_quiz
            st.session_state["active_session_id"] = session_quiz.get("session_id")
            st.session_state["quiz_submitted"] = False
            st.session_state["quiz_result"] = None
            st.success(f"🎉 Đã khởi tạo bài tập mới! Mã phiên: `{session_quiz.get('session_id')}`")
            st.rerun()

    # Hiển thị bài tập hiện tại
    if "current_quiz" in st.session_state and st.session_state["current_quiz"]:
        quiz = st.session_state["current_quiz"]
        is_math_exam = (quiz["subject"] == "Toán")
        is_4skills_exam = any(q.get("skill") for q in quiz["questions"])
        session_id = st.session_state.get("active_session_id", quiz.get("session_id"))

        st.markdown("---")
        st.markdown(f"### 📋 Đề Kiểm Tra Môn: {SUBJECTS.get(quiz['subject'], {}).get('icon', '')} {quiz['subject']}")
        
        info_col1, info_col2 = st.columns([3, 1])
        with info_col1:
            if is_math_exam:
                st.markdown(f"**Chủ đề:** *{quiz['topic']}* | **Quy mô chuẩn:** 6 Trắc nghiệm (6.0đ) + 4 Tự luận (4.0đ) = 10 Điểm")
            elif is_4skills_exam:
                st.markdown(f"**Chủ đề:** *{quiz['topic']}* | **Luyện đủ 4 kỹ năng:** 🎧 Nghe (2.5đ) &bull; 🎤 Nói (2.5đ) &bull; 📖 Đọc (2.5đ) &bull; ✍️ Viết (2.5đ) = 10 Điểm")
            else:
                st.markdown(f"**Chủ đề:** *{quiz['topic']}* | **Quy mô:** 3 Trắc nghiệm (6.0đ) + 2 Tự luận (4.0đ) = 10 Điểm")
        with info_col2:
            st.caption(f"🔖 Phiên: `{session_id}`" if session_id else "")

        # Nút Toggle phiên âm Pinyin nếu là môn Tiếng Trung
        show_pinyin = True
        if quiz["subject"] == "Tiếng Trung":
            show_pinyin = st.toggle("🔍 Hiển thị phiên âm Pinyin (Tắt nút này để thử thách nhận diện chữ Hán thuần túy)", value=True)

        # Form làm bài có hỗ trợ tự động lưu nháp
        with st.form("exam_form"):
            user_answers = {}
            audio_inputs = {}

            for q in quiz["questions"]:
                q_id = q["id"]
                pts = q.get("points", 1.0 if is_math_exam else (2.5 if is_4skills_exam else 2.0))
                saved_ans = q.get("saved_answer", "")
                skill = q.get("skill")

                # Phân cách phần thi Toán
                if is_math_exam:
                    if q_id == 1:
                        st.markdown("### 📌 PHẦN 1: TRẮC NGHIỆM (Câu 1 đến Câu 6 - 6.0 điểm, mỗi câu 1.0 điểm)")
                        st.caption("Em hãy chọn 1 đáp án đúng nhất cho mỗi câu hỏi bên dưới:")
                    elif q_id == 7:
                        st.markdown("<hr style='margin: 25px 0 15px 0;'>", unsafe_allow_html=True)
                        st.markdown("### ✍️ PHẦN 2: TỰ LUẬN (Câu 7 đến Câu 10 - 4.0 điểm, mỗi câu 1.0 điểm)")
                        st.caption("Yêu cầu: Trình bày bài giải rõ ràng các bước: Lời giải - Phép tính - Đáp số kèm Đơn vị đo.")

                # Phân cách chuyên biệt cho Bộ đề 4 Kỹ Năng
                if is_4skills_exam:
                    if skill == "listening":
                        st.markdown("""
                            <div style="background: #EBF5FB; border-left: 5px solid #3498DB; padding: 10px 14px; border-radius: 8px; margin: 15px 0 10px 0;">
                                <h4 style="margin: 0; color: #2980B9;">🎧 PHẦN 1: KỸ NĂNG NGHE (LISTENING) - 2.5 ĐIỂM</h4>
                                <span style="font-size: 0.9rem; color: #555;">Bấm nút phát âm thanh bên dưới để nghe giọng bản xứ chuẩn và chọn đáp án chính xác:</span>
                            </div>
                        """, unsafe_allow_html=True)
                    elif skill == "speaking":
                        st.markdown("""
                            <div style="background: #FEF9E7; border-left: 5px solid #F39C12; padding: 10px 14px; border-radius: 8px; margin: 20px 0 10px 0;">
                                <h4 style="margin: 0; color: #D68910;">🎤 PHẦN 2: KỸ NĂNG NÓI (SPEAKING) - 2.5 ĐIỂM</h4>
                                <span style="font-size: 0.9rem; color: #555;">Đọc to câu mẫu bên dưới, bấm biểu tượng micro để thu âm giọng nói của em:</span>
                            </div>
                        """, unsafe_allow_html=True)
                    elif skill == "reading":
                        st.markdown("""
                            <div style="background: #EAFAF1; border-left: 5px solid #2ECC71; padding: 10px 14px; border-radius: 8px; margin: 20px 0 10px 0;">
                                <h4 style="margin: 0; color: #27AE60;">📖 PHẦN 3: KỸ NĂNG ĐỌC HIỂU (READING) - 2.5 ĐIỂM</h4>
                                <span style="font-size: 0.9rem; color: #555;">Đọc kỹ đoạn văn hoặc câu hỏi và chọn đáp án chính xác:</span>
                            </div>
                        """, unsafe_allow_html=True)
                    elif skill == "writing":
                        st.markdown("""
                            <div style="background: #F4ECF7; border-left: 5px solid #9B59B6; padding: 10px 14px; border-radius: 8px; margin: 20px 0 10px 0;">
                                <h4 style="margin: 0; color: #8E44AD;">✍️ PHẦN 4: KỸ NĂNG VIẾT (WRITING) - 2.5 ĐIỂM</h4>
                                <span style="font-size: 0.9rem; color: #555;">Sắp xếp từ thành câu hoàn chỉnh hoặc viết đoạn văn ngắn theo yêu cầu:</span>
                            </div>
                        """, unsafe_allow_html=True)

                # 1. Câu hỏi kỹ năng Nói (Speaking)
                if skill == "speaking":
                    ref_text = q.get("audio_text", q["question"])
                    pinyin_text = q.get("pinyin", "")
                    meaning_text = q.get("vietnamese_meaning", "")
                    phonetics = q.get("phonetics_guide", "")

                    st.markdown(f"#### Câu {q_id} (Kỹ năng Nói - {pts} điểm):")
                    prompt_label = q.get("audio_prompt") or "Em hãy đọc to và chuẩn xác câu sau:"
                    st.markdown(f"**{prompt_label}**")

                    # Khung hiển thị câu mẫu trực quan
                    pinyin_html = f"<div style='color: #2980B9; font-size: 1.15rem; font-weight: 500; margin-bottom: 4px;'>Pinyin: {pinyin_text}</div>" if (quiz["subject"] == "Tiếng Trung" and show_pinyin and pinyin_text) else ""
                    meaning_html = f"<div style='color: #7F8C8D; font-size: 0.95rem;'>Nghĩa: {meaning_text}</div>" if meaning_text else ""
                    guide_html = f"<div style='color: #D35400; font-size: 0.9rem; margin-top: 6px;'>💡 <i>Hướng dẫn phát âm: {phonetics}</i></div>" if phonetics else ""

                    st.markdown(f"""
                        <div style="background: #FFFFFF; border: 2px dashed #F39C12; border-radius: 12px; padding: 16px; margin: 10px 0;">
                            <div style="font-size: 1.45rem; font-weight: bold; color: #2C3E50; margin-bottom: 4px;">🗣️ "{ref_text}"</div>
                            {pinyin_html}
                            {meaning_html}
                            {guide_html}
                        </div>
                    """, unsafe_allow_html=True)

                    # Trình phát âm thanh mẫu để học sinh nghe trước khi nói
                    audio_fp = tts.get_or_create_audio(ref_text, quiz["subject"])
                    if audio_fp and os.path.exists(audio_fp):
                        st.caption("🔊 Bấm nghe phát âm mẫu chuẩn:")
                        st.audio(audio_fp, format="audio/mp3")

                    # Thu âm học sinh bằng st.audio_input
                    st.markdown("**🎙️ Thu âm bài đọc của em tại đây:**")
                    audio_rec = st.audio_input("Bấm micro để bắt đầu thu âm giọng nói của em:", key=f"audio_rec_{session_id}_{q_id}")
                    if audio_rec is not None:
                        audio_inputs[q_id] = audio_rec
                        st.caption("✅ Đã ghi nhận file thu âm của em!")
                    elif saved_ans:
                        st.caption(f"ℹ️ Bài làm trước đó: *{saved_ans}*")

                    user_answers[q_id] = saved_ans if saved_ans else "(Đã ghi âm giọng nói)"
                    st.markdown("<br>", unsafe_allow_html=True)

                # 2. Câu hỏi Trắc nghiệm (bao gồm cả Listening và Reading dạng MCQ)
                elif q["type"] == "mcq":
                    topic_label = f"[{q['topic_category']}] " if q.get("topic_category") else ""
                    skill_label = f" (Kỹ năng {skill.capitalize()})" if skill else ""
                    st.markdown(f"#### Câu {q_id}{skill_label} (Trắc nghiệm - {pts} điểm):")

                    # Nếu là kỹ năng Nghe -> phát audio
                    if skill == "listening" and q.get("audio_text"):
                        audio_fp = tts.get_or_create_audio(q["audio_text"], quiz["subject"])
                        if audio_fp and os.path.exists(audio_fp):
                            st.caption("🔊 Nghe đoạn phát âm dưới đây:")
                            st.audio(audio_fp, format="audio/mp3")

                    # Hiển thị Pinyin & nghĩa nếu tiếng Trung
                    if quiz["subject"] == "Tiếng Trung":
                        q_display = q["question"]
                        if not show_pinyin and q.get("pinyin"):
                            # Nếu tắt Pinyin thì chỉ giữ lại chữ Hán nếu có
                            pass
                        st.markdown(f"**{topic_label}{q_display}**")
                        if show_pinyin and q.get("pinyin"):
                            st.caption(f"🔍 Pinyin: {q['pinyin']}")
                        if q.get("vietnamese_meaning"):
                            st.caption(f"📝 Dịch nghĩa: {q['vietnamese_meaning']}")
                    else:
                        st.markdown(f"**{topic_label}{q['question']}**")

                    # Xác định index mặc định nếu có saved_answer
                    default_idx = None
                    if saved_ans and saved_ans in q["options"]:
                        default_idx = q["options"].index(saved_ans)

                    user_answers[q_id] = st.radio(
                        f"Lựa chọn đáp án cho câu {q_id}:",
                        options=q["options"],
                        key=f"mcq_{session_id}_{q_id}",
                        index=default_idx
                    )
                    st.markdown("<br>", unsafe_allow_html=True)

                # 3. Câu hỏi Tự luận (bao gồm Writing và Tự luận Toán/Tiếng Việt)
                else:
                    topic_label = f"[{q['topic_category']}] " if q.get("topic_category") else ""
                    skill_label = f" (Kỹ năng {skill.capitalize()})" if skill else ""
                    st.markdown(f"#### Câu {q_id}{skill_label} (Tự luận - {pts} điểm):")
                    
                    if quiz["subject"] == "Tiếng Trung":
                        st.markdown(f"**{topic_label}{q['question']}**")
                        if show_pinyin and q.get("pinyin"):
                            st.caption(f"🔍 Pinyin: {q['pinyin']}")
                        if q.get("vietnamese_meaning"):
                            st.caption(f"📝 Dịch nghĩa: {q['vietnamese_meaning']}")
                    else:
                        st.markdown(f"**{topic_label}{q['question']}**")

                    if "guide" in q and q["guide"]:
                        st.info(f"💡 *Gợi ý các bước:* {q['guide']}")

                    ph_text = "Em hãy gõ câu hoàn chỉnh hoặc bài làm vào đây..." if skill == "writing" else "Hãy gõ lời giải, phép tính, đáp số và đơn vị đo vào đây..."
                    user_answers[q_id] = st.text_area(
                        f"Phần bài làm của em cho câu {q_id}:",
                        value=saved_ans if saved_ans else "",
                        placeholder=ph_text,
                        key=f"essay_{session_id}_{q_id}",
                        height=120
                    )
                    st.markdown("<br>", unsafe_allow_html=True)

            btn_col1, btn_col2 = st.columns([1, 1])
            with btn_col1:
                submit_exam = st.form_submit_button("🚀 Nộp Bài & Nhận Điểm Từ AI", type="primary", use_container_width=True)
            with btn_col2:
                save_draft_btn = st.form_submit_button("💾 Lưu Nháp Bài Đang Làm (Tạm Dừng)", use_container_width=True)

            # Xử lý lưu nháp
            if save_draft_btn and session_id:
                for q in quiz["questions"]:
                    ans_val = user_answers.get(q["id"], "")
                    qb_id = q.get("question_id") or q.get("q_bank_id") or q["id"]
                    db.auto_save_draft_answer(session_id, qb_id, ans_val)
                st.success("💾 Đã lưu nháp toàn bộ câu trả lời! Em có thể yên tâm quay lại làm tiếp bất kỳ lúc nào.")

            # Xử lý nộp bài
            if submit_exam:
                with st.spinner("🧑‍🏫 Thầy/Cô AI đang chấm từng câu (Nghe, Nói, Đọc, Viết) và ghi nhận kết quả..."):
                    api_key = st.session_state.get("gemini_api_key")
                    total_mcq_correct = 0
                    mcq_score = 0.0
                    essay_total_score = 0.0
                    speaking_total_score = 0.0
                    detailed_grading = []
                    total_mcq_count = sum(1 for q in quiz["questions"] if q["type"] == "mcq")

                    for q in quiz["questions"]:
                        q_id = q["id"]
                        pts = q.get("points", 1.0 if is_math_exam else (2.5 if is_4skills_exam else 2.0))
                        skill = q.get("skill")
                        qb_id = q.get("question_id") or q.get("q_bank_id") or q_id

                        # A. Chấm Speaking
                        if skill == "speaking":
                            audio_file = audio_inputs.get(q_id)
                            audio_bytes = audio_file.getvalue() if audio_file else None
                            # Lấy mime_type từ audio_input nếu có (iOS Safari thường dùng audio/mp4 hoặc audio/wav, Chrome dùng audio/webm hoặc audio/wav)
                            audio_mime = getattr(audio_file, "type", "audio/wav") if audio_file else "audio/wav"
                            ref_text = q.get("audio_text", q["question"])
                            
                            speak_res = ai.grade_speaking_ai(ref_text, audio_bytes, quiz["subject"], api_key, mime_type=audio_mime)
                            s_score = float(speak_res.get("score", 0.0))
                            speaking_total_score += s_score

                            detailed_grading.append({
                                "id": q_id,
                                "question_id": qb_id,
                                "type": "speaking",
                                "skill": "speaking",
                                "question": q["question"],
                                "reference_text": ref_text,
                                "student_answer": speak_res.get("transcription", "Đã thu âm giọng nói"),
                                "score": s_score,
                                "max_score": pts,
                                "transcription": speak_res.get("transcription", ""),
                                "phonetic_analysis": speak_res.get("phonetic_analysis", ""),
                                "feedback": speak_res.get("feedback", ""),
                                "encouragement": speak_res.get("encouragement", "Em phát âm rất tự tin!"),
                                "audio_text": ref_text,
                                "pinyin": q.get("pinyin", ""),
                                "vietnamese_meaning": q.get("vietnamese_meaning", "")
                            })

                        # B. Chấm Trắc nghiệm (Listening & Reading MCQ)
                        elif q["type"] == "mcq":
                            student_choice = user_answers.get(q_id)
                            chosen_letter = student_choice[0] if student_choice else ""
                            is_correct = (chosen_letter == q["correct_answer"])
                            if is_correct:
                                total_mcq_correct += 1
                                mcq_score += pts

                            detailed_grading.append({
                                "id": q_id,
                                "question_id": qb_id,
                                "type": "mcq",
                                "skill": skill,
                                "question": q["question"],
                                "student_answer": student_choice if student_choice else "Chưa chọn",
                                "correct_answer": q["correct_answer"],
                                "is_correct": is_correct,
                                "explanation": q.get("explanation", ""),
                                "grammar_clue": q.get("grammar_clue", ""),
                                "encouragement": q.get("encouragement", ""),
                                "score": pts if is_correct else 0.0,
                                "max_score": pts,
                                "audio_text": q.get("audio_text", ""),
                                "pinyin": q.get("pinyin", ""),
                                "vietnamese_meaning": q.get("vietnamese_meaning", "")
                            })

                        # C. Chấm Tự luận & Writing
                        else:
                            student_text = user_answers.get(q_id, "")
                            grading_res = ai.grade_essay_ai(
                                q["question"], 
                                q.get("reference_answer", ""), 
                                student_text,
                                api_key
                            )
                            e_score = float(grading_res.get("score", 0.0))
                            essay_total_score += e_score
                            detailed_grading.append({
                                "id": q_id,
                                "question_id": qb_id,
                                "type": "essay",
                                "skill": skill,
                                "question": q["question"],
                                "student_answer": student_text,
                                "reference_answer": q.get("reference_answer", ""),
                                "score": e_score,
                                "max_score": pts,
                                "feedback": grading_res.get("feedback", ""),
                                "unit_warning": grading_res.get("unit_warning", None),
                                "grammar_clue": q.get("grammar_clue", ""),
                                "encouragement": grading_res.get("encouragement", q.get("encouragement", "")),
                                "pinyin": q.get("pinyin", ""),
                                "vietnamese_meaning": q.get("vietnamese_meaning", "")
                            })

                    final_score = round(mcq_score + essay_total_score + speaking_total_score, 1)
                    
                    if final_score >= 9.0:
                        overall_feedback = "Xuất sắc tuyệt vời! Em làm chủ 4 kỹ năng rất tốt, phát âm chuẩn và tự tin! 🌟🎉"
                    elif final_score >= 7.0:
                        overall_feedback = "Rất tốt! Em đã nắm vững các kỹ năng cơ bản. Chú ý ngữ điệu, âm đuôi hoặc thanh điệu để đạt điểm tối đa nhé! 👏"
                    elif final_score >= 5.0:
                        overall_feedback = "Khá lắm nè! Em đã cố gắng rất nhiều. Hãy cùng nghe lại phát âm mẫu để tiến bộ hơn nha! 😊"
                    else:
                        overall_feedback = "Đừng nản lòng nhé! Hãy luyện nghe và nói theo giọng đọc chuẩn mỗi ngày cùng Cú Vàng nè! 💖"

                    # Hoàn thành phiên làm bài trong study_sessions (status: completed)
                    if session_id:
                        db.complete_study_session(session_id, final_score, detailed_grading)

                    # Lưu vào quiz_history cũ để đồng bộ báo cáo
                    db.save_quiz_result(
                        quiz["subject"],
                        quiz["topic"],
                        final_score,
                        total_mcq_correct,
                        total_mcq_count,
                        round(essay_total_score + speaking_total_score, 1),
                        5.0 if is_4skills_exam else 4.0,
                        overall_feedback,
                        detailed_grading
                    )

                    st.session_state["quiz_submitted"] = True
                    st.session_state["quiz_result"] = {
                        "final_score": final_score,
                        "mcq_score": round(mcq_score, 1),
                        "mcq_correct": total_mcq_correct,
                        "mcq_total_count": total_mcq_count,
                        "essay_score": round(essay_total_score, 1),
                        "speaking_score": round(speaking_total_score, 1),
                        "is_4skills": is_4skills_exam,
                        "overall_feedback": overall_feedback,
                        "details": detailed_grading
                    }
                    st.rerun()

        # Hiển thị kết quả chấm điểm sau khi nộp
        if st.session_state.get("quiz_submitted") and st.session_state.get("quiz_result"):
            res = st.session_state["quiz_result"]
            st.markdown("---")
            st.markdown("## 🏆 KẾT QUẢ BÀI LÀM CỦA EM")
            
            if res["final_score"] >= 8.0:
                st.balloons()
            else:
                st.snow()

            if res.get("is_4skills"):
                c1, c2, c3, c4 = st.columns(4)
                with c1:
                    st.metric(label="Tổng Điểm (Thang 10)", value=f"{res['final_score']} / 10.0")
                with c2:
                    st.metric(label="Nghe & Đọc (MCQ)", value=f"{res['mcq_score']} / 5.0 đ")
                with c3:
                    st.metric(label="Kỹ Năng Nói (Speaking)", value=f"{res.get('speaking_score', 0.0)} / 2.5 đ")
                with c4:
                    st.metric(label="Kỹ Năng Viết (Writing)", value=f"{res['essay_score']} / 2.5 đ")
            else:
                c1, c2, c3 = st.columns(3)
                with c1:
                    st.metric(label="Tổng Điểm (Thang 10)", value=f"{res['final_score']} / 10.0")
                with c2:
                    mcq_cnt = res.get('mcq_total_count', 3)
                    st.metric(label=f"Điểm Trắc Nghiệm ({mcq_cnt} câu)", value=f"{res['mcq_score']} / 6.0 đ ({res['mcq_correct']}/{mcq_cnt} câu đúng)")
                with c3:
                    st.metric(label="Điểm Tự Luận", value=f"{res['essay_score']} / 4.0 đ")

            st.success(f"💌 **Lời nhận xét từ Thầy/Cô AI:** {res['overall_feedback']}")

            st.markdown("### 🔍 Xem Lại Chi Tiết Từng Câu, Phát Âm & Lời Nhận Xét:")
            for item in res["details"]:
                clue_html = f"<div style='margin-top:6px; color:#2980B9;'><b>💡 Dấu hiệu nhận biết:</b> {item['grammar_clue']}</div>" if item.get("grammar_clue") else ""
                enc_html = f"<div style='margin-top:6px; color:#D35400;'><b>🌟 Lời khen:</b> <i>{item['encouragement']}</i></div>" if item.get("encouragement") else ""
                unit_warn_html = f"<div style='background:#FFF3CD; border-left:4px solid #FFA000; padding:8px 12px; border-radius:6px; margin:6px 0; color:#856404;'><b>{item['unit_warning']}</b></div>" if item.get("unit_warning") else ""
                max_pts = item.get("max_score", 1.0 if is_math_exam else 2.0)
                skill_tag = f"[{item['skill'].upper()}] " if item.get("skill") else ""

                # Hiển thị kết quả Speaking
                if item.get("type") == "speaking" or item.get("skill") == "speaking":
                    st.markdown(f"""
                        <div class="kid-card" style="border-left: 5px solid #F39C12;">
                            <b>Câu {item['id']} {skill_tag}(Kỹ năng Nói): Đạt {item['score']} / {max_pts} điểm 🎤</b><br>
                            <b>Câu mẫu chuẩn:</b> 🗣️ "{item.get('reference_text', item['question'])}"<br>
                            <b>AI đã nghe thấy em nói:</b> <i>"{item.get('transcription', item['student_answer'])}"</i><br>
                            <b>Phân tích phát âm & thanh điệu:</b> {item.get('phonetic_analysis', 'Phát âm tự nhiên')}<br>
                            <b>Nhận xét của AI:</b> {item.get('feedback', '')}<br>
                            {enc_html}
                        </div>
                    """, unsafe_allow_html=True)

                # Hiển thị kết quả MCQ (Listening, Reading, MCQ thường)
                elif item["type"] == "mcq":
                    if item["is_correct"]:
                        st.markdown(f"""
                            <div class="highlight-answer">
                                <b>Câu {item['id']} {skill_tag}(Trắc nghiệm): ĐÚNG (+{item['score']} / {max_pts} điểm) ✅</b><br>
                                <b>Đề bài:</b> {item['question']}<br>
                                <b>Đáp án của em:</b> {item['student_answer']}<br>
                                <b>Giải thích chi tiết:</b> {item['explanation']}
                                {clue_html}
                                {enc_html}
                            </div>
                        """, unsafe_allow_html=True)
                    else:
                        st.markdown(f"""
                            <div class="wrong-answer">
                                <b>Câu {item['id']} {skill_tag}(Trắc nghiệm): CẦN RÚT KINH NGHIỆM (0.0 / {max_pts} điểm) ❌</b><br>
                                <b>Đề bài:</b> {item['question']}<br>
                                <b>Đáp án của em:</b> {item['student_answer']}<br>
                                <b>Đáp án chính xác là:</b> {item['correct_answer']}<br>
                                <b>Giải thích chi tiết:</b> {item['explanation']}
                                {clue_html}
                                {enc_html}
                            </div>
                        """, unsafe_allow_html=True)
                # Hiển thị kết quả Tự luận / Writing
                else:
                    st.markdown(f"""
                        <div class="kid-card" style="border-left: 5px solid #3498DB;">
                            <b>Câu {item['id']} {skill_tag}(Tự luận/Viết): Đạt {item['score']} / {max_pts} điểm 📝</b><br>
                            <b>Đề bài:</b> {item['question']}<br>
                            <b>Bài làm của em:</b> <i>"{item['student_answer']}"</i><br>
                            <b>Nhận xét từng bước:</b> {item.get('feedback', '')}<br>
                            {unit_warn_html}
                            {clue_html}
                            {enc_html}
                            <details style="margin-top: 8px;">
                                <summary style="color:#2980B9; cursor:pointer;"><b>Xem lời giải chi tiết & biểu điểm</b></summary>
                                <pre style="background:#F8F9FA; padding:8px; border-radius:6px; margin-top:4px;">{item.get('reference_answer', '')}</pre>
                            </details>
                        </div>
                    """, unsafe_allow_html=True)


# ==============================================================================
# 3. CỬA SỔ GIA SƯ AI HỎI - ĐÁP (PHƯƠNG PHÁP GỢI MỞ)
# ==============================================================================
elif menu == "🦉 Gia Sư AI Gợi Mở (Hỏi - Đáp)":
    st.markdown("## 🦉 Gia Sư AI - Cú Vàng Thông Thái")
    st.caption("Thầy/Cô gia sư AI đồng hành cùng em từ lớp 1 đến lớp 5 theo phương pháp gợi mở, không giải hộ.")

    st.markdown("""
        <div class="tutor-avatar-box">
            <div style="font-size: 2.2rem;">🦉</div>
            <div>
                <b style="color: #2C3E50; font-size: 1.05rem;">Nguyên tắc học tập cùng Cú Vàng:</b><br>
                <span style="font-size: 0.9rem; color: #555;">
                    💡 Cú Vàng sẽ chỉ cho em manh mối và đặt câu hỏi gợi mở.<br>
                    ✨ Em hãy tự tin suy nghĩ và trả lời từng bước để trở thành học sinh tự lập và thông minh nhé!
                </span>
            </div>
        </div>
    """, unsafe_allow_html=True)

    st.markdown("<b>Gợi ý câu hỏi nhanh:</b>", unsafe_allow_html=True)
    q_col1, q_col2, q_col3 = st.columns(3)
    quick_question = None
    with q_col1:
        if st.button("📐 Làm sao cộng 2 phân số khác mẫu số?"):
            quick_question = "Làm sao để cộng hai phân số có mẫu số khác nhau vậy thầy?"
    with q_col2:
        if st.button("📖 Cách phân biệt Danh từ và Động từ?"):
            quick_question = "Thầy cô giúp em phân biệt Danh từ và Động từ với ạ!"
    with q_col3:
        if st.button("🇬🇧 Khi nào dùng thì Quá khứ đơn?"):
            quick_question = "Làm sao để nhận biết câu chia ở thì Quá khứ đơn (Past Simple) ạ?"

    chat_messages = db.get_tutor_messages()
    for msg in chat_messages:
        if msg["role"] == "user":
            with st.chat_message("user", avatar="👦"):
                st.write(msg["content"])
        else:
            with st.chat_message("assistant", avatar="🦉"):
                st.write(msg["content"])

    user_input = st.chat_input("Em đang thắc mắc điều gì, hãy gõ vào đây hỏi Cú Vàng nhé...") or quick_question
    if user_input:
        db.save_tutor_message("user", user_input)
        with st.chat_message("user", avatar="👦"):
            st.write(user_input)

        with st.chat_message("assistant", avatar="🦉"):
            with st.spinner("Cú Vàng đang suy nghĩ câu hỏi gợi mở cho em... 💭"):
                api_key = st.session_state.get("gemini_api_key")
                history_for_ai = db.get_tutor_messages()
                ai_reply = ai.ask_tutor_ai(user_input, history_for_ai, api_key)
                st.write(ai_reply)
                db.save_tutor_message("assistant", ai_reply)

    if chat_messages:
        st.markdown("<br>", unsafe_allow_html=True)
        if st.button("🗑️ Xóa Lịch Sử Trò Chuyện & Bắt Đầu Phiên Mới"):
            db.clear_tutor_messages()
            st.success("Đã làm mới khung trò chuyện!")
            st.rerun()


# ==============================================================================
# 4. TÍNH NĂNG MỚI: LƯU TRỮ & XEM LẠI BÀI TẬP ĐÃ LÀM (Yêu cầu 4)
# ==============================================================================
elif menu == "📜 Bài Tập Đã Làm & Xem Lại":
    st.markdown("## 📜 Lịch Sử Bài Đã Làm & Nhật Ký Cho Phụ Huynh")
    st.caption("Xem lại bài làm chi tiết của từng bài thi và theo dõi nhật ký nhiệm vụ giao theo ngày.")

    tab_view_detail, tab_parent_log = st.tabs(["📋 Xem Lại Chi Tiết Từng Bài Thi", "📅 Nhật Ký Hoàn Thành Theo Ngày (Dành Cho Phụ Huynh)"])

    with tab_view_detail:
        completed_list = db.get_completed_sessions()

        if not completed_list:
            st.info("Chưa có bài tập nào được hoàn thành. Hãy vào mục **📝 Luyện Tập & Tạo Bài Tập** để hoàn thành bài tập đầu tiên nhé!")
        else:
            target_sess = st.session_state.get("review_target_session_id")
            
            # Nếu có target_sess, đảm bảo filter_sub mặc định hiển thị môn phù hợp hoặc 'Tất cả môn học'
            default_filter_idx = 0
            if target_sess:
                for s in completed_list:
                    if s["session_id"] == target_sess:
                        default_filter_idx = 0 # Tất cả môn học
                        break

            filter_sub = st.selectbox("Lọc theo môn học:", ["Tất cả môn học"] + list(SUBJECTS.keys()), index=default_filter_idx)
            filtered_sessions = completed_list
            if filter_sub != "Tất cả môn học":
                filtered_sessions = [s for s in completed_list if s["subject"] == filter_sub]

            if not filtered_sessions:
                st.warning(f"Chưa có bài tập nào đã hoàn thành thuộc môn **{filter_sub}**. Hãy chọn **Tất cả môn học** hoặc chuyển sang mục **📝 Luyện Tập & Tạo Bài Tập** để làm bài nhé!")
            else:
                st.markdown(f"**Tổng số bài đã hoàn thành:** {len(filtered_sessions)} bài")
                
                session_options = {
                    f"[{s['completed_at']}] {s['subject']} - {s['topic']} (Điểm: {s['score']}/10.0 đ)": s["session_id"]
                    for s in filtered_sessions
                }

                default_choice_idx = 0
                if target_sess:
                    for idx, (lbl, sid) in enumerate(session_options.items()):
                        if sid == target_sess:
                            default_choice_idx = idx
                            break

                selected_label = st.selectbox("Chọn bài tập muốn xem lại:", list(session_options.keys()), index=default_choice_idx)
                selected_session_id = session_options[selected_label]

            # Lấy chi tiết bài làm từ database
            detail = db.get_session_full_details(selected_session_id)
            if detail:
                st.markdown("---")
                score_color = "#27AE60" if detail['score'] >= 8.0 else "#E67E22"
                st.markdown(f"""
                    <div class="kid-card" style="border-left: 6px solid {score_color};">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <h3 style="margin:0; color:#2C3E50;">{SUBJECTS.get(detail['subject'], {}).get('icon', '📚')} {detail['subject']} - {detail['topic']}</h3>
                                <p style="margin:4px 0 0 0; color:#7F8C8D; font-size:0.9rem;">
                                    Ngày hoàn thành: <b>{detail['completed_at']}</b> | Mã phiên: <code>{detail['session_id']}</code>
                                </p>
                            </div>
                            <div style="text-align:right;">
                                <span style="font-size:0.9rem; color:#7F8C8D;">Kết quả</span>
                                <h2 style="margin:0; color:{score_color};">{detail['score']} / 10.0 đ</h2>
                            </div>
                        </div>
                    </div>
                """, unsafe_allow_html=True)

                st.markdown("### 🔍 Chi Tiết Từng Câu Hỏi & Bài Làm Của Em:")
                for q_item in detail["questions"]:
                    q_num = q_item["question_order"]
                    q_type = q_item["question_type"]
                    q_skill = q_item.get("skill")
                    q_content = q_item["content"]
                    student_ans = q_item.get("user_answer", "Chưa trả lời")
                    correct_ans = q_item.get("correct_answer", "")
                    is_corr = q_item.get("is_correct", 0)
                    ai_pts = q_item.get("ai_score", 0.0)
                    max_pts = q_item.get("points", 1.0)
                    feedback = q_item.get("ai_feedback", "")
                    clue = q_item.get("grammar_clue", "")
                    enc = q_item.get("encouragement", "")
                    unit_warn = q_item.get("unit_warning", "")
                    audio_text = q_item.get("audio_text", "")
                    transcription = q_item.get("audio_transcription", "")
                    phonetic_analysis = q_item.get("phonetic_analysis", "")
                    pinyin = q_item.get("pinyin", "")
                    meaning = q_item.get("vietnamese_meaning", "")

                    clue_html = f"<div style='margin-top:6px; color:#2980B9;'><b>💡 Dấu hiệu nhận biết:</b> {clue}</div>" if clue else ""
                    enc_html = f"<div style='margin-top:6px; color:#D35400;'><b>🌟 Lời khen:</b> <i>{enc}</i></div>" if enc else ""
                    warn_html = f"<div style='background:#FFF3CD; border-left:4px solid #FFA000; padding:8px 12px; border-radius:6px; margin:6px 0; color:#856404;'><b>{unit_warn}</b></div>" if unit_warn else ""
                    pinyin_html = f"<div style='color:#2980B9; font-size:0.95rem; margin-top:4px;'><b>Pinyin:</b> {pinyin}</div>" if pinyin else ""
                    meaning_html = f"<div style='color:#7F8C8D; font-size:0.9rem; margin-top:2px;'><b>Nghĩa:</b> {meaning}</div>" if meaning else ""
                    skill_tag = f"[{q_skill.upper()}] " if q_skill else ""

                    # 1. Xem lại bài Nói (Speaking)
                    if q_skill == "speaking" or q_type == "speaking":
                        st.markdown(f"""
                            <div class="kid-card" style="border-left: 5px solid #F39C12;">
                                <b>Câu {q_num} {skill_tag}(Kỹ năng Nói): Đạt {ai_pts} / {max_pts} điểm 🎤</b><br>
                                <b>Câu mẫu luyện đọc:</b> 🗣️ "{audio_text if audio_text else q_content}"<br>
                                {pinyin_html}
                                {meaning_html}
                                <b>AI đã nhận diện giọng nói:</b> <i>"{transcription if transcription else student_ans}"</i><br>
                                <b>Phân tích phát âm / thanh điệu:</b> {phonetic_analysis if phonetic_analysis else 'Phát âm tự nhiên'}<br>
                                <b>Nhận xét của AI:</b> {feedback}<br>
                                {enc_html}
                            </div>
                        """, unsafe_allow_html=True)

                    # 2. Xem lại Trắc nghiệm & Listening
                    elif q_type == "mcq":
                        border_color = "#2ECC71" if is_corr else "#E74C3C"
                        badge_status = f"<span style='color:{border_color}; font-weight:bold;'>{'✅ ĐÚNG (+' + str(ai_pts) + ' đ)' if is_corr else '❌ CHƯA CHÍNH XÁC (0 đ)'}</span>"
                        st.markdown(f"""
                            <div class="kid-card" style="border-left: 5px solid {border_color};">
                                <b>Câu {q_num} {skill_tag}(Trắc nghiệm):</b> {badge_status}<br>
                                <b>Đề bài:</b> {q_content}<br>
                                {pinyin_html}
                                {meaning_html}
                                <b>Đáp án của em:</b> <i>"{student_ans}"</i><br>
                                <b>Đáp án chính xác:</b> <b>{correct_ans}</b><br>
                                <b>Giải thích:</b> {q_item.get('explanation', '')}
                                {clue_html}
                                {enc_html}
                            </div>
                        """, unsafe_allow_html=True)
                        if q_skill == "listening" and audio_text:
                            audio_fp = tts.get_or_create_audio(audio_text, detail["subject"])
                            if audio_fp and os.path.exists(audio_fp):
                                st.caption("🔊 Nghe lại đoạn audio câu hỏi:")
                                st.audio(audio_fp, format="audio/mp3")

                    # 3. Xem lại Tự luận & Writing
                    else:
                        st.markdown(f"""
                            <div class="kid-card" style="border-left: 5px solid #3498DB;">
                                <b>Câu {q_num} {skill_tag}(Tự luận / Viết): Đạt {ai_pts} / {max_pts} điểm 📝</b><br>
                                <b>Đề bài:</b> {q_content}<br>
                                {pinyin_html}
                                {meaning_html}
                                <b>Bài làm của em:</b><br>
                                <pre style="background:#F8F9FA; padding:8px; border-radius:6px; margin-top:4px;">{student_ans}</pre>
                                <b>Nhận xét từng bước:</b> {feedback}<br>
                                {warn_html}
                                {clue_html}
                                {enc_html}
                                <details style="margin-top: 8px;">
                                    <summary style="color:#2980B9; cursor:pointer;"><b>Xem lời giải chi tiết & biểu điểm</b></summary>
                                    <pre style="background:#FFF; padding:8px; border-radius:6px; margin-top:4px;">{correct_ans}</pre>
                                </details>
                            </div>
                        """, unsafe_allow_html=True)

    with tab_parent_log:
        st.subheader("📅 Nhật Ký & Tiến Độ Hoàn Thành Theo Ngày")
        st.caption("Phụ huynh có thể chọn bất kỳ ngày nào để kiểm tra bài tập đã giao, bài đã làm và các bài còn nợ.")

        date_summaries = db.get_assignment_history_by_date()
        if not date_summaries:
            st.info("Chưa có lịch sử giao bài nào được ghi nhận.")
        else:
            dates_list = [d["assigned_date"] for d in date_summaries]
            selected_history_date = st.selectbox("Chọn ngày muốn kiểm tra nhật ký:", dates_list)

            # Lấy thống kê của ngày đã chọn
            day_tasks = db.get_daily_assignments(selected_history_date)
            tot_day = len(day_tasks)
            done_day = sum(1 for t in day_tasks if t["status"] == "completed")
            pending_day = sum(1 for t in day_tasks if t["status"] == "pending")
            prog_day = sum(1 for t in day_tasks if t["status"] == "in_progress")
            avg_score_day = round(sum(t["score"] for t in day_tasks if t["status"] == "completed") / done_day, 1) if done_day > 0 else 0.0

            kp1, kp2, kp3, kp4 = st.columns(4)
            with kp1:
                st.markdown(f"""
                    <div class="kid-card" style="text-align:center;">
                        <span style="font-size:0.85rem; color:#7F8C8D;">Nhiệm Vụ Đã Giao</span>
                        <h2 style="color:#2980B9; margin:4px 0;">{tot_day} bài</h2>
                    </div>
                """, unsafe_allow_html=True)
            with kp2:
                st.markdown(f"""
                    <div class="kid-card" style="text-align:center;">
                        <span style="font-size:0.85rem; color:#7F8C8D;">Đã Hoàn Thành</span>
                        <h2 style="color:#27AE60; margin:4px 0;">{done_day} bài</h2>
                    </div>
                """, unsafe_allow_html=True)
            with kp3:
                st.markdown(f"""
                    <div class="kid-card" style="text-align:center;">
                        <span style="font-size:0.85rem; color:#7F8C8D;">Còn Nợ Chưa Làm</span>
                        <h2 style="color:#E74C3C; margin:4px 0;">{pending_day + prog_day} bài</h2>
                    </div>
                """, unsafe_allow_html=True)
            with kp4:
                st.markdown(f"""
                    <div class="kid-card" style="text-align:center;">
                        <span style="font-size:0.85rem; color:#7F8C8D;">Điểm Trung Bình Ngày</span>
                        <h2 style="color:#8E44AD; margin:4px 0;">{avg_score_day}/10</h2>
                    </div>
                """, unsafe_allow_html=True)

            st.markdown(f"#### Chi tiết danh sách bài tập ngày {selected_history_date}:")
            for idx, task in enumerate(day_tasks, 1):
                icon_sub = SUBJECTS.get(task["subject"], {}).get("icon", "📘")
                col_t1, col_t2, col_t3 = st.columns([3, 2, 1.5])
                with col_t1:
                    st.markdown(f"**{idx}. {icon_sub} {task['subject']}** - *{task['topic']}*")
                with col_t2:
                    if task["status"] == "completed":
                        t_subm = task["completed_at"][11:16] if task.get("completed_at") else ""
                        st.markdown(f"<span style='color:#27AE60; font-weight:bold;'>✅ Đã nộp: {task['score']}/10.0 đ</span> (Lúc {t_subm})", unsafe_allow_html=True)
                    elif task["status"] == "in_progress":
                        st.markdown("<span style='color:#E67E22; font-weight:bold;'>📝 Đang làm dở</span>", unsafe_allow_html=True)
                    else:
                        st.markdown("<span style='color:#E74C3C; font-weight:bold;'>❌ Còn nợ (Chưa làm)</span>", unsafe_allow_html=True)
                with col_t3:
                    if task["status"] == "completed" and task.get("session_id"):
                        if st.button("Xem bài làm", key=f"parent_view_{task['id']}"):
                            st.session_state["review_target_session_id"] = task["session_id"]
                            st.rerun()
                st.markdown("<hr style='margin: 4px 0;'>", unsafe_allow_html=True)


# ==============================================================================
# 5. CHUYÊN MỤC GIẢI TRÍ: ĐỐ VUI TRÍ TUỆ
# ==============================================================================
elif menu == "🎮 Đố Vui Trí Tuệ":
    st.markdown("## 🎮 Đố Vui Trí Tuệ & Góc Thư Giãn")
    st.caption("Thử thách tư duy logic, đố mẹo, đố chữ và đố vui tiếng Anh để rèn luyện trí thông minh và thu thập Ngôi Sao Trí Tuệ!")

    stats = db.get_riddle_stats()

    # Thẻ thông tin sao trí tuệ
    st.markdown(f"""
        <div style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); color: #2C3E50; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(246, 211, 101, 0.3);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin:0; font-size:1.3rem; color:#2C3E50;">⭐ KHO TÀNG SAO TRÍ TUỆ CỦA BÉ</h3>
                    <p style="margin:4px 0 0 0; font-size:0.95rem;">
                        Mỗi câu đố giải đúng bé sẽ nhận ngay <b>+1 Ngôi sao trí tuệ</b> và lời khen hóm hỉnh từ AI!
                    </p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:2rem; font-weight:bold; color:#D35400;">⭐ {stats['stars']} / {stats['total']}</div>
                    <span style="font-size:0.85rem; color:#555;">Đã giải được {stats['solved']} câu</span>
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)

    col_flt1, col_flt2, col_flt3 = st.columns([1.5, 1.5, 1])
    with col_flt1:
        category_options = ["Tất cả", "Đố mẹo", "Đố chữ", "Toán logic", "Khoa học vui", "Đố vui Tiếng Anh"]
        selected_cat = st.selectbox("Chọn thể loại câu đố:", category_options)
    with col_flt2:
        status_options = {"Tất cả câu đố": "all", "Chưa giải được ❓": "unsolved", "Đã giải đúng ⭐": "solved"}
        selected_status_label = st.selectbox("Lọc theo trạng thái:", list(status_options.keys()))
        selected_status = status_options[selected_status_label]
    with col_flt3:
        st.markdown("<div style='height: 28px;'></div>", unsafe_allow_html=True)
        gen_new_riddle_btn = st.button("✨ AI Đố Câu Mới", type="primary", use_container_width=True)

    # Xử lý khi bấm nút "AI Đố Câu Mới"
    if gen_new_riddle_btn:
        with st.spinner("🤖 Thần đèn AI đang vắt óc sáng tạo câu đố siêu đỉnh cho bé..."):
            api_key = st.session_state.get("gemini_api_key")
            existing_riddles = db.get_fun_riddles()
            existing_qs = [r["question"] for r in existing_riddles]
            req_cat = selected_cat if selected_cat != "Tất cả" else "Đố mẹo"
            new_riddle = ai.generate_new_riddle_ai(req_cat, existing_qs, api_key)
            if new_riddle:
                new_id = db.add_new_riddle(
                    new_riddle.get("category", req_cat),
                    new_riddle.get("question", ""),
                    new_riddle.get("hint", ""),
                    new_riddle.get("answer", ""),
                    new_riddle.get("explanation", "")
                )
                st.success(f"🎉 Thần đèn AI đã thêm câu đố mới toanh vào danh sách! (Mã câu: #{new_id})")
                st.rerun()
            else:
                st.warning("💡 Cần nhập Gemini API Key ở sidebar hoặc kiểm tra kết nối mạng để AI tự sáng tạo câu đố mới nhé!")

    # Lấy danh sách câu đố theo bộ lọc
    riddles_list = db.get_fun_riddles(category=selected_cat, status_filter=selected_status)

    if not riddles_list:
        st.info("Không có câu đố nào phù hợp với bộ lọc hiện tại. Hãy chọn thể loại khác hoặc bấm **AI Đố Câu Mới** nhé!")
    else:
        for idx, r in enumerate(riddles_list, 1):
            r_id = r["id"]
            is_solved = (r["is_solved"] == 1)
            cat_icon = {
                "Đố mẹo": "🦀", "Đố chữ": "🔤", "Toán logic": "📐", 
                "Khoa học vui": "🔬", "Đố vui Tiếng Anh": "🇬🇧"
            }.get(r["category"], "💡")

            status_badge = "<span style='color:#27AE60; font-weight:bold;'>⭐ ĐÃ GIẢI ĐÚNG</span>" if is_solved else "<span style='color:#E67E22; font-weight:bold;'>❓ CHƯA GIẢI</span>"
            border_style = "border-left: 6px solid #27AE60;" if is_solved else "border-left: 6px solid #F39C12;"

            st.markdown(f"""
                <div class="kid-card" style="{border_style} margin-top: 15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <b>Câu #{r_id} {cat_icon} [{r['category']}]:</b> {status_badge}
                        </div>
                    </div>
                    <div style="font-size: 1.15rem; font-weight: bold; color: #2C3E50; margin: 10px 0;">
                        {r['question'].replace(chr(10), '<br>')}
                    </div>
                </div>
            """, unsafe_allow_html=True)

            # Khối trả lời & gợi ý cho từng câu đố
            col_ans1, col_ans2, col_ans3 = st.columns([2.5, 1, 1])
            with col_ans1:
                ans_key = f"riddle_input_{r_id}"
                user_guess = st.text_input(
                    "Câu trả lời của em:",
                    placeholder="Gõ đáp án em đoán vào đây...",
                    key=ans_key,
                    label_visibility="collapsed"
                )
            with col_ans2:
                check_btn = st.button("🚀 Đoán Thử", key=f"btn_check_{r_id}", use_container_width=True)
            with col_ans3:
                show_hint = st.checkbox("💡 Gợi ý", key=f"hint_chk_{r_id}")

            if show_hint and r.get("hint"):
                st.info(f"💡 **Gợi ý từ Thần Đèn:** {r['hint']}")

            # Xử lý kiểm tra câu trả lời
            if check_btn:
                api_key = st.session_state.get("gemini_api_key")
                eval_res = ai.check_riddle_answer_ai(
                    r["question"], r["answer"], user_guess, r.get("explanation", ""), api_key
                )
                if eval_res["is_correct"]:
                    st.balloons()
                    db.mark_riddle_solved(r_id)
                    st.success(f"🎉 **CHÚC MỪNG EM!** {eval_res['funny_feedback']}")
                    st.markdown(f"**Lời bình luận hóm hỉnh:** *{eval_res.get('extra_joke', '')}*")
                    time.sleep(1.2)
                    st.rerun()
                else:
                    st.error(f"😅 {eval_res['funny_feedback']}")
                    if eval_res.get("extra_joke"):
                        st.caption(f"💬 *{eval_res['extra_joke']}*")

            # Nếu đã giải đúng hoặc muốn xem đáp án
            with st.expander("🔓 Xem đáp án & Lời giải thích vui nhộn"):
                st.markdown(f"**Đáp án:** <b style='color:#27AE60;'>{r['answer']}</b>", unsafe_allow_html=True)
                st.markdown(f"**Giải thích hóm hỉnh:** {r.get('explanation', '')}")

            st.markdown("<hr style='margin: 12px 0 20px 0;'>", unsafe_allow_html=True)


# ==============================================================================
# 6. BÁO CÁO TIẾN ĐỘ HỌC TẬP
# ==============================================================================
elif menu == "📊 Báo Cáo Tiến Độ Học Tập":
    st.markdown("## 📊 Báo Cáo & Thống Kê Học Tập")
    st.caption("Theo dõi điểm số, số bài tập đã làm và tỷ lệ tiến bộ qua từng môn học.")

    history = db.get_quiz_history()

    if not history:
        st.info("Chưa có lịch sử làm bài tập nào. Hãy sang mục **Luyện Tập & Tạo Bài Tập** để làm bài nhé!")
    else:
        df_hist = pd.DataFrame(history)
        df_hist["timestamp"] = pd.to_datetime(df_hist["timestamp"])
        df_hist["date"] = df_hist["timestamp"].dt.strftime("%d/%m")

        total_quizzes = len(df_hist)
        avg_score = round(df_hist["score"].mean(), 1)
        total_mcq_correct = df_hist["mcq_correct"].sum()
        total_mcq = df_hist["mcq_total"].sum()
        mcq_accuracy = round((total_mcq_correct / total_mcq) * 100, 1) if total_mcq > 0 else 0

        kpi1, kpi2, kpi3, kpi4 = st.columns(4)
        with kpi1:
            st.markdown(f"""
                <div class="kid-card" style="text-align:center;">
                    <span style="font-size:0.9rem; color:#7F8C8D;">Số Bài Đã Làm</span>
                    <h2 style="color:#2980B9; margin: 4px 0;">{total_quizzes} bài</h2>
                </div>
            """, unsafe_allow_html=True)
        with kpi2:
            st.markdown(f"""
                <div class="kid-card" style="text-align:center;">
                    <span style="font-size:0.9rem; color:#7F8C8D;">Điểm Trung Bình</span>
                    <h2 style="color:#27AE60; margin: 4px 0;">{avg_score}/10</h2>
                </div>
            """, unsafe_allow_html=True)
        with kpi3:
            st.markdown(f"""
                <div class="kid-card" style="text-align:center;">
                    <span style="font-size:0.9rem; color:#7F8C8D;">Độ Chính Xác Trắc Nghiệm</span>
                    <h2 style="color:#E67E22; margin: 4px 0;">{mcq_accuracy}%</h2>
                </div>
            """, unsafe_allow_html=True)
        with kpi4:
            st.markdown("""
                <div class="kid-card" style="text-align:center;">
                    <span style="font-size:0.9rem; color:#7F8C8D;">Danh Hiệu Hiện Tại</span>
                    <h3 style="color:#8E44AD; margin: 6px 0;">Ong Chăm Chỉ 🐝</h3>
                </div>
            """, unsafe_allow_html=True)

        st.markdown("---")

        c_chart1, c_chart2 = st.columns(2)
        with c_chart1:
            st.subheader("📈 Lịch Sử Điểm Số Theo Thời Gian")
            df_sorted = df_hist.sort_values(by="timestamp")
            fig_line = px.line(
                df_sorted, x="timestamp", y="score", color="subject",
                markers=True,
                labels={"score": "Điểm Số (thang 10)", "timestamp": "Thời gian", "subject": "Môn học"},
                title="Diễn biến điểm số các bài kiểm tra"
            )
            fig_line.update_layout(yaxis_range=[0, 10.5], template="plotly_white")
            st.plotly_chart(fig_line, use_container_width=True)

        with c_chart2:
            st.subheader("📊 Điểm Trung Bình Theo Môn Học")
            df_sub_avg = df_hist.groupby("subject")["score"].mean().reset_index()
            df_sub_avg["score"] = df_sub_avg["score"].round(1)
            
            fig_bar = px.bar(
                df_sub_avg, x="subject", y="score", color="subject", text="score",
                labels={"score": "Điểm TB", "subject": "Môn học"},
                title="So sánh kết quả giữa các môn học"
            )
            fig_bar.update_layout(yaxis_range=[0, 10.5], template="plotly_white", showlegend=False)
            st.plotly_chart(fig_bar, use_container_width=True)

        st.subheader("📜 Bảng Lịch Sử Làm Bài Chi Tiết")
        history_table = df_hist[["timestamp", "subject", "topic", "score", "mcq_correct", "essay_score", "ai_feedback"]].copy()
        history_table.columns = ["Thời Gian", "Môn Học", "Chủ Đề", "Tổng Điểm", "Số Câu Đúng (MCQ)", "Điểm Tự Luận", "Nhận Xét Của AI"]
        st.dataframe(history_table, use_container_width=True, hide_index=True)

        st.markdown("<hr style='margin: 25px 0;'>", unsafe_allow_html=True)
        st.subheader("🔍 Xem Lại Bài Làm Chi Tiết Từng Câu Hỏi & Nhận Xét AI")
        st.caption("Em hoặc phụ huynh có thể chọn bài làm dưới đây để xem lại từng câu hỏi, lời giải và nhận xét chi tiết của AI:")
        
        all_completed = db.get_completed_sessions()
        if all_completed:
            rep_options = {
                f"[{s['completed_at']}] {s['subject']} - {s['topic']} (Điểm: {s['score']}/10.0 đ)": s["session_id"]
                for s in all_completed
            }
            c_sel_rep, c_btn_rep = st.columns([3, 1])
            with c_sel_rep:
                rep_selected_label = st.selectbox("Chọn bài kiểm tra muốn xem lại:", list(rep_options.keys()), key="rep_review_select")
            with c_btn_rep:
                st.markdown("<div style='height: 28px;'></div>", unsafe_allow_html=True)
                if st.button("👉 Mở Xem Bài Làm", type="primary", use_container_width=True, key="btn_open_rep_review"):
                    st.session_state["review_target_session_id"] = rep_options[rep_selected_label]
                    set_active_page("📜 Bài Tập Đã Làm & Xem Lại")
        else:
            st.info("Chưa có phiên làm bài chi tiết nào để xem lại.")
