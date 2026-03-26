// Xử lý các nghiệp vụ của giáo viên: Lưu câu hỏi và gửi điểm
import { Interaction, ApiResponse } from '../types/learning.types';

export const TeacherService = {
  /**
   * Lưu câu hỏi mới từ trình soạn thảo No-code
   */
  async saveInteraction(data: Partial<Interaction>): Promise<ApiResponse<Interaction>> {
    try {
      // Logic gọi API POST /interactions
      const response = await fetch('/api/teacher/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return { status: 'success', data: result.data, message: 'Lưu câu hỏi thành công' };
    } catch (error) {
      // ✅ Thay null bằng undefined để khớp với kiểu dữ liệu
      return { status: 'error', data: undefined, message: 'Không thể lưu câu hỏi' };
    }
  },

  /**
   * Giáo viên chấm điểm và gửi feedback cho bài tự luận
   */
  async submitGrade(submissionId: string, gradeData: { score: number; feedback: string }): Promise<ApiResponse<undefined>> {
    try {
      // Logic gọi API PATCH /submissions/:id
      await fetch(`/api/teacher/submissions/${submissionId}/grade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradeData),
      });
      return { status: 'success', data: undefined, message: 'Đã gửi điểm thành công' };
    } catch (error) {
      // ✅ Thay null bằng undefined
      return { status: 'error', data: undefined, message: 'Lỗi khi gửi điểm' };
    }
  }
};