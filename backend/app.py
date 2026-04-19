from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# DB connection
def get_db():
    return sqlite3.connect("tasks.db")

# Initialize DB
def init_db():
    conn = get_db()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        completed INTEGER DEFAULT 0,
        created_at TEXT
    )
    """)
    conn.commit()

init_db()

# Get tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_db()
    tasks = conn.execute("SELECT * FROM tasks").fetchall()
    return jsonify(tasks)

# Add task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    conn = get_db()
    conn.execute(
        "INSERT INTO tasks (title, created_at) VALUES (?, ?)",
        (data["title"], datetime.now().strftime("%Y-%m-%d %H:%M"))
    )
    conn.commit()
    return jsonify({"message": "task added"})

# Delete task
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_db()
    conn.execute("DELETE FROM tasks WHERE id=?", (id,))
    conn.commit()
    return jsonify({"message": "deleted"})

# Update task
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.json
    conn = get_db()
    conn.execute("UPDATE tasks SET title=? WHERE id=?", (data["title"], id))
    conn.commit()
    return jsonify({"message": "updated"})

# Mark complete
@app.route("/tasks/<int:id>/complete", methods=["PUT"])
def complete_task(id):
    conn = get_db()
    conn.execute("UPDATE tasks SET completed=1 WHERE id=?", (id,))
    conn.commit()
    return jsonify({"message": "completed"})

# Run server
port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=port)