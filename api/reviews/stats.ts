import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getReviewStats } from '../../src/controllers/reviewController.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return getReviewStats(req, res);
}