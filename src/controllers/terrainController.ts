import type { Request, Response } from 'express';
import { generateSTL } from '../services/terrainService.ts';


export const downloadSTL = async (req: Request, res: Response) => {
    try {
        const stlBuffer = await generateSTL(req.body);

        res.setHeader('Content-Type', 'application/sla');
        res.setHeader('Content-Disposition', 'attachment; filename="terrain.stl"');
        res.status(200).send(stlBuffer);
    } catch (err) {
        console.error('Error generating stl: ', err);
        res.status(500).send('Failed to generate stl file');
    }
}