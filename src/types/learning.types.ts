// Định nghĩa các thực thể trong hệ thống E-learning

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

// ✅ Hợp nhất GradingStatus: Chỉ giữ lại một cái đầy đủ nhất
export enum GradingStatus {
  PENDING = 'PENDING',            // Đang chờ chấm
  AI_GRADED = 'AI_GRADED',        // AI đã chấm xong
  MANUAL_GRADED = 'MANUAL_GRADED' // Giáo viên đã chấm xong
}

export type InteractionType = 'QUIZ' | 'SHORT_ANSWER' | 'DRAG_DROP' | 'FLIP_CARD';

export interface Interaction {
  id: string;
  lessonId: string;
  type: InteractionType;
  question: string;
  data: any;
  correctAnswer?: string;
  xpReward: number;
}

export interface Submission {
  id: string;
  userId: string;
  interactionId: string;
  answerContent: string;
  status: GradingStatus;
  score: number;
  earnedXP: number;
  teacherFeedback?: string;
  submittedAt: Date;
}