import express from 'express';
import authenticateUser from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/route', authenticateUser, (req, res) => {
    console.log("authenticated\n")
    res.send('User is authenticated and can access this protected route.');
});

export default router;
