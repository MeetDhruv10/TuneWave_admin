import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../Context/Authcontext';

const RootLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false); // State to toggle sidebar
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar sidebarToggle={sidebarToggle} />

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarToggle ? '' : ' ml-64 '
        }`}
      >
        {/* Navbar */}
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          currentUser={currentUser}
        />

        {/* Main content area */}
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
