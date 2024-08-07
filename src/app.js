import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import emailRoutes from './routes/email.routes.js';
import { authenticateUser } from './middlewares/auth.middleware.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Use cookie-parser middleware
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/auth', authRoutes);
app.use('/emails', authenticateUser, emailRoutes);
// routes
export { app };
