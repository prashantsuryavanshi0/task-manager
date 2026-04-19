from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# DB create
def init_db():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
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
    cursor.execute("SELECT id, title FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

# POST
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()

    if not data or "title" not in data:
        return jsonify({"error": "No title"}), 400

    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (title) VALUES (?)", (data["title"],))
    conn.commit()
    conn.close()

    return jsonify({"message": "added"})

# DELETE
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "deleted"})