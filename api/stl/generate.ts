import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSTL } from '../../src/controllers/terrainController.ts';
import enableCors from '../../src/utils/enableCors.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    enableCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }

    return generateSTL(req, res);
}