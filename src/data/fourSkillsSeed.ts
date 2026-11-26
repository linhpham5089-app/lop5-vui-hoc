import { Question } from '@/types';

export const FOUR_SKILLS_QUESTIONS: Question[] = [
  // --- TIẾNG ANH - BỘ 1: A Day at the Zoo ---
  {
    id: 'fs_en_1_lis',
    subject: 'Tiếng Anh',
    topic: '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)',
    type: 'mcq',
    skill: 'listening',
    question: "Listen to the recording about Helen's visit to the zoo and answer: Which animal did Helen love the most?",
    audio_text: "Yesterday, Helen and her brother went to the city zoo. They saw elephants, monkeys, and two tall giraffes eating green leaves from the highest tree. Helen loved the baby kangaroo the most.",
    options: [
      'A. The tall giraffes',
      'B. The baby kangaroo',
      'C. The big elephants',
      'D. The naughty monkeys'
    ],
    correct_answer: 'B',
    explanation: "Trong bài nghe, người kể nói rõ: 'Helen loved the baby kangaroo the most.'",
    grammar_clue: "Từ khóa then chốt: 'loved... the most' (so sánh nhất)",
    encouragement: 'Kỹ năng nghe nắm bắt thông tin chi tiết rất xuất sắc! 🌟🎧',
    points: 2.5
  },
  {
    id: 'fs_en_1_spk',
    subject: 'Tiếng Anh',
    topic: '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)',
    type: 'speaking',
    skill: 'speaking',
    question: 'Bấm nút micro bên dưới và đọc to, rõ ràng câu tiếng Anh sau:',
    audio_prompt: 'Yesterday, I visited the zoo with my family and saw many wild animals.',
    phonetics_guide: "Phát âm chuẩn âm đuôi: '-ed' trong 'visited' (/ɪd/), âm /z/ trong 'zoo', và âm cuối /z/ trong 'animals'.",
    correct_answer: 'Yesterday, I visited the zoo with my family and saw many wild animals.',
    explanation: 'Mẫu câu thì Quá khứ đơn (Past Simple) chuẩn Cambridge Flyers với động từ có quy tắc (visited) và bất quy tắc (saw).',
    grammar_clue: 'Yesterday -> Động từ ở thì Quá khứ đơn',
    encouragement: 'Giọng đọc rất tự tin, phát âm ngữ điệu tiếng Anh rất chuẩn! 🎙️👏',
    points: 2.5
  },
  {
    id: 'fs_en_1_rdg',
    subject: 'Tiếng Anh',
    topic: '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)',
    type: 'mcq',
    skill: 'reading',
    question: "Read the passage and choose the best answer:\n\n'Camels live in hot deserts where there is very little water and rain. They can walk on hot sand because their feet are wide and flat. Camels have humps on their backs to store fat, which helps them survive for many days without food.'\n\nQuestion: Why can camels walk easily on hot sand?",
    options: [
      'A. Because they have long legs',
      'B. Because their feet are wide and flat',
      'C. Because they carry water in humps',
      'D. Because they run very fast'
    ],
    correct_answer: 'B',
    explanation: "Đoạn văn nêu rõ: 'They can walk on hot sand because their feet are wide and flat.'",
    grammar_clue: "Liên từ 'because' chỉ nguyên nhân",
    encouragement: 'Đọc hiểu và trích xuất thông tin rất nhạy bén! 📖✨',
    points: 2.5
  },
  {
    id: 'fs_en_1_wrt',
    subject: 'Tiếng Anh',
    topic: '🎧 [Cambridge Flyers] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: A Day at the Zoo)',
    type: 'essay',
    skill: 'writing',
    question: "Em hãy sắp xếp các từ sau thành một câu hoàn chỉnh đúng ngữ pháp Cambridge Flyers:\n'animals / We / protect / should / because / they / endangered / are / .'",
    guide: 'Cấu trúc: S + should + V (nguyên thể) + O + because + S + be + adj.',
    correct_answer: 'We should protect animals because they are endangered.',
    explanation: "Câu hoàn chỉnh: 'We should protect animals because they are endangered.' (Chúng ta nên bảo vệ động vật vì chúng đang bị đe dọa tuyệt chủng).",
    grammar_clue: "Động từ khuyết thiếu 'should' đi cùng động từ nguyên thể",
    encouragement: 'Ngữ pháp và trật tự từ chuẩn xác 100%! ✍️💯',
    points: 2.5
  },

  // --- TIẾNG TRUNG - BỘ 1: Gia Đình & Sở Thích ---
  {
    id: 'fs_zh_1_lis',
    subject: 'Tiếng Trung',
    topic: '🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)',
    type: 'mcq',
    skill: 'listening',
    question: 'Hãy nghe đoạn ghi âm giới thiệu gia đình và trả lời câu hỏi:\n我家一共有几口人？ (Nhà tôi có tất cả mấy người?)',
    audio_text: '我家有四口人：爸爸、妈妈、哥哥和我。爸爸是医生，妈妈是老师。我最喜欢打乒乓球。',
    pinyin: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ. Bàba shì yīshēng, māma shì lǎoshī. Wǒ zuì xǐhuan dǎ pīngpāngqiú.',
    vietnamese_meaning: 'Nhà tôi có bốn người: bố, mẹ, anh trai và tôi. Bố là bác sĩ, mẹ là cô giáo. Tôi thích nhất là chơi bóng bàn.',
    options: [
      'A. 三口人 (Sān kǒu rén - 3 người)',
      'B. 四口人 (Sì kǒu rén - 4 người)',
      'C. 五口人 (Wǔ kǒu rén - 5 người)',
      'D. 六口人 (Liù kǒu rén - 6 người)'
    ],
    correct_answer: 'B',
    explanation: "Đoạn ghi âm mở đầu: '我家有四口人...' (Nhà tôi có 4 người).",
    grammar_clue: 'Số đếm 四 (sì - số 4) đi cùng lượng từ 口 (kǒu)',
    encouragement: 'Nghe hiểu tiếng Trung rất nhạy bén! 🎧👏',
    points: 2.5
  },
  {
    id: 'fs_zh_1_spk',
    subject: 'Tiếng Trung',
    topic: '🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)',
    type: 'speaking',
    skill: 'speaking',
    question: 'Bấm nút micro và đọc to câu tiếng Trung sau:',
    audio_prompt: '我家有四口人，我爱我的爸爸妈妈。',
    pinyin: 'Wǒ jiā yǒu sì kǒu rén, wǒ ài wǒ de bàba māma.',
    vietnamese_meaning: 'Nhà tôi có 4 người, tôi yêu bố mẹ của tôi.',
    phonetics_guide: "Chú ý thanh 4 dứt khoát trong 'sì' (四), 'ài' (爱), 'bà' (爸) và thanh 1 trong 'mā' (妈).",
    correct_answer: '我家有四口人，我爱我的爸爸妈妈。',
    explanation: 'Mẫu câu giao tiếp giới thiệu thành viên và biểu đạt tình cảm gia đình.',
    grammar_clue: 'Động từ 爱 (ài - yêu thương)',
    encouragement: 'Phát âm thanh điệu tiếng Trung rất tròn vành rõ chữ! 🎙️🇨🇳',
    points: 2.5
  },
  {
    id: 'fs_zh_1_rdg',
    subject: 'Tiếng Trung',
    topic: '🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)',
    type: 'mcq',
    skill: 'reading',
    question: "Đọc đoạn văn ngắn sau và trả lời câu hỏi:\n\n'大卫是我的好朋友。他今年十一岁，在上五年级。他喜欢学汉语，也喜欢画画儿。星期天，我们经常一起去公园踢足球。'\n\nCâu hỏi: 星期天，大卫和朋友一起去哪儿踢足球？ (Chủ nhật, David và bạn cùng đi đâu đá bóng?)",
    pinyin: 'Dàwèi shì wǒ de hǎo péngyou. Tā jīnnián shíyī suì, zài shàng wǔ niánjí. Tā xǐhuan xué Hànyǔ, yě xǐhuan huà huàr. Xīngqītiān, wǒmen jīngcháng yìqǐ qù gōngyuán tī zúqiú.',
    vietnamese_meaning: 'David là bạn tốt của tôi. Cậu ấy năm nay 11 tuổi, học lớp 5. Cậu ấy thích học tiếng Trung, cũng thích vẽ tranh. Chủ nhật, chúng tôi thường cùng nhau đi công viên đá bóng.',
    options: [
      'A. 学校 (Xuéxiào - Trường học)',
      'B. 公园 (Gōngyuán - Công viên)',
      'C. 动物园 (Dòngwùyuán - Sở thú)',
      'D. 医院 (Yīyuàn - Bệnh viện)'
    ],
    correct_answer: 'B',
    explanation: "Đoạn văn viết: '...去公园踢足球' (đi công viên đá bóng).",
    grammar_clue: 'Từ chỉ địa điểm: 公园 (Gōngyuán - Công viên)',
    encouragement: 'Nhận diện mặt chữ Hán và đọc hiểu rất xuất sắc! 📖🇨🇳',
    points: 2.5
  },
  {
    id: 'fs_zh_1_wrt',
    subject: 'Tiếng Trung',
    topic: '🎧 [YCT 1-2 / HSK 1-2] Luyện trọn bộ 4 Kỹ Năng: Nghe - Nói - Đọc - Viết (Bộ 1: Gia Đình & Sở Thích)',
    type: 'essay',
    skill: 'writing',
    question: "Em hãy sắp xếp các từ sau thành một câu hoàn chỉnh bằng tiếng Trung (có thể gõ chữ Hán hoặc Pinyin):\n'喜欢 (xǐhuan) / 我 (wǒ) / 吃 (chī) / 苹果 (píngguǒ) / .'",
    pinyin: 'xǐhuan / wǒ / chī / píngguǒ / .',
    vietnamese_meaning: 'thích / tôi / ăn / quả táo / .',
    guide: 'Trật tự câu: Chủ ngữ + Động từ tâm lý (喜欢) + Động từ hành động (吃) + Tân ngữ (苹果).',
    correct_answer: '我喜欢吃苹果。 (Wǒ xǐhuan chī píngguǒ.)',
    explanation: 'Câu hoàn chỉnh: 我喜欢吃苹果。(Tôi thích ăn táo).',
    grammar_clue: 'Cấu trúc: S + 喜欢 + V + O',
    encouragement: 'Cấu trúc ngữ pháp tiếng Trung rất vững vàng! ✍️🇨🇳',
    points: 2.5
  }
];
