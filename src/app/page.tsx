'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import Sidebar, { NavItem } from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import PracticeView from '@/components/PracticeView';
import TutorView from '@/components/TutorView';
import RiddlesView from '@/components/RiddlesView';
import HistoryView from '@/components/HistoryView';
import ProgressView from '@/components/ProgressView';
import { UserStats, DailyQuest, SubjectKey, QuizSession } from '@/types';
import { getSavedStats, getSavedQuests, completeQuest, getSavedSessions, addStars } from '@/lib/storage';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<NavItem>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    totalStars: 10,
    completedQuizzes: 0,
    solvedRiddles: 0,
    studyStreakDays: 1,
    lastStudyDate: ''
  });
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [selectedPracticeSubject, setSelectedPracticeSubject] = useState<SubjectKey>('Toán');

  const refreshAll = () => {
    setStats(getSavedStats());
    setQuests(getSavedQuests());
    setSessions(getSavedSessions());
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleToggleQuest = (id: string) => {
    completeQuest(id);
    refreshAll();
  };

  const handleRewardStars = (count: number) => {
    addStars(count);
    refreshAll();
  };

  const handleStartSubject = (subject: SubjectKey) => {
    setSelectedPracticeSubject(subject);
    setCurrentTab('practice');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stats={stats}
        onRefreshData={refreshAll}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Mobile Top App Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Mở thanh menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎒</span>
              <span className="font-extrabold text-sm text-slate-800">LỚP 5 VUI HỌC</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-amber-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>⭐ {stats.totalStars}</span>
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              quests={quests}
              onToggleQuest={handleToggleQuest}
              onStartSubject={handleStartSubject}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'practice' && (
            <PracticeView
              initialSubject={selectedPracticeSubject}
              onRewardStars={handleRewardStars}
              onSessionFinished={refreshAll}
            />
          )}

          {currentTab === 'tutor' && <TutorView />}

          {currentTab === 'riddles' && (
            <RiddlesView onRewardStars={handleRewardStars} />
          )}

          {currentTab === 'history' && <HistoryView />}

          {currentTab === 'progress' && (
            <ProgressView
              stats={stats}
              sessions={sessions}
              onRefreshData={refreshAll}
            />
          )}
        </main>
      </div>
    </div>
  );
}
