'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Printer,
  Sparkles,
  Loader2,
  TrendingUp,
  Monitor,
  Edit3,
  Check
} from 'lucide-react';
import { QuizSession, StudentProfile, SubjectKey, UserStats } from '@/types';
import { SUBJECTS } from '@/data/curriculum';

interface ParentViewProps {
  profile: StudentProfile;
  sessions: QuizSession[];
  stats: UserStats;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export default function ParentView({
  profile,
  sessions,
  stats,
  onUpdateProfile
}: ParentViewProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);

  const [editingAlias, setEditingAlias] = useState(false);
  const [aliasDraft, setAliasDraft] = useState(profile.alias || '');

  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const completedSessions = sessions.filter(s => s.status === 'completed');

  // Compute per-subject average & blank penalty stats
  const subjectKeys: SubjectKey[] = ['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Tiếng Trung'];
  const subjectAverages = subjectKeys.map((sub) => {
    const list = completedSessions.filter(s => s.subject === sub);
    if (list.length === 0) return { subject: sub, count: 0, avgPct: null as number | null, avgScore: 0, avgMax: 0 };
    const totalPct = list.reduce((acc, s) => {
      const max = s.max_score || 1;
      const sc = s.total_score || 0;
      return acc + (sc / max) * 10;
    }, 0);
    const totalSc = list.reduce((acc, s) => acc + (s.total_score || 0), 0);
    const totalMx = list.reduce((acc, s) => acc + (s.max_score || 0), 0);
    return {
      subject: sub,
      count: list.length,
      avgPct: Math.round((totalPct / list.length) * 10) / 10,
      avgScore: Math.round((totalSc / list.length) * 10) / 10,
      avgMax: Math.round((totalMx / list.length) * 10) / 10,
    };
  });

  // Compute overall blank question ratio across latest submissions
  let totalQuestionsAttempted = 0;
  let totalBlankQuestions = 0;
  let totalPenaltyPoints = 0;

  completedSessions.forEach((s) => {
    const latestAttempt = s.attempts && s.attempts.length > 0
      ? s.attempts[s.attempts.length - 1]
      : null;

    if (latestAttempt) {
      totalQuestionsAttempted += latestAttempt.correctCount + latestAttempt.wrongCount + latestAttempt.blankCount;
      totalBlankQuestions += latestAttempt.blankCount;
      totalPenaltyPoints += latestAttempt.penaltyPoints;
    } else if (s.questions?.length) {
      totalQuestionsAttempted += s.questions.length;
      const blanks = s.questions.filter(q => !(s.answers?.[q.id]?.user_answer || '').trim()).length;
      totalBlankQuestions += blanks;
      totalPenaltyPoints += blanks * 0.5;
    }
  });

