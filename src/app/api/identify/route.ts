import { NextRequest, NextResponse } from 'next/server';

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

function buildProfileCode(ip: string, deviceId?: string | null): string {
  const cleanId = (deviceId || '').replace(/[^a-zA-Z0-9]/g, '');
  const suffix = cleanId.length >= 4
    ? cleanId.slice(-4).toUpperCase()
    : Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HS-${ip}-${suffix}`;
}

export async function GET(req: NextRequest) {
  const ip = extractClientIp(req);
  const deviceId = req.nextUrl.searchParams.get('deviceId');
  const profileCode = buildProfileCode(ip, deviceId);

  return NextResponse.json({
    ip,
    profileCode,
    detectedAt: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req);
  let deviceId: string | undefined;
  try {
    const body = await req.json();
    deviceId = body?.deviceId;
  } catch {
    deviceId = undefined;
  }

  const profileCode = buildProfileCode(ip, deviceId);
  return NextResponse.json({
    ip,
    profileCode,
    detectedAt: new Date().toISOString(),
  });
}
