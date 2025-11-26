import { Router } from 'express';
import { generateSTL } from '../controllers/terrainController.js';

export const router = Router();

router.post('/generate', generateSTL);
