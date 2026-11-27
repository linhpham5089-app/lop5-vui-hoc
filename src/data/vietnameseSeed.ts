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
  }
];
