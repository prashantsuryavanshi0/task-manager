import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://task-backend-tzvn.onrender.com";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // 🔄 Fetch Tasks
  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add Task
  const addTask = () => {
    if (!task.trim()) return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: task })
    })
      .then(res => {
        if (!res.ok) throw new Error("Add failed");
        return res.json();
      })
      .then(() => {
        setTask("");
        fetchTasks();
      })
      .catch(err => console.error(err));
  };

  // ❌ Delete Task
  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  // ✏️ Start Edit
  const startEdit = (id, title) => {
    setTask(title);
    setEditId(id);
  };

  // 🔄 Update Task
  const updateTask = () => {
    if (!task.trim()) return;

    fetch(`${API_URL}/tasks/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: task })
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        setTask("");
        setEditId(null);
        fetchTasks();
      })
      .catch(err => console.error(err));
  };

  // ✅ Complete Task
  const completeTask = (id) => {
    fetch(`${API_URL}/tasks/${id}/complete`, {
      method: "PUT"
    })
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  // 🔍 Search Filter
  const filteredTasks = tasks.filter(t =>
    t[1]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="card">

        <h2 className="title">✨ Task Manager</h2>

        {/* 🔍 Search */}
        <input
          className="input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ➕ Add / Update */}
        <div className="input-section">
          <input
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (editId ? updateTask() : addTask())}
            placeholder="Enter task..."
          />

          {editId ? (
            <button className="add-btn" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button className="add-btn" onClick={addTask}>
              Add
            </button>
          )}
        </div>

        {/* 📋 Task List */}
        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks found 🚀</p>
          ) : (
            filteredTasks.map((t) => (
              <li
                key={t[0]}
                className={`task-item ${t[2] ? "completed" : ""}`}
              >
                <div>
                  <b>{t[1]}</b>
                  <br />
                  <small>{t[3]}</small>
                </div>

                <div className="actions">
                  <button onClick={() => completeTask(t[0])}>✅</button>
                  <button onClick={() => startEdit(t[0], t[1])}>✏️</button>
                  <button onClick={() => deleteTask(t[0])}>❌</button>
                </div>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}

export default App;