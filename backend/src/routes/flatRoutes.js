import express from 'express';
import { getFlatStats, getFlatMembers } from '../controllers/flatController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', authMiddleware, getFlatStats);
router.get('/members', authMiddleware, getFlatMembers);

export default router;
