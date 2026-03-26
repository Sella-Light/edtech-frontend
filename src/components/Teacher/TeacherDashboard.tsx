import React, { useState } from 'react';
import { InteractionEditor } from './InteractionEditor';
import { GradingQueue } from './GradingQueue'; 

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'grading'>('editor');

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#007BFF] rounded-lg flex items-center justify-center text-white font-black">
              E
            </div>
            <span className="text-[1.5rem] font-semibold text-[#212529]">Teacher Hub</span>
          </div>
          
          <nav className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'editor' 
                ? 'bg-white text-[#007BFF] shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Soạn bài học
            </button>
            
            {/* Tạm thời ẩn huy hiệu số đếm màu đỏ đi vì chúng ta đã dùng API thật */}
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'grading' 
                ? 'bg-white text-[#007BFF] shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chấm bài
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === 'editor' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-[2rem] font-bold text-[#212529]">Thiết kế bài học No-code</h2>
              <p className="text-[#6C757D]">Tạo các câu hỏi tương tác để tăng tính hấp dẫn cho bài giảng.</p>
            </header>
            
            {/* InteractionEditor mới đã tự gọi API bên trong nó, không cần truyền onSave nữa */}
            <InteractionEditor />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* GradingQueue mới cũng tự hút dữ liệu từ Database về, không cần truyền props */}
            <GradingQueue />
          </div>
        )}
      </main>
    </div>
  );
};