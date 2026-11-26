'use client';

import React from 'react';
import { 
  Home, 
  BookOpen, 
  Bot, 
  Gamepad2, 
  History, 
  BarChart3, 
  Sparkles,
  Download,
  Upload
} from 'lucide-react';
import { UserStats } from '@/types';
import { exportAllData, importAllData } from '@/lib/storage';

export type NavItem = 'dashboard' | 'practice' | 'tutor' | 'riddles' | 'history' | 'progress';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  stats: UserStats;
  onRefreshData: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  currentTab,
  onSelectTab,
  stats,
  onRefreshData,
  isMobileOpen,
  onCloseMobile
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as NavItem, label: 'Bảng Điều Khiển', icon: Home, color: 'text-indigo-600' },
    { id: 'practice' as NavItem, label: 'Luyện Tập & Đề Thi', icon: BookOpen, color: 'text-blue-600' },
    { id: 'tutor' as NavItem, label: 'Gia Sư Cú Vàng AI', icon: Bot, color: 'text-amber-600' },
    { id: 'riddles' as NavItem, label: 'Đố Vui Trí Tuệ', icon: Gamepad2, color: 'text-pink-600' },
    { id: 'history' as NavItem, label: 'Bài Tập Đã Làm', icon: History, color: 'text-emerald-600' },
    { id: 'progress' as NavItem, label: 'Báo Cáo & Tiến Độ', icon: BarChart3, color: 'text-purple-600' },
  ];

  const handleExport = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lop5_vui_hoc_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAllData(content)) {
        alert('Khôi phục dữ liệu học tập thành công! 🎉');
        onRefreshData();
      } else {
        alert('Tệp dữ liệu không hợp lệ. Vui lòng kiểm tra lại!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-2xl shadow-md shadow-purple-200">
              🎒
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-800 leading-tight">LỚP 5 VUI HỌC</h1>
              <p className="text-xs text-slate-500 font-medium">Trợ Lý & Gia Sư AI</p>
            </div>
          </div>

          {/* Star counter badge */}
          <div className="mt-4 flex items-center justify-between bg-amber-50 border border-amber-200/70 px-3.5 py-2 rounded-xl text-amber-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Ngôi Sao Trí Tuệ</span>
            </div>
            <span className="font-black text-base text-amber-600">⭐ {stats.totalStars}</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all
                  ${isActive 
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom actions: Backup & Restore */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">Đồng Bộ & Sao Lưu</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExport}
              title="Tải về file dữ liệu học tập dự phòng"
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Xuất JSON</span>
            </button>
            <label className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nhập JSON</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>
      </aside>
    </>
  );
}
