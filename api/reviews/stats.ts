import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getReviewStats } from '../controllers/reviewController.ts';
import enableCors from '../utils/enableCors.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return getReviewStats(req, res);
}