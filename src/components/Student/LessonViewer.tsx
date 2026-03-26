import React, { useState, useEffect } from 'react';
import { GradingStatus } from '../../types/learning.types';

interface LessonViewerProps {
  onEarnXp: (xp: number) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ onEarnXp }) => {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({});
  const [submittedIds, setSubmittedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/interactions');
        const result = await response.json();
        if (result.status === 'success') {
          setInteractions(result.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInteractions();
  }, []);

  const handleAnswerQuiz = (id: string) => {
    setSubmittedIds(prev => ({ ...prev, [id]: true }));
    onEarnXp(50);
    alert("🎉 Chính xác! Bạn nhận được 50 XP!");
  };

  const handleSubmitEssay = async (id: string) => {
    const answer = essayAnswers[id];
    if (!answer?.trim()) {
      alert("⚠️ Bạn chưa nhập câu trả lời!");
      return;
    }
    
    try {
      const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interactionId: id,
          answerContent: answer
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSubmittedIds(prev => ({ ...prev, [id]: true }));
        alert("✅ Đã nộp bài tự luận lên máy chủ thành công! Vui lòng chờ giáo viên chấm điểm.");
      } else {
        alert("Lỗi máy chủ: Không thể nộp bài.");
      }
    } catch (error) {
      alert("Mất kết nối với máy chủ!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-slate-800 flex flex-col items-center justify-center text-white relative">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:bg-white/30 transition-all">
          ▶️
        </div>
        <p className="text-gray-300">Video bài giảng (Giả lập)</p>
      </div>

      <div className="p-8 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bài 1: Nhập môn TypeScript thực chiến</h2>
        <p className="text-gray-500">Giáo viên: Thầy Minh | Thời lượng: 15 phút</p>
      </div>

      <div className="p-8 bg-gray-50 space-y-8">
        <h3 className="text-xl font-black text-gray-800 border-b pb-4">📝 Bài tập tương tác</h3>

        {isLoading ? (
          <div className="text-center p-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-blue-500 font-bold text-lg animate-pulse">⏳ Đang tải đề thi từ máy chủ Singapore...</p>
          </div>
        ) : interactions.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Chưa có bài tập nào. Hãy chờ giáo viên ra đề nhé!</p>
          </div>
        ) : (
          interactions.map((interaction) => {
            const isSubmitted = submittedIds[interaction.id];
            const isQuiz = interaction.type === 'QUIZ';
            const optionsArray = interaction.data?.options || [];

            return (
              <div key={interaction.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isQuiz ? 'bg-[#007BFF]/10 text-[#007BFF]' : 'bg-[#6f42c1]/10 text-[#6f42c1]'}`}>
                    {isQuiz ? 'Trắc nghiệm' : 'Tự luận'}
                  </span>
                  <span className="text-[#FFC107] font-bold">💎 +{interaction.xpReward} XP</span>
                </div>

                <h4 className="text-xl font-bold text-gray-800 mb-6">{interaction.question}</h4>

                {isSubmitted ? (
                  <div className="bg-[#28A745]/10 text-[#28A745] p-4 rounded-xl font-bold text-center border border-[#28A745]/20">
                    {isQuiz ? "🎉 Bạn đã trả lời đúng!" : "✅ Bài làm đã được gửi tới Giáo viên!"}
                  </div>
                ) : isQuiz ? (
                  <div className="space-y-3">
                    {optionsArray.map((opt: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswerQuiz(interaction.id)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-[#007BFF] hover:bg-[#007BFF]/5 transition-all font-medium text-lg"
                      >
                        {opt} 
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea 
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#007BFF] min-h-[120px] transition-all text-lg"
                      placeholder="Nhập câu trả lời của em tại đây..."
                      value={essayAnswers[interaction.id] || ''}
                      onChange={(e) => setEssayAnswers(prev => ({ ...prev, [interaction.id]: e.target.value }))}
                    />
                    <button 
                      onClick={() => handleSubmitEssay(interaction.id)}
                      className="bg-[#007BFF] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md shadow-[#007BFF]/20"
                    >
                      Nộp bài tự luận
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};