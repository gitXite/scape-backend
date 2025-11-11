import { storeFeedback } from '@/services/feedbackService.ts';
import type { Request, Response } from 'express';


export const submitReview = async (req: Request, res: Response) => {
    const { rating, message, orderID } = req.body;
    if (rating == null || !orderID) {
        res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const review = await storeFeedback(rating, message, orderID);
        if (!review) {
            return res.status(400).json({ message: 'Failed to submit review' });
        }
        
        res.status(200).json({ message: 'Review successfully stored on database' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error: ', error: err });
    }
};