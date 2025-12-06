import { Router } from 'express';
import { createSession } from '../controllers/vippsController';

export const router = Router();

router.post('/', createSession);