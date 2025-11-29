import { submitReview, getReviewStats, getReviews } from '../controllers/reviewController';
import { Router } from 'express';

export const router = Router();

router.post('/', submitReview);
router.get('/stats', getReviewStats);
router.get('/', getReviews);
