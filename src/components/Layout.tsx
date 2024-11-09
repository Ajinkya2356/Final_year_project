// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Layout: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {isAuthenticated && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;