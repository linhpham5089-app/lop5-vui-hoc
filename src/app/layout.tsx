import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lớp 5 Vui Học - Trợ Lý Học Tập & Gia Sư AI Thông Minh',
  description: 'Ứng dụng học tập chuẩn Lớp 5: Toán, Tiếng Việt, Tiếng Anh Cambridge A2 Flyers 4 Kỹ Năng & Tiếng Trung YCT/HSK',
  icons: {
    icon: '🎒',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-purple-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