  const blankRatePct = totalQuestionsAttempted > 0
    ? Math.round((totalBlankQuestions / totalQuestionsAttempted) * 1000) / 10
    : 0;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === (profile.parentPin || '1234')) {
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Mã PIN chưa đúng (mặc định là 1234). Vui lòng thử lại!');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(newPin.trim())) {
      alert('Mã PIN mới phải gồm đúng 4 chữ số!');
      return;
    }
    onUpdateProfile({ ...profile, parentPin: newPin.trim() });
    setNewPin('');
    setShowPinChange(false);
    alert('Đã đổi mã PIN Góc Phụ Huynh thành công!');
  };

  const handleSaveAlias = () => {
    onUpdateProfile({ ...profile, alias: aliasDraft.trim() });
    setEditingAlias(false);
  };

  const handleGenerateAISummary = async () => {
    if (isGeneratingSummary) return;
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ai_summary',
          profile,
          summaryData: {
            completedCount: completedSessions.length,
            totalStars: stats.totalStars,
            blankRatePct,
            totalBlankQuestions,
            subjectAverages,
          },
        }),
      });
      const data = await res.json();
      setAiSummary(data.summary || 'Con đã có tinh thần luyện tập tốt. Phụ huynh hãy khuyến khích con hoàn thành đầy đủ các câu hỏi để tránh bị trừ điểm bỏ trống nhé!');
    } catch {
      setAiSummary('Chưa thể kết nối AI tổng hợp lúc này. Phụ huynh vui lòng thử lại sau ít giây nhé!');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Mã Hồ Sơ',
      'IP Truy Cập',
      'Tên Học Sinh',
      'Thời Gian',
      'Môn Học',
      'Chuyên Đề',
      'Điểm Lần 1',
      'Điểm Lần 2',
      'Điểm Lần 3',
      'Điểm Cuối',
      'Điểm Tối Đa',
      'Câu Bỏ Trống (Cuối)',
    ];

    const rows = completedSessions.map((s) => {
      const a1 = s.attempts?.find(a => a.attemptNumber === 1)?.totalScore ?? s.total_score ?? '';
      const a2 = s.attempts?.find(a => a.attemptNumber === 2)?.totalScore ?? '';
      const a3 = s.attempts?.find(a => a.attemptNumber === 3)?.totalScore ?? '';
      const last = s.attempts && s.attempts.length > 0 ? s.attempts[s.attempts.length - 1] : null;
      return [
        profile.profileCode,
        profile.ip,
        profile.alias || 'Chưa đặt tên',
        new Date(s.created_at).toLocaleString('vi-VN'),
        s.subject,
        `"${(s.topic || '').replace(/"/g, '""')}"`,
        a1,
        a2,
        a3,
        s.total_score ?? 0,
        s.max_score ?? 0,
        last ? last.blankCount : 0,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao_cao_hoc_tap_${profile.profileCode}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">👨‍👩‍👧 Góc Phụ Huynh</h2>
          <p className="text-xs text-slate-500 mt-1">
            Nhập mã PIN 4 số để xem báo cáo đánh giá riêng cho máy{' '}
            <span className="font-mono font-bold text-slate-700">{profile.profileCode}</span>
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            maxLength={4}
            inputMode="numeric"
            placeholder="Nhập mã PIN (mặc định: 1234)"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center text-lg font-black tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {pinError && <p className="text-xs font-bold text-rose-600">{pinError}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md shadow-rose-200 flex items-center justify-center gap-2 transition"
          >
            <Unlock className="w-4 h-4" />
            Mở Khóa Báo Cáo Phụ Huynh
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Báo Cáo Đánh Giá Riêng Cho Phụ Huynh
          </div>
          <h2 className="text-2xl font-black text-slate-800">👨‍👩‍👧 Góc Phụ Huynh & Bảng Điểm Chi Tiết</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi tiến bộ qua từng lần làm lại (Lần 1 → Lần 2 → Lần 3) và thói quen bỏ trống câu hỏi của con.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            onClick={() => setShowPinChange(!showPinChange)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            Đổi mã PIN
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất CSV / Excel
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            In Bảng Điểm
          </button>
        </div>
      </div>

      {/* Optional Change PIN form */}
      {showPinChange && (
        <form onSubmit={handleChangePin} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center gap-3 print:hidden">
          <span className="text-xs font-bold text-amber-900">Đặt mã PIN 4 số mới:</span>
          <input
            type="password"
            maxLength={4}
            inputMode="numeric"
            placeholder="4 chữ số"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-amber-300 text-sm font-bold w-32 bg-white"
          />
          <button type="submit" className="px-4 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700">
            Lưu PIN mới
          </button>
        </form>
      )}

      {/* Device & Student Identification Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <p className="text-[11px] font-bold uppercase text-slate-400">Mã Hồ Sơ Máy</p>
          <p className="text-sm font-black text-purple-700 font-mono mt-1 break-all">{profile.profileCode}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <p className="text-[11px] font-bold uppercase text-slate-400">Địa Chỉ IP Truy Cập</p>
          <p className="text-sm font-black text-slate-800 font-mono mt-1">{profile.ip}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <p className="text-[11px] font-bold uppercase text-slate-400">Device ID (Cố Định)</p>
          <p className="text-xs font-bold text-slate-600 font-mono mt-1 truncate" title={profile.deviceId}>
            {profile.deviceId}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80">
          <p className="text-[11px] font-bold uppercase text-purple-600">Tên Học Sinh / Tên Máy</p>
          {editingAlias ? (
            <div className="flex items-center gap-1.5 mt-1">
              <input
                type="text"
                value={aliasDraft}
                onChange={(e) => setAliasDraft(e.target.value)}
                placeholder="VD: Bé Bông - iPad"
                className="flex-1 px-2.5 py-1 rounded-lg border border-purple-300 text-xs font-bold bg-white"
              />
              <button onClick={handleSaveAlias} className="p-1.5 rounded-lg bg-purple-600 text-white">
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 mt-1">
              <p className="text-sm font-black text-purple-900 truncate">
                {profile.alias || 'Chưa đặt tên gợi nhớ'}
              </p>
              <button
                onClick={() => {
                  setAliasDraft(profile.alias || '');
                  setEditingAlias(true);
                }}
                className="p-1 text-purple-600 hover:bg-purple-100 rounded-lg"
                title="Đổi tên gợi nhớ"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overview Stats + Blank Rate + Subject Averages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold uppercase text-slate-400">Tổng Số Bài Đã Làm</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{completedSessions.length} bài</p>
          <p className="text-xs text-slate-500 mt-1">Tổng sao tích lũy: ⭐ {stats.totalStars}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold uppercase text-slate-400">Tỷ Lệ Câu Bỏ Trống (-0.5đ)</p>
          <p className={`text-3xl font-black mt-1 ${blankRatePct > 15 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {blankRatePct}%
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {totalBlankQuestions}/{totalQuestionsAttempted} câu bỏ trống (Trừ {Math.round(totalPenaltyPoints * 10) / 10}đ)
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Nhận Xét Tổng Hợp Từ AI</p>
            <p className="text-xs text-slate-500 mt-1">Đánh giá điểm mạnh, điểm yếu & thói quen làm bài</p>
          </div>
          <button
            onClick={handleGenerateAISummary}
            disabled={isGeneratingSummary || completedSessions.length === 0}
            className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 print:hidden"
          >
            {isGeneratingSummary ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-yellow-300" />}
            <span>{isGeneratingSummary ? 'AI Đang Tổng Hợp...' : '✨ AI Tổng Hợp Nhận Xét'}</span>
          </button>
        </div>
      </div>

      {aiSummary && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-5 text-sm text-indigo-950 space-y-1">
          <p className="font-extrabold text-indigo-800 flex items-center gap-2">
            <span>🦉 Nhận Xét Của Giáo Viên AI Dành Cho Phụ Huynh:</span>
          </p>
          <p className="leading-relaxed whitespace-pre-line">{aiSummary}</p>
        </div>
      )}

      {/* Subject Averages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjectAverages.map((item) => (
          <div key={item.subject} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg">{SUBJECTS[item.subject].icon}</span>
              <span className="text-[11px] font-bold text-slate-400">{item.count} bài</span>
            </div>
            <p className="font-bold text-sm text-slate-800 mt-1">{item.subject}</p>
            <p className="text-lg font-black text-purple-700 mt-0.5">
              {item.avgPct !== null ? `${item.avgPct} / 10` : 'Chưa có bài'}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Attempts Table (Attempt 1 -> 2 -> 3) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm overflow-x-auto">
        <h3 className="font-extrabold text-base text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span>Bảng Lịch Sử Điểm Ban Đầu & Sau Khi Sửa Câu Sai</span>
        </h3>

        {completedSessions.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">
            Máy này chưa có bài luyện tập nào hoàn thành. Hãy làm bài ở mục Luyện Tập để xem báo cáo tại đây!
          </p>
        ) : (
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                <th className="py-3 px-2">Thời gian</th>
                <th className="py-3 px-2">Môn / Chuyên đề</th>
                <th className="py-3 px-2 text-center">Điểm ban đầu</th>
                <th className="py-3 px-2 text-center">Sau sửa câu</th>
                <th className="py-3 px-2 text-center">Tiến bộ</th>
                <th className="py-3 px-2 text-center">Bỏ trống</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedSessions.map((s) => {
                const a1 = s.attempts?.find(a => a.attemptNumber === 1);
                const a2 = s.attempts?.find(a => a.attemptNumber === 2);
                const last = s.attempts && s.attempts.length > 0 ? s.attempts[s.attempts.length - 1] : null;
                const firstScore = a1 ? a1.totalScore : (s.total_score ?? 0);
                const lastScore = last ? last.totalScore : (s.total_score ?? 0);
                const delta = Math.round((lastScore - firstScore) * 10) / 10;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-2 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-purple-700 text-xs">{s.subject}</span>
                      <p className="text-xs text-slate-700 line-clamp-1">{s.topic}</p>
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {a1 ? `${a1.totalScore}/${a1.maxScore}` : `${s.total_score ?? 0}/${s.max_score ?? 0}`}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-emerald-700">
                      {a2 ? `${a2.totalScore}/${a2.maxScore}` : '—'}
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {delta > 0 ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+{delta}đ 📈</span>
                      ) : (
                        <span className="text-slate-400">0đ</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center text-xs">
                      {last ? (
                        <span className={last.blankCount > 0 ? 'font-bold text-amber-700' : 'text-slate-400'}>
                          {last.blankCount} câu {last.penaltyPoints > 0 ? `(-${last.penaltyPoints}đ)` : ''}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
