import {
    storeReview,
    calculateAverageRating,
    getReviewCount,
    getReviewSamples,
} from '../services/reviewService.js';
import { checkOrder } from '../services/orderService.js';
import type { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ReviewBody {
    rating: number;
    message: string;
    orderID: string;
}

export const submitReview = async (
    req: VercelRequest | Request,
    res: VercelResponse | Response
) => {
    const { rating, message, orderID } = req.body as ReviewBody;
    if (rating == null || !orderID) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const orderExists = await checkOrder(orderID);
    if (!orderExists) {
        return res.status(404).json({ message: 'Order ID not found' });
    }

    try {
        const review = await storeReview(rating, message, orderID);
        if (!review) {
            return res.status(400).json({ message: 'Failed to submit review' });
        }

        res.status(200).json({
            message: 'Review successfully stored on database',
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const getReviewStats = async (req: VercelRequest | Request, res: VercelResponse | Response) => {
    try {
        const averageRating = await calculateAverageRating();
        const totalReviews = await getReviewCount();

        res.status(200).json({
            message: 'Review statistics fetched successfully',
            data: {
                averageRating: Number(averageRating || 0),
                totalReviews: totalReviews,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const getReviews = async (req: VercelRequest | Request, res: VercelResponse | Response) => {
    try {
        const result = await getReviewSamples();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};
