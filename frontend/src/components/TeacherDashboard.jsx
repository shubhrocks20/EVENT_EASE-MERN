import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserIcon, CalendarIcon, HomeIcon,ChartBarIcon, AcademicCapIcon } from '@heroicons/react/solid';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useNavigate} from 'react-router-dom'
const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [eventOrganized, setEventOrganized] = useState([]);
  const [allEvents, setAllEvents] = useState(0);
  const [selectedTab, setSelectedTab] = useState('eventOrganized');
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/event/teacher/${user._id}`)
      .then((res) => {
        setEventOrganized(res.data);
      });
    axios.get(`${import.meta.env.VITE_BACKEND_URI}/count/all`).then((res) => {
      setAllEvents(res.data.eventCount);
    });
  }, []);
  const listOfStudents = async (id, author) => {
    try {
      author = author._id

      navigate(`/listOfParticipants/${id}/${author}`);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  

  
  const COLORS = ['#0088FE', '#00C49F'];
  const pieChartData = [
    { name: 'Total Events', value: allEvents },
    { name: 'Organized Events', value: eventOrganized.length },
  ]; 
const EventCard = ({event}) => {
  return (
    <>
    <div key={event.id} className="bg-white p-4 rounded-lg shadow-lg  hover:shadow-2xl hover-scale-3d">
    <div onClick={()=>{navigate('/single', {state: {event}})}}>
       <h2 className="text-lg font-bold mb-2 poppins-semibold">
        {event.name}

      </h2>
                
                <p className="text-gray-600 mb-4 h-40 overflow-hidden poppins-medium">
                  {event.description.substring(0, 100)} {/* Restricting description to first 100 characters */}
                </p>
                <img src={event.image || "https://aestheticsforbirds.com/wp-content/uploads/2022/09/image-not-available.png"} alt={event.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <p className="text-gray-500 mb-2 flex items-center poppins-bold text-md leading-4 tracking-wide">
                  <span className="mr-1"><UserIcon className="h-5 w-5" /></span>
                  Organiser: 
                  {" " + event.author.name}
                </p>
            </div>
                
              <div className="flex items-center text-gray-500 mb-4 poppins-bold">
                <CalendarIcon className="h-5 w-5 mr-1" />
                <p>Date: {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <button className="flex items-center justify-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring focus:border-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={() => listOfStudents(event._id, event.author)}>
                    <UserIcon className="h-5 w-5 mr-1" />
                    List of Participants
                  </button>
    </div>
    </>
  )
}



  return (
    <div className="container mx-auto p-4">
      
      <h1 className="text-4xl mt-6 font-bold mb-8 poppins-bold flex space-x-4 justify-center  items-center">
  {user.name}  DashBoard 
  <HomeIcon className="icon w-8 text-red-500 h-fit ms-2" />
</h1>
      {/* Tab buttons */}
      <div className="flex mb-6 justify-center items-center space-x-8 ">
      <button
        className={`px-4 py-2 rounded-t-lg poppins-bold text-lg ${selectedTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setSelectedTab('stats')}
      >
        <ChartBarIcon className="h-5 w-5 mr-2 inline-block" />
        Stats
      </button>
        <button
          className={`px-4 py-2 poppins-bold text-lg rounded-t-lg ${selectedTab === 'eventOrganized' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('eventOrganized')}
        >
          Event Organized: {eventOrganized.length}
        </button>
       
      </div>
      <hr className="mx-auto my-4 "/>

      {/* Conditional rendering based on selected tab */}
      <div className="bg-white shadow-md rounded-b-md p-4">
        {selectedTab === 'eventOrganized' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventOrganized.map((event) => (
              
                <EventCard event={event} />
              
            ))}
          </div>
        ) :(
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </ResponsiveContainer>
          </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-2xl font-bold mb-4 poppins-bold">
                Teacher Information
              </h2>
              <div className="flex items-center mb-2">
                <UserIcon className="h-6 w-6 mr-2 text-gray-500" />
                <span className="font-bold poppins-bold">{user.name}</span>
              </div>
              <div className="flex items-center mb-2">
                <AcademicCapIcon className="h-6 w-6 mr-2 text-gray-500" />
                <span className="poppins-medium">MCODE: {user.mCode}</span>
              </div>
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-6 w-6 mr-2 text-gray-500" />
                <span className="poppins-medium">
                  Organized Events: {eventOrganized.length}
                </span>
              </div>
              
            </div>
          </div>
        
          
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
