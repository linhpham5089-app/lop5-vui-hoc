'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  Lightbulb, 
  Loader2,
  Trophy
} from 'lucide-react';
import { Riddle } from '@/types';
import { getSavedRiddles, saveRiddles, completeQuest } from '@/lib/storage';

interface RiddlesViewProps {
  onRewardStars: (count: number) => void;
}

export default function RiddlesView({ onRewardStars }: RiddlesViewProps) {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [checkResults, setCheckResults] = useState<Record<number, { isCorrect: boolean; feedback: string }>>({});
  const [isChecking, setIsChecking] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setRiddles(getSavedRiddles());
  }, []);

  const categories = ['Tất cả', 'Đố mẹo', 'Đố chữ', 'Toán logic', 'Khoa học vui', 'Đố vui Tiếng Anh'];

  const filteredRiddles = activeCategory === 'Tất cả'
    ? riddles
    : riddles.filter(r => r.category === activeCategory);

  const handleCheck = async (r: Riddle) => {
    const input = (userInputs[r.id] || '').trim();
    if (!input) {
      alert('Em hãy nhập câu trả lời trước khi bấm kiểm tra nhé!');
      return;
    }

    setIsChecking(r.id);
    try {
      const res = await fetch('/api/riddle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'check',
          question: r.question,
          correctAnswer: r.answer,
          userAnswer: input,
          category: r.category
        })
      });

      const data = await res.json();
      setCheckResults(prev => ({
        ...prev,
        [r.id]: {
          isCorrect: data.isCorrect,
          feedback: data.feedback || (data.isCorrect ? 'Chính xác! Bé giỏi quá! 🎉' : 'Gần đúng rồi, bé thử lại xem sao nha!')
        }
      }));

      if (data.isCorrect) {
        // Trigger confetti
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        // Mark as solved
        if (!r.is_solved) {
          r.is_solved = true;
          saveRiddles([...riddles]);
          onRewardStars(1);
          completeQuest('q3'); // Complete riddle daily quest
        }
      }
    } catch (e) {
      console.error(e);
      // Fallback local check
      const isMatch = r.answer.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(r.answer.toLowerCase());
      setCheckResults(prev => ({
        ...prev,
        [r.id]: {
          isCorrect: isMatch,
          feedback: isMatch ? 'Chính xác! Bé thông minh quá! ⭐' : 'Chưa đúng rồi nè, bấm "Xem gợi ý" thử nha!'
        }
      }));
      if (isMatch && !r.is_solved) {
        r.is_solved = true;
        saveRiddles([...riddles]);
        onRewardStars(1);
      }
    } finally {
      setIsChecking(null);
    }
  };

  const handleGenerateNewRiddle = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/riddle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          category: activeCategory === 'Tất cả' ? 'Đố mẹo' : activeCategory
        })
      });

      const data = await res.json();
      if (data.riddle) {
        const newR: Riddle = {
          ...data.riddle,
          id: Date.now(),
          is_solved: false
        };
        const updated = [newR, ...riddles];
        setRiddles(updated);
        saveRiddles(updated);
        alert('AI đã sáng tác xong 1 câu đố mới toanh cho em nè! 🎉');
      }
    } catch (e) {
      console.error(e);
      alert('Chưa tạo được câu đố mới lúc này. Em hãy thử lại sau nha!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Thư Giãn & Kích Thích Não Bộ
          </div>
          <h2 className="text-2xl font-black text-slate-800">🎮 Góc Đố Vui Trí Tuệ</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Giải câu đố vui, rèn luyện tư duy logic và nhận thêm Ngôi Sao Trí Tuệ ⭐
          </p>
        </div>

        <button
          onClick={handleGenerateNewRiddle}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-200 flex items-center gap-2 transition transform active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
          <span>{isGenerating ? 'AI Đang Sáng Tác...' : '✨ AI Đố Câu Mới'}</span>
        </button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition
              ${activeCategory === cat
                ? 'bg-pink-600 text-white shadow-md shadow-pink-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Riddles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRiddles.map((r) => {
          const result = checkResults[r.id];
          const hasHint = showHints[r.id];
          const hasAnswer = showAnswers[r.id];

          return (
            <div
              key={r.id}
              className={`
                bg-white rounded-3xl p-5 border shadow-sm transition flex flex-col justify-between
                ${r.is_solved ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200/80'}
              `}
            >
              <div>
                {/* Badge Category & Solved Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {r.category}
                  </span>
                  {r.is_solved && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      Đã Giải +1 ⭐
                    </span>
                  )}
                </div>

                {/* Question */}
                <h4 className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed whitespace-pre-line mb-3">
                  {r.question}
                </h4>

                {/* Hint box */}
                {hasHint && (
                  <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Gợi ý:</strong> {r.hint}</span>
                  </div>
                )}

                {/* Full explanation when answer is revealed */}
                {hasAnswer && (
                  <div className="mb-3 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1">
                    <p><strong>Đáp án:</strong> {r.answer}</p>
                    <p className="text-indigo-800"><strong>Giải thích:</strong> {r.explanation}</p>
                  </div>
                )}
              </div>

              {/* Action / Input area */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nhập câu trả lời của bé..."
                    value={userInputs[r.id] || ''}
                    onChange={(e) => setUserInputs({ ...userInputs, [r.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheck(r);
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={() => handleCheck(r)}
                    disabled={isChecking === r.id}
                    className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-50 flex items-center gap-1"
                  >
                    {isChecking === r.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Kiểm Tra</span>
                  </button>
                </div>

                {/* Feedback message */}
                {result && (
                  <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    result.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {result.isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                    <span>{result.feedback}</span>
                  </div>
                )}

                {/* Bottom toggles: Hint & Answer */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => setShowHints({ ...showHints, [r.id]: !hasHint })}
                    className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{hasHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
                  </button>
                  <button
                    onClick={() => setShowAnswers({ ...showAnswers, [r.id]: !hasAnswer })}
                    className="text-slate-400 hover:text-slate-600 font-medium"
                  >
                    {hasAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
