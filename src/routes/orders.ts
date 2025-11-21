import { sendSTL } from '../controllers/orderController.ts';
import { Router } from 'express';

export const router = Router();

router.post('/send', sendSTL);