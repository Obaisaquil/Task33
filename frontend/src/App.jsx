import { useCallback, useEffect, useState } from "react";

import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus
} from "./api/taskApi";

import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Fetch tasks from backend
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTasks(search, status);
            setTasks(data.tasks || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch tasks. Check your backend."
            );
        } finally {
            setLoading(false);
        }
    }, [search, status]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Add or update task
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const taskData = {
                title,
                description,
                dueDate: dueDate || null
            };

            if (editingId) {
                await updateTask(editingId, taskData);
            } else {
                await addTask(taskData);
            }

            setTitle("");
            setDescription("");
            setDueDate("");
            setEditingId(null);

            await fetchTasks();

        } catch (err) {
            console.error("Frontend POST Error:", err);

            console.error("Backend Response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to save task."
            );
        } finally {
            setSaving(false);
        }
    };

    // Edit task
    const handleEdit = (task) => {
        setEditingId(task._id);
        setTitle(task.title);
        setDescription(task.description || "");

        setDueDate(
            task.dueDate
                ? task.dueDate.slice(0, 10)
                : ""
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    // Delete task
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        try {
            setError("");
            await deleteTask(id);
            await fetchTasks();
        } catch (err) {
            setError("Failed to delete task.");
        }
    };

    // Toggle completed status
    const handleStatus = async (task) => {
        try {
            setError("");

            await updateTaskStatus(
                task._id,
                !task.completed
            );

            await fetchTasks();

        } catch (err) {
            setError("Failed to update task status.");
        }
    };

    return (
        <main className="app">
            <header className="header">
                <h1>My To-Do List</h1>
                <p>Organize your day, one task at a time.</p>
            </header>

            <section className="form-card">
                <h2>
                    {editingId ? "Edit Task" : "Add New Task"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    />

                    <label htmlFor="dueDate">Due date</label>

                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <div className="form-buttons">
                        <button type="submit" disabled={saving}>
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Task"
                                    : "Add Task"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="toolbar">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </section>

            {error && (
                <div className="error">
                    {error}
                    <button onClick={fetchTasks}>Retry</button>
                </div>
            )}

            <section className="task-list">
                {loading ? (
                    <p className="message">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p className="message">No tasks found. Add your first task!</p>
                ) : (
                    tasks.map((task) => (
                        <article className="task-card" key={task._id}>
                            <div className="task-content">
                                <div className="task-heading">
                                    <h3 className={task.completed ? "completed" : ""}>
                                        {task.title}
                                    </h3>

                                    <span className={task.completed ? "badge done" : "badge pending"}>
                                        {task.completed ? "Completed" : "Pending"}
                                    </span>
                                </div>

                                <p>{task.description}</p>

                                {task.dueDate && (
                                    <small>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </small>
                                )}
                            </div>

                            <div className="task-actions">
                                <button onClick={() => handleStatus(task)}>
                                    {task.completed ? "Undo" : "Complete"}
                                </button>

                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </section>

            <footer>
                Built with React, Node.js, Express and MongoDB
            </footer>
        </main>
    );
}

export default App;
