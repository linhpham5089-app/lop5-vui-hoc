'use client';

import { QuizSession, UserStats, DailyQuest, Riddle, TutorMessage } from '@/types';
import { INITIAL_DAILY_QUESTS } from '@/data/curriculum';
import { SEED_RIDDLES } from '@/data/riddles';

const STORAGE_KEYS = {
  SESSIONS: 'lop5_quiz_sessions',
  STATS: 'lop5_user_stats',
  QUESTS: 'lop5_daily_quests',
  QUEST_DATE: 'lop5_quest_date',
  RIDDLES: 'lop5_riddles',
  TUTOR_CHAT: 'lop5_tutor_chat',
};

export function getSavedStats(): UserStats {
  if (typeof window === 'undefined') {
    return { totalStars: 10, completedQuizzes: 0, solvedRiddles: 0, studyStreakDays: 1, lastStudyDate: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { totalStars: 10, completedQuizzes: 0, solvedRiddles: 0, studyStreakDays: 1, lastStudyDate: '' };
}

export function saveStats(stats: UserStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {}
}

export function addStars(count: number): UserStats {
  const current = getSavedStats();
  const updated = { ...current, totalStars: current.totalStars + count };
  saveStats(updated);
  return updated;
}

export function getSavedSessions(): QuizSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

export function saveSessions(sessions: QuizSession[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (e) {}
}

export function upsertSession(session: QuizSession) {
  const sessions = getSavedSessions();
  const idx = sessions.findIndex(s => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  saveSessions(sessions);
}

export function getSavedQuests(): DailyQuest[] {
  if (typeof window === 'undefined') return INITIAL_DAILY_QUESTS;
  const today = new Date().toISOString().split('T')[0];
  const lastDate = localStorage.getItem(STORAGE_KEYS.QUEST_DATE);

  if (lastDate !== today) {
    localStorage.setItem(STORAGE_KEYS.QUEST_DATE, today);
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(INITIAL_DAILY_QUESTS));
    return INITIAL_DAILY_QUESTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_DAILY_QUESTS;
}

export function completeQuest(questId: string) {
  if (typeof window === 'undefined') return;
  const quests = getSavedQuests();
  const quest = quests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
    addStars(quest.points);
  }
}

export function getSavedRiddles(): Riddle[] {
  if (typeof window === 'undefined') return SEED_RIDDLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RIDDLES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return SEED_RIDDLES;
}

export function saveRiddles(riddles: Riddle[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.RIDDLES, JSON.stringify(riddles));
  } catch (e) {}
}

export function getSavedChat(): TutorMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TUTOR_CHAT);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [
    {
      id: 'init-msg',
      sender: 'tutor',
      text: 'Chào em yêu quý! Thầy là Cú Vàng Thông Thái 🦉. Hôm nay em có câu hỏi hay bài tập nào cần thầy đồng hành gợi mở cùng em không nè? ✨',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ];
}

export function saveChat(messages: TutorMessage[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.TUTOR_CHAT, JSON.stringify(messages));
  } catch (e) {}
}

// Export / Import Backup Data
export function exportAllData(): string {
  const data = {
    stats: getSavedStats(),
    sessions: getSavedSessions(),
    quests: getSavedQuests(),
    riddles: getSavedRiddles(),
    chat: getSavedChat(),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

export function importAllData(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.stats) saveStats(data.stats);
    if (data.sessions) saveSessions(data.sessions);
    if (data.quests && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(data.quests));
    }
    if (data.riddles) saveRiddles(data.riddles);
    if (data.chat) saveChat(data.chat);
    return true;
  } catch (e) {
    console.error('Import error:', e);
    return false;
  }
}
