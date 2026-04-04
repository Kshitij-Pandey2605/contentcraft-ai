const express = require('express');
const cors = require('cors');
const pipelineRoutes = require('./routes/pipelineRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes); // Preserved Custom User JWT Auth
app.use('/api', pipelineRoutes);  // New Multi-Tier Failsafe Pipeline

// Simple GET route for browser testing
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to ContentCraft AI Backend API!' });
});

// Global Error Handler for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// App-level error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong on the server!' });
});

module.exports = app;
