import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSTL } from '../../dist/controllers/terrainController.js';
import connectDB from '../../dist/config/db.js';
import enableCors from '../../dist/utils/enableCors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return generateSTL(req, res);
}