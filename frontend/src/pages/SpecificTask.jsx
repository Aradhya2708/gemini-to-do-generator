import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';

const SpecificTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch todos when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos', {
          withCredentials: true, // Ensure credentials are sent
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async (task) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${task._id}/approve`, null, {
        withCredentials: true, // Ensure credentials are sent
      });
      setTasks(tasks.map(t => 
        t._id === task._id ? { ...t, approved: true } : t
      )); // Update local state
    } catch (error) {
      console.error('Error approving task:', error);
    }
  };

  const handleDelete = async (task) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${task._id}`, {
        withCredentials: true, // Ensure credentials are sent
      });
      setTasks(tasks.filter(t => t._id !== task._id)); // Update local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Email-Based Task List</h1>
      <TaskList tasks={tasks} onAdd={handleAdd} onDelete={handleDelete} />
    </div>
  );
};

export default SpecificTasks;
