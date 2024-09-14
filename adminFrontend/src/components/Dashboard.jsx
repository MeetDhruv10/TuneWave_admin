import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = ({sidebarToggle , setSidebarToggle, currentUser})=> {
  return (
    <div className={`${sidebarToggle ? "" : " ml-64 "}w-full`}>

    </div>
  );
}

export default Dashboard;
