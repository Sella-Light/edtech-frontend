import React from 'react';
import { OptionListProps } from './InteractionEditor.types';
import { Button } from '../../common/Button';

// Thành phần quản lý danh sách đáp án cho câu hỏi trắc nghiệm
export const OptionList: React.FC<OptionListProps> = ({ 
  options, 
  onChange, 
  correctAnswer, 
  onSelectCorrect 
}) => {
  const addOption = () => onChange([...options, '']);
  
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onChange(newOptions);
  };

  const removeOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-600">Danh sách đáp án</span>
        <Button variant="secondary" onClick={addOption}>+ Thêm lựa chọn</Button>
      </div>
      
      {options.map((opt, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input 
            type="radio" 
            name="correct-choice"
            checked={opt !== '' && opt === correctAnswer}
            onChange={() => onSelectCorrect(opt)}
            className="w-4 h-4 text-primary"
          />
          <input 
            type="text"
            value={opt}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Lựa chọn ${index + 1}`}
            className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-primary outline-none"
          />
          <button 
            onClick={() => removeOption(index)}
            className="text-error hover:bg-error/10 p-1 rounded"
          >
            ✕
          </button>
        </div>
      ))}
      {options.length === 0 && <p className="text-xs text-gray-400 italic text-center">Chưa có lựa chọn nào</p>}
    </div>
  );
};