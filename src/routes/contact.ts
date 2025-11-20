import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController.ts';

export const router = Router();

router.post('/', sendContactEmail);
