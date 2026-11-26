export type SubjectKey = 'Toán' | 'Tiếng Việt' | 'Tiếng Anh' | 'Tiếng Trung';

export interface SubjectConfig {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  topics: string[];
}

export type QuestionType = 'mcq' | 'essay' | 'speaking';
export type SkillType = 'listening' | 'speaking' | 'reading' | 'writing' | 'general';

export interface Question {
  id: string | number;
  subject: SubjectKey;
  topic: string;
  type: QuestionType;
  skill?: SkillType;
  question: string;
  options?: string[];
  correct_answer?: string;
  explanation: string;
  grammar_clue?: string;
  encouragement?: string;
  points?: number;
  // Cho 4 kỹ năng:
  audio_text?: string;
  audio_prompt?: string;
  phonetics_guide?: string;
  pinyin?: string;
  vietnamese_meaning?: string;
  guide?: string;
}

export interface SessionAnswer {
  user_answer: string;
  is_correct?: boolean;
  score?: number;
  max_score?: number;
  ai_feedback?: string;
  reviewed?: boolean;
}

export interface QuizSession {
  id: string;
  created_at: string;
  subject: SubjectKey;
  topic: string;
  status: 'in_progress' | 'completed';
  questions: Question[];
  answers: Record<string | number, SessionAnswer>;
  total_score?: number;
  max_score?: number;
  mcq_correct?: number;
  mcq_total?: number;
  ai_summary?: string;
}

export interface Riddle {
  id: number;
  category: string;
  question: string;
  hint: string;
  answer: string;
  explanation: string;
  is_solved?: boolean;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  subject: SubjectKey;
  points: number;
  completed: boolean;
  icon: string;
}

export interface UserStats {
  totalStars: number;
  completedQuizzes: number;
  solvedRiddles: number;
  studyStreakDays: number;
  lastStudyDate: string;
}
