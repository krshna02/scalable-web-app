# Scalable Web App – Frontend + Backend (Intern Assignment)

This project is a scalable web application built with **Next.js (frontend)** and **Node.js/Express + MongoDB (backend)**.

It implements:

* JWT authentication (register, login, logout)
* Protected dashboard with user profile
* CRUD operations on a Task entity
* Search & filter for tasks
* Secure practices: bcrypt + JWT middleware
* Modular, scalable project structure

---

## Tech Stack

### Frontend

* Next.js 13
* React
* Tailwind CSS
* Axios
* js-cookie

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* bcrypt
* jsonwebtoken

---

## Project Structure

```
project-root/
  frontend/    # Next.js app
  backend/     # Express API + MongoDB
```

---

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm start      # or npm run dev
```

`.env` file example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/starterkit
JWT_SECRET=change_this_to_a_strong_secret
PORT=5000
```

Backend will run at:

```
http://localhost:5000
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

## Features Implemented

### Authentication

* Signup with hashed password
* Login with JWT
* Token stored in cookies
* Protected dashboard routes
* Logout clears token

### Dashboard

* User profile display
* Create Task
* List Tasks
* Update Task (toggle complete)
* Delete Task
* Search tasks using backend filtering

