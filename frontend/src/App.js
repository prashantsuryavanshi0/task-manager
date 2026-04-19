import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!task) return;

    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: task })
    }).then(() => {
      setTask("");
      fetchTasks();
    });
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "DELETE"
    }).then(() => fetchTasks());
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