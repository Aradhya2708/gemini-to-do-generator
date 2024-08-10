import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("using effect")
    const checkAuth = async () => {
      try {
        // Ensure the request includes credentials
        await axios.get("http://localhost:5000/protected/route", { withCredentials: true });
        console.log('Auth check successful');
        // If the request is successful, the user is authenticated
      } catch (error) {
        console.log("Error navigating:", error);
        navigate('/'); // Redirect to login page
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">Welcome!</h1>
      <div className="space-y-4">
        <Link to="/main-tasks">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Main Task List</h2>
            <p className="text-gray-600">View and manage your main tasks.</p>
          </div>
        </Link>
        <br />
        <Link to="/specific-tasks">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Email-Based Task List</h2>
            <p className="text-gray-600">
              View tasks generated from your email.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
