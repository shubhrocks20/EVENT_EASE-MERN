import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  CalendarIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import Loading from "../components/Loading";

const Archive = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();
    const results = allEvents.filter((item) => {
      const lowercaseName = item.name.toLowerCase();
      const lowercaseDescription = item.description.toLowerCase();
      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseDescription.includes(lowercaseQuery)
      );
    });
    setEvents(results);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    const sortedEvents = [...allEvents].sort((a, b) => {
      if (order === "newest") {
        return new Date(b.eventDate) - new Date(a.eventDate);
      } else if (order === "oldest") {
        return new Date(a.eventDate) - new Date(b.eventDate);
      }
      return 0;
    });
    setEvents(sortedEvents);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/events`
        );
        setAllEvents(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleNavigate = async (id, author) => {
    try {
      navigate(`/listOfParticipants/${id}/${author}`);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container p-8 text-gray-800">
      <div className="flex flex-col justify-between space-y-6 mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-500 to-blue-700 ">
          Welcome
          {user
            ? user.name === "Student"
              ? ", Admin!"
              : ", " + user.name + " !"
            : ", Guest 1 !"}
        </h1>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-500 to-blue-700 ">
          Here are the Events that have already been organized
        </h2>
      </div>

      <div className="flex items-center mb-6 w-full md:w-3/4 lg:w-1/2 ">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            placeholder="Search events by title or description..."
            className="w-full p-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="ml-4 flex space-x-2">
          <button
            className={`flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-medium rounded-lg text-sm px-3 py-2 ${
              sortOrder === "newest" ? "bg-blue-600" : ""
            }`}
            onClick={() => handleSortOrder("newest")}
          >
            <SortDescendingIcon className="h-5 w-5 mr-1" />
            Newest
          </button>
          <button
            className={`flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-medium rounded-lg text-sm px-3 py-2 ${
              sortOrder === "oldest" ? "bg-blue-600" : ""
            }`}
            onClick={() => handleSortOrder("oldest")}
          >
            <SortAscendingIcon className="h-5 w-5 mr-1" />
            Oldest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const now = new Date();
          const eventDate = new Date(event.eventDate);
          if (eventDate > now) {
            return null;
          }
          return (
            <div
              key={event._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover-scale-3d "
            >
              <div onClick={() => navigate("/single", { state: { event } })}>
                <h2 className="text-xl font-bold mb-2 poppins-semibold">
                  {event.name}
                  {event.author === user?._id && (
                    <span className="text-green-500 ml-2">Organizer</span>
                  )}
                </h2>
                <p className="text-gray-600 mb-4 h-40 overflow-hidden poppins-medium">
                  {event.description.substring(0, 100)}
                </p>
                <img
                  src={event.image || "https://via.placeholder.com/150"}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-gray-500 mb-2 flex items-center poppins-bold text-md leading-4 tracking-wide">
                  <span className="mr-1">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  Organiser: {" " + event.author.name}
                </p>
              </div>
              <div className="flex flex-col justify-between items-start">
                <div className="flex items-center text-gray-500 mb-4 poppins-bold">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  <p>
                    Date:{" "}
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex space-x-2 poppins-medium">
                  {user ? (
                    <button
                      className="flex items-center justify-center text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring focus:border-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out"
                      onClick={() => handleNavigate(event._id, event.author)}
                    >
                      <UserIcon className="h-5 w-5 mr-1" />
                      List of Participants
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring focus:border-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out"
                      onClick={() => navigate("/login")}
                    >
                      <UserIcon className="h-5 w-5 mr-1" />
                      Please login to Participate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;
