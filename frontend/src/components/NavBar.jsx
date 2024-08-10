import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaHome, FaTasks, FaCog, FaSync } from 'react-icons/fa'; // Import FaSync for the Fetch icon

import NavButton from './NavButton'; // Import the NavButton component

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open state
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth tokens, redirect to login)
    console.log("User logged out");
    navigate("/"); // Redirect to login page
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const goToHome = () => {
    navigate("/home");
  };

  const goToMainTasks = () => {
    navigate("/main-tasks");
  };

  const handleFetch = async () => {
    try {
      await axios.get('http://localhost:5000/emails/fetch', { withCredentials: true });
      // Optionally provide feedback to the user
      console.log('Fetch request sent successfully.');
    } catch (error) {
      console.error('Error sending fetch request:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 mb-10 flex items-center justify-between p-4 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <button
        onClick={handleBack}
        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:group-hover:text-blue-500"
      >
        {/* Back button SVG */}
      </button>
      <h1 className="text-4xl font-bold flex justify-center text-gray-100">To Do Manager</h1>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        >
          {/* Menu button SVG */}
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <button
              onClick={handleSettings}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              {/* Settings icon */}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              {/* Logout icon */}
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <NavButton onClick={goToHome} Icon={FaHome} text="Home" />
          <NavButton onClick={goToMainTasks} Icon={FaTasks} text="To Do" />
          <NavButton onClick={handleSettings} Icon={FaCog} text="Settings" />
          <button
            onClick={handleFetch}
            className="flex items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:group-hover:text-blue-500 transition"
          >
            <FaSync size={24} />
            <span className="ml-2">Fetch</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
