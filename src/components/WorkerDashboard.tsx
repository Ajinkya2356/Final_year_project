import Stats from "./WorkerStats";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useNavigate } from "react-router-dom";
import PreviousInspections from "./PreviousInspections";

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

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const startInspection = () => {
    navigate('/checkpoints');
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
            <PreviousInspections />
          </div>

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
          </div>
        </div>
      </div >
    </>

  );
};

export default WorkerDashboard;
