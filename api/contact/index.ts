import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactEmail } from '../../src/controllers/contactController.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return sendContactEmail(req, res);
}