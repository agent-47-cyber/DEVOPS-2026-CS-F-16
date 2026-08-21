import express from 'express';
import auth from '../middleware/auth.js';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);

// Protected routes
router.post('/', auth, createSkill);
router.put('/:id', auth, updateSkill);
router.delete('/:id', auth, deleteSkill);

export default router;
