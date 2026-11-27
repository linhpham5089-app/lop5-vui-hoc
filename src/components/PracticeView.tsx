'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Volume2, 
  Mic, 
  MicOff, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Send,
  Loader2,
  Award,
  Lightbulb
} from 'lucide-react';
import { Question, SubjectKey, QuizSession, SessionAnswer } from '@/types';
import { SUBJECTS } from '@/data/curriculum';
import { FOUR_SKILLS_QUESTIONS } from '@/data/fourSkillsSeed';
import { MATH_SEED_QUESTIONS } from '@/data/mathSeed';
import { FLYERS_SEED_QUESTIONS } from '@/data/flyersSeed';
import { VIETNAMESE_SEED_QUESTIONS } from '@/data/vietnameseSeed';
import { speakText, startSpeechRecognition } from '@/lib/speech';
import { upsertSession } from '@/lib/storage';

interface PracticeViewProps {
  initialSubject?: SubjectKey;
  onRewardStars: (stars: number) => void;
  onSessionFinished: () => void;
}

const UNANSWERED_PENALTY = 0.5;

interface QuizSummaryStats {
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  penaltyPoints: number;
  totalScore: number;
  maxScore: number;
}

export default function PracticeView({
  initialSubject = 'Toán',
  onRewardStars,
  onSessionFinished
}: PracticeViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>(initialSubject);
  const [selectedTopic, setSelectedTopic] = useState<string>(SUBJECTS[initialSubject].topics[0]);
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string | number, string>>({});
  const [showPinyin, setShowPinyin] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<string | number | null>(null);
  const [speechRecStop, setSpeechRecStop] = useState<(() => void) | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [isGeneratingExam, setIsGeneratingExam] = useState<boolean>(false);
  const [aiFeedbacks, setAiFeedbacks] = useState<Record<string | number, any>>({});
  const [aiHints, setAiHints] = useState<Record<string | number, string>>({});
  const [hintLoadingId, setHintLoadingId] = useState<string | number | null>(null);
  const [summaryStats, setSummaryStats] = useState<QuizSummaryStats | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setSelectedTopic(SUBJECTS[selectedSubject].topics[0]);
  }, [selectedSubject]);

  // Load or generate questions for the topic
  const startQuiz = async () => {
    setIsSubmitted(false);
    setUserAnswers({});
    setAiFeedbacks({});
    setAiHints({});
    setSummaryStats(null);
    setAiHints({});
    setSummaryStats(null);

    let questions: Question[] = [];

    // Route questions by subject & topic
    if (selectedTopic.includes('4 Kỹ Năng')) {
      questions = FOUR_SKILLS_QUESTIONS.filter(q => q.subject === selectedSubject);
    } else if (selectedSubject === 'Toán') {
      // Filter by topic keyword matching
      const topicLower = selectedTopic.toLowerCase();
      const topicFiltered = MATH_SEED_QUESTIONS.filter(q => {
        const qTopicLower = q.topic.toLowerCase();
        if (topicLower.includes('phân số'))    return qTopicLower.includes('phân số');
        if (topicLower.includes('thập phân'))  return qTopicLower.includes('thập phân');
        if (topicLower.includes('phần trăm'))  return qTopicLower.includes('phần trăm');
        if (topicLower.includes('hình học'))   return qTopicLower.includes('hình học');
        if (topicLower.includes('chuyển động')) return qTopicLower.includes('chuyển động');
        if (topicLower.includes('tỉ số'))      return qTopicLower.includes('tỉ số');
        return true; // "Đề kiểm tra chuẩn" or unrecognised → all questions
      });
      questions = topicFiltered.length >= 3 ? topicFiltered : MATH_SEED_QUESTIONS;
    } else if (selectedSubject === 'Tiếng Anh') {
      if (selectedTopic.includes('Flyers') || selectedTopic.includes('[Cambridge')) {
        questions = FLYERS_SEED_QUESTIONS.filter(q => q.subject === 'Tiếng Anh');
        if (questions.length === 0) questions = FLYERS_SEED_QUESTIONS;
      } else {
        questions = FOUR_SKILLS_QUESTIONS.filter(q => q.subject === 'Tiếng Anh');
      }
    } else if (selectedSubject === 'Tiếng Việt') {
      // Try to narrow down by sub-topic keyword, then fall back to all Vietnamese Qs
      const topicKeyword = selectedTopic.split(':').pop()?.trim().toLowerCase() ?? '';
      const filtered = VIETNAMESE_SEED_QUESTIONS.filter(q =>
        topicKeyword.length > 2
          ? q.topic.toLowerCase().includes(topicKeyword)
          : true
      );
      questions = filtered.length > 0 ? filtered : VIETNAMESE_SEED_QUESTIONS;
    } else if (selectedSubject === 'Tiếng Trung') {
      questions = FOUR_SKILLS_QUESTIONS.filter(q => q.subject === 'Tiếng Trung');
    }

    // Final safe fallback — always Vietnamese, never empty English dump
    if (questions.length === 0) {
      questions = VIETNAMESE_SEED_QUESTIONS;
    }

    const newSession: QuizSession = {
      id: `session_${Date.now()}`,
      created_at: new Date().toISOString(),
      subject: selectedSubject,
      topic: selectedTopic,
      status: 'in_progress',
      questions,
      answers: {}
    };

    setCurrentSession(newSession);
    upsertSession(newSession);
  };

  // Generate fresh exam questions on-demand via Gemini API
  const handleGenerateAIExam = async () => {
    if (isGeneratingExam) return;
    setIsGeneratingExam(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setAiFeedbacks({});
    setAiHints({});
    setSummaryStats(null);

    try {
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          topic: selectedTopic,
          count: 5
        })
      });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`Server trả về mã ${res.status}`);
      }
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error(data.error || 'Không nhận được bộ đề từ AI');
      }

      const generatedQuestions: Question[] = data.questions.map((q: Question, idx: number) => ({
        ...q,
        id: `ai_${Date.now()}_${idx}`,
        subject: selectedSubject,
        topic: selectedTopic,
        points: q.points || 1.0
      }));

      const newSession: QuizSession = {
        id: `session_${Date.now()}`,
        created_at: new Date().toISOString(),
        subject: selectedSubject,
        topic: `${selectedTopic} (AI Tạo Mới)`,
        status: 'in_progress',
        questions: generatedQuestions,
        answers: {}
      };

      setCurrentSession(newSession);
      upsertSession(newSession);
    } catch (err) {
      console.error(err);
      alert('Chưa thể tạo đề mới bằng AI lúc này. Em hãy thử lại sau vài giây hoặc bấm "Bắt Đầu Làm Bài" với kho đề có sẵn nhé!');
    } finally {
      setIsGeneratingExam(false);
    }
  };

  const handleSelectOption = (qId: string | number, optLetter: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optLetter }));
  };

  const handleTextAnswer = (qId: string | number, text: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: text }));
  };

  // Text-to-speech for listening and sample prompt
  const handlePlayAudio = (text: string, subject: SubjectKey) => {
    const lang = subject === 'Tiếng Trung' ? 'zh' : subject === 'Tiếng Anh' ? 'en' : 'vi';
    speakText(text, lang);
  };

  // Toggle voice recording for speaking exercise
  const handleToggleRecord = (qId: string | number, subject: SubjectKey) => {
    if (isRecording === qId) {
      if (speechRecStop) speechRecStop();
      setIsRecording(null);
      setSpeechRecStop(null);
      return;
    }

    const lang = subject === 'Tiếng Trung' ? 'zh' : subject === 'Tiếng Anh' ? 'en' : 'vi';
    const rec = startSpeechRecognition(
      lang,
      (transcript) => {
        setUserAnswers(prev => ({ ...prev, [qId]: transcript }));
        setIsRecording(null);
      },
      () => {
        setIsRecording(null);
      }
    );

    if (rec) {
      setIsRecording(qId);
      setSpeechRecStop(() => rec.stop);
    }
  };

  // Grade an essay/writing or speaking with AI route
  const handleGradeWithAI = async (q: Question) => {
    const answer = userAnswers[q.id];
    if (!answer) {
      alert('Vui lòng làm bài hoặc nói câu trả lời trước khi bấm chấm nhé!');
      return;
    }

    setIsGrading(true);
    try {
      if (q.type === 'speaking') {
        const res = await fetch('/api/grade-speaking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            expectedText: q.audio_prompt || q.correct_answer,
            studentSpeech: answer,
            phoneticsGuide: q.phonetics_guide,
            subject: q.subject
          })
        });
        const data = await res.json();
        setAiFeedbacks(prev => ({ ...prev, [q.id]: data }));
      } else {
        const res = await fetch('/api/grade-essay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q.question,
            userAnswer: answer,
            correctAnswer: q.correct_answer,
            guide: q.guide,
            maxScore: q.points || 2.5
          })
        });
        const data = await res.json();
        setAiFeedbacks(prev => ({ ...prev, [q.id]: data }));
      }
    } catch (err) {
      console.error(err);
      alert('Chưa thể kết nối tới AI để chấm lúc này.');
    } finally {
      setIsGrading(false);
    }
  };

  // Ask AI for a Socratic hint without revealing the final answer
  const handleHintWithAI = async (q: Question) => {
    if (hintLoadingId === q.id) return;
    setHintLoadingId(q.id);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Môn ${q.subject} - Lớp 5. Đề bài: "${q.question}". Hãy gợi ý ngắn gọn (2-3 câu) hướng tư duy hoặc công thức để em tự làm được bài này, TUYỆT ĐỐI KHÔNG tiết lộ đáp án cuối cùng hay chữ cái đáp án đúng.`
        })
      });
      const data = await res.json();
      setAiHints(prev => ({
        ...prev,
        [q.id]: data.reply || 'Em hãy đọc kỹ đề bài, xác định các dữ kiện đã cho và thử từng bước một nhé!'
      }));
    } catch (err) {
      console.error(err);
      alert('Chưa thể kết nối tới AI để lấy gợi ý lúc này.');
    } finally {
      setHintLoadingId(null);
    }
  };

  // Submit and calculate final score (with penalty for unanswered questions)
  const handleSubmitQuiz = () => {
    if (!currentSession) return;

    let rawScore = 0;
    let maxScore = 0;
    let mcqCorrect = 0;
    let mcqTotal = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let blankCount = 0;
    const sessionAnswers: Record<string | number, SessionAnswer> = {};

    currentSession.questions.forEach((q) => {
      const uAns = (userAnswers[q.id] || '').trim();
      const isBlank = uAns.length === 0;
      const p = q.points || 1.0;
      maxScore += p;

      if (q.type === 'mcq') {
        mcqTotal += 1;
      }

      if (isBlank) {
        blankCount += 1;
        rawScore -= UNANSWERED_PENALTY;
        sessionAnswers[q.id] = {
          user_answer: '',
          is_correct: false,
          score: -UNANSWERED_PENALTY,
          max_score: p
        };
      } else if (q.type === 'mcq') {
        const isCorrect = uAns.toUpperCase() === (q.correct_answer || '').trim().toUpperCase();
        if (isCorrect) {
          mcqCorrect += 1;
          correctCount += 1;
          rawScore += p;
        } else {
          wrongCount += 1;
        }
        sessionAnswers[q.id] = {
          user_answer: uAns,
          is_correct: isCorrect,
          score: isCorrect ? p : 0,
          max_score: p
        };
      } else {
        const fb = aiFeedbacks[q.id];
        const essayScore = fb?.score !== undefined ? Number(fb.score) : (uAns.length > 5 ? p * 0.8 : 0);
        const isCorrect = essayScore >= p * 0.5;
        if (isCorrect) {
          correctCount += 1;
        } else {
          wrongCount += 1;
        }
        rawScore += essayScore;
        sessionAnswers[q.id] = {
          user_answer: uAns,
          is_correct: isCorrect,
          score: essayScore,
          max_score: p,
          ai_feedback: fb?.feedback || fb?.phoneticsAdvice || ''
        };
      }
    });

    const finalScore = Math.max(0, Math.round(rawScore * 10) / 10);
    const roundedMax = Math.round(maxScore * 10) / 10;
    const penaltyPoints = Math.round(blankCount * UNANSWERED_PENALTY * 10) / 10;

    setSummaryStats({
      correctCount,
      wrongCount,
      blankCount,
      penaltyPoints,
      totalScore: finalScore,
      maxScore: roundedMax
    });

    const updatedSession: QuizSession = {
      ...currentSession,
      status: 'completed',
      answers: sessionAnswers,
      total_score: finalScore,
      max_score: roundedMax,
      mcq_correct: mcqCorrect,
      mcq_total: mcqTotal,
      ai_summary: `Hoàn thành ${currentSession.subject}: ${finalScore}/${roundedMax} điểm (Đúng: ${correctCount}, Sai: ${wrongCount}, Bỏ trống: ${blankCount}).`
    };

    setCurrentSession(updatedSession);
    upsertSession(updatedSession);
    setIsSubmitted(true);

    // Reward stars & trigger confetti
    const earnedStars = Math.max(1, Math.round(finalScore / 2));
    onRewardStars(earnedStars);
    onSessionFinished();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Subject & Topic Selectors */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-800 mb-4 flex items-center gap-2">
          <span>🎯 Chọn Môn Học & Chủ Đề Luyện Tập</span>
        </h3>

        {/* 4 Subjects Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {(['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Tiếng Trung'] as SubjectKey[]).map((subKey) => {
            const conf = SUBJECTS[subKey];
            const isSelected = selectedSubject === subKey;
            return (
              <button
                key={subKey}
                onClick={() => {
                  setSelectedSubject(subKey);
                  setCurrentSession(null);
                }}
                className={`
                  flex items-center gap-3 p-3.5 rounded-2xl border font-bold text-sm transition-all text-left
                  ${isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-600/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}
                `}
              >
                <span className="text-2xl">{conf.icon}</span>
                <span>{subKey}</span>
              </button>
            );
          })}
        </div>

        {/* Topic dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Chuyên Đề Trọng Tâm:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentSession(null);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {SUBJECTS[selectedSubject].topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="sm:self-end flex flex-col sm:flex-row gap-2">
            <button
              onClick={startQuiz}
              disabled={isGeneratingExam}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-purple-200 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Bắt Đầu Làm Bài
            </button>
            <button
              onClick={handleGenerateAIExam}
              disabled={isGeneratingExam}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-indigo-200 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isGeneratingExam ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tạo đề...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>✨ AI Tạo Đề Mới Theo Chủ Đề</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Session Content */}
      {currentSession && (
        <div className="space-y-6">
          {/* Header of the exam */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wide">
                {currentSession.subject}
              </span>
              <h4 className="text-lg font-black text-slate-800 mt-1">{currentSession.topic}</h4>
            </div>

            {/* Chinese Pinyin toggle button */}
            {selectedSubject === 'Tiếng Trung' && (
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition"
              >
                {showPinyin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPinyin ? 'Ẩn Phiên Âm Pinyin' : 'Hiện Phiên Âm Pinyin'}
              </button>
            )}
          </div>

          {/* Score Summary Banner after Submit */}
          {isSubmitted && summaryStats && (
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    📊 Bảng Tổng Kết Điểm
                  </span>
                  <h4 className="text-2xl font-black text-slate-800 mt-0.5">
                    Tổng điểm: <span className="text-purple-700">{summaryStats.totalScore}</span> / {summaryStats.maxScore} điểm
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Quy tắc chấm: Đúng cộng điểm • Sai 0 điểm • Bỏ trống trừ {UNANSWERED_PENALTY} điểm/câu (tối thiểu 0 điểm)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-xs font-bold text-emerald-700">✅ Làm Đúng</p>
                  <p className="text-xl font-black text-emerald-800 mt-0.5">{summaryStats.correctCount} câu</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                  <p className="text-xs font-bold text-rose-700">❌ Làm Sai (0đ)</p>
                  <p className="text-xl font-black text-rose-800 mt-0.5">{summaryStats.wrongCount} câu</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <p className="text-xs font-bold text-amber-700">⚠️ Bỏ Trống</p>
                  <p className="text-xl font-black text-amber-800 mt-0.5">
                    {summaryStats.blankCount} câu {summaryStats.penaltyPoints > 0 ? `(-${summaryStats.penaltyPoints}đ)` : ''}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* List of Questions */}
          <div className="space-y-5">
            {currentSession.questions.map((q, idx) => {
              const uAns = userAnswers[q.id] || '';
              const fb = aiFeedbacks[q.id];
              const hintText = aiHints[q.id];
              const ansRecord = currentSession.answers?.[q.id];
              const isBlank = uAns.trim().length === 0;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:border-slate-300 transition"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {q.skill && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                          Kỹ năng: {q.skill === 'listening' ? '🎧 Nghe' : q.skill === 'speaking' ? '🎙️ Nói' : q.skill === 'reading' ? '📖 Đọc' : '✍️ Viết'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      Điểm: {q.points || 1.0} điểm
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <p className="text-slate-800 font-semibold text-base whitespace-pre-line mb-3">
                    {q.question}
                  </p>

                  {/* Listening Audio Player */}
                  {q.audio_text && (
                    <div className="my-3 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handlePlayAudio(q.audio_text!, q.subject)}
                          className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <span className="text-xs font-bold text-indigo-900">
                          Bấm nút loa để nghe đoạn hội thoại mẫu (Audio Player)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Chinese Pinyin display (if active) */}
                  {q.pinyin && showPinyin && (
                    <div className="my-2 p-3 rounded-xl bg-red-50/60 border border-red-100 text-xs font-mono text-red-700">
                      <span className="font-bold">Pinyin:</span> {q.pinyin}
                    </div>
                  )}

                  {/* Vietnamese meaning helper */}
                  {q.vietnamese_meaning && (
                    <div className="mb-3 text-xs italic text-slate-500">
                      💡 Nghĩa: {q.vietnamese_meaning}
                    </div>
                  )}

                  {/* TYPE: MCQ Options */}
                  {q.type === 'mcq' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {q.options.map((opt) => {
                        const letter = opt.trim().substring(0, 1).toUpperCase();
                        const isChosen = uAns === letter;
                        const isCorrectAnswer = q.correct_answer === letter;

                        let optClasses = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                        if (isSubmitted) {
                          if (isChosen && isCorrectAnswer) {
                            optClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                          } else if (isChosen && !isCorrectAnswer) {
                            optClasses = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20';
                          } else {
                            optClasses = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-75';
                          }
                        } else if (isChosen) {
                          optClasses = 'border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-600/20';
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, letter)}
                            className={`p-3 rounded-xl border text-left text-sm transition font-medium flex items-center gap-2.5 ${optClasses}`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-slate-200/70 font-bold text-xs flex items-center justify-center shrink-0">
                              {letter}
                            </span>
                            <span>{opt.substring(2).trim()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE: Speaking with Voice Recorder */}
                  {q.type === 'speaking' && (
                    <div className="space-y-3 mt-3">
                      {q.audio_prompt && (
                        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-bold text-sm flex items-center justify-between">
                          <span>&quot;{q.audio_prompt}&quot;</span>
                          <button
                            onClick={() => handlePlayAudio(q.audio_prompt!, q.subject)}
                            className="p-1.5 text-purple-700 hover:bg-purple-100 rounded-lg transition"
                            title="Nghe phát âm mẫu"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {q.phonetics_guide && (
                        <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                          {q.phonetics_guide}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleRecord(q.id, q.subject)}
                          className={`
                            px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm
                            ${isRecording === q.id 
                              ? 'bg-rose-600 text-white animate-pulse' 
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
                          `}
                        >
                          {isRecording === q.id ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          {isRecording === q.id ? 'Đang Thu Âm (Bấm để Dừng)' : 'Bấm Vào Đây & Đọc To'}
                        </button>

                        <input
                          type="text"
                          placeholder="Câu nói của em sẽ hiện ở đây hoặc em có thể gõ vào..."
                          value={uAns}
                          onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {!isSubmitted && (
                          <button
                            type="button"
                            disabled={isGrading}
                            onClick={() => handleGradeWithAI(q)}
                            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            {isGrading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Đang chấm...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                <span>Chấm Phát Âm</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TYPE: Essay / Writing */}
                  {q.type === 'essay' && (
                    <div className="space-y-3 mt-3">
                      {q.guide && (
                        <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 whitespace-pre-line">
                          {q.guide}
                        </p>
                      )}

                      <textarea
                        rows={3}
                        placeholder="Nhập câu trả lời hoặc đoạn văn của em vào đây..."
                        value={uAns}
                        disabled={isSubmitted}
                        onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />

                      {!isSubmitted && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            disabled={isGrading}
                            onClick={() => handleGradeWithAI(q)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition"
                          >
                            {isGrading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Đang chấm...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                <span>Nhờ AI Soi Lỗi & Góp Ý</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Per-question Hint Action */}
                  {!isSubmitted && (
                    <div className="mt-3 flex items-center justify-start">
                      <button
                        type="button"
                        disabled={hintLoadingId === q.id}
                        onClick={() => handleHintWithAI(q)}
                        className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {hintLoadingId === q.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Đang gợi ý...</span>
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>Gợi ý làm bài</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* AI Hint Box */}
                  {hintText && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 space-y-1 whitespace-pre-line">
                      <p className="font-bold">💡 Gợi ý làm bài (Cú Vàng):</p>
                      <p>{hintText}</p>
                    </div>
                  )}

                  {/* AI Feedback Box for Essay / Speaking (without revealing exact answer) */}
                  {fb && (
                    <div className="mt-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-indigo-900">
                        <span>🦉 Nhận Xét Của AI:</span>
                        <span className="text-purple-700">Điểm: {fb.score !== undefined ? fb.score : 2.5}</span>
                      </div>
                      <p className="text-indigo-800">{fb.feedback}</p>
                      {fb.phoneticsAdvice && <p className="text-amber-800">💡 {fb.phoneticsAdvice}</p>}
                      {fb.encouragement && <p className="font-semibold text-emerald-700">{fb.encouragement}</p>}
                    </div>
                  )}

                  {/* Status badge only after submit — never reveal correct answer or solution */}
                  {isSubmitted && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      {ansRecord?.is_correct ? (
                        <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Đúng (+{ansRecord.score} điểm)
                        </span>
                      ) : isBlank ? (
                        <span className="inline-flex items-center gap-1.5 font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Bỏ trống (-{UNANSWERED_PENALTY} điểm) — Hãy thử làm lại nhé!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Chưa chính xác (0 điểm) — Hãy suy nghĩ và thử lại nhé!
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action: Submit */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                {isSubmitted ? 'Bài thi đã được chấm điểm hoàn tất!' : 'Đã điền đủ câu hỏi? Hãy nộp bài nhé!'}
              </span>
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 flex items-center gap-2 transition transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                Nộp Bài & Chấm Điểm
              </button>
            ) : (
              <button
                onClick={startQuiz}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-200 flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Làm Lại Bộ Đề Này
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
