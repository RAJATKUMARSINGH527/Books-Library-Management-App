const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/booksRoutes');
const mybooksRoutes = require('./routes/mybooksRoutes');

const app = express();

app.use(cors({
  origin: 'https://books-library-management-app-delta.vercel.app', 
  credentials: true, // allow sending cookies
}));

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Route prefixes with '/api' namespace
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', mybooksRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error:", error);
  }
});
