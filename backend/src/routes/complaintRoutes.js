import express from 'express';
import { fileComplaint, getComplaints, getComplaint, voteComplaint, resolveComplaint, getTrendingComplaints } from '../controllers/complaintController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, fileComplaint);
router.get('/', authMiddleware, getComplaints);
router.get('/trending', authMiddleware, getTrendingComplaints);
router.get('/:id', authMiddleware, getComplaint);
router.post('/:id/vote', authMiddleware, voteComplaint);
router.put('/:id/resolve', authMiddleware, resolveComplaint);

export default router;
