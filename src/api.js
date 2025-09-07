import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-c9lp.onrender.com", // backend base URL
});

// Get all tasks
export const getTasks = () => API.get("/tasks");

// Create a new task
export const createTask = (text) => API.post("/tasks", { text });

// Update a task (toggle complete)
export const updateTask = (id, completed) =>
  API.put(`/tasks/${id}`, { completed });

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
