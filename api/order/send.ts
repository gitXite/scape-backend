import { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSTL } from '../../dist/controllers/orderController.js';
import enableCors from '../../dist/utils/enableCors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return sendSTL(req, res);
}
