import mongoose from 'mongoose';
import Skill from '../models/Skill.js';

// GET /api/skills - Public
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, createdAt: -1 });
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch skills.' });
  }
};

// POST /api/skills - Protected
export const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required.' });
    }

    const skill = await Skill.create({
      name: name.trim(),
      category: category.trim(),
      level: level ? String(level).trim() : ''
    });

    return res.status(201).json(skill);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to create skill.' });
  }
};

// PUT /api/skills/:id - Protected
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    return res.status(200).json(updatedSkill);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to update skill.' });
  }
};

// DELETE /api/skills/:id - Protected
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    return res.status(200).json({ message: 'Skill deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to delete skill.' });
  }
};
