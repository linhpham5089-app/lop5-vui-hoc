'use client';

import React, { useEffect, useState } from 'react';
import { getOrCreateDeviceId, getSavedProfile } from '@/lib/storage';

interface AnalyticsStats {
  totalDevices: number;
  activeToday: number;
  totalPageViews: number;
}

const SESSION_FLAG = 'lop5_analytics_counted';

export default function VisitorCounter() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        const alreadyCounted =
          typeof sessionStorage !== 'undefined' &&
          sessionStorage.getItem(SESSION_FLAG) === '1';

        if (!alreadyCounted) {
          const deviceId = getOrCreateDeviceId();
          const profile = getSavedProfile();
          const res = await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              deviceId,
              profileCode: profile.profileCode,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem(SESSION_FLAG, '1');
            }
            if (isMounted) {
              setStats({
                totalDevices: data.totalDevices ?? 1,
                activeToday: data.activeToday ?? 1,
                totalPageViews: data.totalPageViews ?? 1,
              });
            }
            return;
          }
        }

        const res = await fetch('/api/analytics');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStats({
              totalDevices: data.totalDevices ?? 0,
              activeToday: data.activeToday ?? 0,
              totalPageViews: data.totalPageViews ?? 0,
            });
          }
        }
      } catch {
        // Silent fail so UI never breaks
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-3 bg-white border border-slate-200/90 shadow-sm rounded-full px-3.5 py-1.5 text-xs">
      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Tổng số máy đã học">
        <span>🖥️</span>
        <span className="hidden sm:inline text-slate-500">Tổng máy:</span>
        <span className="font-extrabold text-indigo-700">
          {stats ? stats.totalDevices.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="hidden md:inline text-slate-500">máy</span>
      </span>

      <span className="text-slate-300">|</span>

      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Số máy học hôm nay">
        <span>🟢</span>
        <span className="hidden sm:inline text-slate-500">Hôm nay:</span>
        <span className="font-extrabold text-emerald-700">
          {stats ? stats.activeToday.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="hidden md:inline text-slate-500">máy</span>
      </span>

      <span className="text-slate-300">|</span>

      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Tổng lượt truy cập">
        <span>👀</span>
        <span className="hidden sm:inline text-slate-500">Lượt xem:</span>
        <span className="font-extrabold text-purple-700">
          {stats ? stats.totalPageViews.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="hidden md:inline text-slate-500">lượt</span>
      </span>
    </div>
  );
}
