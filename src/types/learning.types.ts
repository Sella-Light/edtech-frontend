// Định nghĩa các thực thể trong hệ thống E-learning
// Thêm interface này vào đầu file
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export enum GradingStatus {
  PENDING = 'PENDING',
  GRADED = 'GRADED'
}
// ... giữ nguyên các đoạn code cũ bên dưới ...
export type InteractionType = 'QUIZ' | 'SHORT_ANSWER' | 'DRAG_DROP' | 'FLIP_CARD';

export enum GradingStatus {
  PENDING = 'PENDING',        // Đang chờ chấm
  AI_GRADED = 'AI_GRADED',    // AI đã chấm xong
  MANUAL_GRADED = 'MANUAL_GRADED' // Giáo viên đã chấm xong
}

export interface Interaction {
  id: string;
  lessonId: string;
  type: InteractionType;
  question: string;
  data: any;                  // Cấu hình riêng (options, pairs...) - Sẽ định nghĩa chi tiết ở GĐ2
  correctAnswer?: string;     // Dùng cho AI matching
  xpReward: number;           // Điểm XP thưởng
}

export interface Submission {
  id: string;
  userId: string;
  interactionId: string;
  answerContent: string;
  status: GradingStatus;
  score: number;              // Thang điểm 0-100
  earnedXP: number;           // XP thực tế nhận được
  teacherFeedback?: string;   // Nhận xét của giáo viên
  submittedAt: Date;
}