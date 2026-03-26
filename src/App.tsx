import React, { useState } from "react";
import { TeacherDashboard } from "./components/Teacher/TeacherDashboard";
import { StudentDashboard } from "./components/Student/StudentDashboard";

const App = () => {
  // Biến trạng thái để chuyển đổi Role (Giáo viên / Học sinh)
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <>
      {/* Nút chuyển đổi Role nhanh dành cho Dev (Sẽ ẩn khi lên production) */}
      <div className="fixed bottom-4 right-4 z-[9999] bg-slate-900 text-white p-2 rounded-xl shadow-2xl flex gap-2 text-sm font-medium">
        <button 
          onClick={() => setRole('teacher')}
          className={`px-4 py-2 rounded-lg transition-all ${role === 'teacher' ? 'bg-primary' : 'hover:bg-slate-700'}`}
        >
          👨‍🏫 Giáo viên
        </button>
        <button 
          onClick={() => setRole('student')}
          className={`px-4 py-2 rounded-lg transition-all ${role === 'student' ? 'bg-success' : 'hover:bg-slate-700'}`}
        >
          🧑‍🎓 Học sinh
        </button>
      </div>

      {/* Render giao diện tương ứng */}
      {role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
    </>
  );
};

export default App;