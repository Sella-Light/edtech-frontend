import React, { useState } from 'react';
import { Submission } from '../../../types/learning.types';
import { AIGradingService } from '../../../services/ai-grading.service';
import { useTeacherStore } from '../../../stores/useTeacherStore';

interface SubmissionCardProps {
  submission: Submission;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  
  // Hàm xóa bài nộp khỏi hàng đợi sau khi chấm xong
  const removeSubmissionFromQueue = useTeacherStore(state => state.removeSubmissionFromQueue);

  // Logic gọi AI
  const handleAskAI = async () => {
    setIsAIThinking(true);
    try {
      const aiResult = await AIGradingService.analyzeAnswer(submission.answerContent);
      setScore(aiResult.suggestedScore);
      setFeedback(aiResult.suggestedFeedback);
    } catch (error) {
      alert("Lỗi kết nối AI!");
    } finally {
      setIsAIThinking(false);
    }
  };

  // Logic nộp điểm
  const handleSubmit = () => {
    alert(`✅ Hệ thống: Đã gửi ${score} điểm cho học sinh!`);
    removeSubmissionFromQueue(submission.id);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-gray-800 uppercase text-sm tracking-wide">Học sinh ID: {submission.userId}</h4>
        <span className="text-sm font-medium text-gray-400">Ngày nộp: {new Date(submission.submittedAt).toLocaleDateString('vi-VN')}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Nội dung trả lời:</span>
        <p className="p-4 bg-gray-50/50 rounded-xl text-gray-800 text-lg border border-gray-100">
          "{submission.answerContent}"
        </p>
      </div>

      {/* 🌟 NÚT AI ĐƯỢC CHÈN VÀO ĐÂY 🌟 */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAskAI}
          disabled={isAIThinking}
          className="flex items-center gap-2 bg-[#6f42c1]/10 text-[#6f42c1] px-4 py-2 rounded-xl font-bold hover:bg-[#6f42c1]/20 transition-all disabled:opacity-50"
        >
          {isAIThinking ? "🤖 AI đang đọc bài..." : "✨ Nhờ AI chấm giúp"}
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input 
          type="number" 
          className="w-24 p-3 border border-gray-200 rounded-xl outline-none focus:border-primary font-bold text-center"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <input 
          type="text" 
          className="flex-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
          placeholder="Nhận xét của giáo viên..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-[#28A745] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md shadow-[#28A745]/20"
      >
        Xác nhận chấm điểm & Tặng XP
      </button>
    </div>
  );
};