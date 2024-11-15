import React, { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerifiedIcon from '@mui/icons-material/Verified';
interface AdminSideBarProps {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ selectedComponent, setSelectedComponent }) => {
  return (
    <div className="bg-gray-800 text-white flex flex-col fixed left-0 h-full" style={{ width: '15%', overflowY: 'hidden', margin: '0 auto', }}>
      <div className="p-6 text-center text-lg font-bold border-b border-gray-700">
        Admin Dashboard
      </div>
      <ul className="flex flex-col flex-grow">
        {/* Worker */}
        <li
          className={`flex flex-col justify-between items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${selectedComponent === 'WorkerCrud' ? 'bg-gray-700' : ''
            }`}
          onClick={() => setSelectedComponent('WorkerCrud')}
        >

          <div className="flex justify-between items-center space-x-3 w-full" >
            <div className='flex flex-1 gap-2'>
              <PeopleIcon />
              <span>Workers</span></div>
          </div>


        </li>

        {/* Meter */}
        <li
          className={`flex items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${selectedComponent === 'MeterCrud' ? 'bg-gray-700' : ''
            }`}
          onClick={() => setSelectedComponent('MeterCrud')}
        >
          <SpeedIcon className="mr-3" />
          <span>Meter</span>
        </li>

        <li
          className={`flex items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${selectedComponent === 'AdminAnalysis' ? 'bg-gray-700' : ''
            }`}
          onClick={() => setSelectedComponent('InspectionCrud')}
        >
          <VerifiedIcon className="mr-3" />
          <span>Inspections</span>
        </li>

        {/* Analysis */}
        <li
          className={`flex items-center p-4 font-bold cursor-pointer hover:bg-gray-600 ${selectedComponent === 'AdminAnalysis' ? 'bg-gray-700' : ''
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
