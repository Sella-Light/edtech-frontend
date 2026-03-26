import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearningState {
  xp: number;
  level: number;
  streak: number;
  currentLessonId: string | null;
  completedInteractionIds: string[];
  
  // Actions
  addXP: (amount: number) => void;
  completeInteraction: (id: string, xp: number) => void;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      streak: 0,
      currentLessonId: null,
      completedInteractionIds: [],

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1; // 100 XP mỗi level
        return { xp: newXP, level: newLevel };
      }),

      completeInteraction: (id, xp) => set((state) => ({
        completedInteractionIds: [...state.completedInteractionIds, id],
        xp: state.xp + xp,
        level: Math.floor((state.xp + xp) / 100) + 1
      })),

      resetProgress: () => set({ 
        xp: 0, 
        level: 1, 
        completedInteractionIds: [], 
        currentLessonId: null 
      }),
    }),
    { name: 'learning-progress' }
  )
);