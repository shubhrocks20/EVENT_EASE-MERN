import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditStudent = () => {
  return (
    <div className="w-[70%] mx-auto mt-12 p-4 bg-white shadow-md rounded-md">
       <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="left flex-1">
           <img src="../../register.svg" alt="" className="w-4/5 rounded-md shadow-md object-cover"/>

        </div>
        <div className="right flex-1">
      <h2 className="text-3xl text-gray-600 font-bold mb-4 poppins-bold">Update Student Deatils</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600 poppins-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
            className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 poppins-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
            required
          />
        </div> */}

        <div className="mb-4">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-600 poppins-medium">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            className="mt-1 p-2 w-full border rounded-md poppins-medium text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-600 poppins-medium">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
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
  )
}

export default EditStudent
