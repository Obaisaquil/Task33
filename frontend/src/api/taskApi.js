import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Get all tasks
export const getTasks = async (search = "", status = "all") => {
    const response = await API.get("/tasks", {
        params: { search, status }
    });
    return response.data;
};

// Create task
export const addTask = async (taskData) => {
    const response = await API.post("/tasks", taskData);
    return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
};

// Delete task
export const deleteTask = async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
};

// Update task status
export const updateTaskStatus = async (id, completed) => {
    const response = await API.patch(`/tasks/${id}/status`, {
        completed
    });
    return response.data;
};
