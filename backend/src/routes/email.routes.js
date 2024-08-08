import { Router } from 'express';
import { fetchEmails } from '../controllers/email.controller.js';

const router = Router();

router.get('/fetch', fetchEmails);

export default router;
