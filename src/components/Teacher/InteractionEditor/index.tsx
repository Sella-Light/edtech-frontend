import React, { useState } from 'react';
import { EditorState } from './InteractionEditor.types';
import { OptionList } from './OptionList';
import { QuizCard } from '../../Learning/QuizCard';
import { Button } from '../../common/Button';

interface InteractionEditorProps {
  onSave?: (data: any) => void;
}

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
    if (!state.question) return alert("Vui lòng nhập câu hỏi!");
    if (state.options.length > 0 && !state.options.includes(state.correctAnswer)) {
      return alert("Vui lòng chọn đáp án đúng!");
    }

    try {
      const payload = {
        // ✅ Đổi ESSAY thành SHORT_ANSWER để khớp với InteractionType
        type: state.options.length > 0 ? 'QUIZ' : 'SHORT_ANSWER', 
        question: state.question,
        data: { options: state.options },
        correctAnswer: state.correctAnswer,
        lessonId: "lesson_1", // Bổ sung để khớp với interface
        xpReward: state.xpReward
      };

      const response = await fetch('https://edtech-backend-8vcf.onrender.com/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert("🎉 Đã lưu câu hỏi thành công!");
        if (onSave) onSave(result.data);
        setState({ ...state, question: '', options: ['Lựa chọn 1', 'Lựa chọn 2'] });
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      alert("Không thể kết nối đến Máy chủ!");
    }
  }; 

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2">
      <div className="flex-1 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">Thiết kế tương tác</h2>
          <div className="flex gap-2">
            {/* ✅ Đã xóa thuộc tính size dư thừa */}
            <Button variant={!isPreview ? "primary" : "secondary"} onClick={() => setIsPreview(false)}>Thiết lập</Button>
            <Button variant={isPreview ? "primary" : "secondary"} onClick={() => setIsPreview(true)}>Xem trước</Button>
          </div>
        </div>

        {!isPreview ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1 uppercase text-gray-500">Câu hỏi</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary outline-none min-h-[100px]"
                value={state.question}
                onChange={(e) => setState({...state, question: e.target.value})}
              />
            </div>

            <OptionList 
              options={state.options}
              onChange={(opts) => setState({...state, options: opts})}
              correctAnswer={state.correctAnswer}
              onSelectCorrect={(ans) => setState({...state, correctAnswer: ans})}
            />

            <Button variant="primary" onClick={handleSave} className="w-full py-3">Cập nhật bài học</Button>
          </div>
        ) : (
          <div className="py-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <QuizCard 
              interaction={{
                id: 'preview',
                // ✅ Đổi ESSAY thành SHORT_ANSWER
                type: state.options.length > 0 ? 'QUIZ' : 'SHORT_ANSWER', 
                question: state.question || 'Nội dung...',
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