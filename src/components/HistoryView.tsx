'use client';

import React, { useState, useEffect } from 'react';
import { History, Award, CheckCircle2, XCircle, ArrowLeft, Calendar, FileText } from 'lucide-react';
import { QuizSession } from '@/types';
import { getSavedSessions } from '@/lib/storage';

export default function HistoryView() {
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<QuizSession | null>(null);

  useEffect(() => {
    const list = getSavedSessions().filter(s => s.status === 'completed');
    setSessions(list);
  }, []);

  if (selectedSession) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => setSelectedSession(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-purple-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách bài đã làm
        </button>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                {selectedSession.subject}
              </span>
              <h3 className="text-xl font-black text-slate-800 mt-1">{selectedSession.topic}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(selectedSession.created_at).toLocaleString('vi-VN')}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-center">
              <span className="text-xs font-semibold text-emerald-700 uppercase">Điểm Số Đạt Được</span>
              <h4 className="text-2xl font-black text-emerald-800">
                {selectedSession.total_score} / {selectedSession.max_score}
              </h4>
            </div>
          </div>

          {/* List of questions with student's answers */}
          <div className="mt-6 space-y-5">
            {selectedSession.questions.map((q, idx) => {
              const ans = selectedSession.answers[q.id];
              const isCorrect = ans?.is_correct;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Câu {idx + 1} ({q.points || 1.0} điểm)</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : !ans?.user_answer
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? 'Đúng' : !ans?.user_answer ? 'Bỏ trống' : 'Chưa chính xác'}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-800">{q.question}</p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <p className="text-slate-600">
                      <strong>Câu trả lời của em:</strong> {ans?.user_answer || '(Bỏ trống)'}
                    </p>
                    {ans?.ai_feedback && (
                      <p className="text-indigo-700">
                        <strong>AI Nhận xét:</strong> {ans.ai_feedback}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <span>📜 Bài Tập Đã Làm & Xem Lại</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Lịch sử các phiên luyện tập đã hoàn thành, điểm số và nhận xét chi tiết của AI.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-3xl mx-auto">
            📝
          </div>
          <h4 className="text-base font-bold text-slate-700">Chưa có bài tập nào được hoàn thành</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Hãy vào mục &quot;Luyện Tập & Đề Thi&quot; để làm bài, nộp bài và lưu lại kết quả tại đây nhé!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSession(s)}
              className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                    {s.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(s.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-purple-600 transition line-clamp-1">
                  {s.topic}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Số câu hỏi: {s.questions.length} câu | Trắc nghiệm: {s.mcq_correct || 0}/{s.mcq_total || 0}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Điểm: {s.total_score} / {s.max_score}
                </span>
                <span className="text-xs font-bold text-purple-600 group-hover:underline">
                  Xem chi tiết &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
