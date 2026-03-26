// Dữ liệu giả lập để kiểm tra luồng vận hành Giai đoạn 2 & 3
import { Interaction, Submission, GradingStatus } from '../types/learning.types';

export const MOCK_INTERACTIONS: Interaction[] = [
  {
    id: 'int_001',
    lessonId: 'lesson_1',
    type: 'QUIZ',
    question: 'Framework nào sau đây là của Facebook?',
    data: { options: ['Angular', 'React', 'Vue', 'Svelte'] },
    correctAnswer: 'React',
    xpReward: 10
  },
  {
    id: 'int_002',
    lessonId: 'lesson_1',
    type: 'SHORT_ANSWER',
    question: 'Hãy nêu cảm nghĩ của bạn về TypeScript.',
    data: {},
    xpReward: 20
  }
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_001',
    userId: 'student_99',
    interactionId: 'int_002',
    answerContent: 'TypeScript giúp code an toàn hơn nhờ tính năng ép kiểu mạnh mẽ, giảm thiểu lỗi runtime.',
    status: GradingStatus.PENDING,
    score: 0,        // Bổ sung thêm các trường còn thiếu để khớp với interface Submission
    earnedXP: 0,
    submittedAt: new Date() // ✅ Để nguyên đối tượng Date, không dùng toISOString()
  },
  {
    id: 'sub_002',
    userId: 'student_88',
    interactionId: 'int_002',
    answerContent: 'Tôi thấy nó hơi rắc rối lúc đầu nhưng về sau rất đáng để học.',
    status: GradingStatus.PENDING,
    score: 0,
    earnedXP: 0,
    submittedAt: new Date(Date.now() - 3600000) // ✅ Dùng Date chuẩn
  }
];