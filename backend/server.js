import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS sozlamalari
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'https://winterlux.netlify.app', 
  credentials: true 
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// MUHIM: Bazaga ulanish vaqtini uzaytiramiz va faqat ulangandan keyin serverni ishga tushiramiz
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 soniya kutish
      bufferTimeoutMS: 30000, // 30 soniya buffer
    });
    console.log('✅ MongoDB muvaffaqiyatli ulandi!');
    
    // Faqat baza ulangandan keyin portni ochamiz
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server ${PORT} portda ishlayapti`);
    });
  } catch (error) {
    console.error('❌ MongoDB ulanishida xato:', error.message);
    process.exit(1); // Xato bo'lsa, jarayonni to'xtatamiz
  }
};

startServer();