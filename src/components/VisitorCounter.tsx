'use client';

import React, { useEffect, useState } from 'react';

interface AnalyticsStats {
  uniqueIps: number;
  todayIps: number;
  totalVisits: number;
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
          const res = await fetch('/api/analytics', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem(SESSION_FLAG, '1');
            }
            if (isMounted) {
              setStats({
                uniqueIps: data.uniqueIps ?? 1,
                todayIps: data.todayIps ?? 1,
                totalVisits: data.totalVisits ?? 1,
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
              uniqueIps: data.uniqueIps ?? 0,
              todayIps: data.todayIps ?? 0,
              totalVisits: data.totalVisits ?? 0,
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
      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Số địa chỉ IP khác nhau đã truy cập">
        <span>🌐</span>
        <span className="hidden sm:inline text-slate-500">Số IP khác nhau:</span>
        <span className="font-extrabold text-indigo-700">
          {stats ? stats.uniqueIps.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="text-slate-500">IP</span>
      </span>

      <span className="text-slate-300">|</span>

      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Số địa chỉ IP truy cập hôm nay">
        <span>🟢</span>
        <span className="hidden sm:inline text-slate-500">IP hôm nay:</span>
        <span className="font-extrabold text-emerald-700">
          {stats ? stats.todayIps.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="text-slate-500">IP</span>
      </span>

      <span className="text-slate-300">|</span>

      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold" title="Tổng lượt truy cập">
        <span>👀</span>
        <span className="hidden sm:inline text-slate-500">Tổng lượt truy cập:</span>
        <span className="font-extrabold text-purple-700">
          {stats ? stats.totalVisits.toLocaleString('vi-VN') : '…'}
        </span>
        <span className="text-slate-500">lượt</span>
      </span>
    </div>
  );
}
