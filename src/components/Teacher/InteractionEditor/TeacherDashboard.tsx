import React, { useState, useEffect } from 'react';
import { InteractionEditor } from '../InteractionEditor/index';
import { GradingQueue } from '../GradingQueue/index'; 

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'grading'>('editor');
  
  // 🌟 STATE MỚI: Chứa số lượng bài cần chấm thật từ Database
  const [pendingCount, setPendingCount] = useState(0);

  // 🌟 Dùng ống hút API để đếm số bài mỗi khi giáo viên mở hoặc chuyển tab
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/submissions');
        const result = await response.json();
        console.log("Dữ liệu TeacherDashboard nhận được:", result);
        if (result.status === 'success') {
          // Gán độ dài của mảng dữ liệu thật vào cục thông báo đỏ
          setPendingCount(result.data.length); 
        }
      } catch (error) {
        console.error("Lỗi đếm số bài:", error);
      }
    };

    fetchPendingCount();
  }, [activeTab]); // Mỗi khi đổi tab sẽ tự động đếm lại cho chính xác

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
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
            
            {/* 🌟 ĐÃ HỒI SINH HUY HIỆU ĐỎ VỚI SỐ LIỆU THẬT */}
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-6 py-2 rounded-lg font-bold transition-all relative ${
                activeTab === 'grading' 
                ? 'bg-white text-[#007BFF] shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chấm bài
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC3545] text-[10px] text-white animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === 'editor' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-[2rem] font-bold text-[#212529]">Thiết kế bài học No-code</h2>
              <p className="text-[#6C757D]">Tạo các câu hỏi tương tác để tăng tính hấp dẫn cho bài giảng.</p>
            </header>
            <InteractionEditor />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <GradingQueue />
          </div>
        )}
      </main>
    </div>
  );
};