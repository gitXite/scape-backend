import { submitReview } from '../controllers/feedbackController.ts';
import { Router } from 'express';

export const router = Router();

router.post('/submit', submitReview);