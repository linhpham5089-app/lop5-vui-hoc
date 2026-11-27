'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Sparkles, Monitor, Edit3, Check } from 'lucide-react';
import Sidebar, { NavItem } from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import PracticeView from '@/components/PracticeView';
import TutorView from '@/components/TutorView';
import RiddlesView from '@/components/RiddlesView';
import HistoryView from '@/components/HistoryView';
import ProgressView from '@/components/ProgressView';
import ParentView from '@/components/ParentView';
import { UserStats, DailyQuest, SubjectKey, QuizSession, StudentProfile } from '@/types';
import {
  getSavedStats,
  getSavedQuests,
  completeQuest,
  getSavedSessions,
  addStars,
  getOrCreateDeviceId,
  getSavedProfile,
  saveProfile,
  syncProgressToServer
} from '@/lib/storage';

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
  const [profile, setProfile] = useState<StudentProfile>({
    profileCode: 'HS-...',
    ip: '127.0.0.1',
    deviceId: '',
    alias: '',
    parentPin: '1234',
    updatedAt: '',
  });
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [aliasInput, setAliasInput] = useState('');

  const refreshAll = () => {
    setStats(getSavedStats());
    setQuests(getSavedQuests());
    setSessions(getSavedSessions());
    setProfile(getSavedProfile());
  };

  useEffect(() => {
    refreshAll();
    // Auto-identify student machine by IP + localStorage deviceId (zero login)
    const deviceId = getOrCreateDeviceId();
    fetch(`/api/identify?deviceId=${encodeURIComponent(deviceId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.profileCode) {
          const current = getSavedProfile();
          const updated: StudentProfile = {
            ...current,
            ip: data.ip || current.ip,
            deviceId,
            profileCode: data.profileCode,
          };
          saveProfile(updated);
          setProfile(updated);
          syncProgressToServer(updated);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateProfile = (updated: StudentProfile) => {
    saveProfile(updated);
    setProfile(updated);
    syncProgressToServer(updated);
  };

  const handleSaveTopAlias = () => {
    handleUpdateProfile({ ...profile, alias: aliasInput.trim() });
    setIsEditingAlias(false);
  };

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

        {/* Top Auto-Identified Student Machine Bar (No Login Required) */}
        <div className="px-4 sm:px-6 lg:px-8 pt-3 flex flex-wrap items-center justify-end gap-2 print:hidden">
          <div className="inline-flex flex-wrap items-center gap-2 bg-white border border-slate-200/90 shadow-sm rounded-full px-3.5 py-1.5 text-xs">
            <Monitor className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-slate-500 font-medium">Máy học sinh:</span>
            <span className="font-mono font-extrabold text-purple-700">{profile.profileCode}</span>

            {isEditingAlias ? (
              <span className="inline-flex items-center gap-1 ml-1">
                <input
                  type="text"
                  value={aliasInput}
                  onChange={(e) => setAliasInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSaveTopAlias(); }}
                  placeholder="Tên gợi nhớ..."
                  className="px-2 py-0.5 rounded-lg border border-purple-300 text-xs font-semibold w-32 focus:outline-none"
                />
                <button
                  onClick={handleSaveTopAlias}
                  className="p-1 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                  title="Lưu tên"
                >
                  <Check className="w-3 h-3" />
                </button>
              </span>
            ) : (
              <button
                onClick={() => {
                  setAliasInput(profile.alias || '');
                  setIsEditingAlias(true);
                }}
                className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold transition"
                title="Đặt tên gợi nhớ cho máy này"
              >
                <span>{profile.alias || 'Đặt tên máy'}</span>
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

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

          {currentTab === 'parent' && (
            <ParentView
              profile={profile}
              sessions={sessions}
              stats={stats}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
}
