import { Router } from 'express';
import { generateSTL } from '../controllers/terrainController';

export const router = Router();

router.post('/generate', generateSTL);
