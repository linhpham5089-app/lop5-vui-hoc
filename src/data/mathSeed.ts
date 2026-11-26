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
  }
];
