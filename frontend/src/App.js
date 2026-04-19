import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://task-backend-tzvn.onrender.com";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = () => {
    if (!task.trim()) return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: task }),
    })
      .then(() => {
        setTask("");
        fetchTasks();
      })
      .catch((err) => console.log("Error adding task:", err));
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTasks())
      .catch((err) => console.log("Error deleting task:", err));
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2 className="title">✨ Task Manager</h2>

        <div className="input-section">
          <input
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="Enter task..."
          />

          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet 🚀</p>
          ) : (
            tasks.map((t) => (
              <li key={t[0]} className="task-item">
                {t[1]}
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(t[0])}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;