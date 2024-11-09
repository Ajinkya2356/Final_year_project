import { useEffect, useRef } from "react";
import Stats from "./WorkerStats";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyInspections } from "../slices/inspectionSlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInspections());
  }, [dispatch])
  const navigate = useNavigate();


  const { inspections, inspectionsLoading } = useSelector((state: any) => state.inspection);


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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
                  {inspectionsLoading ? <h1>Loading...</h1> : inspections.map((inspection) => (
                    <div key={inspection.id} className="w-56 mx-4 p-2">
                      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full transform transition-transform hover:scale-105 ">
                        <img
                          src={inspection?.meter_details?.photo}
                          alt={`Meter ${inspection?.meter_details?.serial_no}`}
                          className="w-full h-50 object-cover rounded-t-lg mb-4"
                        />
                        <div className="bg-gray-800 rounded-lg transform transition-transform hover:scale-105">
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-sm">Serial No. : </span>
                            <span
                              className="font-semibold text-sm"
                            >
                              {inspection?.meter_details?.serial_no}
                            </span>
                          </div>
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-sm">Date:</span>
                            <span
                              className="font-semibold text-sm"
                            >
                              {formatDate(inspection?.date)}
                            </span>
                          </div>
                          <div className="text-white mb-4 flex items-center justify-between">
                            <span className="font-semibold text-sm">Status :</span>
                            <span
                              className={`ml-2 px-3 py-1 rounded-full font-bold text-sm ${inspection?.status === "Pass" ? "text-green-400" : "text-red-400"
                                }`}
                            >
                              {inspection?.status}
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
              <div className="h-96 bg-gray-300 rounded flex items-center justify-center">

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
