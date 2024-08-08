import React, {useState} from "react";
import TaskList from "../components/TaskList";

const MainTask = () => {
    const [tasks,setTasks] = useState([
        { title: 'Task 1', description: 'Description of Task 1' },
        { title: 'Task 2', description: 'Description of Task 2' },      
    ]
    );

    const handleAdd =(task) => {
        console.log('Add Task : ',task);

        //Add logic here
    }

    const handleDelete =(task) => {
        console.log('Delete Task : ',task);

        //Delete logic here
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Main Task List</h1>
            <TaskList tasks= {tasks} onAdd={handleAdd} onDelete={handleDelete}/>
        </div>
    );
};

export default MainTask