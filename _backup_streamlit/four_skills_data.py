"""
Bộ dữ liệu chuẩn 4 kỹ năng (Nghe - Nói - Đọc - Viết)
- Tiếng Anh: Chuẩn Cambridge A2 Flyers
- Tiếng Trung: Chuẩn YCT 1-3 / HSK 1-2
"""

FOUR_SKILLS_DATA = [
    # =========================================================================
    # TIẾNG ANH - BỘ ĐỀ 1: A Day at the Zoo (Cambridge Flyers)
    # =========================================================================
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: A Day at the Zoo (4 Kỹ Năng)",
        "skill": "listening",
        "question_type": "mcq",
        "content": "Listen to the recording about Helen's visit to the zoo and answer the question: Which animal did Helen love the most?",
        "audio_text": "Yesterday, Helen and her brother went to the city zoo. They saw elephants, monkeys, and two tall giraffes eating green leaves from the highest tree. Helen loved the baby kangaroo the most.",
        "options": [
            "A. The tall giraffes",
            "B. The baby kangaroo",
            "C. The big elephants",
            "D. The naughty monkeys"
        ],
        "correct_answer": "B",
        "explanation": "Trong bài nghe, người kể nói rõ: 'Helen loved the baby kangaroo the most.'",
        "grammar_clue": "Từ khóa then chốt: 'loved... the most' (so sánh nhất với tính từ dài/trạng từ)",
        "encouragement": "Kỹ năng nghe nắm bắt thông tin chi tiết rất xuất sắc! 🌟🎧",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: A Day at the Zoo (4 Kỹ Năng)",
        "skill": "speaking",
        "question_type": "speaking",
        "content": "Bấm vào nút micro bên dưới và đọc to, rõ ràng câu tiếng Anh sau:",
        "audio_prompt": "Yesterday, I visited the zoo with my family and saw many wild animals.",
        "phonetics_guide": "Phát âm chuẩn âm đuôi: '-ed' trong 'visited' (/ɪd/), âm /z/ trong 'zoo', và âm cuối /z/ trong 'animals'.",
        "correct_answer": "Yesterday, I visited the zoo with my family and saw many wild animals.",
        "explanation": "Mẫu câu thì Quá khứ đơn (Past Simple) chuẩn Cambridge Flyers với động từ có quy tắc (visited) và bất quy tắc (saw).",
        "grammar_clue": "Yesterday -> Động từ ở thì Quá khứ đơn",
        "encouragement": "Giọng đọc rất tự tin, phát âm ngữ điệu tiếng Anh rất Tây! 🎙️👏",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: A Day at the Zoo (4 Kỹ Năng)",
        "skill": "reading",
        "question_type": "mcq",
        "content": "Read the passage and choose the best answer:\n\n'Camels live in hot deserts where there is very little water and rain. They can walk on hot sand because their feet are wide and flat. Camels have humps on their backs to store fat, which helps them survive for many days without food.'\n\nQuestion: Why can camels walk easily on hot sand?",
        "options": [
            "A. Because they have long legs",
            "B. Because their feet are wide and flat",
            "C. Because they carry water in humps",
            "D. Because they run very fast"
        ],
        "correct_answer": "B",
        "explanation": "Đoạn văn nêu rõ nguyên nhân: 'They can walk on hot sand because their feet are wide and flat.'",
        "grammar_clue": "Liên từ 'because' chỉ nguyên nhân",
        "encouragement": "Đọc hiểu và trích xuất thông tin rất nhạy bén! 📖✨",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: A Day at the Zoo (4 Kỹ Năng)",
        "skill": "writing",
        "question_type": "essay",
        "content": "Em hãy sắp xếp các từ sau thành một câu hoàn chỉnh đúng ngữ pháp Cambridge Flyers:\n'animals / We / protect / should / because / they / endangered / are / .'",
        "guide": "Cấu trúc: S + should + V (nguyên thể) + O + because + S + be + adj.",
        "correct_answer": "We should protect animals because they are endangered.",
        "explanation": "Câu hoàn chỉnh: 'We should protect animals because they are endangered.' (Chúng ta nên bảo vệ động vật vì chúng đang bị đe dọa tuyệt chủng).",
        "grammar_clue": "Động từ khuyết thiếu 'should' đi cùng động từ nguyên thể",
        "encouragement": "Ngữ pháp và trật tự từ chuẩn xác 100%! ✍️💯",
        "points": 2.5
    },

    # =========================================================================
    # TIẾNG ANH - BỘ ĐỀ 2: Travelling and Holidays (Cambridge Flyers)
    # =========================================================================
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: Travelling and Holidays (4 Kỹ Năng)",
        "skill": "listening",
        "question_type": "mcq",
        "content": "Listen to the recording about David's holiday and answer: Where was the hotel that David and his grandparents stayed in?",
        "audio_text": "Last summer, David flew to London with his grandparents. They travelled on a big red bus, visited a famous museum, and stayed in a hotel next to the River Thames. The weather was sunny and warm every afternoon.",
        "options": [
            "A. Near the airport",
            "B. Inside the museum",
            "C. Next to the River Thames",
            "D. Behind the bus station"
        ],
        "correct_answer": "C",
        "explanation": "Bài nghe đề cập: '...stayed in a hotel next to the River Thames.'",
        "grammar_clue": "Giới từ chỉ nơi chốn: 'next to' (bên cạnh)",
        "encouragement": "Khả năng nghe bắt từ khóa về địa điểm cực kỳ chuẩn! 🎧🌟",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: Travelling and Holidays (4 Kỹ Năng)",
        "skill": "speaking",
        "question_type": "speaking",
        "content": "Bấm vào nút micro và đọc to câu miêu tả chuyến du lịch sau bằng tiếng Anh:",
        "audio_prompt": "We travelled by plane to London and stayed there for two weeks.",
        "phonetics_guide": "Bật rõ âm đuôi: '-d' trong 'travelled', âm /t/ trong 'stayed', và âm gió /s/ trong 'weeks'.",
        "correct_answer": "We travelled by plane to London and stayed there for two weeks.",
        "explanation": "Câu miêu tả phương tiện 'by plane' và khoảng thời gian 'for two weeks' trong quá khứ.",
        "grammar_clue": "travel by + phương tiện, for + khoảng thời gian",
        "encouragement": "Ngữ điệu tự nhiên, nhấn nhá câu rất tốt! 🎙️🌟",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: Travelling and Holidays (4 Kỹ Năng)",
        "skill": "reading",
        "question_type": "mcq",
        "content": "Read the text and answer the question:\n\n'Flying by plane is the fastest way to travel between different countries. At the airport, passengers must show their tickets and passports before getting on the aeroplane. During the flight, flight attendants bring delicious meals and drinks to everyone.'\n\nQuestion: What must passengers show at the airport before boarding the plane?",
        "options": [
            "A. Books and toys",
            "B. Tickets and passports",
            "C. Luggage keys",
            "D. Food and drinks"
        ],
        "correct_answer": "B",
        "explanation": "Đoạn văn viết: 'At the airport, passengers must show their tickets and passports before getting on the aeroplane.'",
        "grammar_clue": "Động từ khuyết thiếu 'must' (bắt buộc phải)",
        "encouragement": "Đọc hiểu rất nhanh và chọn đáp án chính xác! 📖👏",
        "points": 2.5
    },
    {
        "subject": "Tiếng Anh",
        "topic": "Cambridge Flyers: Travelling and Holidays (4 Kỹ Năng)",
        "skill": "writing",
        "question_type": "essay",
        "content": "Em hãy viết một đoạn văn ngắn (từ 3 đến 4 câu) bằng tiếng Anh kể về phương tiện giao thông em thích nhất khi đi du lịch (Ví dụ: plane, train, car...).",
        "guide": "Gợi ý: I like travelling by... because it is fast/comfortable. Last year, I went to... with my family. It was wonderful!",
        "correct_answer": "I like travelling by train because it is comfortable and safe. Through the window, I can see beautiful green mountains and rivers. Last summer, my family travelled to Da Nang by train and it was fantastic.",
        "explanation": "Đoạn văn mẫu 3 câu mạch lạc, đúng thì, dùng từ vựng phong phú và có liên từ kết nối.",
        "grammar_clue": "Sử dụng tính từ miêu tả: comfortable, safe, fantastic",
        "encouragement": "Khả năng viết đoạn văn giàu hình ảnh và đúng ngữ pháp! ✍️🌟",
        "points": 2.5
    },

    # =========================================================================
    # TIẾNG TRUNG - BỘ ĐỀ 1: Gia Đình & Sở Thích (YCT 1-2 / HSK 1-2)
    # =========================================================================
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 1-2: Gia Đình & Sở Thích (4 Kỹ Năng)",
        "skill": "listening",
        "question_type": "mcq",
        "content": "Hãy nghe đoạn ghi âm giới thiệu gia đình và trả lời câu hỏi:\n我家一共有几口人？ (Nhà tôi có tất cả mấy người?)",
        "audio_text": "我家有四口人：爸爸、妈妈、哥哥和我。爸爸是医生，妈妈是老师。我最喜欢打乒乓球。",
        "pinyin": "Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ. Bàba shì yīshēng, māma shì lǎoshī. Wǒ zuì xǐhuan dǎ pīngpāngqiú.",
        "vietnamese_meaning": "Nhà tôi có bốn người: bố, mẹ, anh trai và tôi. Bố là bác sĩ, mẹ là cô giáo. Tôi thích nhất là chơi bóng bàn.",
        "options": [
            "A. 三口人 (Sān kǒu rén - 3 người)",
            "B. 四口人 (Sì kǒu rén - 4 người)",
            "C. 五口人 (Wǔ kǒu rén - 5 người)",
            "D. 六口人 (Liù kǒu rén - 6 người)"
        ],
        "correct_answer": "B",
        "explanation": "Đoạn ghi âm mở đầu: '我家有四口人...' (Nhà tôi có 4 người).",
        "grammar_clue": "Số đếm 四 (sì - số 4) đi cùng lượng từ 口 (kǒu)",
        "encouragement": "Nghe hiểu tiếng Trung rất nhạy bén! 🎧👏",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 1-2: Gia Đình & Sở Thích (4 Kỹ Năng)",
        "skill": "speaking",
        "question_type": "speaking",
        "content": "Bấm nút micro và đọc to câu tiếng Trung sau:",
        "audio_prompt": "我家有四口人，我爱我的爸爸妈妈。",
        "pinyin": "Wǒ jiā yǒu sì kǒu rén, wǒ ài wǒ de bàba māma.",
        "vietnamese_meaning": "Nhà tôi có 4 người, tôi yêu bố mẹ của tôi.",
        "phonetics_guide": "Chú ý thanh 4 dứt khoát trong 'sì' (四), 'ài' (爱), 'bà' (爸) và thanh 1 trong 'mā' (妈).",
        "correct_answer": "我家有四口人，我爱我的爸爸妈妈。",
        "explanation": "Mẫu câu giao tiếp giới thiệu thành viên và biểu đạt tình cảm gia đình.",
        "grammar_clue": "Động từ 爱 (ài - yêu thương)",
        "encouragement": "Phát âm thanh điệu tiếng Trung rất tròn vành rõ chữ! 🎙️🇨🇳",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 1-2: Gia Đình & Sở Thích (4 Kỹ Năng)",
        "skill": "reading",
        "question_type": "mcq",
        "content": "Đọc đoạn văn ngắn sau và trả lời câu hỏi:\n\n'大卫是我的好朋友。他今年十一岁，在上五年级。他喜欢学汉语，也喜欢画画儿。星期天，我们经常一起去公园踢足球。'\n\nCâu hỏi: 星期天，大卫和朋友一起去哪儿踢足球？ (Chủ nhật, David và bạn cùng đi đâu đá bóng?)",
        "pinyin": "Dàwèi shì wǒ de hǎo péngyou. Tā jīnnián shíyī suì, zài shàng wǔ niánjí. Tā xǐhuan xué Hànyǔ, yě xǐhuan huà huàr. Xīngqītiān, wǒmen jīngcháng yìqǐ qù gōngyuán tī zúqiú.",
        "vietnamese_meaning": "David là bạn tốt của tôi. Cậu ấy năm nay 11 tuổi, học lớp 5. Cậu ấy thích học tiếng Trung, cũng thích vẽ tranh. Chủ nhật, chúng tôi thường cùng nhau đi công viên đá bóng.",
        "options": [
            "A. 学校 (Xuéxiào - Trường học)",
            "B. 公园 (Gōngyuán - Công viên)",
            "C. 动物园 (Dòngwùyuán - Sở thú)",
            "D. 医院 (Yīyuàn - Bệnh viện)"
        ],
        "correct_answer": "B",
        "explanation": "Đoạn văn viết: '...去公园踢足球' (đi công viên đá bóng).",
        "grammar_clue": "Từ chỉ địa điểm: 公园 (Gōngyuán - Công viên)",
        "encouragement": "Nhận diện mặt chữ Hán và đọc hiểu rất xuất sắc! 📖🇨🇳",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 1-2: Gia Đình & Sở Thích (4 Kỹ Năng)",
        "skill": "writing",
        "question_type": "essay",
        "content": "Em hãy sắp xếp các từ sau thành một câu hoàn chỉnh bằng tiếng Trung (có thể gõ chữ Hán hoặc Pinyin):\n'喜欢 (xǐhuan) / 我 (wǒ) / 吃 (chī) / 苹果 (píngguǒ) / .'",
        "pinyin": "xǐhuan / wǒ / chī / píngguǒ / .",
        "vietnamese_meaning": "thích / tôi / ăn / quả táo / .",
        "guide": "Trật tự câu: Chủ ngữ + Động từ tâm lý (喜欢) + Động từ hành động (吃) + Tân ngữ (苹果).",
        "correct_answer": "我喜欢吃苹果。 (Wǒ xǐhuan chī píngguǒ.)",
        "explanation": "Câu hoàn chỉnh: 我喜欢吃苹果。(Tôi thích ăn táo).",
        "grammar_clue": "Cấu trúc: S + 喜欢 + V + O",
        "encouragement": "Cấu trúc ngữ pháp tiếng Trung rất vững vàng! ✍️🇨🇳",
        "points": 2.5
    },

    # =========================================================================
    # TIẾNG TRUNG - BỘ ĐỀ 2: Trường Học & Bạn Bè (YCT 2-3 / HSK 1-2)
    # =========================================================================
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 2-3: Trường Học & Bạn Bè (4 Kỹ Năng)",
        "skill": "listening",
        "question_type": "mcq",
        "content": "Hãy nghe đoạn ghi âm về một buổi sáng đi học và trả lời:\n他们几点去上学？ (Mấy giờ họ đi học?)",
        "audio_text": "今天是星期一，天气很好。早上八点，我和小明一起走路上学。我们的学校很大，教室里有很多书。",
        "pinyin": "Jīntiān shì xīngqīyī, tiānqì hěn hǎo. Zǎoshang bā diǎn, wǒ hé Xiǎomíng yìqǐ zǒulù shàngxué. Wǒmen de xuéxiào hěn dà, jiàoshì lǐ yǒu hěn duō shū.",
        "vietnamese_meaning": "Hôm nay là thứ Hai, thời tiết rất đẹp. 8 giờ sáng, tôi và Tiểu Minh cùng nhau đi bộ đến trường. Trường học của chúng tôi rất to, trong phòng học có rất nhiều sách.",
        "options": [
            "A. 七点 (Qī diǎn - 7 giờ)",
            "B. 八点 (Bā diǎn - 8 giờ)",
            "C. 九点 (Jiǔ diǎn - 9 giờ)",
            "D. 十点 (Shí diǎn - 10 giờ)"
        ],
        "correct_answer": "B",
        "explanation": "Bài nghe nói rõ: '早上八点，我和小明一起走路上学' (8 giờ sáng...).",
        "grammar_clue": "Thời gian: 早上八点 (8 giờ sáng)",
        "encouragement": "Nghe số giờ tiếng Trung cực kỳ chính xác! 🎧🇨🇳",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 2-3: Trường Học & Bạn Bè (4 Kỹ Năng)",
        "skill": "speaking",
        "question_type": "speaking",
        "content": "Bấm nút micro và đọc to câu miêu tả trường học sau bằng tiếng Trung:",
        "audio_prompt": "我们的学校很大，老师对我们很好。",
        "pinyin": "Wǒmen de xuéxiào hěn dà, lǎoshī duì wǒmen hěn hǎo.",
        "vietnamese_meaning": "Trường học của chúng tôi rất to, thầy cô đối với chúng tôi rất tốt.",
        "phonetics_guide": "Chú ý thanh 2 trong 'xué' (学), thanh 4 trong 'dà' (大) và 'duì' (对), và quy tắc biến điệu hai thanh 3 trong 'hěn hǎo' đọc thành 'hén hǎo'.",
        "correct_answer": "我们的学校很大，老师对我们很好。",
        "explanation": "Cấu trúc 对...很好 (đối xử rất tốt với ai đó).",
        "grammar_clue": "Giới từ 对 (duì - đối với)",
        "encouragement": "Biến điệu thanh 3 phát âm rất chuẩn ngữ âm Bắc Kinh! 🎙️✨",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 2-3: Trường Học & Bạn Bè (4 Kỹ Năng)",
        "skill": "reading",
        "question_type": "mcq",
        "content": "Đọc đoạn văn và trả lời câu hỏi:\n\n'王老师是我们的汉语老师。她说话很亲切，课上经常带我们唱中文歌、做游戏。大家都非常喜欢上王老师的汉语课。'\n\nCâu hỏi: 在汉语课上，王老师经常带学生做什么？ (Trong tiết tiếng Trung, cô Vương thường cho học sinh làm gì?)",
        "pinyin": "Wáng lǎoshī shì wǒmen de Hànyǔ lǎoshī. Tā shuōhuà hěn qīnqiè, kè shàng jīngcháng dài wǒmen chàng zhōngwén gē, zuò yóuxì. Dàjiā dōu fēicháng xǐhuan shàng Wáng lǎoshī de Hànyǔ kè.",
        "vietnamese_meaning": "Cô Vương là giáo viên tiếng Trung của chúng tôi. Cô nói chuyện rất thân thiện, trong giờ học thường dẫn chúng tôi hát bài hát tiếng Trung, chơi trò chơi. Mọi người đều rất thích học tiết của cô Vương.",
        "options": [
            "A. 跑步和游泳 (Pǎobù hé yóuyǒng - Chạy bộ và bơi lội)",
            "B. 唱中文歌和做游戏 (Chàng zhōngwén gē hé zuò yóuxì - Hát và chơi trò chơi)",
            "C. 睡觉和吃东西 (Shuìjiào hé chī dōngxi - Ngủ và ăn đồ ăn)",
            "D. 看电视和玩电脑 (Kàn diànshì hé wán diànnǎo - Xem tivi và chơi vi tính)"
        ],
        "correct_answer": "B",
        "explanation": "Đoạn văn viết: '...带我们唱中文歌、做游戏' (dẫn chúng tôi hát tiếng Trung, chơi trò chơi).",
        "grammar_clue": "Động từ: 唱 (hát), 做游戏 (chơi trò chơi)",
        "encouragement": "Kỹ năng đọc hiểu đoạn văn tiếng Trung rất tiến bộ! 📖💯",
        "points": 2.5
    },
    {
        "subject": "Tiếng Trung",
        "topic": "Tiếng Trung YCT 2-3: Trường Học & Bạn Bè (4 Kỹ Năng)",
        "skill": "writing",
        "question_type": "essay",
        "content": "Em hãy viết một đoạn văn ngắn (từ 2 đến 3 câu) bằng tiếng Trung giới thiệu về người bạn thân của em (kèm phiên âm Pinyin).",
        "guide": "Gợi ý: 这是我的好朋友... (Đây là bạn thân của tôi...). 他/她今年十一岁... (Cậu ấy 11 tuổi...). 我们经常一起... (Chúng tôi thường cùng nhau...).",
        "correct_answer": "这是我的好朋友小明。他今年十一岁，喜欢踢足球。我们经常一起上学。(Zhè shì wǒ de hǎo péngyou Xiǎomíng. Tā jīnnián shíyī suì, xǐhuan tī zúqiú. Wǒmen jīngcháng yìqǐ shàngxué.)",
        "explanation": "Đoạn văn 3 câu hoàn chỉnh giới thiệu bạn thân, tuổi tác và hoạt động yêu thích.",
        "grammar_clue": "Đại từ chỉ định: 这 (zhè - đây, này)",
        "encouragement": "Đoạn văn tiếng Trung diễn đạt tự nhiên và đúng chuẩn ngữ pháp! ✍️🌟",
        "points": 2.5
    }
]
