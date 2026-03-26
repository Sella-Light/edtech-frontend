import React, { useState } from 'react';
import { EditorState } from './InteractionEditor.types';
import { OptionList } from './OptionList';
import { QuizCard } from '../../Learning/QuizCard';
import { Button } from '../../common/Button';
import { TeacherService } from '../../../services/teacher.service';

// 🌟 Bổ sung Props để nhận hàm onSave từ TeacherDashboard
interface InteractionEditorProps {
  onSave?: (data: any) => void;
}

// Main Component: Trình soạn thảo câu hỏi tương tác
export const InteractionEditor: React.FC<InteractionEditorProps> = ({ onSave }) => {
  const [state, setState] = useState<EditorState>({
    type: 'QUIZ',
    question: '',
    xpReward: 10,
    options: ['Lựa chọn 1', 'Lựa chọn 2'],
    correctAnswer: 'Lựa chọn 1'
  });

  const [isPreview, setIsPreview] = useState(false);

  const handleSave = async () => {
    // 1. Kiểm tra đầu vào cơ bản
    if (!state.question) return alert("Vui lòng nhập câu hỏi!");
    if (state.options.length > 0 && !state.options.includes(state.correctAnswer)) {
      return alert("Vui lòng chọn đáp án đúng!");
    }

    try {
      // 2. Chuẩn bị gói hàng để gửi
      const payload = {
        type: state.options.length > 0 ? 'QUIZ' : 'ESSAY', // Tự động nhận diện loại câu hỏi
        question: state.question,
        data: { options: state.options },
        correctAnswer: state.correctAnswer
      };

      // 3. Bấm nút gửi sang Backend (Cắm cáp thật!)
      const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // 4. Xử lý kết quả trả về
      if (result.status === 'success') {
        alert("🎉 Đã lưu câu hỏi vào Database thật thành công!");
        
        // Vẫn gọi hàm onSave cũ để cập nhật giao diện nếu cần
        if (onSave) {
          onSave(result.data); // Truyền luôn cục dữ liệu thật từ DB lên trên
        }
        
        // Xóa trắng form để soạn câu tiếp theo
        setState({
          ...state,
          question: '',
          options: ['Lựa chọn 1', 'Lựa chọn 2'],
          correctAnswer: 'Lựa chọn 1'
        });
      } else {
        alert("Lỗi từ Backend: " + result.message);
      }
      
    } catch (error) {
      console.error("Lỗi khi kết nối Backend:", error);
      alert("Không thể kết nối đến Máy chủ! Hãy chắc chắn Backend đang chạy.");
    }
  }; 

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2">
      {/* Cột trái: Form nhập liệu */}
      <div className="flex-1 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-heading2 font-bold text-text">Thiết kế tương tác</h2>
          <div className="flex gap-2 font-body">
            <Button 
              variant={!isPreview ? "primary" : "secondary"} 
              
              onClick={() => setIsPreview(false)}
            >Thiết lập</Button>
            <Button 
              variant={isPreview ? "primary" : "secondary"} 
               
              onClick={() => setIsPreview(true)}
            >Xem trước</Button>
          </div>
        </div>

        {!isPreview ? (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-caption font-bold mb-1 uppercase text-gray-500">Câu hỏi học sinh thấy</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary outline-none min-h-[100px]"
                value={state.question}
                onChange={(e) => setState({...state, question: e.target.value})}
                placeholder="Ví dụ: Theo bạn, học React có khó không?"
              />
            </div>

            {/* Component OptionList sẽ tự động ẩn hiện dựa trên việc bạn có xoá hết tuỳ chọn hay không */}
            <OptionList 
              options={state.options}
              onChange={(opts) => setState({...state, options: opts})}
              correctAnswer={state.correctAnswer}
              onSelectCorrect={(ans) => setState({...state, correctAnswer: ans})}
            />

            <Button variant="primary" onClick={handleSave} className="w-full py-3">
              Cập nhật bài học
            </Button>
          </div>
        ) : (
          /* Vùng xem trước dành cho giáo viên */
          <div className="py-10 bg-gray-100 rounded-lg flex items-center justify-center animate-in zoom-in-95 duration-300">
            <QuizCard 
              interaction={{
                id: 'preview',
                type: state.options.length > 0 ? 'QUIZ' : 'ESSAY', // Tự động nhận diện loại câu hỏi
                question: state.question || 'Nội dung câu hỏi sẽ hiển thị ở đây...',
                data: { options: state.options },
                correctAnswer: state.correctAnswer,
                xpReward: state.xpReward,
                lessonId: 'temp'
              }}
              onNext={() => setIsPreview(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};