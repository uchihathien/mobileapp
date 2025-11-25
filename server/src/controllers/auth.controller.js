import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../config/db.js';
import axios from 'axios';
dotenv.config();

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Email in use' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed, name } });
  res.json({ token: signToken(user), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ token: signToken(user), user });
};

export const googleLogin = async (req, res) => {
  const { token } = req.body;
  const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
  const { email, name } = googleRes.data;
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email, name, password: '', provider: 'GOOGLE' } });
  }
  res.json({ token: signToken(user), user });
};
