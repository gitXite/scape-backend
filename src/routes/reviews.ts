import { submitReview, getReviewStats, getReviews } from '../controllers/reviewController.ts';
import { Router } from 'express';

export const router = Router();

router.post('/', submitReview);
router.get('/stats', getReviewStats);
router.get('/', getReviews);
