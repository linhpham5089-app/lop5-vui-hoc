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
  },
  // Bài thi chuẩn của Hồ Chí Minh (Tiếng Trung)
  {
    id: 'zh_hcm_1',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Khi muốn hỏi giá tiền một quyển sách ("Quyển sách này bao nhiêu tiền?"), em nói câu nào?',
    pinyin: 'Zhè běn shū duōshao qián?',
    options: [
      'A. 这本书多少钱？ (Zhè běn shū duōshao qián?)',
      'B. 你叫什么名字？ (Nǐ jiào shénme míngzi?)',
      'C. 今天星期几？ (Jīntiān xīngqī jǐ?)',
      'D. 你好吗？ (Nǐ hǎo ma?)'
    ],
    correct_answer: 'A',
    explanation: '"多少钱" (duōshao qián) dùng để hỏi giá tiền: "这本书多少钱？" = Quyển sách này bao nhiêu tiền?',
    grammar_clue: 'Từ để hỏi giá tiền: 多少钱 (duōshao qián).',
    encouragement: 'Giao tiếp thực tế quá chuẩn! 🌟',
    points: 1.0
  },
  {
    id: 'zh_hcm_2',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Từ "老师 (lǎoshī)" có nghĩa tiếng Việt là gì?',
    pinyin: 'lǎoshī',
    options: ['A. Học sinh', 'B. Thầy/Cô giáo', 'C. Bạn học', 'D. Bác sĩ'],
    correct_answer: 'B',
    explanation: '老师 (lǎoshī) nghĩa là thầy giáo / cô giáo.',
    grammar_clue: '同学 (bạn học), 学生 (học sinh), 老师 (giáo viên).',
    encouragement: 'Nhớ từ vựng rất chắc! 👏',
    points: 1.0
  },
  {
    id: 'zh_hcm_3',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'essay',
    question: 'Em hãy viết 1 câu giới thiệu tên của mình bằng tiếng Trung (chữ Hán hoặc Pinyin), dùng mẫu "我叫..." (Wǒ jiào...).',
    pinyin: 'Wǒ jiào ...',
    guide: 'Ví dụ: 我叫小明。(Wǒ jiào Xiǎomíng.) hoặc 我叫Bông。',
    correct_answer: '我叫小明。(Wǒ jiào Xiǎomíng.)',
    explanation: 'Mẫu câu giới thiệu tên cơ bản: 我叫 + [Tên].',
    grammar_clue: '我 (tôi) + 叫 (tên là) + Tên.',
    encouragement: 'Viết câu giới thiệu rất tự nhiên! ✍️🇨🇳',
    points: 2.0
  },
  // Bài thi chuẩn của Trần Đại Nghĩa (Tiếng Trung tư duy & thực hành)
  {
    id: 'zh_tdn_1',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Hôm nay là Thứ Hai (星期一 - Xīngqī yī). Hỏi ngày kia (hậu thiên / 后天) là thứ mấy?',
    pinyin: 'Xīngqī yī → Xīngqī sān',
    options: [
      'A. 星期二 (Xīngqī èr)',
      'B. 星期三 (Xīngqī sān)',
      'C. 星期四 (Xīngqī sì)',
      'D. 星期五 (Xīngqī wǔ)'
    ],
    correct_answer: 'B',
    explanation: 'Hôm nay Thứ Hai (星期一) → Ngày mai Thứ Ba (星期二) → Ngày kia Thứ Tư (星期三).',
    grammar_clue: 'Thứ trong tuần tiếng Trung: 星期 + số đếm (1=Thứ Hai, 2=Thứ Ba, 3=Thứ Tư...).',
    encouragement: 'Suy luận nhanh và chính xác! 🌟',
    points: 1.0
  },
  {
    id: 'zh_tdn_2',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Trong cửa hàng, một quả táo giá 5 đồng (五块 - wǔ kuài). Em mua 3 quả táo và đưa cô bán hàng 20 đồng. Em sẽ nói "Cảm ơn" và nhận lại bao nhiêu tiền thừa?',
    pinyin: 'Xièxie / wǔ kuài',
    options: [
      'A. 谢谢，5 đồng (五块)',
      'B. 谢谢，10 đồng (十块)',
      'C. 对不起，5 đồng (五块)',
      'D. 再见，15 đồng (十五块)'
    ],
    correct_answer: 'A',
    explanation: '3 quả táo = 5 × 3 = 15 đồng. Tiền thừa = 20 - 15 = 5 đồng (五块). Khi nhận tiền thừa nói "谢谢" (Cảm ơn).',
    grammar_clue: 'Tư duy tính nhẩm + giao tiếp mua sắm.',
    encouragement: 'Vừa giỏi tính nhẩm vừa giỏi tiếng Trung! 👏',
    points: 1.5
  },
  {
    id: 'zh_tdn_3',
    subject: 'Tiếng Trung',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'essay',
    question: 'Dịch tình huống sau sang tiếng Trung (chữ Hán hoặc Pinyin): "Tôi rất thích học tiếng Trung."',
    pinyin: 'Wǒ hěn xǐhuan xuéxí Hànyǔ.',
    guide: 'Từ gợi ý: 我 (tôi), 很 (rất), 喜欢 (thích), 学习 (học), 汉语 (tiếng Trung).',
    correct_answer: '我很喜欢学习汉语。(Wǒ hěn xǐhuan xuéxí Hànyǔ.)',
    explanation: 'Câu chuẩn: 我很喜欢学习汉语。',
    grammar_clue: 'S + 很喜欢 + V + O.',
    encouragement: 'Dịch câu rất chuẩn xác! ✍️🌟',
    points: 2.0
  },
  // Bài thi tổng hợp (Tiếng Trung)
  {
    id: 'zh_th_1',
    subject: 'Tiếng Trung',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Từ trái nghĩa với "大 (dà - to/lớn)" là từ nào?',
    pinyin: 'dà ↔ xiǎo',
    options: ['A. 多 (duō)', 'B. 小 (xiǎo)', 'C. 高 (gāo)', 'D. 好 (hǎo)'],
    correct_answer: 'B',
    explanation: '大 (to/lớn) trái nghĩa với 小 (nhỏ/bé).',
    grammar_clue: 'Cặp từ trái nghĩa cơ bản: 大 - 小 (lớn - nhỏ).',
    encouragement: 'Chính xác tuyệt đối! 🌟',
    points: 1.0
  },
  {
    id: 'zh_th_2',
    subject: 'Tiếng Trung',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Số "25" trong tiếng Trung đọc là gì?',
    pinyin: 'èrshíwǔ',
    options: [
      'A. 二十五 (èrshíwǔ)',
      'B. 五十二 (wǔshíèr)',
      'C. 二五 (èrwǔ)',
      'D. 十五 (shíwǔ)'
    ],
    correct_answer: 'A',
    explanation: '25 = 20 (二十) + 5 (五) = 二十五 (èrshíwǔ).',
    grammar_clue: 'Hàng chục + 十 + hàng đơn vị.',
    encouragement: 'Đọc số tiếng Trung quá chuẩn! 👏',
    points: 1.0
  },
  {
    id: 'zh_th_3',
    subject: 'Tiếng Trung',
    topic: 'Bài thi tổng hợp',
    type: 'essay',
    question: 'Viết 1 câu hỏi thăm sức khỏe người khác bằng tiếng Trung (chữ Hán hoặc Pinyin) và trả lời "Tôi rất khỏe".',
    pinyin: 'Nǐ hǎo ma? — Wǒ hěn hǎo.',
    guide: 'Hỏi: 你好吗？ Trả lời: 我很好。',
    correct_answer: '你好吗？ — 我很好。(Nǐ hǎo ma? — Wǒ hěn hǎo.)',
    explanation: 'Mẫu hội thoại chào hỏi kinh điển: 你好吗？(Bạn khỏe không?) — 我很好。(Tôi rất khỏe.)',
    grammar_clue: 'Câu hỏi Yes/No với trợ từ 吗 (ma).',
    encouragement: 'Hội thoại rất tự nhiên! ✍️🇨🇳',
    points: 2.0
  }
];
