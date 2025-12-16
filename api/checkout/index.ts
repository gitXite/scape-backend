import { VercelRequest, VercelResponse } from '@vercel/node';
import { createSession, checkCallback } from '../../dist/controllers/vippsController.js';
import enableCors from '../../dist/utils/enableCors.js';
import connectDB from '../../dist/config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    switch (req.method) {
        case 'POST':
            return createSession(req, res);
        case 'GET':
            return checkCallback(req, res);
        default:
            return res.status(405).json({ message: 'HTTP method not allowed' });
    }
} 
