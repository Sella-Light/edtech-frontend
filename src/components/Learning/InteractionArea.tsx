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
    lessonId: string; // ✅ Chốt hạ kiểu string
    xpReward: number;
  };
  onNext: () => void;
}

export const InteractionArea: React.FC<InteractionAreaProps> = ({ interaction, onNext }) => {
  switch (interaction.type) {
    case 'QUIZ':
      return <QuizCard interaction={interaction} onNext={onNext} />;
    case 'SHORT_ANSWER':
      return <AnswerInput interactionId={interaction.id} question={interaction.question} onNext={onNext} />;
    default:
      return <div className="text-red-500">Loại tương tác không hợp lệ</div>;
  }
};