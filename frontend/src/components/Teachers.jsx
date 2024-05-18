import { useState, useEffect } from "react";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/teachers`
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/list/teacher/delete/${teacherId}`
      );
      if (response.status === 200) {
        console.log("Teacher deleted successfully");
        console.log("Deleted Teacher Details:", response.data.teacher);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/teachers`
        );
        setTeachers(res.data);
      } else {
        console.error("Failed to delete teacher");
      }
    } catch (error) {
      console.error("Error occurred while deleting teacher:", error.message);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-xl">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-8 poppins-bold">
        Teachers List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal poppins-medium">
          <thead>
            <tr className="text-gray-600 text-left">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                M-Code
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="hover:bg-gray-50 hover:scale-105 hover:z-10 transition-transform duration-300"
              >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap px-4">
                    {teacher.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {teacher.mCode}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {teacher.username}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <div className="flex justify-center space-x-4 items-center">
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                      onClick={() => handleDelete(teacher._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
