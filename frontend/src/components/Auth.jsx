import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Auth Logic

    window.location.href = '/auth/login';
  };

  console.log("Rendering Auth component");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Login to view your To-Do List
        </h1>
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            type="button"
            className="flex items-center text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-6 py-3 transition duration-300 ease-in-out"
          >
            <svg
              className="w-5 h-5 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
