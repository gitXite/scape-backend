import { Router } from 'express';
import { createSession, vippsCallback, checkCallback } from '../controllers/vippsController';

export const router = Router();

router.post('/', createSession);
router.get('/', checkCallback);
router.post('/callback', vippsCallback);