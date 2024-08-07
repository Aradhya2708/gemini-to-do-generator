import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
