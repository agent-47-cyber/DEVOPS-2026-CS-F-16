import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../api/index.js';

const STANDARD_CATEGORIES = [
  'Frontend Development',
  'Backend & APIs',
  'DevOps & Cloud Automation',
  'Methodology & Engineering',
];

const EMPTY_SKILL = {
  name: '',
  category: 'Frontend Development',
  level: 'Advanced',
};

function SkillManager() {
  const { token } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_SKILL);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch skills.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_SKILL);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Frontend Development',
      level: skill.level || 'Advanced',
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(EMPTY_SKILL);
    setFormError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError('Skill name and category are required.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      level: formData.level ? formData.level.trim() : '',
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateSkill(editingId, payload, token);
        showSuccess(`Skill "${payload.name}" updated successfully.`);
      } else {
        await createSkill(payload, token);
        showSuccess(`Skill "${payload.name}" added successfully.`);
      }
      handleCloseForm();
      fetchSkills();
    } catch (err) {
      setFormError(err.message || 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${skill.name}"?\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteSkill(skill._id, token);
      showSuccess(`Skill "${skill.name}" deleted successfully.`);
      fetchSkills();
    } catch (err) {
      setError(err.message || 'Failed to delete skill.');
    }
  };

  // Group skills by category for organized view
  const categorizedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const cat = skill.category || 'General';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const categoryNames = Object.keys(categorizedSkills);

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Skills Inventory Manager</h2>
          <p className="text-xs text-neutral-400">
            Create, categorize, update proficiency levels, and remove skills.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-neutral-950 shadow-sm transition-colors hover:bg-neutral-200"
        >
          <span>+ Add New Skill</span>
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

      {/* Skill Form Modal / Drawer */}
      {isFormOpen && (
        <div className="rounded-xl border border-neutral-700 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Skill Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Docker"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                >
                  {STANDARD_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Proficiency Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-neutral-500 focus:outline-none"
                >
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
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
                {saving ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List */}
      {loading && (
        <div className="py-8 text-center text-xs font-mono text-neutral-500">
          Loading skills from database...
        </div>
      )}

      {!loading && skills.length === 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-8 text-center text-xs text-neutral-500">
          No skills recorded in database. Click &ldquo;+ Add New Skill&rdquo; to populate your skills inventory.
        </div>
      )}

      {!loading && categoryNames.length > 0 && (
        <div className="space-y-6">
          {categoryNames.map((catName) => (
            <div key={catName} className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">{catName}</h3>
                <span className="text-xs text-neutral-500 font-mono">
                  {categorizedSkills[catName].length} skills
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categorizedSkills[catName].map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-neutral-800 bg-neutral-950/80 px-3 py-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-neutral-200 block">{skill.name}</span>
                      <span className="text-[10px] font-mono text-neutral-500">{skill.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="rounded px-2 py-1 text-[11px] text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                        title="Edit skill"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill)}
                        className="rounded px-2 py-1 text-[11px] text-red-400 hover:bg-red-950/60 hover:text-red-200 transition-colors"
                        title="Delete skill"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillManager;
