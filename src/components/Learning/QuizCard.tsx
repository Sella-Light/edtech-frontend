import React, { useState } from 'react';
import { Interaction } from '../../types/learning.types';
import { useLearningStore } from '../../stores/useLearningStore';

interface QuizCardProps {
  interaction: Interaction;
  onNext: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ interaction, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const completeInteraction = useLearningStore((state) => state.completeInteraction);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === interaction.correctAnswer;
    const earnedXP = isCorrect ? interaction.xpReward : 0;
    
    completeInteraction(interaction.id, earnedXP);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-t-4 border-blue-500">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{interaction.question}</h3>
      
      <div className="space-y-3">
        {interaction.data.options.map((option: string) => (
          <button
            key={option}
            disabled={isSubmitted}
            onClick={() => setSelectedOption(option)}
            className={`w-full p-3 text-left rounded-md border transition-all ${
              selectedOption === option 
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            Kiểm tra đáp án (AI)
          </button>
        ) : (
          <div className="flex w-full items-center justify-between animate-fade-in">
            <span className={selectedOption === interaction.correctAnswer ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {selectedOption === interaction.correctAnswer ? `+${interaction.xpReward} XP!` : "Tiếc quá, sai rồi!"}
            </span>
            <button
              onClick={onNext}
              className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900"
            >
              Tiếp theo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};