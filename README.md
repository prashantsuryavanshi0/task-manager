# 🧠 Task Manager (Full Stack)

## 🚀 Project Overview

This is a full-stack Task Manager application built using:

- **Frontend:** React
- **Backend:** Python (Flask API)
- **Database:** SQLite
- **Deployment:** Render (Frontend + Backend)

The application allows users to manage daily tasks efficiently with features like adding, editing, deleting, marking complete, and searching tasks.

---

## ✨ Features

- ➕ Add new tasks
- ✏️ Edit existing tasks
- ❌ Delete tasks
- ✅ Mark tasks as completed
- 📅 Timestamp for each task
- 🔍 Search tasks
- 🎨 Modern UI with glassmorphism and animations

---

## 🏗️ Tech Stack

- React (Frontend UI)
- Flask (Backend API)
- SQLite (Database)
- Render (Deployment)

---

## ⚙️ Project Structure

```
task-manager/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── tasks.db
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── CLAUDE.md
```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| GET    | /tasks              | Get all tasks |
| POST   | /tasks              | Add new task  |
| PUT    | /tasks/:id          | Update task   |
| PUT    | /tasks/:id/complete | Mark complete |
| DELETE | /tasks/:id          | Delete task   |

---

## 🌐 Live Demo

- **Frontend:** https://task-manager-dmfp.onrender.com
- **Backend:** https://task-backend-tzvn.onrender.com

---

## 🧪 How to Run Locally

### Backend

```
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```
cd frontend
npm install
npm start
```

---

## 🤖 AI Usage

- Used AI tools for:
  - Code generation
  - Debugging deployment issues
  - UI enhancement suggestions

- All generated code was reviewed and tested manually.

---

## ⚠️ Challenges Faced

- GitHub push issues (submodule problem)
- Deployment errors on Render
- API connection issues between frontend and backend

---

## 🔮 Future Improvements

- User authentication (login/signup)
- Task categories
- Drag & drop tasks
- Notifications/reminders

---

## 📌 Conclusion

This project demonstrates full-stack development skills including API design, frontend integration, deployment, and debugging real-world issues.

---

## 👨‍💻 Author

Prashant Aryan
