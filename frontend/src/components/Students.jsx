import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.login);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/students`
        );
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/list/student/delete/${studentId}`
      );
      if (response.status === 200) {
        console.log("Student deleted successfully");
        console.log("Deleted Student Details:", response.data.student);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/students`
        );
        setStudents(res.data);
        setFilteredStudents(res.data);
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error occurred while deleting student:", error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.branch.toLowerCase().includes(query)
    );
    setFilteredStudents(filteredData);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-xl">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 poppins-bold mb-2">
          Students List
        </h1>
        <p className="text-gray-500 text-md font-light text-center">
          Select any row to open DashBoard
        </p>
        <div className="flex justify-center mt-4 ">
          <input
            type="text"
            placeholder="Search by name or branch"
            className="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal poppins-medium">
          <thead>
            <tr className="text-gray-600 text-left">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Roll No
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold">
                Branch
              </th>
              {user?.role && (
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg uppercase font-semibold text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-50 hover:scale-105 hover:z-10 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  navigate("/studentDashboard", { state: { student } });
                }}
              >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap px-4">
                    {student.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {student.username}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {student.rollNo}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                  <p className="text-orange-500 whitespace-no-wrap">
                    {student.branch}
                  </p>
                </td>
                {user?.role && (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                    <div className="flex justify-center space-x-4 items-center">
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
