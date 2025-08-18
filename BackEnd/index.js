const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/booksRoutes');
const mybooksRoutes = require('./routes/mybooksRoutes');

const app = express();

// ----------------------
// CORS - Enable cross-origin for your deployed frontend, allow cookies
app.use(cors({
  origin: process.env.DEPLOYED_FE_URL || 'https://books-library-management-app-delta.vercel.app',
  credentials: true,
}));

// ----------------------
// Session Management with MongoDB store (persistent session store)
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60, // 14 days in seconds
  }),
  cookie: {
    sameSite: 'none',               // Required for cross-site cookies (frontend & backend on different domains)
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    httpOnly: true,                 // Helps prevent XSS; cookie not accessible via JS
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days in milliseconds
  },
}));

// Parse JSON bodies and cookies for all requests
app.use(express.json());
app.use(cookieParser());

// ----------------------
// API Routes - keeping '/api' namespace clean and organized
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', mybooksRoutes);

// ----------------------
// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Server is up and running on Render!' });
});

// ----------------------
// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

// ----------------------
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

// ----------------------
// Start server & connect to DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
