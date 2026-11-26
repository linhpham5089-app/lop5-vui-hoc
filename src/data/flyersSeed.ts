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
  }
];
