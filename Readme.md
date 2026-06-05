# 🎮 Pokémon Expense Tracker

A Pokémon-themed full-stack expense tracking application built using **React + Vite** on the frontend and **Express.js + SQLite** on the backend.

Track your expenses in a fun and nostalgic Pokémon-inspired interface featuring retro pixel-art styling, expense analytics, category breakdowns, and real-time expense management.

---

## 🌐 Live Demo

### Frontend (Vercel)

https://pokemon-expense-tracker-q7lb.vercel.app/

### Backend API (Render)

https://pokemon-expense-tracker.onrender.com

---

## ✨ Features

### 🎨 Pokémon-Themed User Interface

* Retro pixel-inspired design
* Pokémon color palette
* Pokéball branding
* "Catch All Expenses" experience
* Responsive layout for desktop and mobile

### 💰 Expense Management

* Add expenses
* Delete expenses
* Categorize spending
* View total spending
* Track highest expense
* Monitor category distribution

### 📊 Expense Analytics

* Expense summary dashboard
* Category breakdown charts
* Monthly spending overview
* Real-time dashboard updates

### ⚡ Modern Frontend Stack

* React 19
* Vite
* Tailwind CSS
* React Query
* React Hook Form
* Zod Validation
* Axios
* Framer Motion
* Recharts

### 🚀 Backend Features

* Express.js REST API
* SQLite database
* Request validation with Zod
* Helmet security middleware
* Morgan logging
* CORS support
* CSV export functionality

---

## 📁 Project Structure

```text
pokemon-expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites

* Node.js 16+
* Git

### Clone Repository

```bash
git clone https://github.com/Amaan-create/pokemon-expense-tracker.git
cd pokemon-expense-tracker
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env.local`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### Expenses

```http
GET /api/expenses
POST /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id
GET /api/expenses/summary
```

---

## 🌍 Deployment

### Frontend Deployment

The frontend is deployed on **Vercel**.

#### Vercel Configuration

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Environment Variable:

```env
VITE_API_URL=https://pokemon-expense-tracker.onrender.com/api
```

---

### Backend Deployment

The backend is deployed on **Render**.

Railway was initially considered for deployment, but deployment was moved to Render after the available Railway credits were exhausted.

#### Render Configuration

Root Directory:

```text
server
```

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
NODE_ENV=production
PORT=10000
```

---

## 🏗️ Architecture

```text
React + Vite (Frontend)
        │
        ▼
      Vercel
        │
        ▼
Express.js REST API
        │
        ▼
      Render
        │
        ▼
SQLite Database
```

---

## 📦 Available Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Query
* React Hook Form
* Framer Motion
* Recharts
* Zod

### Backend

* Express.js
* SQLite
* Helmet
* CORS
* Morgan
* UUID
* Dotenv
* Zod

---

## 📄 License

This project is released under the MIT License.

---

## 👨‍💻 Author

**Amaan Khan**

GitHub:
https://github.com/Amaan-create

Project Repository:
https://github.com/Amaan-create/pokemon-expense-tracker
