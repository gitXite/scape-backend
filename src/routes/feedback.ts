import { submitReview, getReviewStats, getReviews } from '../controllers/feedbackController.ts';
import { Router } from 'express';

export const router = Router();

router.post('/submit', submitReview);
router.get('/stats', getReviewStats);
router.get('/', getReviews);