import express from 'express';
import { getLeaderboard, getMostComplaints } from '../controllers/leaderboardController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getLeaderboard);
router.get('/complaints', authMiddleware, getMostComplaints);

export default router;
