import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Redux/Auth/loginSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/outline"; // Import icons

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/login/student`,
        formData
      );
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000, // 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        username: "",
        password: "",
      });
      dispatch(addUser(response.data.trueStudent));
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error(`Failed Signing In: ${error.response.data.message}`, {
        position: "top-right",
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
    <div className="font-[sans-serif] text-[#333] w-[55%] mx-auto h-full">
      <ToastContainer />
      <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-8 h-full shadow-xl">
        <div className="h-full flex items-center relative max-md:before:hidden ">
          <img
            src="../login.svg"
            className="rounded-md lg:w-4/5 md:w-11/12 animate-pulse    hover:animate-spin z-50 relative"
            alt="Dining Experience"
          />
        </div>
        <form
          className="max-w-lg max-md:mx-auto w-full p-6"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="text-4xl font-extrabold mb-10 poppins-bold">
              Student Login
            </h3>
          </div>
          <div>
            <label className="text-[15px] mb-3 block poppins-medium">
              Username
            </label>
            <div className="relative flex items-center">
              <input
                name="username"
                type="text"
                required
                className="w-full poppins-medium text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600"
                placeholder="Enter username"
                onChange={handleChange}
                value={formData.username}
              />
              <UserIcon className="w-[18px] h-[18px] absolute right-4" />
            </div>
          </div>
          <div className="mt-6">
            <label className="text-[15px] mb-3 block poppins-medium">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600 poppins-medium"
                placeholder="Enter password"
                onChange={handleChange}
                value={formData.password}
              />
              {showPassword ? (
                <EyeOffIcon
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeIcon
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white poppins-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
