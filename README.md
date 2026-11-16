# 📝 Full Stack To-Do List Application

A full-stack To-Do List application built using **React, Node.js, Express.js, and MongoDB**. It allows users to create, manage, update, search, filter, and delete tasks through a responsive interface.

## 🚀 Features

- Create new tasks with title, description, and due date.
- View all tasks dynamically.
- View individual task details.
- Update existing tasks.
- Delete tasks.
- Mark tasks as completed or pending.
- Search tasks by title.
- Filter tasks by status (All, Pending, Completed).
- Loading and error messages.
- Store tasks permanently using MongoDB.
- Responsive user interface.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Axios
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Tools
- Visual Studio Code
- Postman
- MongoDB Atlas
- Git and GitHub

## 📁 Project Structure

```text
todo-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Task.js
│   ├── services/
│   │   └── taskService.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── taskApi.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    └── package.json
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd todo-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm install axios
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a task |
| GET | `/` | Get all tasks |
| GET | `/:id` | Get a single task |
| PUT | `/:id` | Update a task |
| DELETE | `/:id` | Delete a task |
| PATCH | `/:id/status` | Update task status |

### Search and Filter

| Request | Description |
|---|---|
| `GET /?search=React` | Search tasks by title |
| `GET /?status=pending` | Get pending tasks |
| `GET /?status=completed` | Get completed tasks |
| `GET /?status=all` | Get all tasks |

## 🧪 API Testing

All backend API endpoints were tested using **Postman**.

The following operations were tested:

- Creating tasks.
- Retrieving all tasks.
- Retrieving individual tasks.
- Updating task details.
- Updating completion status.
- Deleting tasks.
- Searching and filtering tasks.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_URL` | Frontend URL for CORS |
| `VITE_API_URL` | Backend API URL used by React |

**Important:** Never upload your `.env` files or MongoDB credentials to GitHub.

## 📚 Learning Outcomes

Through this project, I learned:

- Building REST APIs using Express.js.
- Connecting Node.js applications with MongoDB.
- Using Mongoose schemas and models.
- Implementing CRUD operations.
- Organizing backend code using MVC-style architecture and services.
- Connecting React with backend APIs using Axios.
- Managing application state using React Hooks.
- Testing APIs using Postman.
- Handling loading states and errors.
- Working with environment variables.

## 👨‍💻 Author

**OBAIS AQUIL**

Full Stack Development Project

---

⭐ If you find this project useful, feel free to explore and improve it.
