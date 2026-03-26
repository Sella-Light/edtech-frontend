import React, { useState } from 'react';
import { LessonViewer } from './LessonViewer';

export const StudentDashboard: React.FC = () => {
  const [totalXp, setTotalXp] = useState<number>(120); // Điểm kinh nghiệm hiện tại

  const handleEarnXp = (amount: number) => {
    setTotalXp(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-sans"> {/* Dùng nền xanh lá nhạt để phân biệt với Teacher Hub */}
      {/* Navigation Bar của Học sinh */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success rounded-xl flex items-center justify-center text-white font-black text-xl">
              S
            </div>
            <span className="text-xl font-bold text-gray-800">Student Hub</span>
          </div>
          
          {/* Hệ thống Gamification: Hiển thị XP */}
          <div className="flex items-center gap-4 bg-green-50 px-5 py-2 rounded-full border border-green-200">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Học sinh 99</span>
            <div className="w-px h-4 bg-green-300"></div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💎</span>
              <span className="font-black text-success text-lg">{totalXp} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Khu vực học tập chính */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 mb-2">Tiếp tục học tập</h1>
          <p className="text-gray-600">Hoàn thành bài học hôm nay để giữ chuỗi (streak) nhé!</p>
        </header>

        <LessonViewer onEarnXp={handleEarnXp} />
      </main>
    </div>
  );
};