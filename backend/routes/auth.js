import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token topilmadi" });

    // Google tokenni tekshirish
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { sub, email, name, picture } = ticket.getPayload();
    
    // Bazadan qidirish yoki yangi yaratish
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({ googleId: sub, email, name, picture });
    }

    // Tokenlarni yaratish
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Refresh tokenni Cookie'ga saqlash
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, user });
  } catch (error) {
    console.error("Backenddagi xato:", error.message); // Terminalda ko'rasiz
    res.status(401).json({ error: "Google autentifikatsiyasida xatolik" });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Chiqildi' });
});

export default router;