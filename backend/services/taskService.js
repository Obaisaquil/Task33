const Task = require("../models/Task");

// Create task
const createTask = async (data) => {
    return await Task.create(data);
};

// Get all tasks
const getAllTasks = async (search, status) => {
    const filter = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    if (status === "completed") {
        filter.completed = true;
    } else if (status === "pending") {
        filter.completed = false;
    }

    return await Task.find(filter).sort({ createdAt: -1 });
};

// Get single task
const getTaskById = async (id) => {
    return await Task.findById(id);
};

// Update task
const updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// Delete task
const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

// Update task status
const updateTaskStatus = async (id, completed) => {
    return await Task.findByIdAndUpdate(
        id,
        { completed },
        { new: true }
    );
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
};
