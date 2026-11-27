import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export const maxDuration = 15;

// In-memory fallback when Upstash Redis is not configured (e.g. local dev)
const memoryFallback = {
  pageViews: 0,
  uniqueDevices: new Set<string>(),
  activeByDate: new Map<string, Set<string>>(),
};

function getVietnamDateKey(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function extractClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  let raw = forwarded ? forwarded.split(',')[0].trim() : (realIp || '127.0.0.1');
  if (raw === '::1' || raw === '::ffff:127.0.0.1') {
    raw = '127.0.0.1';
  } else if (raw.startsWith('::ffff:')) {
    raw = raw.replace('::ffff:', '');
  }
  return raw || '127.0.0.1';
}

export async function GET() {
  const todayVN = getVietnamDateKey();
  const todayKey = `stats:active_today:${todayVN}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      const [totalDevices, activeToday, totalPageViews] = await Promise.all([
        redis.scard('stats:unique_devices'),
        redis.scard(todayKey),
        redis.get<number>('stats:page_views'),
      ]);
      return NextResponse.json({
        totalDevices: Number(totalDevices) || 0,
        activeToday: Number(activeToday) || 0,
        totalPageViews: Number(totalPageViews) || 0,
        date: todayVN,
        source: 'redis',
      });
    } catch (err) {
      console.error('[ANALYTICS GET] Redis error, falling back to memory:', err);
    }
  }

  return NextResponse.json({
    totalDevices: memoryFallback.uniqueDevices.size,
    activeToday: memoryFallback.activeByDate.get(todayVN)?.size || 0,
    totalPageViews: memoryFallback.pageViews,
    date: todayVN,
    source: 'memory',
  });
}

export async function POST(req: NextRequest) {
  const todayVN = getVietnamDateKey();
  const todayKey = `stats:active_today:${todayVN}`;
  const ip = extractClientIp(req);

  let deviceId = '';
  let profileCode = '';
  try {
    const body = await req.json();
    deviceId = String(body?.deviceId || '').trim();
    profileCode = String(body?.profileCode || '').trim();
  } catch {
    // Ignore empty body
  }

  const uniqueMember = profileCode || `${ip}-${deviceId || 'anon'}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      const [totalPageViews] = await Promise.all([
        redis.incr('stats:page_views'),
        redis.sadd('stats:unique_devices', uniqueMember),
        redis.sadd(todayKey, uniqueMember),
      ]);
      await redis.expire(todayKey, 48 * 3600);

      const [totalDevices, activeToday] = await Promise.all([
        redis.scard('stats:unique_devices'),
        redis.scard(todayKey),
      ]);

      return NextResponse.json({
        totalDevices: Number(totalDevices) || 1,
        activeToday: Number(activeToday) || 1,
        totalPageViews: Number(totalPageViews) || 1,
        date: todayVN,
        source: 'redis',
      });
    } catch (err) {
      console.error('[ANALYTICS POST] Redis error, falling back to memory:', err);
    }
  }

  memoryFallback.pageViews += 1;
  memoryFallback.uniqueDevices.add(uniqueMember);
  if (!memoryFallback.activeByDate.has(todayVN)) {
    memoryFallback.activeByDate.set(todayVN, new Set());
  }
  memoryFallback.activeByDate.get(todayVN)!.add(uniqueMember);

  return NextResponse.json({
    totalDevices: memoryFallback.uniqueDevices.size,
    activeToday: memoryFallback.activeByDate.get(todayVN)!.size,
    totalPageViews: memoryFallback.pageViews,
    date: todayVN,
    source: 'memory',
  });
}
