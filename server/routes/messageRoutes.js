import express from 'express';
import auth from '../middleware/auth.js';
import {
  createMessage,
  getMessages,
  markAsRead
} from '../controllers/messageController.js';

const router = express.Router();

// Public route - Contact form submission
router.post('/', createMessage);

// Protected routes - Admin inbox
router.get('/', auth, getMessages);
router.patch('/:id/read', auth, markAsRead);

export default router;
