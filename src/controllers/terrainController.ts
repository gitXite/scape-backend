import type { NextFunction, Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSTL as generateSTLService } from '../services/terrainService';
import type { STLParams } from '../types/index';


export const generateSTL = async (req: VercelRequest | Request, res: VercelResponse | Response, next?: NextFunction) => {
    const body = req.body as STLParams;
    try {
        const stlBuffer = await generateSTLService(body);

        res.setHeader('Content-Type', 'application/sla');
        res.setHeader('Content-Disposition', 'attachment; filename="terrain.stl"');
        res.status(200).send(stlBuffer);
    } catch (err: any) {
        if (err.status === 429) {
            return res.status(429).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
        if (next) next(err);
    }
}
