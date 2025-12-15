import { VercelRequest, VercelResponse } from '@vercel/node';
import { vippsCallback } from '../../dist/controllers/vippsController.js';
import enableCors from '../../dist/utils/enableCors.js';
import connectDB from '../../dist/config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();
    enableCors(req, res);
    if (req.method === 'OPTIONS') return res.status(200).end;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return vippsCallback(req, res);
}