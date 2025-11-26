import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getReviews, submitReview } from '../../dist/controllers/reviewController.js';
import enableCors from '../../dist/utils/enableCors.js';
import connectDB from '../../dist/config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();
    switch (req.method) {
        case 'POST':
            return submitReview(req, res);
        
        case 'GET':
            return getReviews(req, res);
        
        default:
            return res.status(405).json({ message: 'HTTP method not allowed' });
    }
}