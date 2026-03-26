import { User, UserRole } from '../types/auth.types';

// Service tập trung quản lý logic phân quyền
export const AccessControlService = {
  // Kiểm tra quyền chấm bài
  canGrade: (user: User | null): boolean => {
    return user?.role === UserRole.TEACHER || user?.role === UserRole.ADMIN;
  },

  // Kiểm tra quyền biên soạn nội dung (No-code CMS)
  canManageContent: (user: User | null): boolean => {
    return user?.role === UserRole.TEACHER || user?.role === UserRole.ADMIN;
  },

  // Kiểm tra quyền thực hiện bài học
  canStudy: (user: User | null): boolean => {
    return user?.role === UserRole.STUDENT;
  },

  // Trả về Dashboard tương ứng với Role
  getHomeRoute: (role: UserRole): string => {
    const routes = {
      [UserRole.STUDENT]: '/student/dashboard',
      [UserRole.TEACHER]: '/teacher/dashboard',
      [UserRole.ADMIN]: '/admin/dashboard',
    };
    return routes[role];
  }
};