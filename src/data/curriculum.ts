import { SubjectKey, SubjectConfig, DailyQuest } from '@/types';

export const SUBJECTS: Record<SubjectKey, SubjectConfig> = {
  'Toán': {
    icon: '📐',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    topics: [
      'Ôn tập và bổ sung về phân số, hỗn số',
      'Số thập phân và các phép tính với số thập phân',
      'Tỉ số phần trăm và giải toán tỉ số phần trăm',
      'Hình học: Diện tích hình tam giác, hình thang, hình tròn',
      'Hình học: Thể tích hình hộp chữ nhật, hình lập phương',
      'Toán chuyển động đều: Vận tốc, quãng đường, thời gian',
      'Đề kiểm tra chuẩn 10 bài Toán (thang điểm 10)',
      'Bài thi chuẩn của Hồ Chí Minh',
      'Bài thi chuẩn của Trần Đại Nghĩa',
      'Bài thi tổng hợp'
    ]
  },
  'Tiếng Việt': {
    icon: '📖',
    color: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FED7AA',
    topics: [
      'Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình',
      'Luyện từ và câu: Đại từ, Quan hệ từ',
      'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
      'Tập làm văn: Lập dàn ý bài văn tả cảnh thiên nhiên',
      'Tập làm văn: Miêu tả người (thầy cô, người thân)',
      'Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam',
      'Bài thi chuẩn của Hồ Chí Minh',
      'Bài thi chuẩn của Trần Đại Nghĩa',
      'Bài thi tổng hợp'
    ]
  },
  'Tiếng Anh': {
    icon: '🇬🇧',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    topics: [
      '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)',
      '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 2: Travelling and Holidays)',
      '🏆 [Cambridge Flyers] Dạng 1: Vocabulary & Definitions (Đoán từ qua định nghĩa)',
      '🏆 [Cambridge Flyers] Dạng 2: Dialogue Completion (Hoàn thành hội thoại giao tiếp)',
      '🏆 [Cambridge Flyers] Dạng 3: Flyers Grammar (Ngữ pháp A2: Quá khứ, HTHT, Mệnh đề quan hệ)',
      '🏆 [Cambridge Flyers] Dạng 4: Story Reading & Cloze (Đọc hiểu đoạn văn & Chọn từ)',
      '🏆 [Cambridge Flyers] Dạng 5: Open Cloze (Tự suy luận và điền 1 từ chính xác)',
      '🏆 [Cambridge Flyers] Đề thi thử Tổng hợp A2 Flyers',
      'Bài thi chuẩn của Hồ Chí Minh',
      'Bài thi chuẩn của Trần Đại Nghĩa',
      'Bài thi tổng hợp'
    ]
  },
  'Tiếng Trung': {
    icon: '🇨🇳',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    topics: [
      '🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)',
      '🎧 [YCT 2-3 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 2: Trường Học & Bạn Bè)',
      'Bính âm (Pinyin), Thanh điệu và quy tắc ghép âm cơ bản',
      'Chào hỏi, giới thiệu bản thân và xưng hô trong gia đình',
      'Số đếm từ 1-100, ngày tháng, thứ trong tuần và giờ giấc',
      'Đồ dùng học tập, màu sắc và sở thích cơ bản (喜欢, 学习)',
      'Hỏi giá cả và mua sắm đơn giản (多少钱, 苹果)',
      'Bài thi chuẩn của Hồ Chí Minh',
      'Bài thi chuẩn của Trần Đại Nghĩa',
      'Bài thi tổng hợp'
    ]
  }
};

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  { id: 'q1', title: 'Hoàn thành 1 bài luyện Toán (Số thập phân / Tỉ số %)', subject: 'Toán', points: 2, completed: false, icon: '📐' },
  { id: 'q2', title: 'Luyện 4 kỹ năng Tiếng Anh Cambridge A2 Flyers', subject: 'Tiếng Anh', points: 2, completed: false, icon: '🇬🇧' },
  { id: 'q3', title: 'Giải đúng ít nhất 1 câu Đố Vui Trí Tuệ', subject: 'Tiếng Việt', points: 1, completed: false, icon: '🎮' },
  { id: 'q4', title: 'Trao đổi cùng Cú Vàng Thông Thái về 1 bài tập khó', subject: 'Toán', points: 1, completed: false, icon: '🦉' }
];
