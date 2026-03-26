export const AIGradingService = {
  // Hàm mô phỏng AI phân tích câu trả lời của học sinh
  async analyzeAnswer(answerContent: string): Promise<{ suggestedScore: number; suggestedFeedback: string }> {
    console.log("[AI] Đang đọc bài làm...");
    
    // Giả lập thời gian AI suy nghĩ (1.5 giây)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content = answerContent.toLowerCase();

    // Logic chấm điểm đơn giản dựa trên từ khóa
    if (content.includes('lỗi') || content.includes('an toàn') || content.includes('type')) {
      return {
        suggestedScore: 90,
        suggestedFeedback: "✨ [AI Đánh giá]: Bài làm rất xuất sắc! Em đã nắm được ưu điểm cốt lõi của TypeScript là khả năng ép kiểu và bắt lỗi sớm (Type-checking) giúp code an toàn hơn. Rất đáng khen!"
      };
    } else if (content.length > 20) {
      return {
        suggestedScore: 75,
        suggestedFeedback: "✨ [AI Đánh giá]: Khá tốt! Câu trả lời có ý đúng nhưng em nên nhấn mạnh thêm vào tính năng phát hiện lỗi trước khi chạy (compile-time) của TypeScript nhé."
      };
    } else {
      return {
        suggestedScore: 50,
        suggestedFeedback: "✨ [AI Đánh giá]: Câu trả lời hơi ngắn và chưa đi vào trọng tâm kỹ thuật. Em hãy xem lại video bài giảng đoạn phút thứ 2 để hiểu rõ hơn về tính năng của TypeScript."
      };
    }
  }
};