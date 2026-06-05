# 🎮 Pokémon Expense Tracker

A fully Pokemon-themed full-stack expense tracking application built with **React + Vite** (Frontend) and **Express.js + SQLite** (Backend). Track expenses with an immersive Pokémon experience!

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ (Download from [nodejs.org](https://nodejs.org/))
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR-USERNAME/pokemon-expense-tracker.git
cd pokemon-expense-tracker
```

2. **Setup Backend:**
```bash
cd server
npm install
```

3. **Setup Frontend:**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables:**

Create `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
```

Create `.env.local` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000
```

5. **Start the Application:**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 📁 Project Structure

```
pokemon-expense-tracker/
├── client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── charts/       # Chart components
│   │   │   ├── common/       # Common components (Navbar)
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   ├── expense/      # Expense form & table
│   │   │   └── loading/      # Loading screen
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                    # Express.js Backend
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── database/         # Database schema
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── app.js            # Express app setup
│   │   └── server.js         # Server entry point
│   ├── package.json
│   └── .env                  # Environment variables
│
├── .gitignore
└── README.md
```

---

## ✨ Features

### Frontend
- 🎨 **Pokemon-Themed UI** - Vibrant colors with Pokéball design
- ⚡ **Smooth Animations** - Framer Motion animations for interactive elements
- 📱 **Responsive Design** - Tailwind CSS for mobile & desktop
- 📊 **Visual Analytics** - Pie charts for expense breakdown
- 🔄 **Real-time Updates** - React Query for data fetching
- ✅ **Form Validation** - React Hook Form + Zod schema validation
- 🎯 **Expense Management** - Add, edit, delete, and filter expenses

### Backend
- 🛡️ **Secure API** - Helmet.js for security headers
- 📝 **Request Logging** - Morgan for HTTP request logging
- 🔒 **CORS Support** - Cross-origin requests enabled
- 📦 **SQLite Database** - Lightweight relational database
- ⚙️ **Input Validation** - Zod schema validation
- 📤 **CSV Export** - Export expenses as CSV
- 🚀 **Express.js** - Fast, unopinionated web framework

---

## 📋 Available Scripts

### Backend

```bash
# Development (with auto-reload)
cd server && npm run dev

# Production
cd server && npm start
```

### Frontend

```bash
# Development server
cd client && npm run dev

# Build for production
cd client && npm run build

# Preview production build
cd client && npm run preview

# Lint code
cd client && npm run lint
```

---

## 🌐 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary

---

## 🔧 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Query
- React Hook Form
- Zod
- Recharts
- Axios

### Backend
- Express.js
- SQLite3 (better-sqlite3)
- UUID
- Zod
- Helmet.js
- CORS
- Morgan
- Dotenv

---

## 📤 Deployment Guide

### Deploy to GitHub

#### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Pokemon Expense Tracker"
```

#### 2. Create GitHub Repository
- Go to [github.com/new](https://github.com/new)
- Create a new repository named `pokemon-expense-tracker`
- Copy the repository URL

#### 3. Push to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/pokemon-expense-tracker.git
git branch -M main
git push -u origin main
```

### Deploy Frontend (Vercel - Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Deploy
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL=https://your-backend-url.com`

### Deploy Backend (Railway or Heroku)

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
cd server
railway init
railway up
```

Set environment variables in Railway dashboard:
- `PORT=5000`
- `NODE_ENV=production`

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
cd server
git push heroku main
```

### Docker Deployment (Optional)

Create `Dockerfile` in root directory:
```dockerfile
FROM node:18

WORKDIR /app

# Copy and install backend
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --production

# Copy and install frontend
COPY client/package*.json ../client/
WORKDIR /app/client
RUN npm ci && npm run build

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "src/server.js"]
```

Build and run:
```bash
docker build -t pokemon-expense-tracker .
docker run -p 5000:5000 pokemon-expense-tracker
```

---

## 🛠️ Configuration Files

### Environment Variables

**Server (.env):**
```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./database/expenses.db
```

**Client (.env.local):**
```env
VITE_API_URL=http://localhost:5000
```

---

## 📝 Development Workflow

1. Create a feature branch
```bash
git checkout -b feature/your-feature
```

2. Make changes and commit
```bash
git add .
git commit -m "Add: description of changes"
```

3. Push to GitHub
```bash
git push origin feature/your-feature
```

4. Create a Pull Request on GitHub

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000 (Windows)
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### CORS Errors
- Ensure `VITE_API_URL` is correctly set in client `.env.local`
- Check backend CORS configuration in `server/src/app.js`

### Database Errors
- Delete `server/database/expenses.db` to reset database
- Re-run the backend to create fresh schema

### Build Issues
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Docs](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues and questions, please open an [Issue](https://github.com/YOUR-USERNAME/pokemon-expense-tracker/issues) on GitHub.

---

**Happy Tracking! 🎮⚡💰**
  - `whileTap` effects
  - `staggerChildren` for sequential animations
  - Smooth transitions with configurable durations

## 📦 Dependencies Used
- `framer-motion`: Animations and transitions
- `recharts`: Pie chart visualization
- `tailwindcss`: Styling
- `axios`: API requests
- `react-hook-form`: Form handling
- `react-query`: Data fetching

## 🚀 How to Run

### Install Dependencies
```bash
cd client
npm install
```

### Development Server
```bash
npm run dev
```
Server will run on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design
- Mobile-first approach
- Responsive grid layouts:
  - Mobile: Single column
  - Tablet: 2-3 columns
  - Desktop: Full layouts
- Tailwind CSS breakpoints used throughout

## 🎯 Features Details

### Loading Screen
- Shows for 2 seconds on initial mount
- Pokéball rotates continuously
- Center circle pulses with glow
- Background circles animate
- Three dots loading indicator

### Summary Cards
- Three cards displaying:
  1. Total spending this month
  2. Highest expense amount
  3. Number of categories
- Animated entrance with stagger effect
- Hover effects with scale and rotation
- Tap effects for interaction feedback

### Expense Form
- Real-time form state management
- Category dropdown with emojis
- Loading animation on submit (spinning button)
- 600ms submission delay for UX
- Input validation ready

### Expense Table
- Displays all expenses in a table format
- Category emojis for quick identification
- Delete functionality
- Smooth row animations
- Empty state handling

### Trainer Stats
- Fun gamified stats section
- Total expenses count
- Average expense calculation
- Master level based on experience (expenses)
- Styled with orange-red gradient

## 🔧 Customization

### Change Colors
Edit color values in components or `tailwindcss` config

### Modify Animations
Adjust animation durations and easing in component `variants` objects

### Add Pokemon Emojis
Expand `categoryEmojis` objects in components to add more categories

## 📝 Notes
- All animations use smooth easing functions
- Drop shadows provide depth to components
- Border styling (4px black) gives Pokemon Trading Card feel
- Focus states on form inputs for accessibility
- Loading screen is optional and can be disabled by setting `showLoading` to `false`

## 🎮 Pokemon Theme Elements
- Pokéball design and animations
- Lightning bolt (⚡) symbols
- Pokemon category emojis
- "Gotta Catch All Expenses" tagline
- "Trainer Stats" gamification
- Vibrant Pokemon color scheme
- Trading card-style borders
