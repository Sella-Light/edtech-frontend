import { InteractionType } from '@/types/learning.types';

export interface EditorState {
  type: InteractionType;
  question: string;
  xpReward: number;
  options: string[];
  correctAnswer: string;
}

export interface OptionListProps {
  options: string[];
  onChange: (options: string[]) => void;
  correctAnswer: string;
  onSelectCorrect: (answer: string) => void;
}