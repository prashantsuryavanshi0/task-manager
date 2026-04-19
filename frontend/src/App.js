import React, { useState, useEffect } from "react";
import "./index.css";

const API_URL = "https://task-backend-tzvn.onrender.com";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!task.trim()) return;

    fetch(`${API_URL}/tasks`, {
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
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE"
    }).then(fetchTasks);
  };

  const startEdit = (id, title) => {
    setTask(title);
    setEditId(id);
  };

  const updateTask = () => {
    fetch(`${API_URL}/tasks/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: task })
    }).then(() => {
      setTask("");
      setEditId(null);
      fetchTasks();
    });
  };

  const completeTask = (id) => {
    fetch(`${API_URL}/tasks/${id}/complete`, {
      method: "PUT"
    }).then(fetchTasks);
  };

  const filteredTasks = tasks.filter(t =>
    t[1].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="card">

        <h2 className="title">✨ Task Manager</h2>

        <input
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="input-section">
          <input
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
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

        <ul className="task-list">
          {filteredTasks.map((t) => (
            <li
              key={t[0]}
              className={`task-item ${t[2] ? "completed" : ""}`}
            >
              <div>
                <b>{t[1]}</b>
                <br />
                <small>{t[3]}</small>
              </div>

              <div>
                <button onClick={() => completeTask(t[0])}>✅</button>
                <button onClick={() => startEdit(t[0], t[1])}>✏️</button>
                <button onClick={() => deleteTask(t[0])}>❌</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;