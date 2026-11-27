import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { QuizSession, StudentProfile, UserStats } from '@/types';

export const maxDuration = 15;

interface StoredDeviceProgress {
  profile: StudentProfile;
  sessions: QuizSession[];
  stats: UserStats;
  updatedAt: string;
}

// Lightweight in-memory store per profileCode (and IP) for warm serverless instances
const progressStore = new Map<string, StoredDeviceProgress>();
const MAX_PROFILES = 200;

export async function GET(req: NextRequest) {
  const profileCode = req.nextUrl.searchParams.get('profileCode');
  if (!profileCode) {
    return NextResponse.json({ error: 'Thiếu profileCode' }, { status: 400 });
  }

  const record = progressStore.get(profileCode);
  if (!record) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, data: record });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Generate concise AI parent summary on demand
    if (body?.action === 'ai_summary') {
      const { profile, summaryData } = body;
      const systemPrompt = `Bạn là Giáo viên chủ nhiệm Lớp 5 tận tâm. Hãy viết một nhận xét ngắn gọn (3-4 câu, súc tích, thân thiện) gửi phụ huynh về tình hình học tập của con dựa trên số liệu sau. Chỉ rõ điểm mạnh, môn cần chú ý và thói quen làm bài (có hay bỏ trống câu hỏi không).`;
      const userPrompt = `Học sinh: ${profile?.alias || profile?.profileCode || 'Học sinh Lớp 5'}. Số liệu tổng hợp: ${JSON.stringify(summaryData)}`;
      const summary = await callGemini(userPrompt, systemPrompt);
      return NextResponse.json({ summary });
    }

    const profile: StudentProfile | undefined = body?.profile;
    const sessions: QuizSession[] = Array.isArray(body?.sessions) ? body.sessions : [];
    const stats: UserStats | undefined = body?.stats;

    if (!profile?.profileCode) {
      return NextResponse.json({ error: 'Thiếu thông tin profileCode' }, { status: 400 });
    }

    if (progressStore.size >= MAX_PROFILES && !progressStore.has(profile.profileCode)) {
      const oldestKey = progressStore.keys().next().value;
      if (oldestKey) progressStore.delete(oldestKey);
    }

    const payload: StoredDeviceProgress = {
      profile,
      sessions,
      stats: stats || {
        totalStars: 10,
        completedQuizzes: 0,
        solvedRiddles: 0,
        studyStreakDays: 1,
        lastStudyDate: '',
      },
      updatedAt: new Date().toISOString(),
    };

    progressStore.set(profile.profileCode, payload);

    return NextResponse.json({ ok: true, profileCode: profile.profileCode, updatedAt: payload.updatedAt });
  } catch (error: any) {
    console.error('Progress API Error:', error);
    return NextResponse.json(
      { error: 'Không thể xử lý đồng bộ tiến độ lúc này.', details: error.message },
      { status: 500 }
    );
  }
}
