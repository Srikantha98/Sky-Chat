const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());  // To parse incoming JSON data
app.use(cors());          // Enable CORS (Cross-Origin Resource Sharing)

// Routes
app.use('/api/auth', authRoutes);   // Authentication routes
app.use('/api/messages', messageRoutes); // Messaging routes

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
