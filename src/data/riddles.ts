import { Riddle } from '@/types';

export const SEED_RIDDLES: Riddle[] = [
  {
    id: 1,
    category: 'Đố mẹo',
    question: 'Con gì càng to càng nhỏ?',
    hint: 'Nó sống ở dưới nước, có mai và có 2 chiếc càng rất đặc biệt!',
    answer: 'Con cua',
    explanation: 'Vì con cua có một chiếc "càng to" và một chiếc "càng nhỏ" đó nha! Đố chữ quá thông minh đúng không nào? 🦀'
  },
  {
    id: 2,
    category: 'Đố mẹo',
    question: 'Cái gì người mua biết, người bán biết, người dùng không bao giờ biết?',
    hint: 'Một đồ vật mà khi dùng đến thì người đó đã không còn ở cõi đời nữa.',
    answer: 'Quan tài',
    explanation: 'Người mua thì biết đi mua, người bán làm ra để bán, chỉ có người nằm bên trong (người dùng) là không thể biết được thôi! ⚰️'
  },
  {
    id: 3,
    category: 'Đố mẹo',
    question: 'Cây cầu có trọng tải tối đa 10 tấn. Một chiếc xe tải chở hàng tổng cộng đúng 10 tấn chạy lên cầu. Giữa cầu có một con chim bồ câu bay đến đậu lên xe. Hỏi cây cầu có bị sập không?',
    hint: 'Trong lúc xe chạy từ đầu cầu đến giữa cầu thì xe đã tiêu hao bớt thứ gì nhỉ?',
    answer: 'Cầu không sập',
    explanation: 'Cầu không sập vì trong quá trình xe chạy từ đầu cầu ra giữa cầu, xe đã đốt cháy một lượng xăng/dầu nặng hơn trọng lượng của chú chim bồ câu rất nhiều rồi! 🕊️🚛'
  },
  {
    id: 4,
    category: 'Đố mẹo',
    question: 'Quần gì rộng nhất thế giới mà không ai có thể mặc vừa?',
    hint: 'Tên một quần thể gồm rất nhiều hòn đảo trên biển.',
    answer: 'Quần đảo',
    explanation: 'Quần đảo là tập hợp các hòn đảo lớn nhỏ trên đại dương, làm sao mà mặc vào người được chứ! 🏝️'
  },
  {
    id: 5,
    category: 'Đố chữ',
    question: 'Con gì đập thì sống, không đập thì chết?',
    hint: 'Nó nằm ngay trong lồng ngực bên trái của mỗi chúng ta đấy!',
    answer: 'Trái tim',
    explanation: 'Trái tim phải đập liên hồi thì chúng ta mới sống khỏe mạnh được chứ, ngừng đập là toi ngay! ❤️'
  },
  {
    id: 6,
    category: 'Đố chữ',
    question: 'Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?',
    hint: 'Một món ăn thơm lừng vào mùa đông vùng quê, hạt vàng óng ánh.',
    answer: 'Bắp ngô (hoặc Trái bắp, Quả ngô)',
    explanation: 'Bỏ lớp vỏ áo bên ngoài ra rồi nướng hạt bên trong; khi ăn thì gặm lớp hạt bên ngoài rồi bỏ cùi bắp ở bên trong đi! 🌽'
  },
  {
    id: 7,
    category: 'Toán logic',
    question: 'Có 3 quả táo trên bàn, em lấy đi 2 quả. Hỏi em có mấy quả táo?',
    hint: 'Đọc thật kỹ: "EM lấy đi..." chứ không hỏi trên bàn còn lại mấy quả nha!',
    answer: '2 quả táo',
    explanation: 'Em lấy đi 2 quả thì trên tay em có đúng 2 quả táo chứ mấy! Bẫy toán học tư duy siêu hay phải không? 🍎🍎'
  },
  {
    id: 8,
    category: 'Toán logic',
    question: 'Một gia đình có 2 người cha và 2 người con cùng đi câu cá. Mỗi người câu được đúng 1 con cá. Hỏi tại sao đem về nhà lại có tất cả 3 con cá mà không ai bị mất phần?',
    hint: 'Trong gia đình có 3 thế hệ cùng đi chung: Ông, Bố và...',
    answer: 'Có 3 người: Ông nội, Bố và Con trai',
    explanation: 'Gia đình có 3 người: Ông nội (cha của bố), Bố (vừa là con vừa là cha) và Con trai. Như vậy có đúng 2 người cha và 2 người con, tổng cộng 3 người câu được 3 con cá! 🎣'
  },
  {
    id: 9,
    category: 'Toán logic',
    question: 'Bác thợ mộc cưa một khúc gỗ dài thành 5 đoạn. Mỗi lần cưa mất đúng 6 phút. Giữa 2 lần cưa bác nghỉ tay 2 phút. Hỏi bác thợ mộc hoàn thành xong khúc gỗ trong bao nhiêu phút?',
    hint: 'Cưa làm 5 đoạn thì chỉ cần cưa mấy nhát cưa thôi nhỉ?',
    answer: '30 phút (4 lần cưa và 3 lần nghỉ: 4x6 + 3x2 = 30)',
    explanation: 'Để chia làm 5 đoạn chỉ cần 4 nhát cưa. 4 lần cưa mất 4 x 6 = 24 phút. Giữa 4 lần cưa chỉ có 3 lần nghỉ (3 x 2 = 6 phút). Tổng cộng: 24 + 6 = 30 phút! 🪚'
  },
  {
    id: 10,
    category: 'Khoa học vui',
    question: 'Tại sao loài chim hồng hạc khi ngủ hoặc nghỉ ngơi thường đứng bằng một chân?',
    hint: 'Liên quan đến việc giữ ấm cơ thể trong làn nước lạnh.',
    answer: 'Để giữ ấm cơ thể (giảm mất nhiệt)',
    explanation: 'Khoa học chứng minh chân chim không có lông và ngâm trong nước rất dễ mất nhiệt. Đứng co một chân sát bụng giúp chim hồng hạc giữ ấm cơ thể và đỡ mỏi cơ bắp hơn đấy! 🦩'
  },
  {
    id: 11,
    category: 'Khoa học vui',
    question: 'Mặt trời mọc ở hướng Đông và lặn ở hướng Tây. Nhưng trên hành tinh nào trong Hệ Mặt Trời, Mặt trời lại mọc ở hướng Tây và lặn ở hướng Đông?',
    hint: 'Hành tinh thứ 2 tính từ Mặt trời, được mệnh danh là "Sao Kim" hay "Sao Hôm/Sao Mai".',
    answer: 'Sao Kim (Venus)',
    explanation: 'Sao Kim tự quay quanh trục theo chiều ngược lại (theo chiều kim đồng hồ) so với Trái Đất và hầu hết các hành tinh khác! 🪐'
  },
  {
    id: 12,
    category: 'Đố vui Tiếng Anh',
    question: 'What has hands but cannot clap? (Cái gì có bàn tay/kim nhưng không thể vỗ tay?)',
    hint: 'Vật dụng báo giờ treo trên tường hoặc đeo ở cổ tay.',
    answer: 'A clock (hoặc A watch / Đồng hồ)',
    explanation: 'In English, "clock hands" means the hour hand and minute hand (kim giờ, kim phút), but a clock cannot clap hands! ⏰👏'
  },
  {
    id: 13,
    category: 'Đố vui Tiếng Anh',
    question: 'What letter of the alphabet has the most water? (Chữ cái nào trong bảng chữ cái tiếng Anh chứa nhiều nước nhất?)',
    hint: 'Phát âm chữ cái này nghe giống hệt từ tiếng Anh chỉ "Biển cả"!',
    answer: 'Letter C (The Sea)',
    explanation: 'Chữ C phát âm là /siː/, đồng âm với từ "Sea" (biển cả mênh mông nước)! Chơi chữ tiếng Anh đỉnh cao chưa nè! 🌊🔤'
  },
  {
    id: 14,
    category: 'Đố mẹo',
    question: 'Làm thế nào để chia 5 quả cam cho 6 bạn một cách công bằng nhất?',
    hint: 'Đừng cắt từng quả nha, có cách nào làm cho cam biến thành một món uống không?',
    answer: 'Vắt thành nước cam (hoặc Ép nước cam)',
    explanation: 'Vắt 5 quả cam lấy nước rồi chia đều vào 6 chiếc cốc, bạn nào cũng có một ly nước cam ngon lành công bằng 100%! 🍊🥤'
  },
  {
    id: 15,
    category: 'Đố chữ',
    question: 'Thân em xưa ở bụi tre,\nMùa đông xếp lại, mùa hè mở ra.\n(Là cái gì?)',
    hint: 'Vật dụng giúp phe phẩy tạo gió mát ngày xưa các bà, các mẹ hay dùng.',
    answer: 'Cái quạt nan (hoặc Quạt giấy, Chiếc quạt)',
    explanation: 'Chiếc quạt nan tre, mùa đông trời lạnh thì gác xó, mùa hè nóng nực thì mở ra phe phẩy quạt mát! 🪭'
  }
];
