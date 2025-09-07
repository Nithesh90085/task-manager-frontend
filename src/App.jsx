import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import React from 'react'

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    const { data } = await createTask(newTask);
    setTasks([...tasks, data]); // add to list
    setNewTask("");
  };

  const handleToggle = async (id, completed) => {
    const { data } = await updateTask(id, !completed);
    setTasks(tasks.map((t) => (t._id === id ? data : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex mb-4">
        <input
          className="flex-1 border rounded-l p-2"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span
              onClick={() => handleToggle(task._id, task.completed)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
