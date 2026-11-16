const mongoose = require("mongoose");
const taskService = require("../services/taskService");

// Validate MongoDB ID
const validateId = (id, res) => {
    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({
            message: "Invalid task ID"
        });
        return false;
    }

    return true;
};

// 1. CREATE TASK
const createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const task = await taskService.createTask({
        title,
        description,
        dueDate
    });

    res.status(201).json({
        message: "Task created successfully",
        task
    });
};

// 2. GET ALL TASKS + SEARCH + FILTER
const getAllTasks = async (req, res) => {
    const { search, status } = req.query;

    if (
        status &&
        !["completed", "pending", "all"].includes(status)
    ) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const tasks = await taskService.getAllTasks(
        search,
        status
    );

    res.status(200).json({
        total: tasks.length,
        tasks
    });
};

// 3. GET SINGLE TASK
const getTaskById = async (req, res) => {
    if (!validateId(req.params.id, res)) return;

    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
};

// 4. UPDATE TASK
const updateTask = async (req, res) => {
    if (!validateId(req.params.id, res)) return;

    const { title, description, dueDate, completed } = req.body;

    const updates = {};

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }
        updates.title = title;
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            return res.status(400).json({
                message: "Description must be text"
            });
        }
        updates.description = description;
    }

    if (dueDate !== undefined) {
        updates.dueDate = dueDate;
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }
        updates.completed = completed;
    }

    const task = await taskService.updateTask(
        req.params.id,
        updates
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task updated successfully",
        task
    });
};

// 5. DELETE TASK
const deleteTask = async (req, res) => {
    if (!validateId(req.params.id, res)) return;

    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task deleted successfully"
    });
};

// 6. UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
    if (!validateId(req.params.id, res)) return;

    const { completed } = req.body;

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    const task = await taskService.updateTaskStatus(
        req.params.id,
        completed
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task status updated",
        task
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
};
