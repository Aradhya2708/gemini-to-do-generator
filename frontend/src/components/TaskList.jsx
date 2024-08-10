// src/components/TaskList.js
import React from "react";

const TaskList = ({ tasks, onAdd, onDelete }) => {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                    <div>
                        <h3 className="text-xl font-semibold">{task.subject}</h3>
                        <p className="text-gray-500">{task.task}</p>
                    </div>
                    <div className="space-x-2">
                        {!task.approved && (
                            <button 
                                onClick={() => onAdd(task)} 
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Approve
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(task)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
