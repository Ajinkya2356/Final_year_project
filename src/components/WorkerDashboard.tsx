import { useRef } from "react";
import { Stats } from "./WorkerStats";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();


  const inspections = [
    { id: 1, date: "2024-09-22", meterId: "MTR123", status: "Pass", fault: "", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" },
    { id: 2, date: "2024-09-21", meterId: "MTR124", status: "Fail", fault: "Segment 3 Error", imageUrl: "https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" }
    // Add more inspection entries as needed
  ];


  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const startInspection = () => {
    navigate('/list');
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };



  return (
    <>

      <div className="min-h-screen bg-gray-900 flex flex-1 flex-col w-full ">
        <div className="grid grid-cols-12 gap-4 p-6 w-full">
          <div className="col-span-12 lg:col-span-8 space-y-4 w-full">
            <div className="col-span-12 lg:col-span-8 w-full">
              <div className="bg-gray-900 p-4 shadow-md rounded-md ">
                <Stats />
              </div>
            </div>
            <div className="bg-gray-900 p-4 shadow-md rounded-md flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-2 bg-gray-800 p-2 rounded-md">Previous Inspection Results</h2>

              <div className="relative w-full px-2">
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 mx-2 rounded-full shadow-md focus:outline-none"
                >
                  &lt;
                </button>
                <div ref={scrollContainerRef} className="flex mx-10 p-4 
                overflow-x-hidden overflow-x-auto whitespace-nowrap ">
                  {inspections.map((inspection) => (
                    <div key={inspection.id} className="w-56 mx-4 p-2">
                      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full transform transition-transform hover:scale-105 ">
                        <img
                          src={inspection.imageUrl}
                          alt={`Meter ${inspection.meterId}`}
                          className="w-full h-50 object-cover rounded-t-lg mb-4"
                        />
                        <div className="bg-gray-800 rounded-lg transform transition-transform hover:scale-105">
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
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 focus:outline-none"
                >
                  &gt;
                </button>
              </div>

            </div>
          </div>

          {/* Live Camera Feed & Controls */}
          <div className="col-span-12 lg:col-span-4 space-y-4 w-full">
            <div className="bg-gray-900 p-4 shadow-md rounded-md w-full">
              <h2 className="text-lg font-semibold mb-2">Live Camera Feed</h2>
              <div className="h-48 bg-gray-300 rounded flex items-center justify-center">

                <span className="text-gray-600">Live Feed Placeholder</span>

              </div>
              <button
                onClick={startInspection}

                className="mt-4 w-full p-2 rounded bg-green-500 hover:bg-green-600
                  text-white"
              >
                Start Capture
              </button>
            </div>

            {/* Real-time Results */}

          </div>
        </div>
      </div >
    </>

  );
};

export default WorkerDashboard;
