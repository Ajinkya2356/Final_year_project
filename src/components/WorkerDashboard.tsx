import React, { useState, useEffect } from "react";
import { Stats } from "./WorkerStats";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
// Main Dashboard Component
const WorkerDashboard = () => {
  const [worker, setWorker] = useState({
    id: "W12345",
    name: "John Doe",
    profilePhoto:
      "https://via.placeholder.com/40", // Replace with actual image URL or a static image
  });

  const [inspections, setInspections] = useState([
    { id: 1, date: "2024-09-22", meterId: "MTR123", status: "Pass", fault: "", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    // Add more inspection entries as needed
  ]);

  const [isCapturing, setIsCapturing] = useState(false);
  const [inspectionStatus, setInspectionStatus] = useState<"Pass" | "Fail" | null>(null);
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Inspections",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        label: "Meter Status",
        data: [65, 35],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Real-time Trends",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Simulate inspection result after starting capture
  useEffect(() => {
    if (isCapturing) {
      // Simulate an async inspection process
      setTimeout(() => {
        const randomStatus = Math.random() > 0.5 ? "Pass" : "Fail";
        setInspectionStatus(randomStatus);
        setIsCapturing(false);
      }, 3000); // Simulate 3 second processing
    }
  }, [isCapturing]);

  // Handle start inspection button
  const startInspection = () => {
    setIsCapturing(true);
    setInspectionStatus(null); // Reset the status for a new inspection
  };

  return (
    <>
      <div className="container mx-auto  w-full ">
        <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center w-full">
          <div className="text-xl font-bold">Worker Dashboard</div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-white">{worker.name}</p>
              <p className="text-white text-sm">ID: {worker.id}</p>
            </div>
            <img
              src={worker.profilePhoto}
              alt="Worker Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </nav>
      </div>
      <div className="min-h-screen bg-gray-900 flex flex-1 flex-col w-full ">
        <div className="grid grid-cols-12 gap-4 p-6 w-full">
          <div className="col-span-12 w-full">
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <Stats />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 space-y-4 w-full">
            {/* Bar Graph */}
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2 bg-gray-800 p-3 rounded">Inspection Performance Over Time</h2>
              <div className="h-70 bg-gray-900 rounded mt-10 justify-center flex">
                <Bar data={barData} />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2 bg-gray-800 p-3 rounded">Meter Status Breakdown</h2>
              <div className="h-60 bg-gray-900 rounded flex justify-center mt-10">
                <Pie data={pieData} />
                <Pie data={pieData} />
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2 bg-gray-800 p-3 rounded">Real-time Trends</h2>
              <div className="h-70 bg-gray-900 rounded mt-10 flex justify-center">
                <Line data={lineData} />
              </div>
            </div>
          </div>

          {/* Live Camera Feed & Controls */}
          <div className="col-span-12 lg:col-span-4 space-y-4 w-full">
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2">Live Camera Feed</h2>
              <div className="h-48 bg-gray-300 rounded flex items-center justify-center">
                {isCapturing ? (
                  <span className="text-gray-600">Capturing...</span>
                ) : (
                  <span className="text-gray-600">Live Feed Placeholder</span>
                )}
              </div>
              <button
                onClick={startInspection}
                disabled={isCapturing}
                className={`mt-4 w-full p-2 rounded ${isCapturing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                  } text-white`}
              >
                {isCapturing ? "Processing..." : "Start Capture"}
              </button>
            </div>

            {/* Real-time Results */}
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2">Previous Inspection Results</h2>
              <div className="w-full">
                <div className="flex flex-col mx-2 p-4">
                  {inspections.map((inspection) => (
                    <div key={inspection.id} className="w-full p-2 mt-2 mb-2">
                      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full transform transition-transform hover:scale-105">
                        <img
                          src={inspection.imageUrl}
                          alt={`Meter ${inspection.meterId}`}
                          className="w-full h-50 object-cover rounded-t-lg mb-4"
                        />
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-lg">Meter ID :</span>
                            <span
                              className="font-semibold text-lg"
                            >
                              {inspection.meterId}
                            </span>
                          </div>
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-lg">Date :</span>
                            <span
                              className="font-semibold text-lg"
                            >
                              {inspection.date}
                            </span>
                          </div>
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-lg">Status :</span>
                            <span
                              className={`ml-2 px-3 py-1 rounded-full font-bold text-lg ${inspection.status === "Pass" ? "text-green-400" : "text-red-400"
                                }`}
                            >
                              {inspection.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default WorkerDashboard;
