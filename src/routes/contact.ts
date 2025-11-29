import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController';

export const router = Router();

router.post('/', sendContactEmail);
