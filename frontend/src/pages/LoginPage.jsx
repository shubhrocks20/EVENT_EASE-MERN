import { useState } from "react";
import StudentLogin from "../components/StudentLogin";
import TeacherLogin from "../components/TeacherLogin";

const LoginPage = () => {
  const [showStudentLogin, setShowStudentLogin] = useState(true);

  return (
    <div className="flex flex-col items-center mt-6 h-screen">
      <div className="mb-2">
        <button
          onClick={() => setShowStudentLogin(true)}
          className={`px-6 py-3 me-2 rounded poppins-medium  ${
            showStudentLogin
              ? "bg-indigo-500 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          Student Login
        </button>
        <button
          onClick={() => setShowStudentLogin(false)}
          className={`px-6 py-3 rounded poppins-medium ${
            showStudentLogin
              ? "bg-gray-300 text-gray-600"
              : "bg-indigo-500 text-white"
          }`}
        >
          Teacher Login
        </button>
      </div>

      {showStudentLogin ? <StudentLogin /> : <TeacherLogin />}
    </div>
  );
};

export default LoginPage;
