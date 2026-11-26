# 🎒 Lớp 5 Vui Học: Ứng Dụng Quản Lý Học Tập & Gia Sư AI Thông Minh

Ứng dụng Web tất-cả-trong-một (All-in-one) hỗ trợ học sinh lớp 5 tự học, quản lý thời khóa biểu 4 môn trọng tâm (Toán, Tiếng Việt, Tiếng Anh, Tiếng Trung) và tương tác với Gia sư AI theo phương pháp gợi mở từng bước (Socratic Method).

---

## 🌟 Các Chức Năng Bắt Buộc & Điểm Nổi Bật

1. **🏠 Bảng điều khiển lịch học (Dashboard):**
   - Hiển thị thời khóa biểu 7 ngày trong tuần cho 4 môn học: **Toán, Tiếng Việt, Tiếng Anh, Tiếng Trung**.
   - Dạng thẻ màu trực quan dành riêng cho lứa tuổi học sinh tiểu học (10-11 tuổi).
   - Widget đồng hồ đếm ngược thông minh nhắc nhở tiết học tiếp theo, điểm sao thưởng hôm nay.
   - Cho phép thêm buổi học tùy chỉnh vào lịch học.

2. **📝 Trình tạo bài tập tự động chuẩn Lớp 5:**
   - Lựa chọn môn học và chủ đề trọng tâm bám sát chương trình sách giáo khoa (hoặc nhập chủ đề tùy biến).
   - AI tự động sinh **đúng 5 câu hỏi** (3 câu trắc nghiệm 4 lựa chọn + 2 câu tự luận kích thích tư duy).
   - Sẵn sàng hoạt động ngay cả khi chưa có Internet nhờ **Kho câu hỏi mẫu offline phong phú**.

3. **🎯 Hệ thống chấm điểm & Nhận xét thang điểm 10:**
   - Tự động chấm 3 câu trắc nghiệm (mỗi câu 2.0 điểm = tối đa 6.0 điểm).
   - AI chấm 2 câu tự luận (mỗi câu tối đa 2.0 điểm = 4.0 điểm), phân tích điểm đúng, chỉ ra lỗi sai và đưa ra lời khen khích lệ.
   - Hiệu ứng pháo hoa chúc mừng sinh động khi học sinh đạt điểm cao.

4. **🦉 Cửa sổ Gia sư AI Hỏi - Đáp (Cú Vàng Thông Thái):**
   - Hỗ trợ giải đáp kiến thức tiểu học từ lớp 1 đến lớp 5.
   - **System Prompt nghiêm ngặt:** Tuyệt đối **KHÔNG giải hộ** đáp án ngay; dẫn dắt học sinh bằng phương pháp gợi mở từng bước, khen ngợi sự nỗ lực và nhắc lại manh mối quan trọng.
   - Lưu trữ toàn bộ lịch sử trò chuyện cục bộ.

5. **📊 Báo cáo tiến độ học tập:**
   - Lưu lịch sử mọi lần làm bài vào cơ sở dữ liệu **SQLite**.
   - Biểu đồ đường (Line chart) theo dõi diễn biến điểm số qua các ngày.
   - Biểu đồ cột (Bar chart) so sánh điểm trung bình giữa 4 môn học.
   - Danh hiệu động viên (ví dụ: Ong Chăm Chỉ, Chiến Binh Cần Cù,...).

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
lop5-ai-tutor/
│
├── app.py                 # File giao diện Web chính (Streamlit UI, Router, Dashboard, Form)
├── ai_service.py          # Bộ xử lý AI (Tạo đề, Chấm tự luận, Gia sư gợi mở, Offline Bank)
├── database.py            # SQLite Helper (Thời khóa biểu, Lịch sử làm bài, Chatbot log)
├── config.py              # Cấu hình môn học, chủ đề SGK lớp 5, CSS giao diện thân thiện
├── requirements.txt       # Danh sách thư viện Python cần thiết
└── README.md              # Tài liệu kiến trúc và hướng dẫn cài đặt chi tiết
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng Từng Bước

### Bước 1: Cài đặt Python (Nếu máy chưa có)
- Tải Python từ trang chủ chính thức: [python.org/downloads](https://www.python.org/downloads/) (Khuyên dùng Python 3.10, 3.11 hoặc 3.12).
- **Lưu ý quan trọng khi cài đặt trên Windows:** Tích chọn vào ô **"Add Python to PATH"** trước khi bấm **Install Now**.

### Bước 2: Mở Terminal / PowerShell và di chuyển vào thư mục dự án
```powershell
cd "C:\Users\MAI HANH\.gemini\antigravity\scratch\lop5-ai-tutor"
```

### Bước 3: Cài đặt các thư viện cần thiết
```powershell
pip install -r requirements.txt
```
*(Các thư viện gồm có: `streamlit`, `plotly`, `google-genai`, `pandas`)*

### Bước 4: Khởi chạy ứng dụng Web
Chạy lệnh sau trong Terminal:
```powershell
streamlit run app.py
```
Ngay sau đó, trình duyệt Web sẽ tự động mở địa chỉ: `http://localhost:8501`.

---

## 🔑 Cấu Hình AI (Gemini API hoặc Chế Độ Mẫu Offline)
- **Chế độ Mẫu (Demo Offline):** Ứng dụng đã tích hợp sẵn kho đề bài, bộ chấm tự luận và kịch bản gợi mở mẫu. Bạn có thể bấm tạo bài và trò chuyện ngay lập tức mà **không cần điền API key**.
- **Chế độ Trí Tuệ Nhân Tạo Trực Tuyến (Online AI):** Nhập Google Gemini API Key vào ô cài đặt ở thanh Sidebar bên trái để AI sinh đề mới vô tận theo mọi chủ đề bạn yêu cầu.
