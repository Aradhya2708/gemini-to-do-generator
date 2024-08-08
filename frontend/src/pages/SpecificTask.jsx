// src/pages/SpecificTasks.js
import React, { useState } from 'react';
import TaskList from '../components/TaskList';

const SpecificTasks = () => {
  const [tasks, setTasks] = useState([
    { title: 'Email Task 1', description: 'Description of Email Task 1' },
    { title: 'Email Task 2', description: 'Description of Email Task 2' },
  ]);

  const handleAdd = (task) => {
    console.log('Add task:', task);
    // Add task to the main list logic
  };

  const handleDelete = (task) => {
    console.log('Delete task:', task);
    // Delete task logic
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Email-Based Task List</h1>
      <TaskList tasks={tasks} onAdd={handleAdd} onDelete={handleDelete} />
    </div>
  );
};

export default SpecificTasks;
