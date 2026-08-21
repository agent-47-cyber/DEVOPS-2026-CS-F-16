import mongoose from 'mongoose';
import Project from '../models/Project.js';

// GET /api/projects - Public (optional ?featured=true query)
export const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};

    if (featured === 'true') {
      filter.featured = true;
    } else if (featured === 'false') {
      filter.featured = false;
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch projects.' });
  }
};

// GET /api/projects/:id - Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch project.' });
  }
};

// POST /api/projects - Protected
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, repoUrl, liveUrl, imageUrl, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const project = await Project.create({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      repoUrl: repoUrl || '',
      liveUrl: liveUrl || '',
      imageUrl: imageUrl || '',
      featured: Boolean(featured),
      order: Number.isInteger(Number(order)) ? Number(order) : 0
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to create project.' });
  }
};

// PUT /api/projects/:id - Protected
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to update project.' });
  }
};

// DELETE /api/projects/:id - Protected
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to delete project.' });
  }
};
