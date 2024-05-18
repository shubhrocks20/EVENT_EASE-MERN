import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

const Dashboard = () => {
  const [counts, setCounts] = useState(null);
  const colors = [
    "#FF6B6B",
    "#48BB78",
    "#81E6D9",
    "#63B3ED",
    "#FBD38D",
    "#F6E05E",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/count/all`
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto bg-gray-100 p-8">
      {counts ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Students</h2>
            <p className="text-4xl font-bold">{counts.studentCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Teachers</h2>
            <p className="text-4xl font-bold">{counts.teacherCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-3xl font-bold mb-2 cursor-pointer">
              Total Events
            </h2>
            <p className="text-4xl font-bold">{counts.eventCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-4xl font-bold">{counts.upcomingEventsCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center flex flex-col">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Students by Branch
            </h2>
            <div className="flex flex-row justify-center items-center">
              <div className="col-span-2 md:col-span-3">
                <div style={{ height: "300px" }}>
                  <PieChart
                    data={Object.entries(counts.branchCounts).map(
                      ([branch, count], index) => ({
                        title: branch,
                        value: count,
                        color: colors[index % colors.length],
                      })
                    )}
                    labelStyle={{
                      fontSize: "14px",
                      fontFamily: "cursive",
                    }}
                    lineWidth={30}
                    labelPosition={112}
                    animate
                    startAngle={270}
                    radius={42}
                  />
                </div>
              </div>
              <div className="mt-4 ml-4 flex justify-center items-center">
                <ul className="flex flex-col items-start">
                  {Object.entries(counts.branchCounts).map(
                    ([branch, count], index) => (
                      <li key={branch} className="flex items-center">
                        <span
                          className="inline-block w-4 h-4 mr-2"
                          style={{
                            backgroundColor: colors[index % colors.length],
                          }}
                        ></span>
                        <span className="text-sm">
                          {branch}: ({count})
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
