import { sendSTL } from '../controllers/orderController.js';
import { Router } from 'express';

export const router = Router();

router.post('/send', sendSTL);