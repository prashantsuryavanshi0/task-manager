from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# DB init
def init_db():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS tasks")  # ⚠️ one time fix

    cursor.execute("""
        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0,
            created_at TEXT
        )
    """)

    conn.commit()
    conn.close()

init_db()

# GET
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, completed, created_at FROM tasks")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

# POST
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    title = data["title"]

    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO tasks (title, completed, created_at) VALUES (?, ?, ?)",
        (title, 0, datetime.now().strftime("%Y-%m-%d %H:%M"))
    )

    conn.commit()
    conn.close()

    return jsonify({"msg": "added"})

# DELETE
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"msg": "deleted"})

# UPDATE
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.get_json()
    title = data["title"]

    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET title=? WHERE id=?", (title, id))
    conn.commit()
    conn.close()
    return jsonify({"msg": "updated"})

# COMPLETE
@app.route("/tasks/<int:id>/complete", methods=["PUT"])
def complete_task(id):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE tasks 
        SET completed = CASE WHEN completed=0 THEN 1 ELSE 0 END 
        WHERE id=?
    """, (id,))
    conn.commit()
    conn.close()
    return jsonify({"msg": "done"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)