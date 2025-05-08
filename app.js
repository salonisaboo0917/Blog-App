const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);

// Connect to DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
