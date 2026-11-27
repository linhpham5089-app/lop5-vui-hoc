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
  },

  // ====================================================================
  // CHỦ ĐỀ: ĐỊA LÝ VIỆT NAM (15 câu)
  // ====================================================================
  {
    id: 16,
    category: 'Địa lý Việt Nam',
    question: 'Tỉnh nào nằm ở cực Bắc của Tổ quốc, nơi có cột cờ Lũng Cú thiêng liêng?',
    hint: 'Tỉnh miền núi phía Bắc nổi tiếng với cao nguyên đá Đồng Văn.',
    answer: 'Hà Giang',
    keywords: ['hà giang', 'ha giang'],
    explanation: 'Xã Lũng Cú, huyện Đồng Văn, tỉnh Hà Giang là điểm cực Bắc trên đất liền của Việt Nam.'
  },
  {
    id: 17,
    category: 'Địa lý Việt Nam',
    question: 'Nơi nào được mệnh danh là "mũi tàu" của Tổ quốc, là điểm cực Nam trên đất liền của nước ta?',
    hint: 'Tỉnh tận cùng phía Nam của Tổ quốc thuộc vùng Đồng bằng sông Cửu Long.',
    answer: 'Cà Mau',
    keywords: ['cà mau', 'ca mau', 'mũi cà mau', 'mui ca mau', 'đất mũi'],
    explanation: 'Mũi Cà Mau thuộc huyện Ngọc Hiển, tỉnh Cà Mau — nơi duy nhất trên đất liền Việt Nam có thể ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây.'
  },
  {
    id: 18,
    category: 'Địa lý Việt Nam',
    question: 'Ngã ba biên giới nào nơi "một tiếng gà gáy ba nước cùng nghe" giữa Việt Nam, Lào và Trung Quốc?',
    hint: 'Địa danh nằm ở xã Sín Thầu, huyện Mường Nhé, tỉnh Điện Biên.',
    answer: 'A Pa Chải',
    keywords: ['a pa chải', 'a pa chai', 'apachai', 'khoan la san'],
    explanation: 'Mốc giao điểm đường biên giới Việt Nam – Lào – Trung Quốc đặt tại đỉnh Khoan La San, xã Sín Thầu, huyện Mường Nhé, tỉnh Điện Biên.'
  },
  {
    id: 19,
    category: 'Địa lý Việt Nam',
    question: 'Đỉnh núi nào cao nhất Việt Nam, được mệnh danh là "Nóc nhà Đông Dương"?',
    hint: 'Đỉnh núi cao 3.143m nằm ở dãy Hoàng Liên Sơn (Lào Cai).',
    answer: 'Phan-xi-păng (Fansipan)',
    keywords: ['phan-xi-păng', 'phan xi păng', 'phanxipang', 'fansipan'],
    explanation: 'Đỉnh Fansipan thuộc dãy Hoàng Liên Sơn (Lào Cai) có độ cao 3.143m so với mực nước biển.'
  },
  {
    id: 20,
    category: 'Địa lý Việt Nam',
    question: 'Thành phố nào nằm ở vị trí trung tâm đất nước, được gọi là "Thành phố đáng sống" và có cầu Rồng phun lửa?',
    hint: 'Thành phố trực thuộc trung ương nằm bên bờ sông Hàn, miền Trung.',
    answer: 'Đà Nẵng',
    keywords: ['đà nẵng', 'da nang'],
    explanation: 'Đà Nẵng nằm ở vùng Duyên hải Nam Trung Bộ, giữ vị trí chiến lược kết nối hai miền Bắc – Nam.'
  },
  {
    id: 21,
    category: 'Địa lý Việt Nam',
    question: 'Dãy núi nào như một bức tường thành tự nhiên chạy dọc biên giới phía Tây nước ta, ngăn cách Việt Nam với Lào?',
    hint: 'Dãy núi dài hơn 1.100 km gắn liền với con đường lịch sử mang tên Bác.',
    answer: 'Trường Sơn',
    keywords: ['trường sơn', 'truong son', 'dãy trường sơn'],
    explanation: 'Dãy Trường Sơn trải dài hơn 1.100 km từ thượng nguồn sông Cả đến vùng Đông Nam Bộ.'
  },
  {
    id: 22,
    category: 'Địa lý Việt Nam',
    question: 'Hòn đảo nào lớn nhất Việt Nam, được mệnh danh là "Đảo Ngọc" nằm ở vùng biển Tây Nam?',
    hint: 'Thành phố đảo trực thuộc tỉnh Kiên Giang.',
    answer: 'Phú Quốc',
    keywords: ['phú quốc', 'phu quoc'],
    explanation: 'Thành phố đảo Phú Quốc (tỉnh Kiên Giang) có diện tích khoảng 574 km², là hòn đảo lớn nhất Việt Nam.'
  },
  {
    id: 23,
    category: 'Địa lý Việt Nam',
    question: 'Quần đảo thiêng liêng nào của Việt Nam nằm ở ngoài khơi Biển Đông, gắn liền với tỉnh Khánh Hòa?',
    hint: 'Tên quần đảo nằm ở phía Đông Nam bờ biển Việt Nam.',
    answer: 'Trường Sa',
    keywords: ['trường sa', 'truong sa'],
    explanation: 'Huyện đảo Trường Sa thuộc tỉnh Khánh Hòa, nằm ở phía Đông Nam bờ biển Việt Nam.'
  },
  {
    id: 24,
    category: 'Địa lý Việt Nam',
    question: 'Quần đảo nào nằm ở phía Bắc Biển Đông, gắn liền với thành phố Đà Nẵng?',
    hint: 'Quần đảo nằm cách đất liền Đà Nẵng khoảng 170 hải lý.',
    answer: 'Hoàng Sa',
    keywords: ['hoàng sa', 'hoang sa'],
    explanation: 'Huyện đảo Hoàng Sa trực thuộc thành phố Đà Nẵng, cách đất liền khoảng 170 hải lý.'
  },
  {
    id: 25,
    category: 'Địa lý Việt Nam',
    question: 'Con sông nào chảy qua Thủ đô Hà Nội, mang phù sa đỏ nặng bồi đắp nên đồng bằng Bắc Bộ?',
    hint: 'Con sông có tên gọi gắn với màu đỏ của phù sa.',
    answer: 'Sông Hồng',
    keywords: ['sông hồng', 'song hong', 'nhị hà', 'nhi ha'],
    explanation: 'Sông Hồng (Nhị Hà) dài hơn 1.100 km, đoạn chảy qua Việt Nam dài khoảng 510 km, tạo nên vùng châu thổ trù phú.'
  },
  {
    id: 26,
    category: 'Địa lý Việt Nam',
    question: 'Vùng đồng bằng nào rộng lớn nhất nước ta, được mệnh danh là "vựa lúa số 1" của Việt Nam?',
    hint: 'Đồng bằng nằm ở hạ lưu sông Mê Kông với 9 cửa sông đổ ra biển.',
    answer: 'Đồng bằng sông Cửu Long',
    keywords: ['đồng bằng sông cửu long', 'sông cửu long', 'đbscl', 'song cuu long', 'miền tây'],
    explanation: 'Nằm ở hạ lưu sông Mê Kông, diện tích khoảng 40.000 km², cung cấp hơn 50% sản lượng lúa cả nước.'
  },
  {
    id: 27,
    category: 'Địa lý Việt Nam',
    question: 'Đèo nào hùng vĩ nằm giữa Thừa Thiên Huế và Đà Nẵng, được mệnh danh là "Thiên hạ đệ nhất hùng quan"?',
    hint: 'Ngọn đèo cắt ngang dãy núi Bạch Mã đâm ra biển.',
    answer: 'Đèo Hải Vân',
    keywords: ['đèo hải vân', 'hải vân', 'hai van'],
    explanation: 'Đèo Hải Vân cắt ngang dãy núi Bạch Mã đâm ra biển, từng là ranh giới tự nhiên phân chia khí hậu hai miền.'
  },
  {
    id: 28,
    category: 'Địa lý Việt Nam',
    question: 'Tỉnh nào nước ta có đường bờ biển trải dài qua nhiều vịnh đẹp nổi tiếng như Cam Ranh, Vân Phong, Nha Trang?',
    hint: 'Tỉnh Duyên hải Nam Trung Bộ có thành phố biển Nha Trang.',
    answer: 'Khánh Hòa',
    keywords: ['khánh hòa', 'khánh hoà', 'khanh hoa'],
    explanation: 'Khánh Hòa nằm ở khu vực Duyên hải Nam Trung Bộ, sở hữu bờ biển dài gần 385 km với gần 200 đảo lớn nhỏ.'
  },
  {
    id: 29,
    category: 'Địa lý Việt Nam',
    question: 'Vịnh biển nào ở tỉnh Quảng Ninh đã nhiều lần được UNESCO công nhận là Di sản Thiên nhiên Thế giới với hàng nghìn đảo đá vôi kỳ vĩ?',
    hint: 'Vịnh biển nổi tiếng với Hòn Trống Mái, Hang Sửng Sốt.',
    answer: 'Vịnh Hạ Long',
    keywords: ['vịnh hạ long', 'hạ long', 'ha long'],
    explanation: 'Vịnh Hạ Long nằm ở vùng Đông Bắc Việt Nam, gồm hơn 1.900 hòn đảo đá vôi lớn nhỏ tạo hình độc đáo.'
  },
  {
    id: 30,
    category: 'Địa lý Việt Nam',
    question: 'Vùng đất cao nguyên nào nổi tiếng với khí hậu mát mẻ quanh năm, đất đỏ ba-zan màu mỡ và là thủ phủ cà phê của Việt Nam?',
    hint: 'Vùng gồm 5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng.',
    answer: 'Tây Nguyên',
    keywords: ['tây nguyên', 'tay nguyen'],
    explanation: 'Tây Nguyên gồm các tỉnh cao nguyên nằm ở phía Tây dãy Trường Sơn Nam (Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng).'
  },

  // ====================================================================
  // CHỦ ĐỀ: LỊCH SỬ VIỆT NAM (15 câu)
  // ====================================================================
  {
    id: 31,
    category: 'Lịch sử Việt Nam',
    question: 'Vị vua nào đã có công dựng nên nhà nước đầu tiên của người Việt mang tên Văn Lang?',
    hint: 'Ngày giỗ Tổ mùng 10 tháng 3 âm lịch hằng năm tưởng nhớ công lao của các vị vua này.',
    answer: 'Hùng Vương (Vua Hùng)',
    keywords: ['hùng vương', 'vua hùng', 'hung vuong', 'vua hung'],
    explanation: 'Các vua Hùng lập nên nhà nước Văn Lang tại vùng đất Phong Châu (Phú Thọ ngày nay).'
  },
  {
    id: 32,
    category: 'Lịch sử Việt Nam',
    question: 'Ai là người dời đô từ Hoa Lư ra thành Đại La và đổi tên kinh đô thành Thăng Long năm 1010?',
    hint: 'Vị vua khai sáng triều đại nhà Lý, tác giả "Chiếu dời đô".',
    answer: 'Lý Thái Tổ (Lý Công Uẩn)',
    keywords: ['lý thái tổ', 'lý công uẩn', 'ly thai to', 'ly cong uan'],
    explanation: 'Mùa thu năm 1010, vua Lý Thái Tổ ban Chiếu dời đô, mở ra thời kỳ phát triển rực rỡ của kinh thành Thăng Long – Hà Nội.'
  },
  {
    id: 33,
    category: 'Lịch sử Việt Nam',
    question: 'Hai nữ anh hùng nào đã phất cờ khởi nghĩa ở Hát Môn (Hà Nội), đánh đuổi quân Đông Hán vào năm 40 sau Công nguyên?',
    hint: 'Hai chị em Trưng Trắc và Trưng Nhị.',
    answer: 'Hai Bà Trưng',
    keywords: ['hai bà trưng', 'hai ba trung', 'trưng trắc', 'trưng nhị'],
    explanation: 'Cuộc khởi nghĩa Hai Bà Trưng giành lại độc lập tự chủ cho dân tộc sau hơn 200 năm bị phong kiến phương Bắc đô hộ.'
  },
  {
    id: 34,
    category: 'Lịch sử Việt Nam',
    question: 'Vị anh hùng nào dùng kế đóng cọc gỗ đầu bịt sắt nhọn dưới lòng sông Bạch Đằng, đánh tan quân Nam Hán năm 938?',
    hint: 'Người mở ra kỷ nguyên độc lập lâu dài sau hơn 1.000 năm Bắc thuộc.',
    answer: 'Ngô Quyền',
    keywords: ['ngô quyền', 'ngo quyen'],
    explanation: 'Chiến thắng Bạch Đằng năm 938 chấm dứt hoàn toàn hơn 1.000 năm Bắc thuộc, mở ra kỷ nguyên độc lập lâu dài.'
  },
  {
    id: 35,
    category: 'Lịch sử Việt Nam',
    question: 'Vị tướng lừng danh nào ba lần lãnh đạo quân dân nhà Trần đánh thắng quân xâm lược Nguyên – Mông và là tác giả bài Hịch tướng sĩ?',
    hint: 'Vị Quốc công tiết chế được nhân dân tôn kính gọi là Đức Thánh Trần.',
    answer: 'Trần Hưng Đạo (Trần Quốc Tuấn)',
    keywords: ['trần hưng đạo', 'trần quốc tuấn', 'tran hung dao', 'tran quoc tuan', 'hưng đạo vương'],
    explanation: 'Hưng Đạo Đại Vương Trần Quốc Tuấn là vị Quốc công tiết chế kiệt xuất của nhà Trần vào thế kỷ XIII.'
  },
  {
    id: 36,
    category: 'Lịch sử Việt Nam',
    question: 'Vị vua nào đã lãnh đạo cuộc khởi nghĩa Lam Sơn gian khổ suốt 10 năm, đánh đuổi giặc Minh giành lại độc lập năm 1428?',
    hint: 'Vị vua gắn với sự tích trả gươm thần cho Rùa Vàng ở Hồ Hoàn Kiếm.',
    answer: 'Lê Lợi (Lê Thái Tổ)',
    keywords: ['lê lợi', 'lê thái tổ', 'le loi', 'le thai to'],
    explanation: 'Sau chiến thắng Chi Lăng – Xương Giang, Lê Lợi lên ngôi hoàng đế, lập ra nhà Hậu Lê và khôi phục quốc hiệu Đại Việt.'
  },
  {
    id: 37,
    category: 'Lịch sử Việt Nam',
    question: 'Vị anh hùng áo vải nào đã chỉ huy cuộc hành quân thần tốc đại phá 29 vạn quân Thanh vào dịp Tết Kỷ Dậu 1789?',
    hint: 'Vị hoàng đế tài ba của phong trào Tây Sơn.',
    answer: 'Quang Trung (Nguyễn Huệ)',
    keywords: ['quang trung', 'nguyễn huệ', 'nguyen hue'],
    explanation: 'Chiến thắng Ngọc Hồi – Đống Đa mùa xuân năm 1789 là một trong những chiến công chống ngoại xâm lừng lẫy nhất lịch sử Việt Nam.'
  },
  {
    id: 38,
    category: 'Lịch sử Việt Nam',
    question: 'Cậu bé thiếu niên anh hùng nào đã bóp nát quả cam vì căm giận giặc Nguyên, sau đó tự may cờ thêu 6 chữ vàng "Phá cường địch, báo hoàng ân"?',
    hint: 'Hoài Văn Hầu thời nhà Trần.',
    answer: 'Trần Quốc Toản',
    keywords: ['trần quốc toản', 'tran quoc toan', 'quốc toản'],
    explanation: 'Tuy tuổi còn nhỏ không được dự hội nghị Bình Than, Trần Quốc Toản đã chiêu mộ hơn nghìn gia nô tự lập đội quân đánh giặc.'
  },
  {
    id: 39,
    category: 'Lịch sử Việt Nam',
    question: 'Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đã đọc bản văn kiện trọng đại nào?',
    hint: 'Bản văn kiện khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
    answer: 'Tuyên ngôn Độc lập',
    keywords: ['tuyên ngôn độc lập', 'tuyen ngon doc lap'],
    explanation: 'Bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa (nay là nước Cộng hòa Xã hội Chủ nghĩa Việt Nam).'
  },
  {
    id: 40,
    category: 'Lịch sử Việt Nam',
    question: 'Chiến thắng lịch sử nào ngày 7/5/1954 của quân và dân ta được ca ngợi là "Lừng lẫy năm châu, chấn động địa cầu"?',
    hint: 'Chiến thắng kết thúc 9 năm kháng chiến chống thực dân Pháp ở vùng Tây Bắc.',
    answer: 'Điện Biên Phủ',
    keywords: ['điện biên phủ', 'dien bien phu', 'chiến thắng điện biên phủ'],
    explanation: 'Sau 56 ngày đêm chiến đấu kiên cường, quân ta đã tiêu diệt hoàn toàn tập đoàn cứ điểm Điện Biên Phủ của thực dân Pháp.'
  },
  {
    id: 41,
    category: 'Lịch sử Việt Nam',
    question: 'Vị Đại tướng huyền thoại nào là Tổng Tư lệnh Quân đội nhân dân Việt Nam, người chỉ huy trực tiếp Chiến dịch Điện Biên Phủ?',
    hint: 'Vị Đại tướng đầu tiên của Quân đội nhân dân Việt Nam.',
    answer: 'Võ Nguyên Giáp',
    keywords: ['võ nguyên giáp', 'vo nguyen giap', 'đại tướng võ nguyên giáp'],
    explanation: 'Đại tướng Võ Nguyên Giáp là vị Đại tướng đầu tiên của Quân đội nhân dân Việt Nam, được cả thế giới kính trọng.'
  },
  {
    id: 42,
    category: 'Lịch sử Việt Nam',
    question: 'Người anh hùng nào đã lấy thân mình chèn pháo trong Chiến dịch Điện Biên Phủ để bảo vệ khẩu pháo không bị lăn xuống vực?',
    hint: 'Người chiến sĩ pháo binh dũng cảm quê ở Thanh Hóa.',
    answer: 'Tô Vĩnh Diện',
    keywords: ['tô vĩnh diện', 'to vinh dien'],
    explanation: 'Tấm gương hy sinh anh dũng của anh hùng Tô Vĩnh Diện đã tiếp thêm sức mạnh cho bộ đội pháo binh trong chiến dịch.'
  },
  {
    id: 43,
    category: 'Lịch sử Việt Nam',
    question: 'Người nữ anh hùng đất Đỏ (Bà Rịa – Vũng Tàu) nào đã hy sinh anh dũng ở Côn Đảo khi tuổi đời còn rất trẻ, gắn liền với hình ảnh hoa lê-ki-ma?',
    hint: 'Chị tham gia cách mạng từ năm 14 tuổi.',
    answer: 'Võ Thị Sáu',
    keywords: ['võ thị sáu', 'vo thi sau', 'chị sáu'],
    explanation: 'Chị Võ Thị Sáu tham gia cách mạng từ năm 14 tuổi và là nữ tử tù nhỏ tuổi nhất bị giam tại nhà tù Côn Đảo.'
  },
  {
    id: 44,
    category: 'Lịch sử Việt Nam',
    question: 'Chiến dịch lịch sử nào diễn ra vào mùa xuân năm 1975 đã giải phóng hoàn toàn miền Nam, thống nhất đất nước ngày 30/4/1975?',
    hint: 'Chiến dịch mang tên vị lãnh tụ kính yêu của dân tộc.',
    answer: 'Chiến dịch Hồ Chí Minh',
    keywords: ['chiến dịch hồ chí minh', 'chien dich ho chi minh', 'hồ chí minh'],
    explanation: 'Chiến dịch Hồ Chí Minh toàn thắng đã kết thúc 21 năm kháng chiến chống Mỹ cứu nước, non sông thu về một mối.'
  },
  {
    id: 45,
    category: 'Lịch sử Việt Nam',
    question: 'Cảng nào tại Sài Gòn nơi người thanh niên yêu nước Nguyễn Tất Thành (Bác Hồ) đã ra đi tìm đường cứu nước ngày 5/6/1911?',
    hint: 'Địa danh lịch sử nằm bên bờ sông Sài Gòn, Quận 4 ngày nay.',
    answer: 'Bến Nhà Rồng',
    keywords: ['bến nhà rồng', 'ben nha rong', 'nhà rồng', 'nha rong'],
    explanation: 'Từ Bến Nhà Rồng, người thanh niên Nguyễn Tất Thành lên tàu Đô đốc Latouche-Tréville bắt đầu hành trình 30 năm tìm đường cứu nước.'
  }
];
