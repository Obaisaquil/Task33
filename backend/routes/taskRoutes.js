const express = require("express");
const router = express.Router();

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
} = require("../controllers/taskController");

// Create and get all tasks
router.route("/")
    .post(createTask)
    .get(getAllTasks);

// Update task status
router.patch("/:id/status", updateTaskStatus);

// Get, update and delete individual task
router.route("/:id")
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;
