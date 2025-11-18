
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { sanitize } from '../../shared/utils/sanitizer';
import { getUsersCollection } from '../../infrastructure/database/mongo';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

export async function registerController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, role = 'user' } = req.body;
  const sanitizedEmail = sanitize(email);
  const hashed = await bcrypt.hash(sanitize(password), 10);

  const users = await getUsersCollection();
  const existing = await users.findOne({ email: sanitizedEmail });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const result = await users.insertOne({ email: sanitizedEmail, passwordHash: hashed, role });
  return res.status(201).json({ id: result.insertedId, email: sanitizedEmail });
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await getUsersCollection();
  const user = await users.findOne({ email: sanitize(email) });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: String(user._id), role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}
