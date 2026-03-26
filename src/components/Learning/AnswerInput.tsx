import React, { useState } from 'react';
import { useLearningStore } from '@/stores/useLearningStore';

interface AnswerInputProps {
  interactionId: string;
  question: string;
  onNext: () => void;
}

// 🏗️ XÂY MỚI: Component cho câu hỏi tự luận (Short Answer)
export const AnswerInput: React.FC<AnswerInputProps> = ({ interactionId, question, onNext }) => {
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const completeInteraction = useLearningStore((state) => state.completeInteraction);

  const handleSubmit = () => {
    if (!value.trim()) return;
    
    // Tự luận mặc định là PENDING, XP sẽ được cộng sau khi giáo viên chấm tay (GĐ 3)
    completeInteraction(interactionId, 0); 
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-t-4 border-warning">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{question}</h3>
      
      <textarea
        disabled={isSubmitted}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-warning focus:border-transparent outline-none h-32 resize-none"
        placeholder="Viết câu trả lời của bạn tại đây..."
      />

      <div className="mt-6 flex flex-col gap-3">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 disabled:opacity-50 transition-all"
          >
            Nộp bài (Chờ chấm tay)
          </button>
        ) : (
          <div className="text-center animate-in fade-in duration-500">
            <p className="text-blue-600 italic mb-4">
              Hệ thống đã ghi nhận. Giáo viên sẽ phản hồi sớm!
            </p>
            <button
              onClick={onNext}
              className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 w-full"
            >
              Câu tiếp theo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};