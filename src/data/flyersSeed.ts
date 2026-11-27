import { Question } from '@/types';

export const FLYERS_SEED_QUESTIONS: Question[] = [
  {
    id: 'f1',
    subject: 'Tiếng Anh',
    topic: '🏆 [Cambridge Flyers] Dạng 1: Vocabulary & Definitions (Đoán từ qua định nghĩa)',
    type: 'mcq',
    question: 'This person works in a kitchen and prepares delicious food for people in a restaurant.',
    options: ['A. chef', 'B. doctor', 'C. journalist', 'D. mechanic'],
    correct_answer: 'A',
    explanation: "'Chef' (đầu bếp) là người nấu ăn trong nhà hàng. Doctor là bác sĩ, journalist là nhà báo, mechanic là thợ sửa xe.",
    grammar_clue: "Từ khóa định nghĩa: 'prepares delicious food in a restaurant' -> chef.",
    encouragement: 'Excellent vocabulary skills! You know your Flyers words well! (Vốn từ vựng của em rất tốt!)',
    points: 2.0
  },
  {
    id: 'f2',
    subject: 'Tiếng Anh',
    topic: '🏆 [Cambridge Flyers] Dạng 1: Vocabulary & Definitions (Đoán từ qua định nghĩa)',
    type: 'mcq',
    question: 'You pack your clothes and belongings in this when you go on a journey or holiday.',
    options: ['A. tent', 'B. suitcase', 'C. rucksack', 'D. postcard'],
    correct_answer: 'B',
    explanation: "'Suitcase' (vali) dùng để đựng quần áo khi đi du lịch dài ngày.",
    grammar_clue: "Từ khóa: 'pack your clothes when you go on a journey' -> suitcase.",
    encouragement: 'Super job! Ready to pack your bag for the Flyers exam! (Làm tốt lắm!)',
    points: 2.0
  },
  {
    id: 'f3',
    subject: 'Tiếng Anh',
    topic: '🏆 [Cambridge Flyers] Dạng 2: Dialogue Completion (Hoàn thành hội thoại giao tiếp)',
    type: 'mcq',
    question: "Oliver: 'Have you ever been to the new science museum, Emma?'\nEmma: '______'",
    options: [
      "A. No, I haven't, but I'd love to go.",
      'B. Yes, I do it every day.',
      "C. It's next to the railway station.",
      'D. I saw a dinosaur yesterday.'
    ],
    correct_answer: 'A',
    explanation: "Câu hỏi thì Hiện tại hoàn thành 'Have you ever been...?' hỏi về trải nghiệm, đáp lại dùng: 'No, I haven't, but...'",
    grammar_clue: "Dấu hiệu câu hỏi: 'Have you ever been...?' -> Trả lời: 'No, I haven't'.",
    encouragement: 'Brilliant dialogue understanding! Very natural English! (Hiểu hội thoại rất tự nhiên!)',
    points: 2.0
  },
  {
    id: 'f4',
    subject: 'Tiếng Anh',
    topic: '🏆 [Cambridge Flyers] Dạng 3: Flyers Grammar (Ngữ pháp A2: Quá khứ, HTHT, Mệnh đề quan hệ)',
    type: 'mcq',
    question: 'Look! The students ______ their kites in the park because it is windy today.',
    options: ['A. flew', 'B. are flying', 'C. fly', 'D. will flying'],
    correct_answer: 'B',
    explanation: "Dấu hiệu 'Look!' báo hiệu hành động đang diễn ra tại thời điểm nói -> dùng Hiện tại tiếp diễn (Present Continuous): are flying.",
    grammar_clue: "Dấu hiệu nhận biết: 'Look!' đầu câu -> S + am/is/are + V-ing.",
    encouragement: 'Grammar master! Keep up the sharp eyes! (Nắm chắc ngữ pháp rất cừ!)',
    points: 2.0
  },
  {
    id: 'f5',
    subject: 'Tiếng Anh',
    topic: '🏆 [Cambridge Flyers] Dạng 5: Open Cloze (Tự suy luận và điền 1 từ chính xác)',
    type: 'essay',
    question: 'Read and fill in ONE suitable word: \n"Whales are the largest creatures ______ have ever lived on our planet Earth."',
    guide: 'Gợi ý: Cần một đại từ quan hệ thay thế cho danh từ chỉ vật/động vật ở dạng so sánh nhất (the largest creatures).',
    correct_answer: 'that (hoặc which)',
    explanation: "Đại từ quan hệ 'that' (hoặc 'which') được dùng để thay thế cho danh từ 'the largest creatures'.",
    grammar_clue: "Mệnh đề quan hệ xác định đứng sau cấu trúc so sánh nhất (the largest...)",
    encouragement: 'Outstanding reading intuition! (Trực giác đọc hiểu tuyệt vời!)',
    points: 2.0
  },
  // Bài thi chuẩn của Hồ Chí Minh (Tiếng Anh)
  {
    id: 'en_hcm_1',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Choose the best answer: "My family ______ to Nha Trang for our summer holiday last year."',
    options: ['A. go', 'B. goes', 'C. went', 'D. will go'],
    correct_answer: 'C',
    explanation: 'Có dấu hiệu thời gian quá khứ "last year" nên dùng thì Quá khứ đơn: "went" (quá khứ của "go").',
    grammar_clue: 'Last year / yesterday / ago → Past Simple (V2/V-ed).',
    encouragement: 'Great grammar sense! 🌟',
    points: 1.0
  },
  {
    id: 'en_hcm_2',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'mcq',
    question: 'Lan: "Would you like some orange juice?" — Minh: "______"',
    options: [
      'A. Yes, please.',
      'B. Yes, I do.',
      'C. Here you are.',
      'D. You are welcome.'
    ],
    correct_answer: 'A',
    explanation: 'Khi ai đó mời đồ ăn/thức uống bằng "Would you like...?", cách đáp lịch sự là "Yes, please." hoặc "No, thanks."',
    grammar_clue: 'Polite invitation response: Yes, please / No, thank you.',
    encouragement: 'Natural communication! 👏',
    points: 1.0
  },
  {
    id: 'en_hcm_3',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Hồ Chí Minh',
    type: 'essay',
    question: 'Reorder the words to make a complete sentence:\n"English / every / practices / speaking / Mai / day / ."',
    guide: 'Cấu trúc: Chủ ngữ + động từ (practices) + V-ing + danh từ + trạng ngữ thời gian.',
    correct_answer: 'Mai practices speaking English every day.',
    explanation: 'Câu hoàn chỉnh: "Mai practices speaking English every day."',
    grammar_clue: 'practice + V-ing (luyện tập làm gì).',
    encouragement: 'Well structured sentence! ✍️',
    points: 2.0
  },
  // Bài thi chuẩn của Trần Đại Nghĩa (Tiếng Anh tư duy)
  {
    id: 'en_tdn_1',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Read the clue and guess the word: "It is a public place where people can borrow books, read quietly, and use computers for study. What is it?"',
    options: ['A. Museum', 'B. Library', 'C. Pharmacy', 'D. Stadium'],
    correct_answer: 'B',
    explanation: '"Borrow books" (mượn sách) và "read quietly" (đọc yên tĩnh) là đặc trưng của thư viện (Library).',
    grammar_clue: 'Key words: borrow books → library.',
    encouragement: 'Sharp logical reading! 🌟',
    points: 1.0
  },
  {
    id: 'en_tdn_2',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'mcq',
    question: 'Find the odd one out (Chọn từ khác loại về nghĩa):',
    options: ['A. Recycling', 'B. Pollution', 'C. Planting trees', 'D. Saving water'],
    correct_answer: 'B',
    explanation: 'Recycling (tái chế), Planting trees (trồng cây), Saving water (tiết kiệm nước) đều là hành động bảo vệ môi trường; Pollution (ô nhiễm) là tác hại môi trường.',
    grammar_clue: 'Compare positive eco-actions vs environmental problem.',
    encouragement: 'Smart thinking! 👏',
    points: 1.0
  },
  {
    id: 'en_tdn_3',
    subject: 'Tiếng Anh',
    topic: 'Bài thi chuẩn của Trần Đại Nghĩa',
    type: 'essay',
    question: 'Read and answer in 1–2 English sentences:\n"Tom has 30 minutes before his school bus arrives. He needs 10 minutes to eat breakfast and 15 minutes to pack his bag. How many free minutes does Tom have left?"',
    guide: 'Tính tổng thời gian cần dùng rồi lấy 30 trừ đi, viết câu trả lời ngắn bằng tiếng Anh.',
    correct_answer: 'Tom has 5 free minutes left.',
    explanation: '10 + 15 = 25 minutes. 30 - 25 = 5 minutes → "Tom has 5 free minutes left."',
    grammar_clue: 'Math + English reading comprehension!',
    encouragement: 'Awesome problem-solving in English! ✍️🌟',
    points: 2.0
  },
  // Bài thi tổng hợp (Tiếng Anh)
  {
    id: 'en_th_1',
    subject: 'Tiếng Anh',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Choose the correct word: "The Nile is ______ river in the world."',
    options: ['A. long', 'B. longer', 'C. the longest', 'D. more long'],
    correct_answer: 'C',
    explanation: 'So sánh nhất của tính từ ngắn "long" có "the" ở trước: "the longest".',
    grammar_clue: 'Superlative: the + adj-est (... in the world).',
    encouragement: 'Spot on! 🌟',
    points: 1.0
  },
  {
    id: 'en_th_2',
    subject: 'Tiếng Anh',
    topic: 'Bài thi tổng hợp',
    type: 'mcq',
    question: 'Look at the sign: "NO LITTERING". What does it mean?',
    options: [
      'A. You must throw trash on the floor.',
      'B. You must not drop rubbish here.',
      'C. You can buy litter bins here.',
      'D. You should feed the birds.'
    ],
    correct_answer: 'B',
    explanation: '"No littering" nghĩa là cấm xả rác ("must not drop rubbish here").',
    grammar_clue: 'litter = rubbish / trash.',
    encouragement: 'Great vocabulary! 👏',
    points: 1.0
  },
  {
    id: 'en_th_3',
    subject: 'Tiếng Anh',
    topic: 'Bài thi tổng hợp',
    type: 'essay',
    question: 'Write 2–3 sentences in English about your favorite hobby (Sở thích yêu thích của em).',
    guide: 'Gợi ý: "My favorite hobby is... I usually do it... Because it makes me feel..."',
    correct_answer: 'My favorite hobby is reading comic books. I usually read in the evening after finishing my homework because it is very fun and relaxing.',
    explanation: 'Đoạn văn ngắn đúng ngữ pháp hiện tại đơn, nêu rõ sở thích và lý do.',
    grammar_clue: 'like / love / enjoy + V-ing.',
    encouragement: 'Wonderful English writing! ✍️🌟',
    points: 2.0
  }
];
