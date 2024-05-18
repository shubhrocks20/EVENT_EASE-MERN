import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = events.filter((item) => {
      const lowercaseName = item.name.toLowerCase();
      const lowercaseDescription = item.description.toLowerCase();
      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseDescription.includes(lowercaseQuery)
      );
    });
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/events`
        );
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/list/event/delete/${eventId}`
      );
      if (response.status === 200) {
        console.log("Event deleted successfully");
        console.log("Deleted Event Details:", response.data.event);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/list/events`
        );
        setEvents(res.data);
        setFilteredEvents(res.data);
      } else {
        console.error("Failed to delete Event");
      }
    } catch (error) {
      console.error("Error occurred while deleting Event:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Events List
      </h1>

      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search events..."
          className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              src={event.image || "https://via.placeholder.com/400x200"}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div
              className="p-4 cursor-pointer"
              onClick={() => {
                navigate("/single", { state: { event } });
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="flex items-center text-gray-500 mb-4">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span>
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                onClick={() => {
                  handleDelete(event._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
