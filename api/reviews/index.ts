import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getReviews, submitReview } from '../../src/controllers/reviewController.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    switch (req.method) {
        case 'POST':
            return submitReview(req, res);
        
        case 'GET':
            return getReviews(req, res);
        
        default:
            return res.status(405).json({ message: 'HTTP method not allowed' });
    }
}