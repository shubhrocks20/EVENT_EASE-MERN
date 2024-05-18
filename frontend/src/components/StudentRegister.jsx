import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    branch: "",  // Default value empty string
    rollNo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/register/student`,
        formData
      );
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      toast.error(`Failed Registering: ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 3000, // 1 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-[70%] mx-auto mt-2 p-4 bg-white shadow-md rounded-md">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="left flex-1">
          <img src="../../register.svg" alt="" className="w-4/5 rounded-md shadow-md object-cover"/>
        </div>
        <div className="right flex-1">
          <h2 className="text-3xl text-gray-600 font-bold mb-4 poppins-bold">Student Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 poppins-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 poppins-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 poppins-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-600 poppins-medium">
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
                required
              >
                <option value="">Select Branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Production Engineering">Production Engineering</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-600 poppins-medium">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white text-md poppins-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
