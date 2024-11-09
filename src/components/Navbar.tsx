import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Navbar: React.FC = () => {
    const userData = useSelector((state: RootState) => state.user.userData);

    return (
        <div className="container mx-auto w-full">
            <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center w-full">
                <div className="text-xl font-bold">Worker Dashboard</div>
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-white">{userData?.name}</p>
                        <p className="text-white text-sm">Reg. No. : {userData?.reg_no}</p>
                    </div>
                    <img
                        src={userData?.photo || 'https://via.placeholder.com/40'}
                        alt="Worker Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;