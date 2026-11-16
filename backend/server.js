require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to To-Do List API"
    });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Invalid route handler
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Connect database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();