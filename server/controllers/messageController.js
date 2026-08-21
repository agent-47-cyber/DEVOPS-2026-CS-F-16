import mongoose from 'mongoose';
import Message from '../models/Message.js';

// POST /api/messages - Public (contact form submission)
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: 'Message sent successfully.',
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to submit message.' });
  }
};

// GET /api/messages - Protected
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch messages.' });
  }
};

// PATCH /api/messages/:id/read - Protected
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to update message status.' });
  }
};
