import { Router } from 'express';
import { generateSTL } from '../controllers/terrainController.ts';

export const router = Router();

router.post('/generate', generateSTL);
