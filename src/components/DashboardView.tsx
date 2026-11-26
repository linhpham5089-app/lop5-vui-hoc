'use client';

import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Award, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { UserStats, DailyQuest, SubjectKey } from '@/types';
import { SUBJECTS } from '@/data/curriculum';
import { NavItem } from './Sidebar';

interface DashboardViewProps {
  stats: UserStats;
  quests: DailyQuest[];
  onToggleQuest: (id: string) => void;
  onStartSubject: (subject: SubjectKey) => void;
  onNavigate: (tab: NavItem) => void;
}

export default function DashboardView({
  stats,
  quests,
  onToggleQuest,
  onStartSubject,
  onNavigate
}: DashboardViewProps) {
  const subjectList: SubjectKey[] = ['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Tiếng Trung'];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6 sm:p-8 shadow-xl shadow-purple-500/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Nền Tảng Học Tập Chuẩn Lớp 5
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Chào mừng bạn đến với Lớp 5 Vui Học! 🎒✨
          </h2>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
            Luyện trọn bộ 4 kỹ năng Tiếng Anh Flyers & Tiếng Trung, chinh phục 10 bài Toán chuẩn thang 10 và đồng hành cùng Gia sư Cú Vàng AI thông thái.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('practice')}
              className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-purple-50 transition transform active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              Luyện Tập Ngay
            </button>
            <button
              onClick={() => onNavigate('riddles')}
              className="inline-flex items-center gap-2 bg-purple-500/30 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-500/40 transition"
            >
              🎮 Đố Vui Trí Tuệ
            </button>
          </div>
        </div>

        {/* Decorative graphic background */}
        <div className="absolute right-4 -bottom-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          🦉
        </div>
      </div>

      {/* Highlights / Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Ngôi Sao</p>
            <h4 className="text-xl font-black text-slate-800">{stats.totalStars}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
            📝
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Bài Đã Làm</p>
            <h4 className="text-xl font-black text-slate-800">{stats.completedQuizzes}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-2xl">
            🎯
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Câu Đố Đã Giải</p>
            <h4 className="text-xl font-black text-slate-800">{stats.solvedRiddles}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl">
            🔥
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Ngày Chăm Chỉ</p>
            <h4 className="text-xl font-black text-slate-800">{stats.studyStreakDays} Ngày</h4>
          </div>
        </div>
      </div>

      {/* 4 Core Subjects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
            <span>📚 Các Môn Học Trọng Tâm</span>
          </h3>
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Chuẩn Lớp 5 & Quốc Tế
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectList.map((subKey) => {
            const conf = SUBJECTS[subKey];
            return (
              <div
                key={subKey}
                onClick={() => {
                  onStartSubject(subKey);
                  onNavigate('practice');
                }}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-inner" style={{ backgroundColor: conf.bgColor }}>
                    {conf.icon}
                  </div>
                  <h4 className="font-black text-slate-800 text-base group-hover:text-purple-600 transition">
                    {subKey}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {subKey === 'Tiếng Anh' && 'Luyện trọn bộ 4 kỹ năng Flyers & 5 dạng bài ngữ pháp'}
                    {subKey === 'Tiếng Trung' && 'YCT 1-3 & HSK 1-2: Nghe, Nói, Đọc, Viết có Pinyin'}
                    {subKey === 'Toán' && '10 bài toán chuẩn thang điểm 10, phân số, tỉ số %, hình học'}
                    {subKey === 'Tiếng Việt' && 'Luyện từ và câu, tập làm văn tả người, tả cảnh'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-purple-600">
                  <span>Bắt đầu ngay</span>
                  <ChevronRight className="w-4 h-4 transition transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Quests */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-800">Nhiệm Vụ Học Tập Hôm Nay</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Hoàn thành để nhận thêm sao ⭐</span>
        </div>

        <div className="space-y-2.5">
          {quests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => onToggleQuest(quest.id)}
              className={`
                flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition
                ${quest.completed 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' 
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-700'}
              `}
            >
              <div className="flex items-center gap-3">
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span className={`text-sm font-semibold ${quest.completed ? 'line-through opacity-75' : ''}`}>
                  {quest.icon} {quest.title}
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-md bg-amber-100 text-amber-800 shrink-0">
                +{quest.points} ⭐
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
