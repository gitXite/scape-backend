import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

export const router = Router();

router.post('/', sendContactEmail);
