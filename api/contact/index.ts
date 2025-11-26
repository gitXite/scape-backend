import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactEmail } from '../controllers/contactController.ts';
import enableCors from '../utils/enableCors.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end;
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return sendContactEmail(req, res);
}