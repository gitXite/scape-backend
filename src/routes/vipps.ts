import { Router } from 'express';
import { createSession, vippsCallback } from '../controllers/vippsController';

export const router = Router();

router.post('/', createSession);
router.post('/callback', vippsCallback);