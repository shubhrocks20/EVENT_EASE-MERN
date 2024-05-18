import { useState } from "react"; // Import useState hook
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import { AiOutlineUpload } from "react-icons/ai"; // Import the upload icon
import Loading from "../components/Loading";

const Events = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.author = user._id;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("eventDate", data.eventDate);
      formData.append("author", data.author);
      if (data.image) {
        for (let i = 0; i < data.image.length; i++) {
          formData.append("image", data.image[i]);
        }
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Event Posted Successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333] w-[70%] mx-auto h-full mt-10 border-t-2 rounded-md">
      <ToastContainer />
      <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-24 h-full shadow-xl p-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-4">
            <FaSpinner className="animate-spin h-10 w-10 text-blue-500" />
            <p className="text-blue-500 font-semibold">Creating Event...</p>
          </div>
        ) : (
          <>
            <div className="h-full flex items-center relative max-md:before:hidden animate-pulse">
              <img
                src="../../event organizer.jpg"
                alt=""
                className="rounded-lg lg:w-full md:w-11/12 z-50 relative"
              />
            </div>
            <div className="w-full p-6">
              <h2 className="text-3xl poppins-bold font-bold mb-4 text-center">
                Organize an Event
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-md poppins-medium font-semibold text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="border border-gray-300 poppins-medium rounded-md px-4 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-md poppins-medium font-semibold text-gray-600"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    {...register("description")}
                    className="border border-gray-300 rounded-md poppins-medium px-4 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-md poppins-medium font-semibold text-gray-600"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    {...register("eventDate")}
                    className="border border-gray-300 rounded-md poppins-medium px-4 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-md font-semibold poppins-medium text-gray-600"
                  >
                    Image
                  </label>
                  <div className="relative border border-gray-300 rounded-md px-4 py-2 mt-1 w-full focus-within:border-blue-300">
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => {
                        setValue("image", e.target.files);
                        setSelectedImage(e.target.files[0].name);
                      }}
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex justify-between items-center">
                      <span>{selectedImage || "Choose File"}</span>
                      <AiOutlineUpload className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 poppins-bold mt-4 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
