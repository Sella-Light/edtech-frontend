import { Interaction, Submission } from '../types/learning.types';

// Hợp đồng cho lớp Data, đảm bảo tính dễ dàng mở rộng cho người không biết code
export interface ILearningRepository {
  // Dành cho giáo viên/admin (Quản lý bài học)
  createInteraction(data: Omit<Interaction, 'id'>): Promise<Interaction>;
  updateInteraction(id: string, data: Partial<Interaction>): Promise<Interaction>;
  getPendingSubmissions(): Promise<Submission[]>;

  // Dành cho học sinh
  getInteractionsByLesson(lessonId: string): Promise<Interaction[]>;
  submitAnswer(submission: Omit<Submission, 'id' | 'status' | 'submittedAt'>): Promise<Submission>;
  
  // Dành cho hệ thống chấm điểm (Hybrid)
  updateSubmissionStatus(id: string, update: Partial<Submission>): Promise<void>;
}