import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="p-8 bg-gray-100 min-h-screen ">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">Welcome!</h1>
      <div className="space-y-4">
        <Link to="/main-tasks ">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Main Task List</h2>
            <p className="text-gray-600">View and manage your main tasks.</p>
          </div>
        </Link>
        <br></br>
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
