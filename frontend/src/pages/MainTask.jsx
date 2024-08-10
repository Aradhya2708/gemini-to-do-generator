import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";

const MainTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch and filter approved todos
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Check authentication
        await axios.get("http://localhost:5000/protected/route", {
          withCredentials: true,
        });
        
        // Fetch tasks
        const response = await axios.get("http://localhost:5000/todos", {
          withCredentials: true,
        });
        
        const approvedTasks = response.data.filter(task => task.approved);
        setTasks(approvedTasks);
        setLoading(false);
      } catch (error) {
        console.log("Error navigating or fetching tasks:", error);
        navigate("/");
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleDelete = async (task) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${task._id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter(t => t._id !== task._id)); // Update local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Main Task List</h1>
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default MainTask;
