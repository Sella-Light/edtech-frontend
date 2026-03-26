import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
      <div 
        className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
        style={{ width: `${percentage}%` }}
      >
        {percentage > 10 && (
          <span className="text-[10px] text-white font-bold">{percentage}%</span>
        )}
      </div>
    </div>
  );
};