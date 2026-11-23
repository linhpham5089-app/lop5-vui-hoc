"""
Ngân hàng câu hỏi mẫu chuẩn Cambridge A2 Flyers cho học sinh Lớp 5.
Gồm 25 câu hỏi được chia đều cho 5 dạng bài thi Cambridge Flyers.
"""

FLYERS_SEED_DATA = [
    # --- DẠNG 1: VOCABULARY & DEFINITIONS (Đọc định nghĩa đoán từ) ---
    {
        "category": "Dạng 1: Vocabulary & Definitions",
        "type": "mcq",
        "question": "This person works in a kitchen and prepares delicious food for people in a restaurant.",
        "options": ["A. chef", "B. doctor", "C. journalist", "D. mechanic"],
        "correct_answer": "A",
        "explanation": "'Chef' (đầu bếp) là người nấu ăn trong nhà hàng. Doctor là bác sĩ, journalist là nhà báo, mechanic là thợ sửa xe.",
        "grammar_clue": "Từ khóa định nghĩa: 'prepares delicious food in a restaurant' -> chef.",
        "encouragement": "Excellent vocabulary skills! You know your Flyers words well! (Vốn từ vựng của em rất tốt!)"
    },
    {
        "category": "Dạng 1: Vocabulary & Definitions",
        "type": "mcq",
        "question": "You pack your clothes and belongings in this when you go on a journey or holiday.",
        "options": ["A. tent", "B. suitcase", "C. rucksack", "D. postcard"],
        "correct_answer": "B",
        "explanation": "'Suitcase' (vali) dùng để đựng quần áo khi đi du lịch dài ngày. Tent là lều cắm trại, postcard là bưu thiếp.",
        "grammar_clue": "Từ khóa: 'pack your clothes when you go on a journey' -> suitcase.",
        "encouragement": "Super job! Ready to pack your bag for the Flyers exam! (Làm tốt lắm, em sẵn sàng bay cao cùng Flyers rồi!)"
    },
    {
        "category": "Dạng 1: Vocabulary & Definitions",
        "type": "mcq",
        "question": "A very large, strong building built in the past by kings or queens to protect their people.",
        "options": ["A. factory", "B. stadium", "C. castle", "D. theatre"],
        "correct_answer": "C",
        "explanation": "'Castle' (lâu đài) là công trình của vua chúa thời xưa. Factory là nhà máy, stadium là sân vận động.",
        "grammar_clue": "Từ khóa: 'built in the past by kings or queens' -> castle.",
        "encouragement": "Spot on! That is a classic Flyers vocabulary word! (Chính xác tuyệt đối! Từ vựng chuẩn Flyers luôn!)"
    },
    {
        "category": "Dạng 1: Vocabulary & Definitions",
        "type": "mcq",
        "question": "A brave person who travels into space in a rocket or spaceship.",
        "options": ["A. pilot", "B. astronaut", "C. scientist", "D. engineer"],
        "correct_answer": "B",
        "explanation": "'Astronaut' (phi hành gia) là người bay vào vũ trụ. Pilot là phi công lái máy bay, scientist là nhà khoa học.",
        "grammar_clue": "Từ khóa: 'travels into space in a rocket' -> astronaut.",
        "encouragement": "Fantastic! You are reaching for the stars! (Tuyệt vời! Em đang vươn tới các vì sao!)"
    },
    {
        "category": "Dạng 1: Vocabulary & Definitions",
        "type": "mcq",
        "question": "A large dark hole in the side of a hill or mountain where bats often sleep during the day.",
        "options": ["A. desert", "B. bridge", "C. cave", "D. forest"],
        "correct_answer": "C",
        "explanation": "'Cave' (hang động) là nơi trú ẩn trong núi đá. Desert là sa mạc, bridge là cây cầu.",
        "grammar_clue": "Từ khóa: 'large dark hole in a mountain where bats sleep' -> cave.",
        "encouragement": "Wonderful answer! You remembered the Flyers nature topic! (Tuyệt vời! Em nhớ rất chuẩn chủ đề thiên nhiên!)"
    },

    # --- DẠNG 2: DIALOGUE COMPLETION (Hoàn thành hội thoại giao tiếp) ---
    {
        "category": "Dạng 2: Dialogue Completion",
        "type": "mcq",
        "question": "Oliver: 'Have you ever been to the new science museum, Emma?'\nEmma: '______'",
        "options": [
            "A. No, I haven't, but I'd love to go.",
            "B. Yes, I do it every day.",
            "C. It's next to the railway station.",
            "D. I saw a dinosaur yesterday."
        ],
        "correct_answer": "A",
        "explanation": "Câu hỏi thì Hiện tại hoàn thành 'Have you ever been...?' hỏi về trải nghiệm, câu trả lời phù hợp nhất là 'No, I haven't, but...'",
        "grammar_clue": "Dấu hiệu câu hỏi: 'Have you ever been...?' -> Trả lời: 'Yes, I have' hoặc 'No, I haven't'.",
        "encouragement": "Brilliant dialogue understanding! Very natural English! (Hiểu hội thoại rất tự nhiên!)"
    },
    {
        "category": "Dạng 2: Dialogue Completion",
        "type": "mcq",
        "question": "Teacher: 'Whose blue rucksack is this on the floor?'\nDavid: '______'",
        "options": [
            "A. It's mine. Sorry, teacher!",
            "B. She is wearing a green jacket.",
            "C. Yes, it's very heavy.",
            "D. I bought it at the supermarket."
        ],
        "correct_answer": "A",
        "explanation": "Câu hỏi 'Whose...?' hỏi về sở hữu (của ai). Đáp lại dùng đại từ sở hữu 'It's mine' (Của em ạ).",
        "grammar_clue": "Từ để hỏi: 'Whose' (Của ai) -> Trả lời bằng đại từ sở hữu (mine, hers, John's).",
        "encouragement": "Great job! You mastered question words! (Rất giỏi! Em nắm rất chắc từ để hỏi!)"
    },
    {
        "category": "Dạng 2: Dialogue Completion",
        "type": "mcq",
        "question": "Harry: 'What were you doing when the heavy storm started?'\nDaisy: '______'",
        "options": [
            "A. I am reading a comic book.",
            "B. I was watching television in the living room.",
            "C. It will rain all afternoon.",
            "D. Yes, I liked the storm very much."
        ],
        "correct_answer": "B",
        "explanation": "Câu hỏi thì Quá khứ tiếp diễn 'What were you doing...?' nên câu trả lời phải dùng thì Quá khứ tiếp diễn 'I was watching...'",
        "grammar_clue": "Hỏi thì Quá khứ tiếp diễn (were you doing) -> Trả lời: I was + V-ing.",
        "encouragement": "Perfect grammar reaction! Keep going! (Phản xạ ngữ pháp quá chuẩn!)"
    },
    {
        "category": "Dạng 2: Dialogue Completion",
        "type": "mcq",
        "question": "Mum: 'Shall we have a picnic by the lake this weekend?'\nJack: '______'",
        "options": [
            "A. No, I don't eat sandwiches.",
            "B. That sounds like a wonderful idea, Mum!",
            "C. The lake is very deep.",
            "D. We went there two years ago."
        ],
        "correct_answer": "B",
        "explanation": "'Shall we...?' là lời đề nghị hoặc gợi ý cùng làm việc gì. Đáp lại lịch sự tán thành là 'That sounds like a wonderful idea!'",
        "grammar_clue": "Lời đề nghị gợi ý: 'Shall we...?' -> Đáp: 'That sounds great/wonderful!'",
        "encouragement": "Spot on, polite response! (Cách ứng xử giao tiếp bằng tiếng Anh rất chuẩn mực!)"
    },
    {
        "category": "Dạng 2: Dialogue Completion",
        "type": "mcq",
        "question": "Lucy: 'How long does it take to travel to London by train?'\nGeorge: '______'",
        "options": [
            "A. About forty-five minutes.",
            "B. At half past eight in the morning.",
            "C. It was very crowded today.",
            "D. Platforms three and four."
        ],
        "correct_answer": "A",
        "explanation": "'How long does it take...?' hỏi về độ dài thời gian (mất bao lâu). Đáp án là khoảng thời gian: 'About forty-five minutes'.",
        "grammar_clue": "Hỏi thời lượng: 'How long does it take?' -> Trả lời: 'About ... minutes/hours'.",
        "encouragement": "Outstanding! You never get confused with time questions! (Xuất sắc! Không bao giờ nhầm lẫn câu hỏi thời gian!)"
    },

    # --- DẠNG 3: FLYERS GRAMMAR (Ngữ pháp trọng tâm A2) ---
    {
        "category": "Dạng 3: Flyers Grammar",
        "type": "mcq",
        "question": "While Sarah ______ her bicycle in the park, it suddenly started to rain.",
        "options": ["A. rides", "B. was riding", "C. is riding", "D. rode"],
        "correct_answer": "B",
        "explanation": "Cấu trúc kết hợp thì: Hành động đang diễn ra trong quá khứ (While + Past Continuous) thì hành động khác xen vào (Past Simple).",
        "grammar_clue": "Dấu hiệu: 'While' + quá khứ tiếp diễn (was/were + V-ing) kết hợp với 'started' (quá khứ đơn).",
        "encouragement": "Superb grammar mastery! Past Continuous nailed! (Làm chủ thì Quá khứ tiếp diễn cực đỉnh!)"
    },
    {
        "category": "Dạng 3: Flyers Grammar",
        "type": "mcq",
        "question": "The friendly journalist ______ wrote this exciting article lives in our town.",
        "options": ["A. which", "B. who", "C. where", "D. when"],
        "correct_answer": "B",
        "explanation": "Đại từ quan hệ thay thế cho danh từ chỉ người 'journalist' (nhà báo) là 'who'. 'Which' dùng cho vật, 'where' dùng cho nơi chốn.",
        "grammar_clue": "Dấu hiệu: Danh từ đứng trước là người ('journalist') -> Dùng đại từ quan hệ 'who'.",
        "encouragement": "Bingo! You know relative pronouns like a pro! (Chuẩn xác! Dùng mệnh đề quan hệ như người bản xứ!)"
    },
    {
        "category": "Dạng 3: Flyers Grammar",
        "type": "mcq",
        "question": "Alex hasn't packed his suitcase for the school trip ______.",
        "options": ["A. already", "B. yet", "C. ever", "D. just"],
        "correct_answer": "B",
        "explanation": "Trong thì Hiện tại hoàn thành, từ 'yet' đứng ở cuối câu phủ định (hasn't/haven't) hoặc câu nghi vấn.",
        "grammar_clue": "Dấu hiệu: Câu phủ định 'hasn't packed' + vị trí cuối câu -> dùng 'yet'.",
        "encouragement": "High five! Present perfect with 'yet' is so easy for you! (Đập tay nào! Hiện tại hoàn thành với 'yet' quá dễ với em!)"
    },
    {
        "category": "Dạng 3: Flyers Grammar",
        "type": "mcq",
        "question": "Travelling by plane is ______ than travelling by bus, but it is much faster.",
        "options": ["A. expensive", "B. more expensive", "C. most expensive", "D. the most expensive"],
        "correct_answer": "B",
        "explanation": "So sánh hơn của tính từ dài 'expensive' là 'more expensive + than'.",
        "grammar_clue": "Dấu hiệu: Có từ 'than' -> So sánh hơn của tính từ dài 3 âm tiết (more + adj + than).",
        "encouragement": "Marvelous! Comparative adjectives are fully mastered! (Tuyệt vời! So sánh hơn đã nắm chắc trong tay!)"
    },
    {
        "category": "Dạng 3: Flyers Grammar",
        "type": "mcq",
        "question": "If the weather ______ fine tomorrow, we will go camping near the waterfall.",
        "options": ["A. is", "B. will be", "C. was", "D. are"],
        "correct_answer": "A",
        "explanation": "Câu điều kiện loại 1 (First Conditional): Mệnh đề If dùng thì Hiện tại đơn (If + S + V(s/es)), mệnh đề chính dùng 'will + V'.",
        "grammar_clue": "Dấu hiệu: Mệnh đề If loại 1 chia Hiện tại đơn: 'weather' là danh từ không đếm được -> dùng 'is'.",
        "encouragement": "First-class! Conditionals type 1 are in your pocket! (Hạng nhất luôn! Câu điều kiện loại 1 đã nằm trọn trong túi em!)"
    },

    # --- DẠNG 4: STORY READING & CLOZE (Đọc hiểu & Điền từ theo ngữ cảnh) ---
    {
        "category": "Dạng 4: Story Reading & Cloze",
        "type": "mcq",
        "question": "Read and choose the best word: 'Last summer, Robert visited an old castle with his uncle. When they entered the great hall, they saw many ______ paintings hanging on the stone walls.'",
        "options": ["A. ancient", "B. noisy", "C. plastic", "D. empty"],
        "correct_answer": "A",
        "explanation": "'Ancient' (cổ xưa, lâu đời) phù hợp nhất với ngữ cảnh bức tranh trong một lâu đài cổ (old castle). Noisy là ồn ào, plastic là bằng nhựa.",
        "grammar_clue": "Ngữ cảnh: 'old castle' (lâu đài cổ) đi với 'ancient paintings' (các bức tranh cổ xưa).",
        "encouragement": "Sharp reading comprehension! Great contextual deduction! (Khả năng đọc hiểu ngữ cảnh rất sắc bén!)"
    },
    {
        "category": "Dạng 4: Story Reading & Cloze",
        "type": "mcq",
        "question": "Story: 'Robert looked through the stone window and saw a beautiful ______ below with tall fruit trees and colorful flowers.'",
        "options": ["A. desert", "B. garden", "C. ceiling", "D. airport"],
        "correct_answer": "B",
        "explanation": "'Garden' (khu vườn) phù hợp với 'fruit trees and colorful flowers' (cây ăn quả và hoa rực rỡ). Desert là sa mạc, ceiling là trần nhà.",
        "grammar_clue": "Ngữ cảnh: 'fruit trees and colorful flowers' -> chắc chắn là 'garden'.",
        "encouragement": "Splendid! Reading for clues is your superpower! (Tuyệt vời! Tìm manh mối trong bài đọc là siêu năng lực của em!)"
    },
    {
        "category": "Dạng 4: Story Reading & Cloze",
        "type": "mcq",
        "question": "Story: 'Suddenly, uncle William pointed to a dark corner where a little brown bat was ______ upside down.'",
        "options": ["A. jumping", "B. flying", "C. sleeping", "D. cooking"],
        "correct_answer": "C",
        "explanation": "Dơi có tập tính ngủ treo ngược người ('sleeping upside down').",
        "grammar_clue": "Cụm từ tự nhiên: 'bat was sleeping upside down' (con dơi đang ngủ treo ngược người).",
        "encouragement": "Clever observation! Flyers reading task scored! (Quan sát rất thông minh! Đã vượt qua câu đọc hiểu Flyers!)"
    },
    {
        "category": "Dạng 4: Story Reading & Cloze",
        "type": "mcq",
        "question": "Story: 'They spent three hours exploring the castle before they decided to have lunch at a friendly ______ nearby.'",
        "options": ["A. station", "B. café", "C. hospital", "D. motorway"],
        "correct_answer": "B",
        "explanation": "Nơi để 'have lunch' (ăn trưa) là quán ăn/quán cà phê 'café'. Hospital là bệnh viện, motorway là đường cao tốc.",
        "grammar_clue": "Từ khóa: 'have lunch' -> café hoặc restaurant.",
        "encouragement": "Right on target! You've got an eagle eye! (Trúng đích rồi! Mắt em tinh tường như chim ưng vậy!)"
    },
    {
        "category": "Dạng 4: Story Reading & Cloze",
        "type": "mcq",
        "question": "Story: 'Robert took lots of photos with his camera because it was the most ______ trip he had ever had!'",
        "options": ["A. exciting", "B. boring", "C. dangerous", "D. heavy"],
        "correct_answer": "A",
        "explanation": "'Exciting' (thú vị, hào hứng) phù hợp với cảm xúc chụp nhiều ảnh để kỷ niệm chuyến đi tuyệt vời. Boring là nhàm chán.",
        "grammar_clue": "Ngữ cảnh: 'took lots of photos' biểu thị trải nghiệm vui vẻ -> 'the most exciting trip'.",
        "encouragement": "Magnificent reading skills! Full marks on this story! (Kỹ năng đọc hiểu xuất sắc! Điểm tối đa câu này!)"
    },

    # --- DẠNG 5: OPEN CLOZE (Tự luận / Tự suy luận và điền 1 từ chính xác không gợi ý) ---
    {
        "category": "Dạng 5: Open Cloze",
        "type": "essay",
        "question": "Write ONE word to complete the sentence: 'Mary has lived in this friendly village ______ five years.'",
        "options": [],
        "correct_answer": "for",
        "explanation": "Dùng giới từ 'for' đi kèm với một khoảng thời gian ('for five years' = được 5 năm) trong thì Hiện tại hoàn thành.",
        "grammar_clue": "Dấu hiệu: Hiện tại hoàn thành + khoảng thời gian (five years) -> điền 'for'. (Nếu là mốc thời gian dùng 'since').",
        "encouragement": "Top-notch! Perfect open cloze answer! (Đỉnh của chóp! Câu trả lời điền từ hoàn hảo!)"
    },
    {
        "category": "Dạng 5: Open Cloze",
        "type": "essay",
        "question": "Write ONE word to complete the sentence: 'This is the modern library ______ you can borrow many interesting books.'",
        "options": [],
        "correct_answer": "where",
        "explanation": "Điền đại từ quan hệ chỉ nơi chốn 'where' để bổ nghĩa cho danh từ địa điểm 'the modern library'.",
        "grammar_clue": "Dấu hiệu: 'library' (thư viện - nơi chốn) -> đại từ quan hệ chỉ địa điểm là 'where'.",
        "encouragement": "Brilliant grammar logic! You nailed the relative adverb! (Tư duy ngữ pháp rất sắc bén!)"
    },
    {
        "category": "Dạng 5: Open Cloze",
        "type": "essay",
        "question": "Write ONE word to complete the sentence: 'My little brother is very interested ______ learning about planets and rockets.'",
        "options": [],
        "correct_answer": "in",
        "explanation": "Cụm tính từ đi kèm giới từ cố định: 'interested in something' (thích thú, quan tâm đến cái gì).",
        "grammar_clue": "Cụm cố định: 'interested in' + V-ing.",
        "encouragement": "Well done! You remembered the preposition collocation! (Làm tốt lắm! Em nhớ rất chuẩn cụm giới từ!)"
    },
    {
        "category": "Dạng 5: Open Cloze",
        "type": "essay",
        "question": "Write ONE word to complete the sentence: 'If you study hard every day, you ______ pass the Cambridge Flyers exam easily.'",
        "options": [],
        "correct_answer": "will",
        "explanation": "Mệnh đề chính của câu điều kiện loại 1 dùng trợ động từ 'will' chỉ tương lai chắc chắn xảy ra.",
        "grammar_clue": "Dấu hiệu: Mệnh đề 'If you study' (Hiện tại đơn) -> Mệnh đề chính: 'you will pass'.",
        "encouragement": "Awesome! You will definitely fly high in Flyers! (Tuyệt đỉnh! Chắc chắn em sẽ đạt điểm cao trong kỳ thi Flyers!)"
    },
    {
        "category": "Dạng 5: Open Cloze",
        "type": "essay",
        "question": "Write ONE word to complete the sentence: 'Helen was late for school this morning ______ she missed the first school bus.'",
        "options": [],
        "correct_answer": "because",
        "explanation": "Điền liên từ chỉ nguyên nhân 'because' (hoặc 'as' / 'since') nối giữa kết quả 'late for school' và lý do 'missed the bus'.",
        "grammar_clue": "Dấu hiệu: Mối quan hệ nguyên nhân - kết quả -> điền 'because' (hoặc 'as').",
        "encouragement": "Phenomenal! Your English connecting words are spot on! (Quá phi thường! Sử dụng từ nối tiếng Anh cực chuẩn!)"
    }
]
