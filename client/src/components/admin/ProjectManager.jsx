import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getProjects, createProject, updateProject, deleteProject } from '../../api/index.js';

const EMPTY_FORM = {
  title: '',
  description: '',
  techStack: '',
  repoUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
  order: 0,
};

function ProjectManager() {
  const { token } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form modal/drawer state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      featured: Boolean(project.featured),
      order: project.order || 0,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFormError(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError('Title and description are required.');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      techStack: formData.techStack
        ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      repoUrl: formData.repoUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      imageUrl: formData.imageUrl.trim(),
      featured: Boolean(formData.featured),
      order: Number(formData.order) || 0,
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, payload, token);
        showSuccess(`Project "${payload.title}" updated successfully.`);
      } else {
        await createProject(payload, token);
        showSuccess(`Project "${payload.title}" created successfully.`);
      }
      handleCloseForm();
      fetchProjects();
    } catch (err) {
      setFormError(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      await updateProject(
        project._id,
        { ...project, featured: !project.featured },
        token
      );
      showSuccess(`Project "${project.title}" ${!project.featured ? 'marked as featured' : 'unfeatured'}.`);
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to toggle featured status.');
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteProject(project._id, token);
      showSuccess(`Project "${project.title}" deleted successfully.`);
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Project Catalog Manager</h2>
          <p className="text-xs text-neutral-400">
            Create, edit, toggle featured status, and delete case study projects.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-neutral-950 shadow-sm transition-colors hover:bg-neutral-200"
        >
          <span>+ Add New Project</span>
        </button>
      </div>

      {/* Global feedback messages */}
      {successMsg && (
        <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 text-xs text-emerald-300">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-800/60 bg-red-950/30 p-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Project Form Modal / Drawer */}
      {isFormOpen && (
        <div className="rounded-xl border border-neutral-700 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              onClick={handleCloseForm}
              className="text-xs font-mono text-neutral-400 hover:text-white"
            >
              ✕ Cancel
            </button>
          </div>

          {formError && (
            <div className="rounded-lg border border-red-800/60 bg-red-950/30 p-3 text-xs text-red-300">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Kubernetes Microservices Mesh"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  name="techStack"
                  type="text"
                  placeholder="e.g. React, Node.js, Docker, Kubernetes"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                required
                placeholder="Comprehensive overview of the case study..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Repository URL
                </label>
                <input
                  name="repoUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.repoUrl}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Live Demo URL
                </label>
                <input
                  name="liveUrl"
                  type="url"
                  placeholder="https://demo.example.com"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                <input
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded border-neutral-700 bg-neutral-950 text-white"
                />
                <span>Featured Project (Displays on Home page)</span>
              </label>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <label htmlFor="order" className="font-mono uppercase text-neutral-400">Order:</label>
                <input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-16 rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs text-neutral-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={handleCloseForm}
                disabled={saving}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-white px-5 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 disabled:opacity-60"
              >
                {saving ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      {loading && (
        <div className="py-8 text-center text-xs font-mono text-neutral-500">
          Loading projects from database...
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-8 text-center text-xs text-neutral-500">
          No projects found in database. Click &ldquo;+ Add New Project&rdquo; to create your first case study.
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-800 bg-neutral-950/80 font-mono uppercase text-neutral-400">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Tech Stack</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white">{project.title}</div>
                      <div className="text-[11px] text-neutral-400 line-clamp-1 max-w-sm mt-0.5">
                        {project.description}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.techStack?.slice(0, 3).map((t) => (
                          <span key={t} className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                            {t}
                          </span>
                        ))}
                        {project.techStack?.length > 3 && (
                          <span className="rounded bg-neutral-800/50 px-1 py-0.5 text-[10px] text-neutral-500 font-mono">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                          project.featured
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-neutral-800 text-neutral-500 hover:text-neutral-300'
                        }`}
                        title="Click to toggle featured status"
                      >
                        {project.featured ? '★ Featured' : '☆ Standard'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="rounded border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="rounded border border-red-900/60 bg-red-950/40 px-2.5 py-1 text-xs text-red-300 hover:bg-red-900/60 hover:text-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectManager;
