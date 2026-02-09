import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';
import errorHandler from './src/middleware/errorHandler.js';
import authRoutes from './src/routes/authRoutes.js';
import complaintRoutes from './src/routes/complaintRoutes.js';
import leaderboardRoutes from './src/routes/leaderboardRoutes.js';
import flatRoutes from './src/routes/flatRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/flat', flatRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'QuirkyRoomie API Server Running' });
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
