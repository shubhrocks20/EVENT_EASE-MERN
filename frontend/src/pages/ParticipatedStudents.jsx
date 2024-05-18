import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ParticipatedStudents = () => {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.reducer.login);
  const { id, author } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/event/${id}`
        );
        setParticipants(response.data.participants);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/event/${id}/getWinners`
        );
        setWinners(res.data.winners);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false); // Mark loading as false when fetch completes (whether success or error)
      }
    };

    fetchData();
  }, [id]);

  const handleAttendance = async (studentId) => {
    try {
      // Implement your logic to mark attendance
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/event/${id}/attendance`,
        JSON.stringify({ studentId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // If the attendance is successfully marked, update the UI or state accordingly
      // For example, you can reload the participants data after marking attendance
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/event/${id}`
      );
      setParticipants(response.data.participants);
    } catch (error) {
      console.error("Error marking attendance:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  // Define other functions like handleUnmark and handleWinner similarly...
  
  if (loading) {
    return <Loading />;
  }

  if (participants.length <= 0) {
    return (
      <>
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-center">
          <svg
            onClick={() => {
              navigate(-1);
            }}
            className="w-6 h-6"
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
          <div className="flex flex-col space-y-10 items-center justify-between">
            <h1 className="text-center poppins-semibold text-3xl">
              No Students Participated!
            </h1>
            <img src="../../empty.jpeg" className="w-[50%]" alt="" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto mt-8">
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
      <h1 className="text-2xl mb-4 poppins-semibold ms-2">
        List of Participated Students
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants.map((student) => (
          <div
            key={student.username}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">{student.name}</h2>
            <p className="text-gray-600 mb-4">{`Username: ${student.username}`}</p>
            <p className="text-gray-600 mb-4">{`Roll No: ${student.rollNo}`}</p>
            <p className="text-gray-600 mb-4">{`Branch: ${student.branch}`}</p>
            <p className="text-gray-600 mb-4">{`Badge: ${student.badge}`}</p>
            {user.mCode || user.role ? (
              <>
                {(user.mCode && user._id === author) || user.role ? (
                  student.attendence.includes(id) ? (
                    <button
                      className="bg-red-600 px-4 py-2 rounded-lg text-md poppins-medium text-white hover:bg-red-800"
                      onClick={() => {
                        handleUnmark(student._id);
                      }}
                    >
                      Attendance Marked!
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 px-4 py-2 rounded-lg text-md poppins-medium text-white hover:bg-blue-900"
                      onClick={() => {
                        handleAttendance(student._id);
                      }}
                    >
                      Mark Attendance
                    </button>
                  )
                ) : null}
                {(user.mCode && user._id === author) || user.role ? (
                  winners.includes(student._id) ? (
                    <button className="ms-4 bg-red-600 px-4 py-2 rounded-lg text-white poppins-medium">
                      Winner 👑
                    </button>
                  ) : (
                    <button
                      className="ms-4 bg-green-400 px-4 py-2 rounded-lg text-white poppins-medium"
                      onClick={() => {
                        handleWinner(student._id);
                      }}
                    >
                      Mark Winner
                    </button>
                  )
                ) : null}
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatedStudents;
