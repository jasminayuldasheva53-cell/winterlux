import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// MUHIM: CORS sozlamalari
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'https://winterlux.netlify.app', 
  credentials: true 
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// MUHIM: 0.0.0.0 da tinglash (Render uchun)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});