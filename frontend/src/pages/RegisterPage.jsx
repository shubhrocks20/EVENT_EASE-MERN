import { useState } from "react";
import StudentRegister from "../components/StudentRegister";
import TeacherRegister from "../components/TeacherRegister";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const [showStudentRegister, setShowStudentRegister] = useState(true);
  const {user} = useSelector(state => state.reducer.login);
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-6 flex space-x-6">
        <a
          href="#"
          className={`px-6 py-3 rounded ${
            showStudentRegister
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setShowStudentRegister(true);
          }}
        >
          Student Register
        </a>
        <a
          href="#"
          className={`px-6 py-3 rounded ${
            showStudentRegister
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setShowStudentRegister(false);
          }}
        >
          Teacher Register
        </a>
      </div>

      {showStudentRegister ? <StudentRegister /> : <TeacherRegister />}
    </div>
  );
};

export default RegisterPage;
