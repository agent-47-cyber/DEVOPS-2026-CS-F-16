import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'dev_secret_key_rtu_capstone_2026';
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      jwtSecret,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error during authentication.' });
  }
};
