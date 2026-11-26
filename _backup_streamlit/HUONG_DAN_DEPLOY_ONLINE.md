# 🚀 HƯỚNG DẪN TRIỂN KHAI ONLINE ỨNG DỤNG "LỚP 5 VUI HỌC" (STREAMLIT CLOUD)

Tài liệu này hướng dẫn bạn đưa toàn bộ ứng dụng **Lớp 5 Vui Học** lên môi trường Internet (miễn phí 100% qua Streamlit Community Cloud) để học sinh có thể truy cập học tập, luyện thi Cambridge Flyers, đố vui trí tuệ và nói tiếng Anh/tiếng Trung trên **mọi thiết bị: iPhone/iPad (Safari), Điện thoại Android, MacBook và Máy tính Windows**.

---

## 📌 BƯỚC 1: TẠO KHO LƯU TRỮ TRÊN GITHUB (GITHUB REPOSITORY)

1. Truy cập [https://github.com](https://github.com) và đăng nhập tài khoản của bạn.
2. Bấm nút **"New"** (hoặc dấu `+` ở góc trên bên phải) để tạo một Repository mới:
   - **Repository name**: `lop5-ai-tutor` (hoặc tên tùy thích).
   - **Visibility**: Chọn **Public** (hoặc **Private** đều được).
   - *Không tích chọn* "Add a README file" hay ".gitignore" vì dự án đã có sẵn.
   - Bấm **"Create repository"**.

---

## 📌 BƯỚC 2: ĐẨY MÃ NGUỒN TỪ MÁY TÍNH LÊN GITHUB

Mở cửa sổ dòng lệnh (Terminal / PowerShell hoặc Git Bash) ngay tại thư mục chứa mã nguồn của bạn:

```bash
cd "C:\Users\MAI HANH\Desktop\lop5-ai-tutor"

# 1. Khởi tạo kho git cục bộ (nếu chưa có)
git init

# 2. Thêm toàn bộ tệp vào git
git add .

# 3. Tạo commit đầu tiên
git commit -m "Khoi tao phien ban Lop 5 AI Tutor san sang Cloud Deployment"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Liên kết tới GitHub Repository của bạn (thay username của bạn vào)
git remote add origin https://github.com/<TEN_GITHUB_CUA_BAN>/lop5-ai-tutor.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

*(Lưu ý: Tệp bí mật `.env` và `.streamlit/secrets.toml` đã được tự động loại trừ bởi `.gitignore` nên tuyệt đối an toàn, không bị lộ ra ngoài).*

---

## 📌 BƯỚC 3: KẾT NỐI VÀ TRIỂN KHAI TRÊN STREAMLIT COMMUNITY CLOUD

1. Truy cập trang chủ: [https://share.streamlit.io](https://share.streamlit.io/) và đăng nhập bằng tài khoản GitHub vừa dùng.
2. Bấm nút **"New app"** (hoặc **"Create app"**).
3. Điền thông tin ứng dụng:
   - **Repository**: Chọn `<TEN_GITHUB_CUA_BAN>/lop5-ai-tutor`.
   - **Branch**: `main`.
   - **Main file path**: `app.py`.
   - **App URL**: Bạn có thể tùy chỉnh tên miền ngắn gọn, ví dụ: `lop5-vui-hoc.streamlit.app`.

---

## 📌 BƯỚC 4: MỞ KHÓA TOÀN BỘ TÍNH NĂNG GEMINI API TRÊN CLOUD

Trước khi bấm Deploy, bạn mở rộng mục **"Advanced settings..."** (hoặc sau khi deploy vào phần **App settings ➡️ Secrets**):

1. Dán khóa API của bạn vào khung cấu hình TOML:
   ```toml
   GEMINI_API_KEY = "AIzaSy..."
   ```
   *(Lấy khóa miễn phí từ [Google AI Studio](https://aistudio.google.com/)).*
2. Bấm **"Save"**.
3. Bấm **"Deploy!"** và chờ 1-2 phút để Streamlit Cloud tự động cài đặt các thư viện trong `requirements.txt` và `packages.txt`.

---

## 📌 BƯỚC 5: TRẢI NGHIỆM TRÊN ĐIỆN THOẠI & MÁY TÍNH BẢNG

Khi ứng dụng chạy thành công, bạn sẽ nhận được đường link web trực tiếp (ví dụ: `https://lop5-vui-hoc.streamlit.app`).

### 📱 Mẹo dùng như một ứng dụng gốc (App) trên điện thoại:
- **Trên iPhone / iPad (Safari)**:
  1. Mở link trên bằng trình duyệt **Safari**.
  2. Bấm nút **Chia sẻ** (biểu tượng hình vuông có mũi tên chỉ lên ở thanh công cụ phía dưới).
  3. Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
  4. Đổi tên thành **"Lớp 5 Vui Học"** ➡️ Bấm **Thêm**.
  5. Ứng dụng sẽ xuất hiện như một App độc lập trên màn hình iPhone/iPad, tự động cấp quyền Micro để thu âm phát âm tiếng Anh/tiếng Trung!

- **Trên Android (Chrome / Cốc Cốc)**:
  1. Mở link trên Chrome.
  2. Bấm dấu 3 chấm góc phải trên.
  3. Chọn **"Cài đặt ứng dụng"** hoặc **"Thêm vào Màn hình chính"**.

---

## ☁️ TÍNH NĂNG ĐỒNG BỘ & SAO LƯU DỮ LIỆU CLOUD

Do các dịch vụ Hosting đám mây miễn phí có thể tự động làm mới bộ nhớ sau khi không hoạt động:
- Bạn chỉ cần vào cuối thanh Sidebar, mở mục **"☁️ Đồng Bộ & Sao Lưu Dữ Liệu"**.
- Bấm **"📥 Tải Về Bản Sao Lưu (.json)"** để lưu lại toàn bộ lịch sử điểm số, các bài đã làm và Ngôi sao trí tuệ.
- Bất cứ khi nào chuyển thiết bị mới hoặc muốn khôi phục, chỉ cần tải tệp `.json` lên và bấm **"🔄 Khôi Phục Dữ Liệu Ngay"**!
