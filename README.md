# 💰 FinFlow

A fullstack web application for tracking personal expenses with analytics and category management.

## 🚀 Tech Stack

### Backend
- **FastAPI** — modern async Python web framework
- **SQLAlchemy 2.0** — async ORM with declarative models
- **PostgreSQL** — relational database
- **asyncpg** — async PostgreSQL driver
- **bcrypt** — password hashing
- **python-jose** — JWT authentication
- **Pydantic v2** — data validation and serialization
- **uvicorn** — ASGI server

### Frontend
- **React 18** — UI library
- **Vite** — build tool and dev server
- **TailwindCSS** — utility-first CSS framework
- **React Router v6** — client-side routing
- **Axios** — HTTP client with interceptors
- **Recharts** — composable chart library

## ✨ Features

- 🔐 User authentication (register / login) with JWT tokens
- 💸 Create, view, delete expenses
- 🏷️ Custom expense categories per user
- 📅 Filter expenses by category and date range
- 📊 Monthly bar chart and category pie chart analytics
- 🔒 Protected routes — dashboard accessible only after login

## ⚙️ Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` file:

DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/expense_tracker
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Run:
```bash
venv/bin/uvicorn app.main:app --reload
```

API docs available at: `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at: `http://localhost:5173`