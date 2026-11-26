import { Question } from '@/types';

export const MATH_SEED_QUESTIONS: Question[] = [
  {
    id: 'm1',
    subject: 'Toán',
    topic: 'Số thập phân và các phép tính với số thập phân',
    type: 'mcq',
    question: 'Chữ số 5 trong số thập phân 84,259 thuộc hàng nào và có giá trị là bao nhiêu?',
    options: [
      'A. Hàng phần mười, giá trị là 5/10',
      'B. Hàng phần trăm, giá trị là 5/100 (hay 0,05)',
      'C. Hàng phần nghìn, giá trị là 5/1000',
      'D. Hàng đơn vị, giá trị là 5'
    ],
    correct_answer: 'B',
    explanation: 'Chữ số 2 ở hàng phần mười, chữ số 5 ở hàng phần trăm nên giá trị là 5/100 hay 0,05.',
    points: 1.0
  },
  {
    id: 'm2',
    subject: 'Toán',
    topic: 'Số thập phân và các phép tính với số thập phân',
    type: 'mcq',
    question: 'Tìm số tự nhiên y thỏa mãn điều kiện: 15,8 < y < 16,9?',
    options: ['A. y = 15', 'B. y = 16', 'C. y = 17', 'D. y = 16,5'],
    correct_answer: 'B',
    explanation: 'Số tự nhiên duy nhất nằm giữa 15,8 và 16,9 là số 16.',
    points: 1.0
  },
  {
    id: 'm3',
    subject: 'Toán',
    topic: 'Tỉ số phần trăm và giải toán tỉ số phần trăm',
    type: 'mcq',
    question: 'Lớp 5A có 40 học sinh, trong đó có 24 học sinh nữ. Tỉ số phần trăm của số học sinh nữ so với cả lớp là:',
    options: ['A. 40%', 'B. 50%', 'C. 60%', 'D. 70%'],
    correct_answer: 'C',
    explanation: 'Tỉ số phần trăm: (24 : 40) × 100% = 0,6 × 100% = 60%.',
    points: 1.0
  },
  {
    id: 'm4',
    subject: 'Toán',
    topic: 'Tỉ số phần trăm và giải toán tỉ số phần trăm',
    type: 'mcq',
    question: 'Một chiếc cặp sách có giá gốc 200 000 đồng, nay được giảm giá 15%. Số tiền được giảm giá là:',
    options: ['A. 15 000 đồng', 'B. 25 000 đồng', 'C. 30 000 đồng', 'D. 35 000 đồng'],
    correct_answer: 'C',
    explanation: 'Số tiền được giảm là: 200 000 × 15 : 100 = 30 000 (đồng).',
    points: 1.0
  },
  {
    id: 'm5',
    subject: 'Toán',
    topic: 'Hình học: Diện tích hình tam giác, hình thang, hình tròn',
    type: 'mcq',
    question: 'Một hình tam giác có độ dài đáy là 12 cm và chiều cao tương ứng là 8 cm. Diện tích tam giác đó là:',
    options: ['A. 96 cm²', 'B. 48 cm²', 'C. 24 cm²', 'D. 40 cm²'],
    correct_answer: 'B',
    explanation: 'Diện tích tam giác = (đáy × chiều cao) : 2 = (12 × 8) : 2 = 48 cm².',
    points: 1.0
  },
  {
    id: 'm6',
    subject: 'Toán',
    topic: 'Toán chuyển động đều: Vận tốc, quãng đường, thời gian',
    type: 'mcq',
    question: 'Một người đi xe máy với vận tốc 42 km/giờ trong thời gian 2 giờ 30 phút. Quãng đường người đó đã đi được là:',
    options: ['A. 84 km', 'B. 105 km', 'C. 96 km', 'D. 110 km'],
    correct_answer: 'B',
    explanation: 'Đổi 2 giờ 30 phút = 2,5 giờ. Quãng đường s = v × t = 42 × 2,5 = 105 km.',
    points: 1.0
  },
  {
    id: 'm7',
    subject: 'Toán',
    topic: 'Đề kiểm tra chuẩn 10 bài Toán (thang điểm 10)',
    type: 'essay',
    question: 'Tính bằng cách thuận tiện nhất: \n3,75 × 4,6 + 5,4 × 3,75',
    guide: 'Sử dụng tính chất phân phối của phép nhân đối với phép cộng: a × b + a × c = a × (b + c)',
    correct_answer: '3,75 × (4,6 + 5,4) = 3,75 × 10 = 37,5',
    explanation: '3,75 × 4,6 + 5,4 × 3,75 = 3,75 × (4,6 + 5,4) = 3,75 × 10 = 37,5.',
    points: 1.0
  },
  {
    id: 'm8',
    subject: 'Toán',
    topic: 'Đề kiểm tra chuẩn 10 bài Toán (thang điểm 10)',
    type: 'essay',
    question: 'Bác Ba gửi tiết kiệm 50 000 000 đồng vào ngân hàng với lãi suất 0,5% một tháng. Hỏi sau một tháng, bác Ba nhận được cả tiền gốc lẫn tiền lãi là bao nhiêu đồng?',
    guide: 'Bước 1: Tính số tiền lãi nhận được sau một tháng = Tiền gốc × Lãi suất.\nBước 2: Tổng số tiền nhận về = Tiền gốc + Tiền lãi.',
    correct_answer: 'Tiền lãi: 50 000 000 × 0,5 : 100 = 250 000 đồng. Tổng số tiền: 50 250 000 đồng.',
    explanation: 'Tiền lãi: 50 000 000 × 0,5% = 250 000 đồng. Cả gốc lẫn lãi: 50 000 000 + 250 000 = 50 250 000 đồng.',
    points: 1.0
  },
  {
    id: 'm9',
    subject: 'Toán',
    topic: 'Ôn tập và bổ sung về phân số, hỗn số',
    type: 'mcq',
    question: 'Chuyển hỗn số 3 và 2/5 thành phân số ta được:',
    options: ['A. 11/5', 'B. 17/5', 'C. 15/5', 'D. 13/5'],
    correct_answer: 'B',
    explanation: 'Cách đổi hỗn số: (3 × 5 + 2) / 5 = 17/5.',
    points: 1.0
  },
  {
    id: 'm10',
    subject: 'Toán',
    topic: 'Ôn tập và bổ sung về phân số, hỗn số',
    type: 'mcq',
    question: 'Tính giá trị biểu thức: 2/3 + 3/4 × 1/2 = ?',
    options: ['A. 17/24', 'B. 25/24', 'C. 5/14', 'D. 11/12'],
    correct_answer: 'B',
    explanation: 'Nhân chia trước, cộng trừ sau: 3/4 × 1/2 = 3/8. Sau đó 2/3 + 3/8 = 16/24 + 9/24 = 25/24.',
    points: 1.0
  },
  {
    id: 'm11',
    subject: 'Toán',
    topic: 'Ôn tập và bổ sung về phân số, hỗn số',
    type: 'mcq',
    question: 'Một mảnh vườn hình chữ nhật có chiều dài 18 m, chiều rộng bằng 2/3 chiều dài. Diện tích mảnh vườn đó là:',
    options: ['A. 108 m²', 'B. 216 m²', 'C. 60 m²', 'D. 144 m²'],
    correct_answer: 'B',
    explanation: 'Chiều rộng = 18 × 2/3 = 12 m. Diện tích = 18 × 12 = 216 m².',
    points: 1.0
  },
  {
    id: 'm12',
    subject: 'Toán',
    topic: 'Ôn tập và bổ sung về phân số, hỗn số',
    type: 'essay',
    question: 'Một cửa hàng có 450 kg gạo. Buổi sáng bán được 2/5 số gạo đó, buổi chiều bán được 1/3 số gạo còn lại. Hỏi sau cả ngày cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
    guide: 'Bước 1: Tính số gạo bán buổi sáng = 450 × 2/5.\nBước 2: Tính số gạo còn lại sau buổi sáng.\nBước 3: Tính số gạo bán buổi chiều rồi tìm số gạo còn lại cuối ngày.',
    correct_answer: 'Buổi sáng bán: 180 kg. Còn lại: 270 kg. Buổi chiều bán: 270 × 1/3 = 90 kg. Cuối ngày còn: 180 kg.',
    explanation: 'Buổi sáng bán 450 × 2/5 = 180 kg, còn 270 kg. Buổi chiều bán 270 × 1/3 = 90 kg. Còn lại 270 - 90 = 180 kg.',
    points: 2.0
  },
  {
    id: 'm13',
    subject: 'Toán',
    topic: 'Số thập phân và các phép tính với số thập phân',
    type: 'mcq',
    question: 'Một thùng dầu chứa 24,5 lít dầu. Người ta lấy ra 3 lần, mỗi lần 4,25 lít dầu. Số dầu còn lại trong thùng là:',
    options: ['A. 11,75 lít', 'B. 12,75 lít', 'C. 11,25 lít', 'D. 20,25 lít'],
    correct_answer: 'A',
    explanation: 'Số dầu lấy ra: 4,25 × 3 = 12,75 lít. Số dầu còn lại: 24,5 - 12,75 = 11,75 lít.',
    points: 1.0
  },
  {
    id: 'm14',
    subject: 'Toán',
    topic: 'Số thập phân và các phép tính với số thập phân',
    type: 'essay',
    question: 'Mua 5 quyển vở hết 42 500 đồng. Hỏi mua 12 quyển vở như thế hết bao nhiêu tiền?',
    guide: 'Dùng phương pháp rút về đơn vị: Tính giá tiền 1 quyển vở rồi nhân với 12.',
    correct_answer: 'Giá 1 quyển: 42 500 : 5 = 8 500 đồng. Mua 12 quyển hết: 8 500 × 12 = 102 000 đồng.',
    explanation: 'Giá tiền 1 quyển vở là 42 500 : 5 = 8 500 (đồng). Mua 12 quyển hết 8 500 × 12 = 102 000 (đồng).',
    points: 1.5
  },
  {
    id: 'm15',
    subject: 'Toán',
    topic: 'Tỉ số phần trăm và giải toán tỉ số phần trăm',
    type: 'mcq',
    question: 'Một đội trồng cây đã trồng được 150 cây và đạt 75% kế hoạch. Theo kế hoạch, đội đó phải trồng tất cả bao nhiêu cây?',
    options: ['A. 180 cây', 'B. 200 cây', 'C. 225 cây', 'D. 250 cây'],
    correct_answer: 'B',
    explanation: 'Số cây theo kế hoạch = 150 : 75 × 100 = 200 (cây).',
    points: 1.0
  },
  {
    id: 'm16',
    subject: 'Toán',
    topic: 'Hình học: Diện tích hình tam giác, hình thang, hình tròn',
    type: 'mcq',
    question: 'Một thửa ruộng hình thang có đáy lớn 45 m, đáy bé 35 m và chiều cao 20 m. Diện tích thửa ruộng đó là:',
    options: ['A. 1600 m²', 'B. 800 m²', 'C. 700 m²', 'D. 900 m²'],
    correct_answer: 'B',
    explanation: 'Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2 = (45 + 35) × 20 : 2 = 800 m².',
    points: 1.0
  }
];
