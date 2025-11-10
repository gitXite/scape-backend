import { Router } from 'express';
import { downloadSTL } from '../controllers/terrainController.ts';

export const router = Router();

router.post('/download', downloadSTL);