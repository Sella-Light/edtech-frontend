// Hiển thị xem trước realtime giao diện học sinh sẽ thấy
import React from 'react';
import { EditorState } from './InteractionEditor.types';
import { QuizCard } from '@/components/Learning/QuizCard';

interface PreviewAreaProps {
  state: EditorState;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ state }) => {
  return (
    <div className="w-full lg:w-[400px] sticky top-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
        </span>
        <h3 className="text-caption font-bold uppercase text-gray-500 tracking-wider">
          Chế độ xem trước (Học sinh)
        </h3>
      </div>
      
      <div className="bg-background p-4 rounded-2xl border-2 border-dashed border-gray-200 min-h-[400px] flex items-center justify-center">
        {state.question ? (
          <QuizCard 
            interaction={{
              id: 'preview-id',
              type: state.type,
              question: state.question,
              data: { options: state.options },
              correctAnswer: state.correctAnswer,
              xpReward: state.xpReward,
              lessonId: 'preview-lesson'
            }}
            onNext={() => alert('Đây là bản xem trước!')}
          />
        ) : (
          <div className="text-gray-400 italic text-sm text-center">
            Nhập câu hỏi để xem bản xem trước tại đây...
          </div>
        )}
      </div>
    </div>
  );
};