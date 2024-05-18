import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Students from "../components/Students";
import Teachers from "../components/Teachers";
import Events from "../components/Events";

const AdminDashboad = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="flex min-h-screen h-full">
      <div className="bg-gray-800 w-64">
        <div className="p-4">
          <ul className="mt-4 text-2xl flex flex-col gap-5">
            <li
              onClick={() => setActiveItem(0)}
              className={`text-white cursor-pointer p-3 rounded-xl ${
                activeItem === 0 ? `bg-blue-500` : ``
              }`}
            >
              Dashboard
            </li>
            <li
              onClick={() => setActiveItem(1)}
              className={`text-white cursor-pointer p-3 rounded-xl ${
                activeItem === 1 ? `bg-blue-500` : ``
              }`}
            >
              Students
            </li>
            <li
              onClick={() => setActiveItem(2)}
              className={`text-white cursor-pointer p-3 rounded-xl ${
                activeItem === 2 ? `bg-blue-500` : ``
              }`}
            >
              Teachers
            </li>
            <li
              onClick={() => setActiveItem(3)}
              className={`text-white cursor-pointer p-3 rounded-xl ${
                activeItem === 3 ? `bg-blue-500` : ``
              }`}
            >
              Events
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-8">
          {activeItem === 0 && <Dashboard />}
          {activeItem === 1 && <Students />}
          {activeItem === 2 && <Teachers />}
          {activeItem === 3 && <Events />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboad;
