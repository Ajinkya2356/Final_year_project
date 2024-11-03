import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface AdminSideBarProps {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ selectedComponent, setSelectedComponent }) => {
  return (
    <div className="bg-gray-800 text-white flex flex-col fixed left-0 h-full" style={{width:'15%', overflowY: 'hidden', margin: '0 auto', }}>
      <div className="p-6 text-center text-lg font-bold border-b border-gray-700">
        Admin Dashboard
      </div>
      <ul className="flex flex-col flex-grow">
        {/* Worker */}
        <li
          className={`flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${
            selectedComponent === 'WorkerCrud' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedComponent('WorkerCrud')}
        >
          <div className="flex items-center space-x-3">
            <PeopleIcon />
            <span>Worker</span>
          </div>
          <button
            className="bg-transparent flex outline-none p-0 font-bold cursor-pointer focus:outline-none hover:outline-none"
            style={{ fontSize: '1rem' }}
            onClick={(e) => {
              e.stopPropagation(); // Prevents the li click event from firing
              setSelectedComponent('WorkerCrud_add');
            }}
          >
            ADD
          </button>
        </li>

        {/* Meter */}
        <li
          className={`flex items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${
            selectedComponent === 'MeterCrud' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedComponent('MeterCrud')}
        >
          <SpeedIcon className="mr-3" />
          <span>Meter</span>
        </li>

        {/* Analysis */}
        <li
          className={`flex items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${
            selectedComponent === 'AdminAnalysis' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedComponent('AdminAnalysis')}
        >
          <AssessmentIcon className="mr-3" />
          <span>Analysis</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
