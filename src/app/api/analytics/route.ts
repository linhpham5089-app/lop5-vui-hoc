import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export const maxDuration = 15;

// In-memory fallback when Upstash Redis is not configured
const memoryFallback = {
  totalVisits: 0,
  uniqueIps: new Set<string>(),
  activeIpsByDate: new Map<string, Set<string>>(),
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
  let raw = forwarded ? forwarded.split(',')[0].trim() : (realIp ? realIp.trim() : '');

  if (!raw || raw === '::1' || raw === '127.0.0.1' || raw === '::ffff:127.0.0.1') {
    return 'unknown';
  }
  if (raw.startsWith('::ffff:')) {
    raw = raw.replace('::ffff:', '');
  }
  return raw || 'unknown';
}

export async function GET() {
  const todayVN = getVietnamDateKey();
  const todayKey = `stats:active_ips:${todayVN}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      const [uniqueIps, todayIps, totalVisits] = await Promise.all([
        redis.scard('stats:unique_ips'),
        redis.scard(todayKey),
        redis.get<number>('stats:total_visits'),
      ]);
      return NextResponse.json({
        uniqueIps: Number(uniqueIps) || 0,
        todayIps: Number(todayIps) || 0,
        totalVisits: Number(totalVisits) || 0,
        date: todayVN,
        source: 'redis',
      });
    } catch (err) {
      console.error('[ANALYTICS GET] Redis error, falling back to memory:', err);
    }
  }

  return NextResponse.json({
    uniqueIps: memoryFallback.uniqueIps.size,
    todayIps: memoryFallback.activeIpsByDate.get(todayVN)?.size || 0,
    totalVisits: memoryFallback.totalVisits,
    date: todayVN,
    source: 'memory',
  });
}

export async function POST(req: NextRequest) {
  const todayVN = getVietnamDateKey();
  const todayKey = `stats:active_ips:${todayVN}`;
  const clientIp = extractClientIp(req);
  const redis = getRedisClient();

  if (redis) {
    try {
      const [totalVisits] = await Promise.all([
        redis.incr('stats:total_visits'),
        redis.sadd('stats:unique_ips', clientIp),
        redis.sadd(todayKey, clientIp),
      ]);
      await redis.expire(todayKey, 48 * 3600);

      const [uniqueIps, todayIps] = await Promise.all([
        redis.scard('stats:unique_ips'),
        redis.scard(todayKey),
      ]);

      return NextResponse.json({
        uniqueIps: Number(uniqueIps) || 1,
        todayIps: Number(todayIps) || 1,
        totalVisits: Number(totalVisits) || 1,
        date: todayVN,
        source: 'redis',
      });
    } catch (err) {
      console.error('[ANALYTICS POST] Redis error, falling back to memory:', err);
    }
  }

  memoryFallback.totalVisits += 1;
  memoryFallback.uniqueIps.add(clientIp);
  if (!memoryFallback.activeIpsByDate.has(todayVN)) {
    memoryFallback.activeIpsByDate.set(todayVN, new Set());
  }
  memoryFallback.activeIpsByDate.get(todayVN)!.add(clientIp);

  return NextResponse.json({
    uniqueIps: memoryFallback.uniqueIps.size,
    todayIps: memoryFallback.activeIpsByDate.get(todayVN)!.size,
    totalVisits: memoryFallback.totalVisits,
    date: todayVN,
    source: 'memory',
  });
}
