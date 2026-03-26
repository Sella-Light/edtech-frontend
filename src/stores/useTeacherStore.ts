// Quản lý trạng thái bài nộp và danh sách câu hỏi trong phiên làm việc của giáo viên
import { create } from 'zustand';
import { Submission, Interaction } from '../types/learning.types'; // Dùng đường dẫn tương đối cho an toàn

interface TeacherState {
  pendingSubmissions: Submission[];
  interactions: Interaction[];
  isLoading: boolean;
  
  // Actions
  setPendingSubmissions: (submissions: Submission[]) => void;
  removeSubmissionFromQueue: (id: string) => void;
  addInteraction: (interaction: Interaction) => void;
  setLoading: (status: boolean) => void;
  
  // 🌟 THÊM MỚI: Hàm để học sinh đẩy bài nộp vào hàng đợi
  addSubmission: (submission: Submission) => void;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  pendingSubmissions: [],
  interactions: [],
  isLoading: false,

  setPendingSubmissions: (submissions) => set({ pendingSubmissions: submissions }),
  removeSubmissionFromQueue: (id) => set((state) => ({
    pendingSubmissions: state.pendingSubmissions.filter(s => s.id !== id)
  })),
  addInteraction: (interaction) => set((state) => ({
    interactions: [interaction, ...state.interactions]
  })),
  setLoading: (status) => set({ isLoading: status }),
  
  // 🌟 THÊM MỚI: Logic nối bài nộp mới vào mảng dữ liệu hiện tại
  addSubmission: (submission) => set((state) => ({
    pendingSubmissions: [...state.pendingSubmissions, submission]
  })),
}));