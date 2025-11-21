import type { NextFunction, Request, Response } from 'express';
import { generateSTL as generateSTLService } from '../services/terrainService.ts';
import type { STLParams } from '../types/index.ts';


export const generateSTL = async (req: Request<{}, {}, STLParams>, res: Response, next: NextFunction) => {
    try {
        const stlBuffer = await generateSTLService(req.body);

        res.setHeader('Content-Type', 'application/sla');
        res.setHeader('Content-Disposition', 'attachment; filename="terrain.stl"');
        res.status(200).send(stlBuffer);
    } catch (err: any) {
        if (err.status === 429) {
            return res.status(429).json({ message: err.message });
        }
        next(err);
    }
}
