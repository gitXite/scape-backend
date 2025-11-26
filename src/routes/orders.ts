import { sendSTL } from '../controllers/orderController';
import { Router } from 'express';

export const router = Router();

router.post('/send', sendSTL);