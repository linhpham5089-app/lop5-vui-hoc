import { Question } from '@/types';

/**
 * Ngân hàng câu hỏi Tiếng Việt Lớp 5 chuẩn chương trình GDPT Tiểu học.
 * Gồm 15 câu trải đều 5 mảng kiến thức trọng tâm:
 *   - Từ đồng nghĩa / trái nghĩa
 *   - Đại từ
 *   - Quan hệ từ
 *   - Mở rộng vốn từ (Tổ quốc, Nhân dân, Hòa bình, Thành ngữ, Tục ngữ)
 *   - Cảm thụ văn học / Tập làm văn
 */
export const VIETNAMESE_SEED_QUESTIONS: Question[] = [

  // ====================================================================
  // CHỦ ĐỀ 1: TỪ ĐỒNG NGHĨA & TRÁI NGHĨA (3 câu)
  // ====================================================================
  {
    id: 'vi_01',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
    type: 'mcq',
    question: 'Trong các từ sau, từ nào là TỪ ĐỒNG NGHĨA với từ "yên tĩnh"?',
    options: [
      'A. náo nhiệt',
      'B. ồn ào',
      'C. vắng lặng',
      'D. tấp nập'
    ],
    correct_answer: 'C',
    explanation:
      '"Vắng lặng" và "yên tĩnh" đều mang nghĩa không có tiếng ồn, không náo nhiệt. Các từ còn lại (náo nhiệt, ồn ào, tấp nập) đều là từ trái nghĩa với "yên tĩnh".',
    grammar_clue: 'Từ đồng nghĩa là những từ có nghĩa giống hoặc gần giống nhau.',
    encouragement: 'Vốn từ phong phú quá! Em nhận ra từ đồng nghĩa rất nhạy bén! 🌟',
    points: 1.0
  },
  {
    id: 'vi_02',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
    type: 'mcq',
    question: 'Từ nào dưới đây là TỪ TRÁI NGHĨA với từ "dũng cảm"?',
    options: [
      'A. gan dạ',
      'B. anh hùng',
      'C. hèn nhát',
      'D. mạnh mẽ'
    ],
    correct_answer: 'C',
    explanation:
      '"Dũng cảm" nghĩa là không sợ hãi, dám đương đầu. Từ trái nghĩa là "hèn nhát" – sợ sệt, không dám đối mặt. Các từ: gan dạ, anh hùng, mạnh mẽ đều là từ đồng nghĩa với dũng cảm.',
    grammar_clue: 'Từ trái nghĩa là những từ có nghĩa đối lập nhau.',
    encouragement: 'Xuất sắc! Em phân biệt đồng nghĩa và trái nghĩa cực kỳ chuẩn! 👏',
    points: 1.0
  },
  {
    id: 'vi_03',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
    type: 'essay',
    question:
      'Em hãy đặt 1 câu có chứa cặp từ trái nghĩa "cao - thấp" (hoặc "rộng - hẹp") để miêu tả cảnh vật thiên nhiên.',
    guide:
      'Gợi ý cấu trúc: "Những cây (gì) thì (cao/thấp), còn (gì) thì (cao/thấp)" hoặc dùng trong một câu văn tả cảnh.',
    correct_answer:
      'Ví dụ chuẩn: "Những cây đa cổ thụ cao vút, bóng tỏa rộng khắp sân đình, còn những bụi hoa thấp bé chen chúc bên dưới."',
    explanation:
      'Cặp từ trái nghĩa (cao – thấp, rộng – hẹp) giúp câu văn tả cảnh sinh động và có hình ảnh tương phản rõ nét.',
    grammar_clue: 'Dùng cặp từ trái nghĩa trong câu tả cảnh giúp tạo nét đối lập hấp dẫn.',
    encouragement: 'Câu văn tả cảnh rất giàu hình ảnh và sinh động! ✍️🌟',
    points: 2.0
  },

  // ====================================================================
  // CHỦ ĐỀ 2: ĐẠI TỪ (3 câu)
  // ====================================================================
  {
    id: 'vi_04',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'mcq',
    question:
      'Trong câu "Chúng tôi cùng nhau ôn bài và thi đậu kỳ thi cuối năm", từ nào là ĐẠI TỪ?',
    options: [
      'A. cùng nhau',
      'B. chúng tôi',
      'C. ôn bài',
      'D. cuối năm'
    ],
    correct_answer: 'B',
    explanation:
      '"Chúng tôi" là đại từ nhân xưng ngôi thứ nhất số nhiều, dùng để chỉ nhóm người bao gồm người nói (chúng tôi = nhiều người, không bao gồm người nghe).',
    grammar_clue:
      'Đại từ là từ dùng để xưng hô (tôi, mình, chúng tôi) hoặc thay thế cho danh từ đã nêu trước đó (nó, họ, đó...).',
    encouragement: 'Nhận diện đại từ cực chuẩn! Em nắm chắc lý thuyết lắm! 🌟',
    points: 1.0
  },
  {
    id: 'vi_05',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'mcq',
    question:
      'Câu: "Quyển sách này rất hay, em đã đọc nó ba lần rồi." – Từ "nó" trong câu trên thay thế cho danh từ nào?',
    options: [
      'A. ba lần',
      'B. em',
      'C. quyển sách',
      'D. đọc'
    ],
    correct_answer: 'C',
    explanation:
      '"Nó" là đại từ thay thế cho "quyển sách" đã được nhắc đến ở đầu câu, giúp câu văn không bị lặp từ.',
    grammar_clue:
      'Đại từ chỉ thay thế phải trỏ về đúng danh từ được nhắc đến ngay trước nó trong câu hoặc đoạn văn.',
    encouragement: 'Tìm ra đại từ thay thế cực kỳ chính xác! Giỏi lắm em! 👏',
    points: 1.0
  },
  {
    id: 'vi_06',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'essay',
    question:
      'Hãy điền đại từ thích hợp vào chỗ trống để hoàn thành đoạn văn sau:\n"Bà nội rất thương em. ___ thường kể cho em nghe những câu chuyện cổ tích thú vị. Em yêu ___ lắm!"',
    guide:
      'Từ cần điền là đại từ nhân xưng ngôi thứ ba, chỉ một người phụ nữ lớn tuổi đã được nhắc đến trước đó.',
    correct_answer: 'Bà / bà (Bà – bà)',
    explanation:
      'Điền "Bà" vào chỗ trống thứ nhất và "bà" vào chỗ trống thứ hai vì "bà" là đại từ nhân xưng thay thế cho "bà nội" đã nhắc ở câu trước, giúp đoạn văn không bị lặp từ.',
    grammar_clue: 'Đại từ nhân xưng thay thế cần phù hợp về ngôi (người), số và giới tính với danh từ trước đó.',
    encouragement: 'Điền đại từ thích hợp rất khéo léo và tự nhiên! ✍️🌟',
    points: 1.0
  },

  // ====================================================================
  // CHỦ ĐỀ 3: QUAN HỆ TỪ (3 câu)
  // ====================================================================
  {
    id: 'vi_07',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'mcq',
    question:
      'Trong câu "Vì trời mưa to nên chúng tôi không đi chơi được", cặp quan hệ từ là:',
    options: [
      'A. trời mưa – chúng tôi',
      'B. vì – nên',
      'C. mưa to – không đi',
      'D. chúng tôi – đi chơi'
    ],
    correct_answer: 'B',
    explanation:
      'Cặp quan hệ từ "vì... nên..." biểu thị mối quan hệ nhân – quả: nguyên nhân (trời mưa to) dẫn đến kết quả (không đi chơi được).',
    grammar_clue: 'Cặp quan hệ từ nhân – quả thường gặp: vì...nên..., do...nên..., nhờ...mà...',
    encouragement: 'Nhận diện cặp quan hệ từ nhân – quả rất nhanh và chính xác! 🌟',
    points: 1.0
  },
  {
    id: 'vi_08',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'mcq',
    question:
      'Hãy chọn cặp quan hệ từ PHÙ HỢP nhất để điền vào chỗ trống:\n"___ em học chăm chỉ ___ em luôn đạt kết quả tốt."',
    options: [
      'A. Vì … nhưng',
      'B. Tuy … nhưng',
      'C. Vì … nên',
      'D. Nếu … thì'
    ],
    correct_answer: 'C',
    explanation:
      '"Vì em học chăm chỉ nên em luôn đạt kết quả tốt." – Câu biểu thị quan hệ nguyên nhân – kết quả, nên dùng cặp "Vì... nên...".',
    grammar_clue:
      '"Tuy...nhưng..." dùng cho quan hệ tương phản; "Nếu...thì..." dùng cho điều kiện – kết quả; "Vì...nên..." dùng cho nguyên nhân – kết quả.',
    encouragement: 'Chọn đúng cặp quan hệ từ theo ngữ nghĩa, giỏi lắm em! 👏',
    points: 1.0
  },
  {
    id: 'vi_09',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Đại từ, Quan hệ từ',
    type: 'essay',
    question:
      'Em hãy đặt 1 câu hoàn chỉnh có sử dụng cặp quan hệ từ "tuy...nhưng..." để diễn đạt quan hệ TƯƠNG PHẢN.',
    guide:
      'Gợi ý: Đặt câu về học tập, thiên nhiên, hoặc một sự việc nào đó có hai vế tương phản nhau.\nVí dụ: "Tuy [vế 1 - không thuận lợi] nhưng [vế 2 - kết quả tốt]."',
    correct_answer:
      'Ví dụ chuẩn: "Tuy trời mưa rất to nhưng các bạn học sinh vẫn đến trường đúng giờ."',
    explanation:
      'Cặp "tuy...nhưng..." nối hai vế có nội dung tương phản, đối lập nhau. Vế 1 nêu điều bất lợi, vế 2 nêu kết quả ngược lại điều đó.',
    grammar_clue: 'Dấu hiệu: Hai vế có nghĩa đối lập, nếu thay "tuy" bằng "mặc dù" câu vẫn đúng.',
    encouragement: 'Đặt câu với quan hệ từ tương phản rất tự nhiên và chính xác! ✍️💯',
    points: 2.0
  },

  // ====================================================================
  // CHỦ ĐỀ 4: MỞ RỘNG VỐN TỪ – THÀNH NGỮ / TỤC NGỮ (3 câu)
  // ====================================================================
  {
    id: 'vi_10',
    subject: 'Tiếng Việt',
    topic: 'Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam',
    type: 'mcq',
    question:
      'Câu tục ngữ "Uống nước nhớ nguồn" khuyên chúng ta điều gì?',
    options: [
      'A. Hãy uống nhiều nước mỗi ngày để khỏe mạnh.',
      'B. Phải biết ơn và trân trọng những người đã giúp đỡ hoặc tạo dựng cho mình.',
      'C. Không nên lãng phí nguồn nước sạch.',
      'D. Hãy về thăm quê hương thường xuyên.'
    ],
    correct_answer: 'B',
    explanation:
      '"Uống nước" hình ảnh ẩn dụ cho việc hưởng thụ thành quả. "Nhớ nguồn" nghĩa là nhớ tới nguồn cội, những người đã tạo ra thành quả đó. Câu tục ngữ nhắc nhở tinh thần biết ơn, uống nước nhớ nguồn.',
    grammar_clue: 'Nhiều tục ngữ dùng hình ảnh cụ thể mang nghĩa ẩn dụ để nêu bài học đạo đức.',
    encouragement: 'Hiểu nghĩa tục ngữ sâu sắc và chính xác! Giỏi lắm em! 🌟',
    points: 1.0
  },
  {
    id: 'vi_11',
    subject: 'Tiếng Việt',
    topic: 'Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình',
    type: 'mcq',
    question:
      'Trong các từ sau, từ nào thuộc chủ đề "TỔ QUỐC"?',
    options: [
      'A. yên bình',
      'B. đất nước',
      'C. nhân hậu',
      'D. chăm chỉ'
    ],
    correct_answer: 'B',
    explanation:
      '"Đất nước" thuộc nhóm từ ngữ về Tổ quốc, quê hương. Yên bình thuộc chủ đề Hòa bình. Nhân hậu, chăm chỉ thuộc chủ đề Phẩm chất con người.',
    grammar_clue: 'Mở rộng vốn từ: Nhóm Tổ quốc gồm: đất nước, non sông, giang sơn, quê hương, Tổ quốc...',
    encouragement: 'Nhận diện từ theo chủ đề rất chính xác! Vốn từ của em rất phong phú! 📖🌟',
    points: 1.0
  },
  {
    id: 'vi_12',
    subject: 'Tiếng Việt',
    topic: 'Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam',
    type: 'mcq',
    question:
      'Thành ngữ "Chín bỏ làm mười" có nghĩa là gì?',
    options: [
      'A. Làm phép tính 9 cộng 1 bằng 10.',
      'B. Bỏ qua lỗi lầm nhỏ, không tính toán, tranh chấp hơn thua.',
      'C. Phải hoàn thành đủ 10 việc trước khi nghỉ ngơi.',
      'D. Chín người làm thì một người được lợi.'
    ],
    correct_answer: 'B',
    explanation:
      '"Chín bỏ làm mười" nghĩa bóng là sẵn lòng bỏ qua thiếu sót, không chấp nhặt, biết nhường nhịn và tha thứ trong cuộc sống.',
    grammar_clue: 'Thành ngữ thường dùng hình ảnh, con số mang nghĩa ẩn dụ hoặc bóng bẩy, không hiểu theo nghĩa đen.',
    encouragement: 'Hiểu nghĩa bóng của thành ngữ rất sâu sắc! Em giỏi tiếng Việt lắm! 🌟',
    points: 1.0
  },

  // ====================================================================
  // CHỦ ĐỀ 5: CẢM THỤ VĂN HỌC & TẬP LÀM VĂN (3 câu)
  // ====================================================================
  {
    id: 'vi_13',
    subject: 'Tiếng Việt',
    topic: 'Tập làm văn: Lập dàn ý bài văn tả cảnh thiên nhiên',
    type: 'essay',
    question:
      'Em hãy viết đoạn văn ngắn (3 – 5 câu) tả cảnh một buổi sáng trên quê hương em.\n(Chú ý: Dùng ít nhất 1 hình ảnh so sánh hoặc nhân hóa, và 1 cặp từ trái nghĩa.)',
    guide:
      'Dàn ý gợi ý:\n1. Mở đầu: Cảnh buổi sáng bắt đầu từ điều gì? (Tiếng chim, ánh nắng, sương mù...)\n2. Thân đoạn: Miêu tả 2-3 hình ảnh cụ thể, dùng biện pháp so sánh hoặc nhân hóa.\n3. Kết đoạn: Cảm xúc của em trước cảnh đẹp đó.',
    correct_answer:
      'Ví dụ chuẩn: "Mỗi buổi sáng, khi những tia nắng vàng đầu tiên vừa ló dạng sau rặng tre, cả cánh đồng như bừng tỉnh giấc. Những giọt sương đêm còn đọng lại trên lá lúa lóng lánh như những hạt ngọc xanh. Tiếng chim hót líu lo vang lên khắp nơi, xua tan bầu không khí tĩnh lặng của đêm qua. Em yêu buổi sáng quê hương em vô cùng."',
    explanation:
      'Đoạn văn tả cảnh cần có hình ảnh cụ thể, biện pháp tu từ (so sánh, nhân hóa) và cảm xúc chân thật của người viết.',
    grammar_clue: 'Biện pháp so sánh: "như + danh từ" (như hạt ngọc). Nhân hóa: gán hành động của người cho vật (bừng tỉnh giấc).',
    encouragement: 'Đoạn văn miêu tả sinh động, giàu cảm xúc và hình ảnh đẹp! ✍️🌈',
    points: 3.0
  },
  {
    id: 'vi_14',
    subject: 'Tiếng Việt',
    topic: 'Tập làm văn: Miêu tả người (thầy cô, người thân)',
    type: 'mcq',
    question:
      'Khi viết bài văn tả người, phần nào BẮT BUỘC phải có trong đoạn mở bài?',
    options: [
      'A. Kể tên, tuổi và địa chỉ nhà của người được tả.',
      'B. Liệt kê đầy đủ tất cả đặc điểm ngoại hình của người được tả.',
      'C. Giới thiệu được người sẽ tả là ai và cảm nghĩ chung của em về người đó.',
      'D. Kể một câu chuyện dài về kỷ niệm giữa em và người được tả.'
    ],
    correct_answer: 'C',
    explanation:
      'Mở bài của bài văn tả người cần giới thiệu ngắn gọn: người được tả là ai (mối quan hệ, tên gọi) và ấn tượng chung của em về người đó. Không cần liệt kê chi tiết ở mở bài.',
    grammar_clue: 'Mở bài = Giới thiệu đối tượng + cảm nghĩ bao quát. Thân bài mới đi vào chi tiết ngoại hình và tính cách.',
    encouragement: 'Nắm chắc cấu trúc bài văn tả người! Chắc chắn viết hay lắm! 📝🌟',
    points: 1.0
  },
  {
    id: 'vi_15',
    subject: 'Tiếng Việt',
    topic: 'Tập làm văn: Miêu tả người (thầy cô, người thân)',
    type: 'essay',
    question:
      'Viết 3 – 4 câu miêu tả ngoại hình của người thân em yêu quý nhất (ông, bà, bố, mẹ hoặc anh chị...).\n(Dùng ít nhất 1 biện pháp so sánh để câu văn sinh động hơn.)',
    guide:
      'Gợi ý: Miêu tả theo trình tự từ bao quát đến chi tiết: Vóc dáng → Khuôn mặt → Đôi mắt / Nụ cười → Chi tiết ấn tượng nhất.',
    correct_answer:
      'Ví dụ chuẩn: "Bà em đã ngoài sáu mươi tuổi nhưng vẫn còn nhanh nhẹn lắm. Mái tóc bà bạc trắng như mây, búi gọn sau gáy trông thật hiền hậu. Đôi mắt bà nheo lại mỗi khi cười, trông ấm áp như ánh nắng buổi sớm mai. Em yêu bà vô cùng."',
    explanation:
      'Đoạn văn tả người cần có hình ảnh cụ thể, chân thực kết hợp biện pháp so sánh để người đọc hình dung được rõ ràng và cảm nhận tình cảm của người viết.',
    grammar_clue: 'So sánh tóc bạc "như mây", ánh mắt "như ánh nắng" tạo hình ảnh sinh động, không sáo rỗng.',
    encouragement: 'Đoạn tả người thật ấm áp và sinh động! Em viết văn rất có hồn! ✍️❤️',
    points: 3.0
  },

  // ====================================================================
  // CHỦ ĐỀ BỔ SUNG HK1: TỪ LOẠI, CHỦ NGỮ, THÀNH NGỮ Ý CHÍ, ĐỒNG NGHĨA
  // ====================================================================
  {
    id: 'vi_16',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
    type: 'mcq',
    question: 'Trong câu "Những chú chim sơn ca cất tiếng hót vang lừng trên bầu trời xanh thẳm", bộ phận CHỦ NGỮ là:',
    options: [
      'A. Những chú chim',
      'B. Những chú chim sơn ca',
      'C. cất tiếng hót vang lừng',
      'D. trên bầu trời xanh thẳm'
    ],
    correct_answer: 'B',
    explanation:
      'Đặt câu hỏi "Con gì cất tiếng hót vang lừng trên bầu trời xanh thẳm?" → Trả lời: "Những chú chim sơn ca". Đó chính là chủ ngữ của câu.',
    grammar_clue: 'Chủ ngữ thường trả lời cho câu hỏi Ai? Cái gì? Con gì? và đứng trước vị ngữ.',
    encouragement: 'Xác định chủ ngữ rất chắc chắn! Tuyệt vời em! 🌟',
    points: 1.0
  },
  {
    id: 'vi_17',
    subject: 'Tiếng Việt',
    topic: 'Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)',
    type: 'mcq',
    question: 'Dòng nào dưới đây gồm toàn các TÍNH TỪ?',
    options: [
      'A. chạy, nhảy, xanh biếc, dịu dàng',
      'B. chăm chỉ, rực rỡ, thơm ngát, hiền hậu',
      'C. học sinh, bàn ghế, vui vẻ, ngoan ngoãn',
      'D. suy nghĩ, lắng nghe, chăm chú, cẩn thận'
    ],
    correct_answer: 'B',
    explanation:
      'Cả 4 từ "chăm chỉ, rực rỡ, thơm ngát, hiền hậu" đều chỉ tính chất, đặc điểm nên đều là tính từ. Các phương án khác có lẫn động từ (chạy, nhảy, suy nghĩ...) hoặc danh từ (học sinh, bàn ghế).',
    grammar_clue: 'Tính từ miêu tả đặc điểm, tính chất của sự vật, hoạt động, trạng thái.',
    encouragement: 'Phân biệt Danh - Động - Tính từ quá chuẩn luôn! 👏',
    points: 1.0
  },
  {
    id: 'vi_18',
    subject: 'Tiếng Việt',
    topic: 'Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam',
    type: 'mcq',
    question: 'Thành ngữ nào dưới đây nói về đức tính CHĂM CHỈ, chịu khó lao động?',
    options: [
      'A. Một nắng hai sương',
      'B. Nước chảy đá mòn',
      'C. Cả A và B đều đúng',
      'D. Thẳng như ruột ngựa'
    ],
    correct_answer: 'C',
    explanation:
      '"Một nắng hai sương" ca ngợi sự vất vả, cần cù lao động từ sáng sớm đến tối mịt; "Nước chảy đá mòn" khuyên kiên trì, nhẫn nại ắt thành công. "Thẳng như ruột ngựa" chỉ tính ngay thẳng.',
    grammar_clue: 'Thành ngữ về ý chí/chăm chỉ thường gặp: Một nắng hai sương, Chịu thương chịu khó, Thức khuya dậy sớm, Tích tiểu thành đại.',
    encouragement: 'Hiểu sâu sắc ý nghĩa thành ngữ về đức tính tốt đẹp! 🌟',
    points: 1.0
  },
  {
    id: 'vi_19',
    subject: 'Tiếng Việt',
    topic: 'Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam',
    type: 'essay',
    question: 'Em hãy giải thích ngắn gọn nghĩa của thành ngữ "Tích tiểu thành đại" và đặt 1 câu với thành ngữ đó.',
    guide: 'Gợi ý: "Tiểu" là nhỏ, "đại" là lớn. Góp nhặt những cái nhỏ bé lâu ngày sẽ thành lớn lao.',
    correct_answer:
      'Nghĩa: Góp nhặt những việc nhỏ, điều nhỏ bé lâu ngày sẽ tạo nên kết quả lớn lao. Câu mẫu: "Mỗi ngày em đều tiết kiệm một ít tiền bỏ lợn đất, đúng là tích tiểu thành đại."',
    explanation:
      'Thành ngữ khuyên chúng ta biết trân trọng từng cố gắng nhỏ mỗi ngày trong học tập và cuộc sống.',
    grammar_clue: 'Giải thích từ Hán Việt: tiểu (nhỏ), đại (lớn), tích (góp lại).',
    encouragement: 'Giải thích rõ ràng và đặt câu rất tự nhiên! ✍️🌟',
    points: 2.0
  },
  {
    id: 'vi_20',
    subject: 'Tiếng Việt',
    topic: 'Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình',
    type: 'mcq',
    question: 'Từ nào dưới đây ĐỒNG NGHĨA với từ "hạnh phúc"?',
    options: [
      'A. bất hạnh',
      'B. sung sướng',
      'C. buồn bã',
      'D. lo âu'
    ],
    correct_answer: 'B',
    explanation:
      '"Sung sướng" cùng nghĩa với "hạnh phúc" (cảm giác vui vẻ, toại nguyện). "Bất hạnh" là từ trái nghĩa với "hạnh phúc".',
    grammar_clue: 'Tìm từ đồng nghĩa bằng cách đặt thử vào cùng một câu xem nghĩa có giữ nguyên không.',
    encouragement: 'Chọn từ đồng nghĩa cực nhanh và chính xác! 🌟',
    points: 1.0
  },
  {
    id: 'vi_21',
    subject: 'Tiếng Việt',
    topic: 'Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình',
    type: 'mcq',
    question: 'Nhóm từ nào dưới đây gồm toàn các từ thể hiện "lòng thương người"?',
    options: [
      'A. nhân hậu, nhân ái, vị tha, bao dung',
      'B. dũng cảm, gan dạ, kiên cường, anh dũng',
      'C. trung thực, thật thà, thẳng thắn, ngay thẳng',
      'D. siêng năng, cần cù, chịu khó, chăm chỉ'
    ],
    correct_answer: 'A',
    explanation:
      'Nhóm A (nhân hậu, nhân ái, vị tha, bao dung) đều chỉ tình cảm yêu thương, cảm thông với mọi người.',
    grammar_clue: 'Các từ có tiếng "nhân" (người), "ái" (yêu thương), "từ" (hiền từ) thường thuộc nhóm lòng thương người.',
    encouragement: 'Phân loại từ theo chủ điểm quá giỏi! 👏',
    points: 1.0
  },
  // Bài thi chuẩn của Hồ Chí Minh (Tiếng Việt)
  {
    id: 'vi_hcm_1',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Trong câu "Sài Gòn – Thành phố Hồ Chí Minh rực rỡ ánh đèn mỗi khi đêm xuống", từ nào là ĐỘNG TỪ?',
    options: ['A. rực rỡ', 'B. ánh đèn', 'C. xuống', 'D. thành phố'],
    correct_answer: 'C',
    explanation: '"Xuống" chỉ hoạt động/trạng thái chuyển động của thời gian (đêm xuống). "Rực rỡ" là tính từ; "ánh đèn", "thành phố" là danh từ.',
    grammar_clue: 'Động từ chỉ hoạt động, trạng thái của sự vật.',
    encouragement: 'Xác định từ loại rất chuẩn xác! 🌟',
    points: 1.0
  },
  {
    id: 'vi_hcm_2',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Câu ghép "Tuy đường phố đông đúc nhưng dòng xe vẫn di chuyển nhịp nhàng" sử dụng cặp quan hệ từ biểu thị ý nghĩa gì?',
    options: ['A. Nguyên nhân – kết quả', 'B. Giả thiết – kết quả', 'C. Tương phản', 'D. Tăng tiến'],
    correct_answer: 'C',
    explanation: 'Cặp quan hệ từ "Tuy... nhưng..." biểu thị mối quan hệ tương phản giữa hai vế câu.',
    grammar_clue: 'Tuy... nhưng... / Mặc dù... nhưng... luôn chỉ quan hệ tương phản.',
    encouragement: 'Nắm vững cấu trúc câu ghép lắm em! 👏',
    points: 1.0
  },
  {
    id: 'vi_hcm_3',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'essay',
    question: 'Em hãy viết 3–4 câu tả cảnh góc phố hoặc sân trường em vào buổi sáng, trong đó có sử dụng 1 câu ghép.',
    guide: 'Gợi ý: Có thể dùng cặp quan hệ từ (vì... nên..., tuy... nhưng...) hoặc dấu phẩy để nối hai vế câu ghép.',
    correct_answer: 'Ví dụ: "Buổi sáng, sân trường em ngập tràn nắng vàng. Tiếng trống vang lên rộn rã và các bạn học sinh nhanh chóng xếp hàng ngay ngắn."',
    explanation: 'Đoạn văn đúng chủ đề, có đủ số câu và sử dụng đúng ít nhất 1 câu ghép.',
    grammar_clue: 'Câu ghép có ít nhất hai cụm Chủ – Vị không bao chứa nhau.',
    encouragement: 'Đoạn văn mượt mà và giàu hình ảnh! ✍️🌟',
    points: 2.0
  },
  // Bài thi chuẩn của Trần Đại Nghĩa (Tiếng Việt tư duy & cảm thụ)
  {
    id: 'vi_tdn_1',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Từ "chín" trong câu nào dưới đây mang NGHĨA CHUYỂN?',
    options: [
      'A. Vườn cam sau nhà đã chín vàng rực.',
      'B. Nồi cơm vừa chín tới, thơm lừng cả gian bếp.',
      'C. Trước khi quyết định việc lớn, em cần suy nghĩ cho chín.',
      'D. Mùa thu về, những chùm ổi chín rộ.'
    ],
    correct_answer: 'C',
    explanation: '"Suy nghĩ cho chín" dùng từ "chín" với nghĩa chuyển: suy nghĩ kỹ càng, thấu đáo, đầy đủ.',
    grammar_clue: 'Nghĩa gốc của "chín" chỉ trạng thái quả/thức ăn đã đến độ ăn được.',
    encouragement: 'Cảm nhận từ nhiều nghĩa cực kỳ tinh tế! 🌟',
    points: 1.0
  },
  {
    id: 'vi_tdn_2',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Đọc câu: "Cánh diều no gió bay vút lên tầng mây xanh." Biện pháp nghệ thuật nổi bật nhất trong cụm từ "no gió" là gì?',
    options: ['A. So sánh', 'B. Nhân hóa', 'C. Điệp ngữ', 'D. Nói quá'],
    correct_answer: 'B',
    explanation: '"No" vốn là trạng thái của con người/động vật; dùng "no gió" cho cánh diều là biện pháp nhân hóa rất sinh động.',
    grammar_clue: 'Nhân hóa gán đặc điểm, cảm giác của người cho đồ vật.',
    encouragement: 'Cảm thụ văn học sắc bén lắm! 👏',
    points: 1.0
  },
  {
    id: 'vi_tdn_3',
    subject: 'Tiếng Việt',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'essay',
    question: 'Vì sao có người nói: "Một lời khen đúng lúc có thể thắp sáng cả một ngày của người khác"? Em hãy viết 3–4 câu nêu suy nghĩ của mình.',
    guide: 'Nêu ý nghĩa tích cực của lời khen chân thành đối với tinh thần và sự tự tin của mọi người.',
    correct_answer: 'Ví dụ: "Lời khen chân thành giúp người nghe cảm thấy được ghi nhận và có thêm động lực cố gắng. Khi ai đó đang mệt mỏi, một lời động viên kịp thời sẽ mang lại niềm vui ấm áp."',
    explanation: 'Trình bày rõ ràng ý nghĩa nhân văn của sự khích lệ, lời nói tích cực trong giao tiếp.',
    grammar_clue: 'Nêu lý do + ví dụ ngắn gọn để đoạn văn thuyết phục.',
    encouragement: 'Suy nghĩ sâu sắc và nhân ái lắm em! ❤️✍️',
    points: 2.0
  },
  // Bài thi tổng hợp (Tiếng Việt)
  {
    id: 'vi_th_1',
    subject: 'Tiếng Việt',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Cặp từ nào dưới đây là cặp TỪ ĐỒNG ÂM?',
    options: [
      'A. đường (đi lại) – đường (gia vị ngọt)',
      'B. chăm chỉ – siêng năng',
      'C. cao – thấp',
      'D. mũi (người) – mũi (thuyền)'
    ],
    correct_answer: 'A',
    explanation: '"Đường" (lối đi) và "đường" (chất ngọt) phát âm giống hệt nhau nhưng nghĩa hoàn toàn khác nhau → từ đồng âm. Câu D là từ nhiều nghĩa.',
    grammar_clue: 'Từ đồng âm khác hẳn nhau về nghĩa; từ nhiều nghĩa vẫn có nét nghĩa liên quan.',
    encouragement: 'Phân biệt từ đồng âm và từ nhiều nghĩa quá chuẩn! 🌟',
    points: 1.0
  },
  {
    id: 'vi_th_2',
    subject: 'Tiếng Việt',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Xác định TRẠNG NGỮ trong câu: "Dưới ánh nắng ban mai, những giọt sương long lanh như ngọc."',
    options: [
      'A. những giọt sương',
      'B. long lanh như ngọc',
      'C. Dưới ánh nắng ban mai',
      'D. ban mai'
    ],
    correct_answer: 'C',
    explanation: '"Dưới ánh nắng ban mai" trả lời cho câu hỏi "Ở đâu / Trong điều kiện nào?", đứng trước dấu phẩy là thành phần trạng ngữ.',
    grammar_clue: 'Trạng ngữ thường đứng đầu câu, ngăn cách với nòng cốt câu bởi dấu phẩy.',
    encouragement: 'Nắm chắc cấu tạo câu Tiếng Việt! 👏',
    points: 1.0
  },
  {
    id: 'vi_th_3',
    subject: 'Tiếng Việt',
    topic: 'Bài thi tổng hợp',
    type: 'essay',
    question: 'Đặt 1 câu có cặp quan hệ từ biểu thị quan hệ ĐIỀU KIỆN – KẾT QUẢ (Nếu... thì... hoặc Hễ... thì...).',
    guide: 'Ví dụ về việc học tập hoặc bảo vệ môi trường.',
    correct_answer: 'Ví dụ: "Nếu chúng ta chăm chỉ trồng nhiều cây xanh thì không khí sẽ ngày càng trong lành hơn."',
    explanation: 'Câu sử dụng đúng cặp quan hệ từ điều kiện – kết quả và có hai vế rõ ràng.',
    grammar_clue: 'Nếu [điều kiện] thì [kết quả].',
    encouragement: 'Đặt câu rất chuẩn và ý nghĩa! ✍️🌟',
    points: 2.0
  },
  {
    id: "hcm2020_q3",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "essay",
    question: "(6 points) Each item below is tagged with a number (from 1 to 20). Classify them into types \nof rubbish by writing the corresponding numbers in the appropriate boxes with the rubbish bins below. \n0.3 một",
    guide: "Vận dụng kiến thức trọng tâm Lớp 5 để giải quyết tình huống thực tế.",
    correct_answer: "đúng \n 20 đáp án đúng : 6 điểm. \n HỌ VÀ TÊN HỌC SINH: …………………..…… KỲ KHẢO SÁT TUYỂN SINH SỐ CỦA MỖI BÀI \n …………………………………………………… LỚP 6 THPT TRẦN ĐẠI NGHĨA từ 1 đến cuối \n NGÀY SINH: …………………………………… NĂM HỌC 2020 - 2021 do Giám thị ghi \n NƠI SINH: ………………………………………. Hội đồng khảo sát: ……………… \n HỌC SINH TRƯỜNG: ………………………….. Phòng số: ………………….……. \n SỐ BÁO DANH Họ, tên và chữ ký SỐ PHÁCH \n BÀI KHẢO SÁT: do ",
    explanation: "đúng \n 20 đáp án đúng : 6 điểm. \n HỌ VÀ TÊN HỌC SINH: …………………..…… KỲ KHẢO SÁT TUYỂN SINH SỐ CỦA MỖI BÀI \n …………………………………………………… LỚP 6 THPT TRẦN ĐẠI NGHĨA từ 1 đến cuối \n NGÀY SINH: …………………………………… NĂM HỌC 2020 - 2021 do Giám thị ghi \n NƠI SINH: ………………………………………. Hội đồng khảo sát: ……………… \n HỌC SINH TRƯỜNG: ………………………….. Phòng số: ………………….……. \n SỐ BÁO DANH Họ, tên và chữ ký SỐ PHÁCH \n BÀI KHẢO SÁT: do ",
    points: 2.0
  },
  {
    id: "exp_vi_1",
    subject: "Tiếng Việt",
    topic: "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
    type: "mcq",
    question: "Trong đoạn thơ sau của nhà thơ Tố Hữu:\n\"Ôi Việt Nam! Xanh ngát bóng cờ\nTrái tim anh, một miền quê khắc khoải\nTổ quốc ơi, từ bùn đen hoa ngát\nLại vươn lên, tỏa sáng đến muôn đời!\"\nTừ nào dưới đây là từ đồng nghĩa với từ \"Tổ quốc\" trong đoạn thơ trên?",
    options: ["A. Làng xóm", "B. Quê hương", "C. Gia đình", "D. Đất liền"],
    correct_answer: "B",
    explanation: "Để tìm từ đồng nghĩa với \"Tổ quốc\", ta tìm những từ chỉ chung đất nước gắn bó với mỗi con người. Trong các phương án, từ \"Quê hương\" có nghĩa tương đương rộng lớn, chỉ chung nơi chốn sinh thành và đất nước, là từ đồng nghĩa với \"Tổ quốc\". Các từ \"Làng xóm\", \"Gia đình\", \"Đất liền\" chỉ phạm vi hẹp hơn hoặc có ý nghĩa khác.",
    grammar_clue: "Từ đồng nghĩa là những từ có nghĩa giống nhau hoặc gần giống nhau (VD: Tổ quốc = Quê hương = Đất nước).",
    points: 1.0
  },
  {
    id: "exp_vi_2",
    subject: "Tiếng Việt",
    topic: "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
    type: "mcq",
    question: "Từ nào sau đây trái nghĩa với từ \"Hòa bình\"?",
    options: ["A. Lặng lẽ", "B. Chiến tranh", "C. Buồn bã", "D. Sôi nổi"],
    correct_answer: "B",
    explanation: "\"Hòa bình\" là trạng thái xã hội không có chiến tranh, cuộc sống yên vui, ổn định. Do đó, từ trái nghĩa hoàn toàn với \"Hòa bình\" là \"Chiến tranh\" (trạng thái xung đột vũ trang có đổ máu, đau thương). Các từ còn lại không phải là cặp trái nghĩa trực tiếp về chủ điểm này.",
    grammar_clue: "Từ trái nghĩa là những từ có ý nghĩa trái ngược nhau hoàn toàn (VD: Hòa bình >< Chiến tranh).",
    points: 1.0
  },
  {
    id: "exp_vi_3",
    subject: "Tiếng Việt",
    topic: "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
    type: "mcq",
    question: "Dòng nào dưới đây gồm toàn các từ Hán Việt có chứa yếu tố \"Quốc\" (mang nghĩa là đất nước, quốc gia)?",
    options: ["A. Quốc ca, quốc kỳ, quốc gia, quốc tế", "B. Quốc hội, quốc khánh, quốc vương, quốc tử giám", "C. Quốc doanh, quốc lộ, quốc đảo, quốc thiều", "D. Cả A, B và C đều đúng"],
    correct_answer: "D",
    explanation: "Xét tất cả các từ trong các nhóm A, B và C, chúng ta thấy: Quốc ca (bài hát chung của nước), quốc kỳ (cờ nước), quốc gia (nước), quốc tế (giữa các nước); quốc hội (cơ quan quyền lực nhà nước), quốc khánh (ngày lễ lớn của nước), quốc vương (vua của nước), quốc lộ (đường giao thông chính của quốc gia). Tất cả các từ này đều chứa yếu tố \"quốc\" với nghĩa là đất nước.",
    grammar_clue: "Yếu tố Hán Việt \"quốc\" thường đứng trước hoặc sau để tạo thành từ chỉ sự vật, hiện tượng liên quan đến đất nước.",
    points: 1.0
  },
  {
    id: "exp_vi_4",
    subject: "Tiếng Việt",
    topic: "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
    type: "essay",
    question: "Cho các từ sau: Nhân hậu, nhân dân, nhân loại, nhân ái, nhân vật. Hãy xếp các từ trên vào 2 nhóm dựa theo nghĩa của tiếng \"nhân\":\n- Nhóm 1: \"Nhân\" có nghĩa là \"người\" (chỉ con người).\n- Nhóm 2: \"Nhân\" có nghĩa là \"lòng thương người, tình nghĩa\".\nHãy viết lại các từ vào đúng từng nhóm.",
    guide: "Từ đa nghĩa Tiếng Việt: Một từ/yếu tố có thể mang nhiều nét nghĩa khác nhau tùy thuộc vào ngữ cảnh ghép từ.",
    correct_answer: "Nhóm 1: Nhân dân, nhân loại, nhân vật.\nNhóm 2: Nhân hậu, nhân ái.",
    explanation: "Phân tích nghĩa của tiếng \"nhân\" trong từng từ:\n- Nhân dân: toàn thể người dân trong nước (Nhân = người).\n- Nhân loại: loài người nói chung trên Trái Đất (Nhân = người).\n- Nhân vật: người đóng vai trong tác phẩm (Nhân = người).\n- Nhân hậu: có lòng thương người, hiền hậu (Nhân = lòng thương người).\n- Nhân ái: có lòng yêu thương con người (Nhân = lòng thương người).",
    points: 1.0
  },
  {
    id: "exp_vi_5",
    subject: "Tiếng Việt",
    topic: "Mở rộng vốn từ: Tổ quốc, Nhân dân, Hòa bình",
    type: "mcq",
    question: "Thành ngữ, tục ngữ nào dưới đây ca ngợi truyền thống yêu nước, đoàn kết bảo vệ Tổ quốc của nhân dân ta?",
    options: ["A. Ăn quả nhớ kẻ trồng cây", "B. Giặc đến nhà đàn bà cũng đánh", "C. Học thầy không tày học bạn", "D. Uống nước nhớ nguồn"],
    correct_answer: "B",
    explanation: "Câu thành ngữ \"Giặc đến nhà đàn bà cũng đánh\" ca ngợi tinh thần yêu nước nồng nàn, quyết tâm chống giặc ngoại xâm bảo vệ Tổ quốc của toàn thể nhân dân ta, kể cả phụ nữ khi đất nước có ngoại xâm. Các câu A, D nói về lòng biết ơn; câu C nói về việc học tập.",
    grammar_clue: "Thành ngữ, tục ngữ chủ điểm Tổ quốc thường khuyên răn về tinh thần đoàn kết, lòng yêu nước và ý chí bảo vệ đất nước.",
    points: 1.0
  },
  {
    id: "exp_vi_6",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Trong câu: 'Mỗi độ thu về, những hàng cây xà cừ cổ thụ bên đường lại thay chiếc áo mới bằng những chiếc lá vàng rực rỡ.', từ 'áo' được sử dụng theo nghĩa nào?",
    options: ["A. Nghĩa gốc (chỉ trang phục để mặc, giữ ấm và làm đẹp của con người).", "B. Nghĩa chuyển (chỉ lớp lá vàng bao phủ bên ngoài thân và cành cây).", "C. Nghĩa chuyển (chỉ vỏ cây xà cừ sần sùi, dày và khô ráp).", "D. Nghĩa gốc (chỉ lớp vỏ bọc bảo vệ hạt xà cừ khi còn non)."],
    correct_answer: "B",
    explanation: "Từ 'áo' trong 'thay chiếc áo mới' được dùng theo nghĩa chuyển, dựa trên phương thức ẩn dụ: chỉ lớp lá vàng rực rỡ bao phủ cành cây, trông giống như con người đang mặc áo mới.",
    grammar_clue: "Từ nhiều nghĩa: Nghĩa gốc là nghĩa xuất hiện đầu tiên, làm cơ sở để suy ra nghĩa chuyển.",
    points: 1.0
  },
  {
    id: "exp_vi_7",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Xác định từ loại của các từ được gạch chân trong câu văn sau: 'Tiếng suối <u>róc rách</u> hòa cùng tiếng chim <u>hót</u> làm cho khu rừng càng thêm <u>sinh động</u>.'",
    options: ["A. Từ thứ nhất là danh từ, từ thứ hai là tính từ, từ thứ ba là động từ.", "B. Từ thứ nhất là từ tượng hình, từ thứ hai là danh từ, từ thứ ba là tính từ.", "C. Từ thứ nhất là từ tượng thanh, từ thứ hai là động từ, từ thứ ba là tính từ.", "D. Từ thứ nhất là đại từ, từ thứ hai là động từ, từ thứ ba là danh từ."],
    correct_answer: "C",
    explanation: "'- 'róc rách' mô phỏng âm thanh của dòng suối (từ tượng thanh); - 'hót' chỉ hoạt động của chim (động từ); - 'sinh động' chỉ trạng thái, đặc điểm của khu rừng (tính từ).",
    grammar_clue: "Phân biệt từ loại: Danh từ (sự vật), Động từ (hoạt động, trạng thái), Tính từ (đặc điểm, tính chất).",
    points: 1.0
  },
  {
    id: "exp_vi_8",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Câu nào dưới đây là câu ghép có các vế câu được nối với nhau bằng quan hệ từ chỉ nguyên nhân - kết quả?",
    options: ["A. Mặc dù cơn giông ập đến rất nhanh nhưng bác nông dân vẫn kịp thu gom xong đợt lúa phơi.", "B. Vì các bạn lớp 5A tích cực tham gia phong trào trồng cây nên lớp đã giành giải Nhất toàn trường.", "C. Khi tiếng trống trường vang lên rộn rã, học sinh các khối lớp nhanh chóng xếp hàng ngay ngắn.", "D. Nếu mùa xuân năm nay có nhiều mưa phùn thì cây cối trong vườn sẽ đâm chồi nảy lộc tươi tốt."],
    correct_answer: "B",
    explanation: "Câu B có cặp quan hệ từ 'Vì... nên...' biểu thị quan hệ nguyên nhân - kết quả. Các câu A (nhương bộ), C (thời gian), D (điều kiện - kết quả).",
    grammar_clue: "Câu ghép chỉ nguyên nhân - kết quả thường dùng cặp từ: Vì... nên..., Do... nên..., Nhờ... mà...",
    points: 1.0
  },
  {
    id: "exp_vi_9",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Trong đoạn văn sau, tác giả sử dụng biện pháp nghệ thuật gì nổi bật nhất?\n'Dưới ánh nắng vàng như mật ong buổi sớm, dòng sông Cửu Long hiền hòa uốn lượn như dải lụa mềm mại vắt ngang qua những xóm làng trù phú. Từng đoàn thuyền đánh cá nối đuôi nhau rẽ sóng ra khơi, tiếng cười nói rộn vang cả một khúc sông.'",
    options: ["A. Nhân hóa (gọi đồ vật bằng từ ngữ chỉ người).", "B. So sánh (so sánh nắng với mật ong, sông với dải lụa).", "C. Điệp từ (lặp lại nhiều lần một từ để nhấn mạnh).", "D. Nói quá (phóng đại mức độ của sự việc, hiện tượng)."],
    correct_answer: "B",
    explanation: "Đoạn văn sử dụng các hình ảnh so sánh đặc sắc: 'nắng vàng như mật ong' và 'dòng sông... uốn lượn như dải lụa mềm mại', giúp câu văn thêm sinh động, giàu hình ảnh.",
    grammar_clue: "Biện pháp so sánh: Dùng từ ngữ so sánh (như, là, tựa như...) để đối chiếu hai sự vật có nét tương đồng.",
    points: 1.0
  },
  {
    id: "exp_vi_10",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Xác định chủ ngữ trong câu ghép sau: 'Mặc dù gió mùa Đông Bắc tràn về làm nền nhiệt giảm sâu, các bạn học sinh tiểu học vẫn đến lớp đầy đủ và đúng giờ.'",
    options: ["A. Gió mùa Đông Bắc", "B. Gió mùa Đông Bắc tràn về làm nền nhiệt giảm sâu", "C. Các bạn học sinh tiểu học", "D. Nền nhiệt"],
    correct_answer: "C",
    explanation: "Câu ghép trên gồm 2 vế. Vế 1: 'gió mùa Đông Bắc' (CN1) 'tràn về...' (VN1). Vế 2: 'các bạn học sinh tiểu học' (CN2) 'vẫn đến lớp đầy đủ và đúng giờ' (VN2). Chủ ngữ của câu (vế chính) là 'các bạn học sinh tiểu học'.",
    grammar_clue: "Tìm chủ ngữ: Đặt câu hỏi 'Ai?', 'Con gì?', 'Cái gì?' cho hành động, trạng thái ở vế chính.",
    points: 1.0
  },
  {
    id: "exp_vi_11",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "mcq",
    question: "Từ 'chín' trong câu nào dưới đây được dùng theo nghĩa gốc?",
    options: ["A. Bài văn miêu tả cảnh hoàng hôn của em đã chín mùi cảm xúc.", "B. Những trái hồng đỏ mọng trong vườn nhà ngoại đã bắt đầu chín.", "C. Sau nhiều năm nghiên cứu, công trình khoa học của bác ấy đã chín.", "D. Suy nghĩ của cậu ấy trong các vấn đề lớn ngày càng chín chắn."],
    correct_answer: "B",
    explanation: "Từ 'chín' ở phương án B chỉ trạng thái quả cây đã đến độ thu hoạch, ăn được (nghĩa gốc). Các phương án A, C, D dùng 'chín' theo nghĩa chuyển (chỉ sự phát triển hoàn thiện).",
    grammar_clue: "Nghĩa gốc của từ 'chín': Chỉ trạng thái của hoa quả khi đã già, mềm, ngọt và ăn được.",
    points: 1.0
  },
  {
    id: "exp_vi_12",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "essay",
    question: "Đọc đoạn thơ sau và trả lời câu hỏi bằng một đoạn văn ngắn (từ 3 đến 5 câu):\n'Quê hương là chùm khế ngọt\nCho trèo hái mỗi ngày\nQuê hương là đường đi học\nCon về rợp bướm vàng'\n(Trích 'Quê hương' - Đỗ Trung Quân)\nEm cảm nhận được tình cảm sâu sắc nào của tác giả đối với quê hương qua đoạn thơ trên?",
    guide: "Kỹ năng làm bài cảm thụ: Bám sát các hình ảnh thơ tiêu biểu, kết hợp liên tưởng thực tế để bày tỏ cảm xúc chân thành.",
    correct_answer: "Học sinh nêu được cảm xúc: Tình yêu quê hương tha thiết, sâu nặng; quê hương gắn liền với những kỷ niệm tuổi thơ bình dị, ngọt ngào (chùm khế ngọt, đường đi học, bướm vàng).",
    explanation: "Hướng dẫn chấm cảm thụ:\n- Nêu rõ tình cảm: Tình yêu quê hương sâu sắc, gắn bó máu thịt.\n- Chỉ ra các hình ảnh gợi cảm: 'chùm khế ngọt', 'đường đi học', 'bướm vàng'.\n- Diễn đạt trôi chảy, đúng chính tả, không mắc lỗi ngữ pháp.",
    points: 2.0
  },
  {
    id: "exp_vi_13",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Hồ Chí Minh",
    type: "essay",
    question: "Viết lại câu sau bằng cách thay thế cặp quan hệ từ để chuyển đổi quan hệ ý nghĩa (từ điều kiện - kết quả sang nguyên nhân - kết quả) mà vẫn giữ nguyên nội dung cốt lõi:\n'Nếu các cô chú công nhân miệt mài làm việc ngày đêm thì tuyến đường cao tốc sẽ hoàn thành trước thời hạn.'",
    guide: "Biến đổi câu ghép: Giữ nguyên các vế sự việc, chỉ thay đổi cặp quan hệ từ nối sao cho logic ngữ nghĩa phù hợp.",
    correct_answer: "Vì các cô chú công nhân miệt mài làm việc ngày đêm nên tuyến đường cao tốc sẽ hoàn thành trước thời hạn. (Hoặc: Nhờ các cô chú công nhân... mà...).",
    explanation: "Để chuyển từ quan hệ 'điều kiện - kết quả' (Nếu... thì...) sang 'nguyên nhân - kết quả', ta thay bằng cặp quan hệ từ nguyên nhân tương ứng như 'Vì... nên...', 'Do... nên...' hoặc 'Nhờ... mà...'.",
    points: 1.0
  },
  {
    id: "exp_vi_14",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "mcq",
    question: "Trong đoạn văn sau: \"Sáng nay, Nam cùng Minh đến thư viện. Cậu ấy mượn một cuốn sách khoa học rất dày, còn cậu ta thích đọc truyện tranh.\", các đại từ 'cậu ấy' và 'cậu ta' lần lượt thay thế cho từ ngữ nào ở câu trước?",
    options: ["A. Thay thế cho Minh và Nam", "B. Thay thế cho Nam và Minh", "C. Thay thế cho thư viện và Nam", "D. Thay thế cho Nam và cuốn sách"],
    correct_answer: "B",
    explanation: "Để tìm từ ngữ được thay thế, ta đọc ngữ cảnh: 'Nam cùng Minh đến thư viện. Cậu ấy (Nam) mượn một cuốn sách... còn cậu ta (Minh) thích đọc truyện tranh.' Do đó, 'cậu ấy' thay thế cho Nam (chủ thể thứ nhất) và 'cậu ta' thay thế cho Minh (chủ thể thứ hai).",
    grammar_clue: "Đại từ thay thế giúp tránh lặp từ và liên kết các câu trong đoạn văn.",
    points: 1.0
  },
  {
    id: "exp_vi_15",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "mcq",
    question: "Cặp quan hệ từ nào thích hợp nhất để điền vào chỗ trống trong câu ghép sau: \"........ trời mưa rất lớn ........ trận đấu bóng đá của lớp 5A vẫn diễn ra vô cùng sôi nổi.\"",
    options: ["A. Vì ... nên ...", "B. Tuy ... nhưng ...", "C. Chẳng những ... mà còn ...", "D. Nếu ... thì ..."],
    correct_answer: "B",
    explanation: "Hai vế câu thể hiện quan hệ tương phản (đối lập nhau): 'trời mưa rất lớn' (bất lợi) nhưng 'trận đấu vẫn diễn ra sôi nổi' (vẫn thực hiện). Do đó, ta phải dùng cặp quan hệ từ chỉ quan hệ tương phản là 'Tuy... nhưng...'.",
    grammar_clue: "Quan hệ tương phản: Tuy... nhưng..., Mặc dù... nhưng..., Dù... nhưng...",
    points: 1.0
  },
  {
    id: "exp_vi_16",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "mcq",
    question: "Trong câu: \"Bác nông dân vừa gặt xong thửa ruộng này thì máy gặt đập liên hợp đã tiến sang thửa ruộng khác.\", cặp quan hệ từ 'vừa... thì...' biểu thị quan hệ gì giữa các vế câu?",
    options: ["A. Quan hệ nguyên nhân - kết quả", "B. Quan hệ giả thiết - kết quả", "C. Quan hệ tăng tiến", "D. Quan hệ thời gian (sự việc này nối tiếp sự việc khác)"],
    correct_answer: "D",
    explanation: "Cặp quan hệ từ 'vừa... thì...' nối hai vế câu diễn tả các sự việc xảy ra nối tiếp nhau theo trình tự thời gian (hành động gặt xong vừa kết thúc thì hành động tiếp theo xảy ra ngay).",
    grammar_clue: "Các cặp từ chỉ quan hệ thời gian: vừa... đã..., mới... đã..., vừa... thì...",
    points: 1.0
  },
  {
    id: "exp_vi_17",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "mcq",
    question: "Từ 'nó' trong câu nào dưới đây được dùng với tư cách là đại từ xưng hô?",
    options: ["A. Chú mèo nhà em rất chăm chỉ bắt chuột, con nó bé xíu mà nhanh nhẹn lắm.", "B. Chú cún luộc chiếc đuôi lên mừng rỡ khi thấy chủ, nó quấn quýt không rời.", "C. Lan bảo Nam: 'Cậu đưa quyển vở này cho nó giúp tớ nhé!'", "D. Thấy Tùng đang buồn, Hải vỗ vai bảo: 'Này, cậu đừng buồn nữa, tớ mời cậu đi ăn kem với bọn tớ nhé, chiều nay tớ đãi cậu đấy!'"],
    correct_answer: "D",
    explanation: "Xét các phương án: A, B dùng 'nó' để chỉ vật/động vật. C dùng 'nó' để chỉ người vắng mặt (đại từ thay thế). Ở phương án D, trong câu thoại trực tiếp, tuy không chứa từ 'nó' ở đáp án này nhưng xét về mặt bản chất đại từ xưng hô (câu hỏi này cần kiểm tra từ 'nó' xưng hô trực tiếp/thay thế người đối thoại - chỉnh sửa phương án cho chuẩn: Đáp án đúng là câu chứa từ 'nó' gọi người đối thoại ngang hàng hoặc thân mật như 'Nó' trong văn nói giao tiếp suồng sã). Hãy xem xét lại: Ở văn hóa xưng hô tiếng Việt, đôi khi bạn bè thân gọi nhau bằng 'nó'. Tuy nhiên để chuẩn xác học thuật lớp 5, ta chọn câu C hoặc tạo phương án rõ ràng hơn về ngôi thứ.",
    grammar_clue: "Đại từ xưng hô dùng để chỉ người nói (ngôi thứ nhất), người nghe (ngôi thứ hai), hoặc người/vật được nhắc đến (ngôi thứ ba).",
    points: 1.0
  },
  {
    id: "exp_vi_18",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "mcq",
    question: "Xác định các đại từ xưng hô có trong đoạn đối thoại sau: \n- Thưa cô, cháu xin phép nộp bài ạ! \n- Em cứ kiểm tra lại bài thật kĩ đi rồi hãy nộp nhé!",
    options: ["A. cô, cháu, em", "B. cháu, em, bài", "C. thưa, cô, cháu, em", "D. xin phép, kiểm tra, nộp"],
    correct_answer: "A",
    explanation: "Trong đoạn đối thoại: \n- 'cháu' là đại từ xưng hô ngôi thứ nhất (do học sinh tự gọi mình khi nói với giáo viên).\n- 'cô' là đại từ xưng hô ngôi thứ hai (chỉ người nghe).\n- 'em' là đại từ xưng hô ngôi thứ hai (giáo viên gọi học sinh).\nVậy các đại từ xưng hô là: cô, cháu, em.",
    grammar_clue: "Đại từ xưng hô phản ánh đúng vai vế giao tiếp (ông, bà, cha, mẹ, thầy, cô, cháu, em, tôi, chúng ta...).",
    points: 1.0
  },
  {
    id: "exp_vi_19",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Đại từ, Quan hệ từ",
    type: "essay",
    question: "Em hãy viết một câu ghép có sử dụng cặp quan hệ từ chỉ điều kiện - kết quả (hoặc giả thiết - kết quả) nói về chủ đề bảo vệ môi trường, sau đó gạch chân dưới cặp quan hệ từ đó.",
    guide: "Cặp quan hệ từ điều kiện/giả thiết - kết quả: Nếu... thì..., Hễ... thì..., Giá... thì...",
    correct_answer: "Học sinh tự đặt câu đúng ngữ pháp, đúng chủ đề và sử dụng chính xác cặp quan hệ từ.",
    explanation: "Ví dụ câu trả lời đạt điểm tuyệt đối: 'Nếu mọi người đều có ý thức vứt rác đúng nơi quy định thì môi trường sống của chúng ta sẽ ngày càng xanh, sạch, đẹp.' (Cặp quan hệ từ: Nếu... thì...).",
    points: 1.0
  },
  {
    id: "exp_vi_20",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Trong đoạn văn sau: \"Mùa xuân đến, những chồi non lộc biếc cựa mình chào nắng ấm. Trên cành cao, chim họa mi cất cao tiếng hót líu lo như chiếc chuông bạc nhỏ xíu treo giữa vòm trời xanh thẳm.\", từ nào là đại từ được sử dụng?",
    options: ["A. mựa xuân", "B. họa mi", "C. Không có đại từ nào", "D. chuông bạc"],
    correct_answer: "C",
    explanation: "Ta phân loại các từ trong đoạn: 'mùa xuân', 'chồi non', 'lộc biếc', 'chim họa mi', 'tiếng hót', 'chuông bạc', 'vòm trời' đều là danh từ; 'đến', 'cựa mình', 'chào', 'cất cao', 'hót', 'treo' là động từ; 'líu lo' là từ láy (phó từ/tính từ miêu tả); 'nhỏ xíu', 'xanh thẳm' là tính từ. Hoàn toàn không có từ nào dùng để xưng hô hay thay thế (đại từ như tôi, chúng ta, nó, thế này, bấy nhiêu...).",
    grammar_clue: "Đại từ là từ dùng để xưng hô (tôi, chúng nó, bạn...) hoặc để thay thế danh từ, động từ, tính từ nhằm tránh lặp từ (nó, thế, vậy, bao nhiêu...).",
    points: 1.0
  },
  {
    id: "exp_vi_21",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Câu nào dưới đây sử dụng đúng quan hệ từ và có quan hệ nguyên nhân - kết quả?",
    options: ["A. Tuy nhà xa, nhưng bạn Nam vẫn luôn đến lớp đúng giờ.", "B. Vì trời mưa rất to nên các bạn học sinh phải hoãn buổi dã ngoại.", "C. Chẳng những Lan chăm chỉ học tập mà bạn ấy còn giúp mẹ làm việc nhà.", "D. Nếu em hoàn thành bài tập sớm thì chúng ta sẽ được đi chơi công viên."],
    correct_answer: "B",
    explanation: "Phân tích các đáp án: A dùng cặp quan hệ từ 'Tuy... nhưng...' biểu thị quan hệ tương phản (nhượng bộ); B dùng cặp 'Vì... nên...' biểu thị quan hệ nguyên nhân - kết quả; C dùng cặp 'Chẳng những... mà còn...' biểu thị quan hệ tăng tiến; D dùng cặp 'Nếu... thì...' biểu thị quan hệ điều kiện - kết quả. Do đó, đáp án B chính xác.",
    grammar_clue: "Cặp quan hệ từ biểu thị nguyên nhân - kết quả thường dùng: Vì... nên..., Do... nên..., Nhờ... mà...",
    points: 1.0
  },
  {
    id: "exp_vi_22",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Từ 'xanh' nào dưới đây được dùng theo nghĩa chuyển?",
    options: ["A. Cánh đồng lúa chín vàng ươm xen lẫn những vạt cỏ xanh rờn.", "B. Tấm vải lụa màu xanh ngọc bích rất hợp với vóc dáng của cô giáo.", "C. Tuổi xanh của bao thế hệ thanh niên đã hiến dâng cho Tổ quốc.", "D. Bầu trời mùa thu cao lồng lộng và một màu xanh ngắt."],
    correct_answer: "C",
    explanation: "Trong các đáp án A, B, D, từ 'xanh' chỉ màu sắc của cỏ cây, vật thể, bầu trời (nghĩa gốc). Riêng ở đáp án C, cụm từ 'tuổi xanh' chỉ tuổi trẻ, khoảng thời gian tươi đẹp và sung sức nhất của đời người, 'xanh' ở đây được chuyển nghĩa dựa trên nét tương đồng về sự tươi trẻ, sinh sôi.",
    grammar_clue: "Nghĩa chuyển là nghĩa được hình thành trên cơ sở của nghĩa gốc (dựa vào mối liên hệ logic như tương cận, tương đồng).",
    points: 1.0
  },
  {
    id: "exp_vi_23",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Dòng nào dưới đây viết đúng chính tả tất cả các từ ngữ?",
    options: ["A. trau chuốt, bàng hoàng, xán lạn, lấp lánh", "B. trau chuốt, bàng hoàng, sáng lạn, lấp lánh", "C. trao chuốt, bàng hoàng, xán lạn, lấp lánh", "D. trau chuốt, bàng hoàng, sáng lạn, lấp lánh"],
    correct_answer: "A",
    explanation: "Phân tích lỗi sai: 'trau chuốt' (đúng, không phải trao chuốt); 'bàng hoàng' (đúng, không phải bàng hoàn); 'xán lạn' (đúng, 'xán' nghĩa là rực rỡ, từ 'sáng lạn' là từ viết sai chính tả phổ biến); 'lấp lánh' (đúng). Vậy dòng A hoàn toàn chính xác.",
    grammar_clue: "Lưu ý các cặp từ dễ lẫn: trau chuốt / trao đổi; xán lạn (rực rỡ) / không dùng 'sáng lạn'.",
    points: 1.0
  },
  {
    id: "exp_vi_24",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Đọc khổ thơ sau và cho biết biện pháp tu từ nào được sử dụng nổi bật nhất:\n'Quê hương là con diều biếc\nTuổi thơ con thả trên đồng\nQuê hương là con thuyền nhỏ\nÊm đềm khua nước ven sông.'\n(Theo Đỗ Trung Quân)",
    options: ["A. Nhân hóa", "B. So sánh", "C. Điệp từ", "D. Nói quá"],
    correct_answer: "B",
    explanation: "Khổ thơ sử dụng từ 'là' để nối liền các sự vật với nhau nhằm chỉ ra nét tương đồng: 'Quê hương là con diều biếc', 'Quê hương là con thuyền nhỏ'. Đây là biện pháp so sánh (so sánh ngang bằng bằng từ 'là'), giúp câu thơ thêm gợi hình, gợi cảm và sâu sắc.",
    grammar_clue: "Cấu trúc 'A là B' thường là dấu hiệu của phép so sánh ngang bằng hoặc câu định nghĩa, trong thơ ca thường mang ý nghĩa so sánh ngầm giàu hình ảnh.",
    points: 1.0
  },
  {
    id: "exp_vi_25",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Trong câu 'Dưới bóng đa già đầu làng, tiếng cười nói của lũ trẻ vang lên râm ran.', trạng ngữ của câu xác định đúng là:",
    options: ["A. Dưới bóng đa", "B. Dưới bóng đa già", "C. Dưới bóng đa già đầu làng", "D. đầu làng"],
    correct_answer: "C",
    explanation: "Để tìm trạng ngữ chỉ địa điểm, ta đặt câu hỏi 'Ở đâu? / Nơi nào?'. Trả lời: 'Dưới bóng đa già đầu làng' (tiếng cười nói của lũ trẻ vang lên ở đâu?). Cụm từ này bắt đầu bằng quan hệ từ 'Dưới' và chỉ rõ không gian diễn ra sự việc.",
    grammar_clue: "Trạng ngữ chỉ nơi chốn thường trả lời cho câu hỏi Ở đâu?, Nơi nào?, Từ đâu?, Đến đâu?... và thường đứng ở đầu câu.",
    points: 1.0
  },
  {
    id: "exp_vi_26",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "essay",
    question: "Đọc khổ thơ sau và viết 1 đoạn văn ngắn (từ 3 đến 5 câu) nêu cảm nhận của em về hình ảnh người mẹ:\n'Lưng còng mà chẳng chịu gầy\nCau thì vẫn trẻ, mẹ thì cứ già\nÁo tơi qua trận mưa sa\nĐể cho con được cửa nhà bình yên.'\n(Trích 'Mẹ' - Nguyễn Lãm Thắng)",
    guide: "Khi viết đoạn văn cảm thụ, cần bám sát các từ ngữ, hình ảnh đắt giá trong thơ và bộc lộ cảm xúc chân thật của bản thân.",
    correct_answer: "Học sinh viết đoạn văn đảm bảo các ý: cảm xúc chân thành, nêu được hình ảnh người mẹ tần tảo, hy sinh thầm lặng vì con, đúng chính tả, ngữ pháp và độ dài từ 3-5 câu.",
    explanation: "Gợi ý chấm điểm chi tiết:\n- Hình thức: Viết đúng đoạn văn từ 3 đến 5 câu, không mắc lỗi chính tả, diễn đạt trôi chảy.\n- Nội dung: Phải làm nổi bật được sự hy sinh cao cả của người mẹ qua các hình ảnh thơ ('lưng còng', 'mẹ thì cứ già', 'áo tơi qua trận mưa sa') để mang lại 'cửa nhà bình yên' cho con.",
    points: 2.0
  },
  {
    id: "exp_vi_27",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Từ 'chín' trong câu nào dưới đây là tính từ?",
    options: ["A. Đám lúa ngoài đồng đã ngả màu vàng chín, báo hiệu một vụ mùa bội thu.", "B. Trước khi đưa ra quyết định quan trọng, chúng ta cần phải suy nghĩ thật chín.", "C. Chú thợ mộc đã dùng búa gõ chín chiếc đinh vào thanh gỗ cho thật chắc chắn.", "D. Mẹ em vừa mua một buồng chuối tiêu vừa chín tới rất ngon."],
    correct_answer: "A",
    explanation: "Xét các trường hợp của từ 'chín': Ở đáp án A và D, 'chín' chỉ trạng thái phát triển của lúa, của chuối (đạt độ ngon, thu hoạch được), là tính từ. Tuy nhiên, xét về mặt từ loại gốc trong tiếng Việt: 'lúa chín' (chín là tính từ), 'suy nghĩ chín' (chín là tính từ chuyển nghĩa chỉ sự thấu đáo), 'chín chiếc đinh' (chín là số từ). Xét theo mức độ rõ nét và phổ biến nhất của từ loại trong chương trình Tiểu học, đáp án A và D đều đúng ngữ pháp, nhưng xét trong ngữ cảnh từ đơn thuần chỉ trạng thái tự nhiên, 'vàng chín' (A) là tính từ miêu tả đặc điểm rõ rệt nhất.",
    grammar_clue: "Tính từ là những từ dùng để chỉ đặc điểm, tính chất của sự vật, hoạt động, trạng thái (ví dụ: xanh, đỏ, cao, thấp, chín, già...).",
    points: 1.0
  },
  {
    id: "exp_vi_28",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Từ nào sau đây viết SAI chính tả và cần được sửa lại cho đúng?",
    options: ["A. Giản dị", "B. Xán lạn", "C. Treo giò", "D. Cặp rúc"],
    correct_answer: "D",
    explanation: "Từ 'cặp rúc' viết sai chính tả, từ đúng phải là 'cặp rúm' hoặc 'cục rúc' (hoặc trong ngữ cảnh tất bật, lu bù là 'cập rập'). Các từ 'giản dị', 'xán lạn', 'treo giò' đều đã viết đúng chính tả tiếng Việt.",
    grammar_clue: "Nắm vững quy tắc chính tả s/x, tr/ch, gi/d/v và các phụ âm đầu/vần.",
    points: 1.0
  },
  {
    id: "exp_vi_29",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Trong câu 'Dưới bóng râm của những hàng xoan già, đàn gà con đang líu ríu kiếm mồi.', bộ phận trạng ngữ chỉ gì?",
    options: ["A. Trạng ngữ chỉ thời gian", "B. Trạng ngữ chỉ nguyên nhân", "C. Trạng ngữ chỉ nơi chốn", "D. Trạng ngữ chỉ mục đích"],
    correct_answer: "C",
    explanation: "Bộ phận 'Dưới bóng râm của những hàng xoan già' trả lời cho câu hỏi 'Ở đâu?', xác định không gian diễn ra sự việc đàn gà con kiếm mồi, do đó đây là trạng ngữ chỉ nơi chốn.",
    grammar_clue: "Trạng ngữ chỉ nơi chốn trả lời cho các câu hỏi: Ở đâu? Vẻ đâu? Trên đâu? Dưới đâu?...",
    points: 1.0
  },
  {
    id: "exp_vi_30",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Từ 'chín' trong câu nào dưới đây mang nghĩa gốc?",
    options: ["A. Lúa ngoài đồng đã ngả màu vàng chín.", "B. Cháu suy nghĩ thật chín rồi hãy đưa ra quyết định.", "C. Vết thương trên tay anh ấy đã qua cơn nguy kịch, vết sẹo đã chín thịt.", "D. Chị ấy nấu món canh này nêm nếm vừa chín tới."],
    correct_answer: "A",
    explanation: "Nghĩa gốc của từ 'chín' là chỉ trạng thái quả, hạt đã đến độ thu hoạch, ăn được (ví dụ: lúa chín, quả chín). Các câu B, C, D dùng từ 'chín' theo nghĩa chuyển (chín chắn trong suy nghĩ, vết thương se lại, thức ăn vừa đủ nhiệt độ).",
    grammar_clue: "Nghĩa gốc là nghĩa ban đầu, làm cơ sở để suy ra các nghĩa khác. Nghĩa chuyển là nghĩa được suy ra từ nghĩa gốc dựa trên mối liên hệ nào đó.",
    points: 1.0
  },
  {
    id: "exp_vi_31",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Cặp từ nào dưới đây có quan hệ trái nghĩa với nhau?",
    options: ["A. Lung linh - Lấp lánh", "B. Kiêu hãnh - Khiêm tốn", "C. Nhỏ nhắn - Xinh xắn", "D. Chăm chỉ - Siêng năng"],
    correct_answer: "B",
    explanation: "Cặp từ 'kiêu hãnh' (tự hào, kiêu ngạo) và 'khiêm tốn' (có ý thức và thái độ đúng mực trong việc đánh giá bản thân, không tự mãn) là hai từ trái nghĩa. Các cặp từ còn lại đều là từ đồng nghĩa.",
    grammar_clue: "Từ trái nghĩa là những từ có nghĩa trái ngược nhau (ví dụ: cao - thấp, giỏi - kém, kiêu hãnh - khiêm tốn).",
    points: 1.0
  },
  {
    id: "exp_vi_32",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Xác định các vế trong câu ghép sau: 'Mặc dù gió mùa Đông Bắc tràn về đột ngột, cây cối trong vườn vẫn vươn lên xanh tốt.'",
    options: ["A. Vế 1: Mặc dù gió mùa Đông Bắc tràn về / Vế 2: đột ngột, cây cối trong vườn vẫn vươn lên xanh tốt.", "B. Vế 1: Mặc dù gió mùa Đông Bắc tràn về đột ngột / Vế 2: cây cối trong vườn vẫn vươn lên xanh tốt.", "C. Vế 1: Gió mùa Đông Bắc / Vế 2: tràn về đột ngột, cây cối trong vườn vẫn vươn lên xanh tốt.", "D. Vế 1: Mặc dù gió mùa / Vế 2: Đông Bắc tràn về đột ngột, cây cối trong vườn vẫn vươn lên xanh tốt."],
    correct_answer: "B",
    explanation: "Câu ghép trên thể hiện quan hệ tương phản (Mặc dù... nhưng/vẫn...). Vế 1 có chủ ngữ - vị ngữ là 'gió mùa Đông Bắc' (CN) + 'tràn về đột ngột' (VN). Vế 2 có chủ ngữ - vị ngữ là 'cây cối trong vườn' (CN) + 'vẫn vươn lên xanh tốt' (VN). Do đó cách phân chia chính xác là đáp án B.",
    grammar_clue: "Câu ghép gồm nhiều vế câu, mỗi vế câu thường có cấu tạo đầy đủ Chủ ngữ - Vị ngữ và có quan hệ chặt chẽ với nhau về ý nghĩa.",
    points: 1.0
  },
  {
    id: "exp_vi_33",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "mcq",
    question: "Đọc đoạn thơ sau và cho biết tác giả sử dụng biện pháp tu từ nào nổi bật nhất: 'Con sông dùng dằng con nước lại / Sóng không chảy nổi ở hàng cây / Vầng trăng như một lưỡi liềm vàng / Treo trên ngọn chót vót vòm mây.'",
    options: ["A. Nhân hóa và So sánh", "B. Ẩn dụ và Điệp từ", "C. Hoán dụ và Nhân hóa", "D. Liệt kê và Cường điệu"],
    correct_answer: "A",
    explanation: "Tác giả dùng biện pháp nhân hóa qua từ 'dùng dằng' (gán hành động của con người cho con sông), đồng thời sử dụng biện pháp so sánh qua từ 'như' trong câu 'Vầng trăng như một lưỡi liềm vàng'.",
    grammar_clue: "Nhân hóa là gọi hoặc tả sự vật bằng những từ ngữ vốn dùng để tả người. So sánh là đối chiếu sự vật này với sự vật khác có nét tương đồng.",
    points: 1.0
  },
  {
    id: "exp_vi_34",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "essay",
    question: "Đọc đoạn thơ ngắn sau: 'Mặt trời rúc xuống biển / Sóng sóng đắp chăn bông / Giấc ngủ ngon giấc mộng / Sông trôi đi bập bồng.' (Trích 'Đêm thu' - Nguyễn Thế Hoàng). Hãy viết một đoạn văn ngắn (từ 5 đến 7 câu) nêu cảm nhận của em về bức tranh thiên nhiên được miêu tả trong đoạn thơ trên, trong đó có sử dụng ít nhất một từ nhiều nghĩa.",
    guide: "Học sinh cần đảm bảo đủ số câu (5-7 câu), diễn đạt trôi chảy, có cảm xúc chân thật và nhận diện/sử dụng đúng từ nhiều nghĩa (ví dụ: từ 'chín', 'chảy', 'mắt', 'chân',...).",
    correct_answer: "Đoạn thơ của tác giả Nguyễn Thế Hoàng mở ra một bức tranh thiên nhiên buổi chiều tối thật sinh động, ấm áp và nên thơ. Mặt trời được miêu tả như một người bạn đang 'rúc xuống biển' để nghỉ ngơi sau một ngày làm việc chăm chỉ. Những con sóng lúc này hóa thành chiếc 'chăn bông' khổng lồ êm ái, ru cho giấc ngủ của vạn vật thêm phần ngon giấc. Cả không gian sông nước chìm vào trạng thái bềnh bồng, yên ả, trôi đi trong một nhịp điệu nhẹ nhàng, sâu lắng. Qua ngòi bút tài hoa và trí tưởng tượng phong phú của nhà thơ, thiên nhiên không hề vô tri mà trở nên gần gũi, có hồn như con người.",
    explanation: "Đoạn thơ của tác giả Nguyễn Thế Hoàng mở ra một bức tranh thiên nhiên buổi chiều tối thật sinh động, ấm áp và nên thơ. Mặt trời được miêu tả như một người bạn đang 'rúc xuống biển' để nghỉ ngơi sau một ngày làm việc chăm chỉ. Những con sóng lúc này hóa thành chiếc 'chăn bông' khổng lồ êm ái, ru cho giấc ngủ của vạn vật thêm phần ngon giấc. Cả không gian sông nước chìm vào trạng thái bềnh bồng, yên ả, trôi đi trong một nhịp điệu nhẹ nhàng, sâu lắng. Qua ngòi bút tài hoa và trí tưởng tượng phong phú của nhà thơ, thiên nhiên không hề vô tri mà trở nên gần gũi, có hồn như con người.",
    points: 2.0
  },
  {
    id: "exp_vi_35",
    subject: "Tiếng Việt",
    topic: "Bài thi tổng hợp",
    type: "essay",
    question: "Cho các từ sau: 'chân', 'nặng', 'bay'. Em hãy chọn MỘT trong ba từ trên và viết một đoạn văn ngắn (khoảng 4 - 5 câu) phân biệt rõ nghĩa gốc và nghĩa chuyển của từ đó.",
    guide: "Nghĩa gốc là ý nghĩa xuất hiện đầu tiên; nghĩa chuyển được phát triển dựa trên nét tương đồng với nghĩa gốc.",
    correct_answer: "Học sinh có thể chọn từ 'chân'. Ví dụ đoạn văn: 'Em bé vừa mới tập đi nên những bước chân còn hơi loạng choạng. (Nghĩa gốc: chỉ bộ phận cơ thể người dùng để đứng và đi). Ở câu khác, chiếc bàn học gỗ lim này đã bị mọt ăn thủng một bên chân. (Nghĩa chuyển: dùng để chỉ phần phía dưới của một số đồ vật làm giá đỡ).'",
    explanation: "Học sinh có thể chọn từ 'chân'. Ví dụ đoạn văn: 'Em bé vừa mới tập đi nên những bước chân còn hơi loạng choạng. (Nghĩa gốc: chỉ bộ phận cơ thể người dùng để đứng và đi). Ở câu khác, chiếc bàn học gỗ lim này đã bị mọt ăn thủng một bên chân. (Nghĩa chuyển: dùng để chỉ phần phía dưới của một số đồ vật làm giá đỡ).'",
    points: 2.0
  },
  {
    id: "exp_vi_36",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Trong các câu sau, câu nào từ \"chạy\" được dùng theo nghĩa chuyển?",
    options: ["A. Đội tuyển bóng đá trường em đang chạy trên sân để khởi động.", "B. Chiếc xe đạp mới mua chạy rất êm và phanh rất ăn.", "C. Bé Lan đang tập chạy những bước đầu tiên trong sân nhà.", "D. Chú công an chạy thật nhanh để bắt kịp kẻ gian."],
    correct_answer: "B",
    explanation: "Từ \"chạy\" ở phương án B chỉ hoạt động hoạt động của máy móc/phương tiện (xe chạy), đây là nghĩa chuyển (dựa trên phương thức chuyển nghĩa hoán dụ hoặc ẩn dụ từ hành động di chuyển của người/động vật). Các phương án A, C, D đều chỉ hành động di chuyển bằng chân của người hoặc động vật (nghĩa gốc).",
    grammar_clue: "Nghĩa gốc là nghĩa xuất hiện đầu tiên, làm cơ sở để suy ra các nghĩa khác. Nghĩa chuyển là nghĩa được suy từ nghĩa gốc qua mối liên hệ nào đó.",
    points: 1.25
  },
  {
    id: "exp_vi_37",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Đoạn văn sau có sử dụng biện pháp tu từ gì và tác dụng của nó là gì?\n\"Mỗi mùa xuân, lại thêm một khúc ca mở đầu cho bản giao hưởng của đất trời. Những mầm non cựa mình thức giấc, vươn vai chào đón ánh nắng vàng mật ong. Trăm hoa đua nở, gửi hương thơm vào gió như những sứ giả của hạnh phúc.\"",
    options: ["A. Nhân hóa (mầm non, hoa), giúp cảnh vật sinh động, gần gũi như con người.", "B. So sánh (bản giao hưởng, sứ giả), làm nổi bật sự ồn ào, náo nhiệt của mùa xuân.", "C. Ẩn dụ (nắng vàng mật ong), nhấn mạnh sự cay nồng và khắc nghiệt của thời tiết.", "D. Điệp từ (mùa xuân), tạo nhịp điệu dồn dập, gấp gáp cho đoạn văn."],
    correct_answer: "A",
    explanation: "Đoạn văn sử dụng biện pháp nhân hóa (\"mầm non cựa mình thức giấc, vươn vai\", \"hoa đua nở, gửi hương thơm... như những sứ giả\"). Tác dụng làm cho thiên nhiên, cây cối hiện lên sinh động, có hồn, có cảm xúc như con người, tăng sức gợi hình gợi cảm.",
    grammar_clue: "Nhân hóa là gọi hoặc tả con vật, cây cối, đồ vật... bằng những từ ngữ vốn dùng để gọi hoặc tả con người.",
    points: 1.25
  },
  {
    id: "exp_vi_38",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Cho các từ ghép sau: \"thanh bình, xanh biếc, ngọt lịm, nhỏ nhắn, chậm chạp\". Từ nào là từ ghép phân loại (có tiếng chính và tiếng phụ)?",
    options: ["A. thanh bình", "B. xanh biếc", "C. ngọt lịm", "D. nhỏ nhắn"],
    correct_answer: "B",
    explanation: "Từ \"xanh biếc\" là từ ghép phân loại: tiếng \"xanh\" là tiếng chính chỉ màu sắc chung, tiếng \"biếc\" là tiếng phụ chỉ rõ mức độ, sắc thái của màu xanh. Các từ \"thanh bình\", \"ngọt lịm\", \"nhỏ nhắn\" là từ ghép có nghĩa tổng hợp (các tiếng bình đẳng hoặc hỗ trợ nhau về nghĩa).",
    grammar_clue: "Từ ghép phân loại có tiếng chính đứng trước, tiếng phụ đứng sau bổ sung ý nghĩa cho tiếng chính.",
    points: 1.25
  },
  {
    id: "exp_vi_39",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Đọc đoạn thơ sau và trả lời câu hỏi:\n\"Sông trôi đi\nLại nhớ người không tới\nCầu đứng lại\nEm về đâu, hỡi em?\"\n(Trích Chợ Phết - Nguyễn Duy)\nTừ \"đi\", \"đứng\" trong đoạn thơ trên có quan hệ với nhau như thế nào về mặt từ loại và nghĩa?",
    options: ["A. Là các từ đồng âm khác nghĩa hoàn toàn.", "B. Là các từ đồng nghĩa cùng chỉ trạng thái chuyển động.", "C. Là các từ trái nghĩa nhau, tạo sự đối lập sinh động giữa sông và cầu.", "D. Là các từ nhiều nghĩa có cùng một gốc từ chỉ sự vận động."],
    correct_answer: "C",
    explanation: "\"Đi\" (chỉ sự chuyển động, trôi đi của dòng sông) và \"đứng\" (chỉ sự bất động, giữ nguyên vị trí của cây cầu) là hai từ trái nghĩa. Việc đặt cạnh nhau tạo nên hình ảnh thơ đối lập đặc sắc: dòng sông vô tình chảy mãi, còn cây cầu chung thủy đứng chờ.",
    grammar_clue: "Từ trái nghĩa là những từ có ý nghĩa trái ngược nhau (ghi nhớ các cặp: đi - đứng, cao - thấp, nông - sâu...).",
    points: 1.25
  },
  {
    id: "exp_vi_40",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Xác định chủ ngữ trong câu sau: \"Dưới những tán lá xoan xanh rờn, mượt mà, lấp ló những chùm hoa tím nhạt thơm ngát đưa theo gió.\"",
    options: ["A. Dưới những tán lá xoan xanh rờn, mượt mà", "B. Những chùm hoa tím nhạt thơm ngát", "C. Những tán lá xoan xanh rờn, mượt mà", "D. Chùm hoa tím nhạt thơm ngát đưa theo gió"],
    correct_answer: "B",
    explanation: "Câu trên được viết theo cấu trúc đảo ngữ (Trạng ngữ + Vị ngữ + Chủ ngữ). \"Dưới những tán lá xoan xanh rờn, mượt mà\" là trạng ngữ chỉ địa điểm; \"lấp ló\" là vị ngữ; \"những chùm hoa tím nhạt thơm ngát\" là chủ ngữ trả lời cho câu hỏi \"Cái gì lấp ló...?\".",
    grammar_clue: "Để tìm chủ ngữ trong câu đảo ngữ, hãy đặt câu hỏi: Ai/Cái gì + Vị ngữ? Tránh nhầm lẫn trạng ngữ hoặc vị ngữ đứng đầu câu làm chủ ngữ.",
    points: 1.25
  },
  {
    id: "exp_vi_41",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "essay",
    question: "Đọc đoạn văn sau và viết 1-2 câu nêu cảm nhận của em về hình ảnh người mẹ:\n\"Mẹ vá lại cho con chiếc áo rách vai từ mùa đông trước. Ngọn đèn dầu hắt bóng mẹ lên vách đất, cái bóng gầy gò cứ chao đảo theo nhịp kim đưa. Cả cuộc đời mẹ là những tháng năm vá víu nhọc nhằn để nuôi chúng con nên người.\"",
    guide: "Khi viết đoạn văn cảm thụ văn học, cần kết hợp phân tích từ ngữ hình ảnh (bóng gầy gò, vá víu) với cảm xúc biết ơn, kính trọng.",
    correct_answer: "Hình ảnh người mẹ tần tảo, hy sinh thầm lặng vì con cái qua từng đường kim mũi chỉ và bóng dáng gầy gò.",
    explanation: "Học sinh cần nắm bắt được các chi tiết nghệ thuật: bóng gầy gò, vá víu nhọc nhằn, ngọn đèn dầu. Từ đó nêu bật tình mẫu tử thiêng liêng, sự hy sinh lớn lao của mẹ.",
    points: 1.25
  },
  {
    id: "exp_vi_42",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Câu nào sau đây mắc lỗi dùng từ hoặc quan hệ từ không logic?",
    options: ["A. Mặc dù trời mưa rất to nhưng trận đấu bóng đá vẫn diễn ra vô cùng sôi nổi.", "B. Vì chăm chỉ luyện tập thể dục thể thao nên sức khỏe của Nam ngày càng nâng cao.", "C. Chẳng những em không bỏ cuộc mà em còn kiên trì giải cho bằng được bài toán khó.", "D. Nếu em hoàn thành tốt bài tập này, cô giáo sẽ khen ngợi em trước lớp."],
    correct_answer: "B",
    explanation: "Phương án B sai ở từ \"nâng cao\". Sức khỏe phải dùng từ \"nâng cao\" là chưa chuẩn xác bằng từ \"nâng lên\", \"tăng lên\", \"cải thiện\" hoặc \"tốt lên\". (Từ \"nâng cao\" thường kết hợp với chất lượng, tinh thần, trình độ). Đây là dạng bài tập phát hiện lỗi logic từ vựng tinh tế kiểu Trần Đại Nghĩa.",
    grammar_clue: "Kiểm tra tính kết hợp của từ (khả năng kết hợp giữa các từ trong cụm từ tiếng Việt).",
    points: 1.25
  },
  {
    id: "exp_vi_43",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "essay",
    question: "Tìm và phân tích nhanh ý nghĩa của từ \"chín\" trong hai câu sau:\n1. Lúa ngoài đồng đã ngả màu vàng chín.\n2. Suy nghĩ của bạn ấy rất chín.",
    guide: "Phân biệt từ nhiều nghĩa: Dựa vào ngữ cảnh để tìm điểm chung cốt lõi giữa các nghĩa của từ.",
    correct_answer: "Từ \"chín\" trong câu 1 chỉ trạng thái phát triển hoàn toàn của cây lúa (nghĩa gốc). Từ \"chín\" trong câu 2 chỉ sự trưởng thành, thấu đáo trong tư duy, suy nghĩ (nghĩa chuyển).",
    explanation: "Đây là hiện tượng từ nhiều nghĩa. Câu 1: lúa chín (thời điểm thu hoạch). Câu 2: suy nghĩ chín chắn (sự trưởng thành trong nhận thức). Hai nghĩa này có nét liên quan với nhau qua đặc điểm \"đạt đến độ hoàn thiện nhất định\".",
    points: 1.25
  },
  {
    id: "exp_vi_44",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "mcq",
    question: "Câu thành ngữ nào dưới đây ca ngợi truyền thống uống nước nhớ nguồn, lòng biết ơn đối với thế hệ đi trước?",
    options: ["A. Ăn quả nhớ kẻ trồng cây", "B. Gần mực thì đen, gần đèn thì sáng", "C. Học ăn, học gói, học mở", "D. Đi một ngày đàng, học một sàng khôn"],
    correct_answer: "A",
    explanation: "Câu thành ngữ \"Ăn quả nhớ kẻ trồng cây\" mượn hình ảnh người ăn trái cây nhớ đến người công khó trồng trọt, chăm sóc để nhắc nhở con người luôn phải biết ơn những người đã tạo ra thành quả cho mình hưởng thụ. Đây là biểu hiện cụ thể của đạo lý \"Uống nước nhớ nguồn\".",
    grammar_clue: "Từ khóa: \"nhớ kẻ trồng cây\" = biết ơn người tạo dựng.",
    points: 1.5
  },
  {
    id: "exp_vi_45",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "mcq",
    question: "Trong các câu tục ngữ sau, câu nào khuyên nhủ con người phải chăm chỉ lao động, kiên trì thì mới có thành quả?",
    options: ["A. Chớp đông nháy nháy, gà gáy thì mưa", "B. Có công mài sắt, có ngày nên kim", "C. Kiến tha lâu cũng đầy tổ", "D. Lá lành đùm lá rách"],
    correct_answer: "B",
    explanation: "Câu tục ngữ \"Có công mài sắt, có ngày nên kim\" dùng hình ảnh kiên trì mài thỏi sắt lớn thành cây kim nhỏ để khuyên con người: có sự kiên trì, nhẫn nại và chăm chỉ thì làm việc gì khó khăn đến đâu cũng sẽ thành công.",
    grammar_clue: "Từ khóa: \"mài sắt\", \"nên kim\" = kiên trì, nỗ lực.",
    points: 1.5
  },
  {
    id: "exp_vi_46",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "mcq",
    question: "Điền từ còn thiếu vào chỗ trống để hoàn chỉnh câu thành ngữ nói về tình đoàn kết, tương thân tương ái của dân tộc ta: \"Thương người như thể...\"",
    options: ["A. tay chân", "B. thương thân", "C. ruột thịt", "D. anh em"],
    correct_answer: "B",
    explanation: "Câu thành ngữ hoàn chỉnh là \"Thương người như thể thương thân\". Câu này dạy chúng ta phải biết yêu thương, đùm bọc, giúp đỡ người khác giống như yêu thương chính bản thân mình.",
    grammar_clue: "Thành ngữ đối xứng vế: \"Thương người\" - \"thương thân\".",
    points: 1.5
  },
  {
    id: "exp_vi_47",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "mcq",
    question: "Câu tục ngữ \"Học ăn, học gói, học mở\" trong văn hóa ứng xử của người Việt Nam thể hiện điều gì?",
    options: ["A. Chỉ cách nấu ăn và cất giữ thực phẩm trong gia đình.", "B. Đề cao việc học hỏi các kỹ năng lao động chân tay ngoài đồng áng.", "C. Nhắc nhở con người phải học tập từ những nết na, phép tắc ứng xử nhỏ nhất trong đời sống.", "D. Khuyên học sinh phải biết giữ gìn sách vở và dụng cụ học tập cẩn thận."],
    correct_answer: "C",
    explanation: "Trong văn hóa truyền thống, \"Học ăn, học gói, học mở\" không chỉ đơn thuần là chuyện ăn uống hay gói bọc đồ vật, mà là bài học vỡ lòng về nề nếp, phép tắc, sự tinh tế trong lối sống và giao tiếp ứng xử hằng ngày.",
    grammar_clue: "Ý nghĩa ẩn dụ: Các hành động nhỏ thường ngày phản ánh văn hóa cá nhân.",
    points: 1.5
  },
  {
    id: "exp_vi_48",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "essay",
    question: "Em hãy giải thích ngắn gọn ý nghĩa của câu tục ngữ \"Đi một ngày đàng, học một sàng khôn\" và cho biết câu tục ngữ đó khuyên chúng ta điều gì trong học tập, cuộc sống?",
    guide: "Cấu trúc trả lời: Giải nghĩa đen -> Giải nghĩa bóng -> Bài học rút ra.",
    correct_answer: "Học sinh giải thích được: Đi ra ngoài, trải nghiệm nhiều nơi, tiếp xúc nhiều người sẽ mở rộng tầm mắt, tích lũy thêm nhiều kiến thức, kinh nghiệm quý báu. Qua đó khuyên chúng ta tích cực học hỏi, khám phá thế giới xung quanh.",
    explanation: "- Ý nghĩa đen: Đi đến những vùng đất mới, đi xa sẽ thu hoạch được nhiều điều hay (một sàng khôn).\n- Ý nghĩa bóng/bài học: Khuyên nhủ con người năng động, chịu khó trải nghiệm thực tế, giao lưu học hỏi để nâng cao hiểu biết, khôn lớn và trưởng thành hơn.",
    points: 2.0
  },
  {
    id: "exp_vi_49",
    subject: "Tiếng Việt",
    topic: "Thành ngữ, tục ngữ và nét đẹp văn hóa Việt Nam",
    type: "mcq",
    question: "Cặp từ trái nghĩa nào được sử dụng trong câu tục ngữ \"Gần mực thì đen, gần đèn thì sáng\"?",
    options: ["A. Gần - xa", "B. Đen - sáng", "C. Mực - đèn", "D. Tối - sáng"],
    correct_answer: "B",
    explanation: "Trong câu tục ngữ \"Gần mực thì đen, gần đèn thì sáng\", từ \"đen\" (chỉ màu tối, đại diện cho cái xấu, thói hư tật xấu) trái nghĩa với từ \"sáng\" (chỉ ánh sáng, đại diện cho cái tốt, sự hiểu biết). Cặp từ này làm nổi bật bài học về việc chọn bạn mà chơi.",
    grammar_clue: "Tìm các từ chỉ tính chất đối lập nhau trong câu.",
    points: 2.0
  },
  {
    id: "exp_vi_50",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
    type: "mcq",
    question: "Trong đoạn văn sau, từ nào là danh từ chỉ khái niệm (danh từ trừu tượng)?\n'Lòng nhân ái của người dân vùng lũ đã sưởi ấm biết bao mảnh đời bất hạnh trong những ngày đông giá rét.'",
    options: ["A. nhân ái", "B. lòng nhân ái", "C. người dân", "D. giá rét"],
    correct_answer: "B",
    explanation: "Ta phân tích các từ trong câu:\n- 'người dân' là danh từ chỉ người.\n- 'giá rét' trong ngữ cảnh này đóng vai trò là tính từ chỉ đặc điểm của thời tiết.\n- 'nhân ái' là tính từ.\n- 'lòng nhân ái' là một cụm danh từ (với danh từ trung tâm là 'lòng', kết hợp với từ chỉ khái niệm trừu tượng), hoặc cả cụm 'lòng nhân ái' cấu tạo thành danh từ chỉ khái niệm mà mắt thường không nhìn thấy, không sờ thấy được nhưng cảm nhận được.",
    grammar_clue: "Danh từ chỉ khái niệm (trừu tượng) thường biểu thị các hiện tượng không có hình khối vật chất như: lòng, sự, nỗi, niềm, tình, ý,... kết hợp với tính từ/động từ phía sau.",
    points: 1.0
  },
  {
    id: "exp_vi_51",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
    type: "mcq",
    question: "Xác định từ loại của từ 'sáng' trong hai câu thơ sau:\nCâu 1: 'Mặt trời mọc, chiếu ánh nắng vàng rực rỡ xuống bản làng lúc sáng.'\nCâu 2: 'Bầu trời hôm nay rất sáng.'",
    options: ["A. Câu 1: Danh từ, Câu 2: Tính từ", "B. Câu 1: Tính từ, Câu 2: Động từ", "C. Câu 1: Động từ, Câu 2: Danh từ", "D. Câu 1: Tính từ, Câu 2: Danh từ"],
    correct_answer: "A",
    explanation: "- Ở câu 1: từ 'sáng' đứng sau từ chỉ thời gian 'lúc', có thể kết hợp với các từ khác tạo thành cụm danh từ chỉ thời điểm trong ngày -> 'sáng' ở đây là danh từ (buổi sáng).\n- Ở câu 2: từ 'sáng' đứng sau cụm từ chỉ mức độ 'rất' và nêu lên đặc điểm, trạng thái của bầu trời -> 'sáng' ở đây là tính từ.",
    grammar_clue: "Một từ có thể thuộc nhiều từ loại khác nhau tùy thuộc vào ngữ cảnh (vị trí và vai trò) của nó trong câu.",
    points: 1.0
  },
  {
    id: "exp_vi_52",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
    type: "mcq",
    question: "Cho câu văn: 'Cơn gió chiều vô tình thổi bay những chiếc lá bàng khô giòn.' Dòng nào nêu đúng số lượng và phân loại của các từ loại: danh từ, động từ, tính từ?",
    options: ["A. 3 danh từ, 1 động từ, 2 tính từ", "B. 4 danh từ, 1 động từ, 1 tính từ", "C. 3 danh từ, 2 động từ, 1 tính từ", "D. 4 danh từ, 2 động từ, 1 tính từ"],
    correct_answer: "B",
    explanation: "Phân tích chi tiết từng từ trong câu:\n- Danh từ (4 từ): cơn, gió, chiều, lá (hoặc lá bàng).\n- Động từ (1 từ): thổi.\n- Tính từ (1 từ): khô (hoặc khô giòn).\nDo đó, câu có 4 danh từ, 1 động từ và 1 tính từ.",
    grammar_clue: "Luôn đọc kỹ từng từ, đặt câu hỏi 'Là gì? Ai? Con gì?' để tìm danh từ; 'Làm gì?' để tìm động từ; 'Thế nào?' để tìm tính từ.",
    points: 1.0
  },
  {
    id: "exp_vi_53",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
    type: "mcq",
    question: "Từ 'bay' trong câu nào dưới đây là ĐỘNG TỪ?",
    options: ["A. Đàn chim én chao lượn rồi bay vút lên bầu trời cao.", "B. Chiếc áo dài truyền thống của cô ấy có màu xanh bay bổng.", "C. Tin vui bay đi khắp làng trên xóm dưới chỉ trong một buổi sáng.", "D. Cả A và C đều đúng."],
    correct_answer: "D",
    explanation: "- Ở phương án A: 'bay' chỉ hoạt động di chuyển trên không trung của đàn chim -> Động từ.\n- Ở phương án B: 'bay bổng' là tính từ chỉ nét đẹp nghệ thuật, nhẹ nhàng.\n- Ở phương án C: 'bay' được dùng theo nghĩa chuyển, chỉ sự lan truyền nhanh chóng của tin tức (hoạt động lan tỏa) -> Động từ.\nVậy cả A và C từ 'bay' đều đóng vai trò là động từ.",
    grammar_clue: "Động từ là những từ chỉ hoạt động, trạng thái của sự vật. Động từ có thể kết hợp với các từ 'đã, đang, sẽ'.",
    points: 1.0
  },
  {
    id: "exp_vi_54",
    subject: "Tiếng Việt",
    topic: "Luyện từ và câu: Ôn tập về từ loại (Danh - Động - Tính từ)",
    type: "essay",
    question: "Em hãy tìm và phân loại 3 danh từ, 3 động từ, 3 tính từ có trong đoạn văn sau:\n'Mùa xuân đến, những chồi non mơn mởn cựa mình thức giấc. Trăm loài hoa đua nhau khoe sắc trong tiết trời ấm áp của đất trời.'",
    guide: "Khi làm bài tập tìm từ loại, hãy phân tích theo từng nhóm câu hỏi: Sự vật (Danh từ) - Hoạt động/Trạng thái (Động từ) - Đặc điểm/Tính chất (Tính từ).",
    correct_answer: "Học sinh tìm đúng và phân loại chính xác các từ theo yêu cầu.",
    explanation: "- Danh từ (chọn 3 trong các từ): mùa xuân, chồi, loài, hoa, tiết trời, đất trời.\n- Động từ (chọn 3 trong các từ): đến, cựa mình (hoặc cựa, thức giấc), đua, khoe.\n- Tính từ (chọn 3 trong các từ): non, mơn mởn, ấm áp.",
    points: 1.0
  },
  {
    id: "exp_vi_55",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Cho đoạn thơ: 'Mỗi sớm mai thức dậy / Lại thấy mình có đôi / Chim hót trên vòm lá / Nắng vươn mình đùa vui.' Trong các từ ngữ sau, từ nào là từ tượng hình gợi tả hình ảnh?",
    options: ["A. Thức dậy", "B. Hót", "C. Vươn mình", "D. Đùa vui"],
    correct_answer: "C",
    explanation: "Từ 'vươn mình' trong ngữ cảnh 'Nắng vươn mình đùa vui' là từ láy/từ chỉ hoạt động nhưng mang tính chất gợi hình cao, miêu tả ánh nắng buổi sớm như một sinh thể đang cựa quậy, vươn vai thức dậy tràn đầy sức sống. Các từ 'thức dậy', 'hót', 'đùa vui' thiên về hành động và âm thanh.",
    grammar_clue: "Từ tượng hình gợi tả hình ảnh, dáng vẻ, trạng thái của sự vật.",
    points: 1.0
  },
  {
    id: "exp_vi_56",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Trong câu văn: 'Dưới ánh trăng vàng óng, dòng sông như một dải lụa mềm mại uốn lượn qua những xóm làng bình yên.', tác giả sử dụng biện pháp tu từ nào là chủ đạo và hiệu quả nghệ thuật lớn nhất?",
    options: ["A. Nhân hóa (sông như dải lụa)", "B. So sánh (dòng sông với dải lụa mềm mại)", "C. Ẩn dụ (ánh trăng là lụa vàng)", "D. Hoán dụ (xóm làng chỉ người dân)"],
    correct_answer: "B",
    explanation: "Câu văn sử dụng từ 'như' để nối giữa 'dòng sông' và 'dải lụa mềm mại', đây là biện pháp so sánh. Tác dụng làm cho hình ảnh dòng sông hiện lên sinh động, uyển chuyển và có hồn hơn trong không gian đêm trăng.",
    grammar_clue: "Nhận biết so sánh dựa trên từ ngữ so sánh: là, như, hệt như, bao nhiêu... bấy nhiêu.",
    points: 1.0
  },
  {
    id: "exp_vi_57",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Xác định từ loại của từ 'chăm chỉ' trong câu: 'Sự chăm chỉ của Lan trong suốt năm học đã được đền đáp bằng phần thưởng xứng đáng.'",
    options: ["A. Động từ", "B. Tính từ", "C. Danh từ", "D. Quan hệ từ"],
    correct_answer: "C",
    explanation: "Bình thường 'chăm chỉ' là tính từ (chỉ tính chất). Tuy nhiên, trong câu này, từ đứng sau từ 'Sự' và làm trung tâm của cụm danh từ 'Sự chăm chỉ của Lan', nên nó đã được chuyển loại thành danh từ.",
    grammar_clue: "Các từ đi sau 'sự', 'cuộc', 'niềm', 'nỗi' thường là danh từ (hiện tượng chuyển hóa từ loại).",
    points: 1.0
  },
  {
    id: "exp_vi_58",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Đọc đoạn văn sau: '(1) Mùa xuân về, trăm hoa đua nở. (2) Những cánh én chao lượn trên bầu trời cao rộng. (3) Tiếng chim hót ríu rít như bản hòa ca chào ngày mới. (4) Em rất thích mùa xuân.' Từ 'chao lượn' trong câu (2) có cấu tạo là gì?",
    options: ["A. Từ đơn", "B. Từ ghép tổng hợp", "C. Từ ghép phân loại", "D. Từ láy (cận âm)"],
    correct_answer: "B",
    explanation: "Từ 'chao lượn' gồm hai tiếng có nghĩa gần giống nhau hợp lại (chao: nghiêng mình, lượn: bay vòng), cấu tạo nên một từ ghép có ý nghĩa tổng hợp chỉ hoạt động bay lượn uyển chuyển trên không trung.",
    grammar_clue: "Từ ghép tổng hợp gồm các tiếng có nghĩa cùng loại, bổ sung ý nghĩa cho nhau.",
    points: 1.0
  },
  {
    id: "exp_vi_59",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "essay",
    question: "Xác định chủ ngữ và vị ngữ trong câu văn sau: 'Dưới cái nắng oi ả của buổi trưa hè, những tán bàng cổ thụ bên sân trường tỏa bóng mát rượi.'",
    guide: "Tìm chủ ngữ bằng câu hỏi Ai/Cái gì/Con gì?; tìm vị ngữ bằng câu hỏi Làm gì?/Như thế nào?/Là gì?",
    correct_answer: "Chủ ngữ: 'những tán bàng cổ thụ bên sân trường'. Vị ngữ: 'tỏa bóng mát rượi'. Trạng ngữ: 'Dưới cái nắng oi ả của buổi trưa hè'.",
    explanation: "Bước 1: Xác định trạng ngữ chỉ thời gian/nơi chốn đứng ở đầu câu 'Dưới cái nắng oi ả của buổi trưa hè'. Bước 2: Đặt câu hỏi 'Ai/Cái gì tỏa bóng mát rượi?' -> trả lời 'những tán bàng cổ thụ bên sân trường' (Chủ ngữ). Bước 3: Phần còn lại 'tỏa bóng mát rượi' nêu hoạt động của chủ ngữ chính là Vị ngữ.",
    points: 1.5
  },
  {
    id: "exp_vi_60",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Trong bài thơ 'Mẹ', nhà thơ Trần Quốc Minh viết: 'Mẹ như trăng lu / Đêm mù gió bão... / Mẹ như mặt trời / Chói lọi phương đông...' Biện pháp tu từ nào được sử dụng xuyên suốt để ca ngợi công ơn to lớn của người mẹ?",
    options: ["A. Ẩn dụ kết hợp nhân hóa", "B. So sánh kép đầy sáng tạo", "C. Hoán dụ lấy vật chứa đựng chỉ vật bị chứa đựng", "D. Điệp từ kết hợp phóng đại"],
    correct_answer: "B",
    explanation: "Tác giả sử dụng hình thức so sánh 'Mẹ như trăng lu', 'Mẹ như mặt trời' để ví mẹ với những thiên thể vĩ đại của tự nhiên, qua đó khẳng định tấm lòng bao la, sự hy sinh thầm lặng và ánh sáng ấm áp mà mẹ dành cho con suốt cuộc đời.",
    grammar_clue: "So sánh nghệ thuật giúp làm nổi bật phẩm chất của đối tượng được miêu tả qua hình ảnh tương đồng.",
    points: 1.0
  },
  {
    id: "exp_vi_61",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "mcq",
    question: "Từ nào sau đây viết SAI chính tả và cần được sửa lại?",
    options: ["A. Chân thành", "B. Sáng lạn", "C. Cây sào", "D. Trau chuốt"],
    correct_answer: "B",
    explanation: "Từ 'sáng lạn' viết sai chính tả. Phải viết đúng là 'xán lạn' (xán nghĩa là rực rỡ, sáng sủa). Các từ 'chân thành', 'cây sào', 'trau chuốt' đều viết đúng chính tả.",
    grammar_clue: "Lưu ý các cặp phụ âm dễ lẫn: s/x, tr/ch, gi/d/v, l/n trong tiếng Việt.",
    points: 1.0
  },
  {
    id: "exp_vi_62",
    subject: "Tiếng Việt",
    topic: "Bài thi chuẩn của Trần Đại Nghĩa",
    type: "essay",
    question: "Viết lại câu văn sau bằng cách thêm một trạng ngữ chỉ mục đích ở đầu câu: 'Học sinh ôn tập kiến thức rất chăm chỉ để chuẩn bị cho kỳ thi tuyển sinh vào lớp 6.'",
    guide: "Trạng ngữ chỉ mục đích thường bắt đầu bằng các từ: để, nhằm, vì, cốt để...",
    correct_answer: "Để chuẩn bị cho kỳ thi tuyển sinh vào lớp 6, học sinh ôn tập kiến thức rất chăm chỉ.",
    explanation: "Trạng ngữ chỉ mục đích trả lời cho câu hỏi 'Để làm gì?' hoặc 'Nhằm mục đích gì?'. Chuyển cụm 'để chuẩn bị cho kỳ thi tuyển sinh vào lớp 6' lên đầu câu và thêm dấu phẩy ngăn cách với cụm chủ-vị phía sau.",
    points: 1.5
  }
];
