'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Volume2, RotateCcw, Loader2 } from 'lucide-react';
import { TutorMessage } from '@/types';
import { getSavedChat, saveChat } from '@/lib/storage';
import { speakText } from '@/lib/speech';

export default function TutorView() {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getSavedChat());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'Thầy ơi, giúp em bài toán chuyển động đều hai xe đi ngược chiều với!',
    'Làm sao để nhớ và chia động từ có quy tắc thì Quá khứ đơn Cambridge Flyers?',
    'Thầy hướng dẫn em cách phân biệt 4 thanh điệu trong tiếng Trung với ạ!',
    'Em muốn lập dàn ý bài văn tả cảnh một buổi sáng trên quê hương em.'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: TutorMessage = {
      id: `msg_${Date.now()}_u`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    saveChat(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Build history
      const history = newMessages.slice(-6).map(m => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text
      }));

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, history })
      });

      const data = await res.json();
      const tutorReplyText = data.reply || 'Cú Vàng đang lắng nghe đây, em hãy nhắn lại nhé!';

      const tutorMsg: TutorMessage = {
        id: `msg_${Date.now()}_t`,
        sender: 'tutor',
        text: tutorReplyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [...newMessages, tutorMsg];
      setMessages(updated);
      saveChat(updated);
    } catch (err) {
      console.error(err);
      const errMsg: TutorMessage = {
        id: `msg_${Date.now()}_err`,
        sender: 'tutor',
        text: 'Cú Vàng đang tạm thời bận một chút, em hãy gửi lại câu hỏi sau vài giây nha! 🦉',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Em có chắc chắn muốn làm mới cuộc trò chuyện với Cú Vàng không?')) {
      const init: TutorMessage[] = [
        {
          id: 'init-msg',
          sender: 'tutor',
          text: 'Chào em yêu quý! Thầy là Cú Vàng Thông Thái 🦉. Hôm nay em có bài tập hay thắc mắc nào cần thầy cùng em gợi mở từng bước không nè? ✨',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(init);
      saveChat(init);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-amber-50/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-200">
            🦉
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800">Cú Vàng Thông Thái</h3>
            <p className="text-xs text-amber-800 font-medium">Gia sư AI gợi mở theo phương pháp Socrates (Không giải hộ)</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          title="Xóa làm mới đoạn chat"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isTutor = m.sender === 'tutor';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
            >
              {isTutor && (
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base shrink-0 mt-1">
                  🦉
                </div>
              )}

              <div
                className={`
                  max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line shadow-sm
                  ${isTutor 
                    ? 'bg-amber-50/80 border border-amber-200/70 text-slate-800' 
                    : 'bg-purple-600 text-white rounded-tr-none'}
                `}
              >
                <p>{m.text}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] opacity-70">
                  <span>{m.timestamp}</span>
                  {isTutor && (
                    <button
                      onClick={() => speakText(m.text, 'vi')}
                      className="p-1 hover:text-amber-900 rounded transition"
                      title="Nghe Cú Vàng đọc câu trả lời"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {!isTutor && (
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                  👧
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 text-slate-400 text-xs italic">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base">
              🦉
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-2xl">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Cú Vàng đang suy nghĩ và chuẩn bị câu hỏi gợi ý cho em...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Hỏi Cú Vàng về một bài toán, ngữ pháp tiếng Anh, tiếng Trung..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold transition shadow-md shadow-purple-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
