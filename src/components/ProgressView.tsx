'use client';

import React from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Sparkles, 
  Download, 
  Upload, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { UserStats, QuizSession } from '@/types';
import { exportAllData, importAllData } from '@/lib/storage';

interface ProgressViewProps {
  stats: UserStats;
  sessions: QuizSession[];
  onRefreshData: () => void;
}

export default function ProgressView({ stats, sessions, onRefreshData }: ProgressViewProps) {
  const completedCount = sessions.filter(s => s.status === 'completed').length;

  const badges = [
    { name: 'Khởi Đầu Nan', desc: 'Gia nhập Lớp 5 Vui Học', icon: '🌱', unlocked: true },
    { name: 'Thợ Săn Sao', desc: 'Tích lũy trên 15 Ngôi Sao', icon: '⭐', unlocked: stats.totalStars >= 15 },
    { name: 'Nhà Thông Thái', desc: 'Giải đúng ít nhất 5 câu đố vui', icon: '🧠', unlocked: stats.solvedRiddles >= 5 },
    { name: 'Kỳ Thủ Cambridge', desc: 'Hoàn thành bài luyện Flyers 4 kỹ năng', icon: '🇬🇧', unlocked: sessions.some(s => s.subject === 'Tiếng Anh') },
    { name: 'Cao Thủ Hán Ngữ', desc: 'Luyện tập Tiếng Trung YCT/HSK', icon: '🇨🇳', unlocked: sessions.some(s => s.subject === 'Tiếng Trung') },
    { name: 'Bậc Thầy Toán Học', desc: 'Đạt từ 8 điểm Toán trở lên', icon: '📐', unlocked: sessions.some(s => s.subject === 'Toán' && (s.total_score || 0) >= 8) },
  ];

  const handleExport = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lop5_vui_hoc_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAllData(content)) {
        alert('Khôi phục dữ liệu học tập thành công! 🎉');
        onRefreshData();
      } else {
        alert('Tệp dữ liệu không hợp lệ. Vui lòng kiểm tra lại!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center text-5xl shadow-lg shadow-purple-200 shrink-0">
          👧
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            ⭐ Học Sinh Tiêu Biểu Lớp 5
          </div>
          <h2 className="text-2xl font-black text-slate-800">Bảng Vinh Danh Học Tập</h2>
          <p className="text-slate-500 text-sm mt-1">
            Tổng cộng đã làm <strong>{completedCount} bài luyện tập</strong> và giải được <strong>{stats.solvedRiddles} câu đố trí tuệ</strong>.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="badge-star text-sm">⭐ {stats.totalStars} Sao Trí Tuệ</span>
            <span className="px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-bold text-xs flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              Chuỗi {stats.studyStreakDays} Ngày Liên Tiếp
            </span>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-800 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Bộ Sưu Tập Huy Hiệu Vinh Danh</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`
                p-4 rounded-2xl border text-center transition flex flex-col items-center justify-between
                ${b.unlocked 
                  ? 'bg-amber-50/50 border-amber-200 text-slate-800' 
                  : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'}
              `}
            >
              <div className="text-4xl mb-2">{b.icon}</div>
              <h4 className="font-extrabold text-sm mb-1">{b.name}</h4>
              <p className="text-xs text-slate-500">{b.desc}</p>
              <div className="mt-3">
                {b.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Đã Mở Khóa
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">Chưa Đạt</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Persistence & Backup Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200/70 shadow-sm">
        <h3 className="font-extrabold text-lg text-blue-900 mb-2 flex items-center gap-2">
          <span>💾 Đồng Bộ & Sao Lưu Dữ Liệu An Toàn</span>
        </h3>
        <p className="text-xs sm:text-sm text-blue-800/80 leading-relaxed max-w-2xl">
          Khi ứng dụng chạy trên Vercel, toàn bộ tiến độ, điểm sao và lịch sử bài làm được lưu trực tiếp trên trình duyệt của bạn (localStorage). Bạn có thể sao lưu tệp JSON về máy hoặc nhập lại khi đổi thiết bị.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-200 flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Tải Xuống File Sao Lưu (.json)
          </button>
          <label className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer transition">
            <Upload className="w-4 h-4 text-emerald-600" />
            Khôi Phục Từ File (.json)
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
