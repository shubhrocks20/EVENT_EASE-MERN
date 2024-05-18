/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserIcon,
  CalendarIcon,
  HomeIcon,
  ChartBarIcon,
  AcademicCapIcon,
  StarIcon,
} from "@heroicons/react/solid";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const StudentDashBoard = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState(0);
  const [selectedTab, setSelectedTab] = useState("participated");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const student = location.state?.student || {};
  let searchId = user._id;
  let current_name = user.name;

  let current_rollNo = user.rollNo;

  let current_branch = user.branch;
  if (student?.name) {
    searchId = student._id;
    current_name = student.name;
    current_rollNo = student.rollNo;
    current_branch = student.branch;
  }
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/student/event/attendance/${searchId}`
      )
      .then((res) => {
        setAttendedEvents(res.data.events);
      });
    axios.get(`${import.meta.env.VITE_BACKEND_URI}/${searchId}`).then((res) => {
      setParticipatedEvents(res.data.events);
    });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/count/all`)
      .then((res) => {
        setAllEvents(res.data.eventCount);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once all requests are completed
      });
  }, []);

  const COLORS = ["#0088FE", "#00C49F"];
  const pieChartData = [
    { name: "Total Events", value: allEvents },
    { name: "Participated Events", value: participatedEvents.length },
  ];
  const EventCard = ({ event }) => {
    return (
      <>
        <div
          key={event.id}
          className="bg-white p-4 rounded-lg shadow-lg  hover:shadow-2xl hover-scale-3d"
        >
          <div
            onClick={() => {
              navigate("/single", { state: { event } });
            }}
          >
            <h2 className="text-lg font-bold mb-2 poppins-semibold">
              {event.name}
            </h2>

            <p className="text-gray-600 mb-4 h-40 overflow-hidden poppins-medium">
              {event.description.substring(0, 100)}{" "}
              {/* Restricting description to first 100 characters */}
            </p>
            <img
              src={
                event.image ||
                "https://aestheticsforbirds.com/wp-content/uploads/2022/09/image-not-available.png"
              }
              alt={event.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="text-gray-500 mb-2 flex items-center poppins-bold text-md leading-4 tracking-wide">
              <span className="mr-1">
                <UserIcon className="h-5 w-5" />
              </span>
              Organiser:
              {" " + event.author.name}
            </p>
          </div>

          <div className="flex items-center text-gray-500 mb-4 poppins-bold">
            <CalendarIcon className="h-5 w-5 mr-1" />
            <p>
              Date:{" "}
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return <Loading />;
  }

  const getBadge = (attendedEvents) => {
    if (attendedEvents > 8) {
      return (
        <div className="flex items-center space-x-2">
          <AcademicCapIcon className="h-6 w-6 text-yellow-500" />
          <span className="text-yellow-500 font-bold poppins-bold">Expert</span>
        </div>
      );
    } else if (attendedEvents > 4) {
      return (
        <div className="flex items-center space-x-2">
          <StarIcon className="h-6 w-6 text-blue-500" />
          <span className="text-blue-500 font-bold poppins-bold">
            Moderator
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2">
          <StarIcon className="h-6 w-6 text-gray-400" />
          <span className="text-gray-400 font-bold poppins-bold">Newbie</span>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <svg
        onClick={() => {
          navigate(-1);
        }}
        className="w-6 h-6 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>

      <h1 className="text-4xl mt-6 font-bold mb-8 poppins-bold flex space-x-4 justify-center  items-center">
        {current_name.split(" ")[0]}'s DashBoard
        <HomeIcon className="icon w-8 text-red-500 h-fit ms-2" />
      </h1>
      {/* Tab buttons */}
      <div className="flex mb-6 justify-center items-center space-x-8 ">
        <button
          className={`px-4 py-2 rounded-t-lg poppins-bold text-lg ${
            selectedTab === "stats" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("stats")}
        >
          <ChartBarIcon className="h-5 w-5 mr-2 inline-block" />
          Stats
        </button>
        <button
          className={`px-4 py-2 poppins-bold text-lg rounded-t-lg ${
            selectedTab === "participated"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("participated")}
        >
          Participated Events: {participatedEvents.length}
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg poppins-bold text-lg ${
            selectedTab === "attended"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("attended")}
        >
          Attended Events: {attendedEvents.length}
        </button>
      </div>
      <hr className="mx-auto my-4 " />

      {/* Conditional rendering based on selected tab */}
      <div className="bg-white shadow-md rounded-b-md p-4">
        {selectedTab === "participated" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participatedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : selectedTab === "attended" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-md rounded-md p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-2xl font-bold mb-4 poppins-bold">
                  Student Information
                </h2>
                <div className="flex items-center mb-2">
                  <UserIcon className="h-6 w-6 mr-2 text-gray-500" />
                  <span className="font-bold poppins-bold">{current_name}</span>
                </div>
                <div className="flex items-center mb-2">
                  <AcademicCapIcon className="h-6 w-6 mr-2 text-gray-500" />
                  <span className="poppins-medium">{current_branch}</span>
                </div>
                <div className="flex items-center mb-2">
                  <AcademicCapIcon className="h-6 w-6 mr-2 text-gray-500" />
                  <span className="poppins-medium">{current_rollNo}</span>
                </div>
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-6 w-6 mr-2 text-gray-500" />
                  <span className="poppins-medium">
                    Attended Events: {attendedEvents.length}
                  </span>
                </div>
                {getBadge(attendedEvents.length)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashBoard;
