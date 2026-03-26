import React, { useState, useEffect } from 'react';

export const GradingQueue: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/submissions');
        const result = await response.json();
        if (result.status === 'success') {
          setSubmissions(result.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài nộp:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleGrade = async (id: string, score: number, feedback: string) => {
    if (score === undefined || score === null) {
      return alert("⚠️ Vui lòng nhập điểm cho học sinh!");
    }
    try {
      const response = await fetch(`https://edtech-backend-8vcf.onrender.com/api/submissions/${id}/grade`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, feedback })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        alert(`✅ Đã lưu vĩnh viễn ${score} điểm vào hệ thống!`);
      } else {
        alert("Lỗi máy chủ: Không thể lưu điểm.");
      }
    } catch (error) {
      alert("Mất kết nối với máy chủ!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Hàng đợi chấm bài</h2>
      <p className="text-gray-500 mb-8">Phản hồi các bài tập tự luận từ học sinh.</p>

      {isLoading ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl">
          <p className="text-blue-500 font-bold animate-pulse">⏳ Đang lấy bài nộp từ máy chủ...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium text-lg">🎉 Tuyệt vời! Bạn đã chấm hết mọi bài nộp.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub) => (
            <SubmissionCard
              key={sub.id}
              submission={sub}
              onGrade={(score, feedback) => handleGrade(sub.id, score, feedback)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// THẺ HIỂN THỊ TỪNG BÀI NỘP (CÓ TÍCH HỢP AI)
// ==========================================
interface SubmissionCardProps {
  submission: any;
  onGrade: (score: number, feedback: string) => void;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission, onGrade }) => {
  const [score, setScore] = useState<number | string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isAILoading, setIsAILoading] = useState(false); // Trạng thái AI đang suy nghĩ

  const dateStr = new Date(submission.createdAt).toLocaleDateString('vi-VN');

  // 🌟 HÀM GỌI API AI ĐỂ CHẤM BÀI
  const handleAIGrade = async () => {
    setIsAILoading(true);
    try {
      const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/submissions/ai-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: submission.interaction?.question || "Câu hỏi trống",
          answerContent: submission.answerContent
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Tự động điền kết quả của AI vào ô Input
        setScore(result.data.score);
        setFeedback(result.data.feedback);
      } else {
        alert("AI gặp lỗi: " + result.message);
      }
    } catch (error) {
      alert("Không thể kết nối đến AI. Hãy chắc chắn Backend đang chạy!");
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:border-[#007BFF]/30 transition-all relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-bold text-gray-800 text-sm uppercase mb-1">
            HỌC SINH: {submission.student?.fullName || 'Học sinh ẩn danh'}
          </h4>
          <p className="text-gray-500 text-sm font-medium">Câu hỏi: {submission.interaction?.question || 'Không rõ câu hỏi'}</p>
        </div>
        <span className="text-gray-400 text-sm font-medium">Ngày nộp: {dateStr}</span>
      </div>

      <div className="mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Nội dung trả lời:</span>
        <div className="p-4 bg-gray-50 rounded-lg text-gray-700 text-lg italic border border-gray-100">
          "{submission.answerContent}"
        </div>
      </div>

      {/* 🌟 NÚT NHỜ AI CHẤM GIÚP */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAIGrade}
          disabled={isAILoading}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
            isAILoading 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-[#6f42c1]/10 text-[#6f42c1] hover:bg-[#6f42c1]/20'
          }`}
        >
          {isAILoading ? '⏳ AI đang phân tích...' : '✨ Nhờ AI chấm giúp'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <input 
          type="number" 
          placeholder="Điểm"
          className="w-full sm:w-24 p-3 border border-gray-200 rounded-lg outline-none focus:border-[#007BFF] text-center font-bold"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <input 
          type="text" 
          placeholder="Nhận xét của giáo viên..."
          className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:border-[#007BFF]"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button 
          onClick={() => onGrade(Number(score), feedback)}
          className="bg-[#28A745] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#218838] transition-all shadow-md sm:whitespace-nowrap"
        >
          Xác nhận chấm
        </button>
      </div>
    </div>
  );
};