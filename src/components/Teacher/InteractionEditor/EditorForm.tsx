import React from 'react';
import { EditorState } from './InteractionEditor.types';
import { OptionList } from './OptionList';

interface EditorFormProps {
  state: EditorState;
  onChange: (newState: Partial<EditorState>) => void;
}

export const EditorForm: React.FC<EditorFormProps> = ({ state, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-caption font-bold mb-2 uppercase text-gray-500 tracking-wide">
            Phần thưởng XP
          </label>
          <input 
            type="number" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={state.xpReward}
            onChange={(e) => onChange({ xpReward: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-caption font-bold mb-2 uppercase text-gray-500 tracking-wide">
            Loại câu hỏi
          </label>
          <select 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={state.type} 
            disabled
          >
            <option value="QUIZ">Trắc nghiệm</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-caption font-bold mb-2 uppercase text-gray-500 tracking-wide">
          Nội dung câu hỏi
        </label>
        <textarea 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[120px] transition-all"
          value={state.question}
          placeholder="Nhập nội dung câu hỏi tại đây..."
          onChange={(e) => onChange({ question: e.target.value })}
        />
      </div>

      <OptionList 
        options={state.options}
        onChange={(opts) => onChange({ options: opts })}
        correctAnswer={state.correctAnswer}
        onSelectCorrect={(ans) => onChange({ correctAnswer: ans })}
      />
    </div>
  );
};