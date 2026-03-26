import React, { useState, useEffect } from 'react';
import { AIGradingService } from '../../../services/ai-grading.service'; // Dùng đường dẫn tương đối

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (score: number, feedback: string) => void;
  studentName: string;
  answerContent?: string; // Nhận thêm nội dung bài làm để đưa cho AI đọc
}

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  studentName,
  answerContent = ""
}) => {
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false); // Trạng thái AI đang chạy

  // Reset dữ liệu mỗi khi mở bảng lên
  useEffect(() => {
    if (isOpen) {
      setScore(0);
      setFeedback('');
      setIsAIThinking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Hành động khi giáo viên bấm nút AI
  const handleAskAI = async () => {
    setIsAIThinking(true);
    try {
      // Gửi bài làm cho AI đọc
      const aiResult = await AIGradingService.analyzeAnswer(answerContent);
      
      // Nhận kết quả và điền tự động vào ô input
      setScore(aiResult.suggestedScore);
      setFeedback(aiResult.suggestedFeedback);
    } catch (error) {
      alert("Lỗi kết nối AI!");
    } finally {
      setIsAIThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-800 mb-1">Chấm bài: {studentName}</h3>
            <p className="text-sm font-medium text-gray-500">Giáo viên có thể tự chấm hoặc dùng AI hỗ trợ.</p>
          </div>
          
          {/* NÚT KÍCH HOẠT AI KỲ DIỆU Ở ĐÂY */}
          <button 
            onClick={handleAskAI}
            disabled={isAIThinking}
            className="flex items-center gap-2 bg-[#6f42c1]/10 text-[#6f42c1] px-4 py-2 rounded-xl font-bold hover:bg-[#6f42c1]/20 transition-all disabled:opacity-50"
          >
            {isAIThinking ? "🤖 AI đang đọc..." : "✨ Nhờ AI chấm giúp"}
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Số điểm (0 - 100)</label>
            <input 
              type="number" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary font-bold text-lg transition-all"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Nhận xét của giáo viên (Có thể sửa lại lời AI)</label>
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary min-h-[140px] transition-all leading-relaxed"
              placeholder="Nhập lời khuyên cho học sinh..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={() => onSubmit(score, feedback)}
            className="flex-[2] py-3.5 bg-[#28A745] text-white rounded-xl font-bold hover:opacity-90 shadow-lg shadow-[#28A745]/20 transition-all"
          >
            Xác nhận & Gửi kết quả
          </button>
        </div>
      </div>
    </div>
  );
};