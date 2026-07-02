import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = '7d';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (data: {
  id: string;
  email: string;
  role: string;
}): string => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
