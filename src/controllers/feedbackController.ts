import { storeFeedback, calculateAverageRating, getReviewCount } from '../services/feedbackService.ts';
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

export const getReviewStats = async (req: Request, res: Response) => {
    try {
        const averageRating = await calculateAverageRating();
        const totalReviews = await getReviewCount();

        res.status(200).json({
            message: 'Review statistics fetched successfully',
            data: {
                averageRating: Number(averageRating || 0),
                totalReviews: totalReviews
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error: ', error: err });
    }
};