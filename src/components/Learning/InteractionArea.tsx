import React from 'react';
import { QuizCard } from './QuizCard';
import { AnswerInput } from './AnswerInput';

interface InteractionAreaProps {
  interaction: {
    id: string;
    type: 'QUIZ' | 'SHORT_ANSWER';
    question: string;
    data: any;
    correctAnswer?: string;
    xpReward: number;
  };
  onNext: () => void;
}

// 🏗️ XÂY MỚI: Factory Component điều phối hiển thị loại câu hỏi
export const InteractionArea: React.FC<InteractionAreaProps> = ({ interaction, onNext }) => {
  switch (interaction.type) {
    case 'QUIZ':
      return (
        <QuizCard 
          interaction={interaction} 
          onNext={onNext} 
        />
      );
    case 'SHORT_ANSWER':
      return (
        <AnswerInput 
          interactionId={interaction.id}
          question={interaction.question}
          onNext={onNext}
        />
      );
    default:
      return <div className="text-error">Loại tương tác không hợp lệ</div>;
  }
};