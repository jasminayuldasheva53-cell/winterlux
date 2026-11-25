import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB ulandi');
  app.listen(process.env.PORT || 5000, () => console.log('Server ishlayapti'));
});