import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import emailRoutes from './routes/email.routes.js';
import todoRoutes from './routes/todo.routes.js'; // Import todo routes
import authenticateUser from './middlewares/auth.middleware.js';
import protectedRoutes from './routes/protected.routes.js';
import userRoutes from './routes/user.routes.js'
const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define routes
app.use('/protected', protectedRoutes);
app.use('/auth', authRoutes);
app.use('/emails', authenticateUser, emailRoutes);
app.use('/todos', authenticateUser, todoRoutes); // Add todo routes
app.use('/user', authenticateUser, userRoutes);

export { app };
