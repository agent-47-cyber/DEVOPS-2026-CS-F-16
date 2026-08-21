import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice.js';
import ProjectManager from '../components/admin/ProjectManager.jsx';
import SkillManager from '../components/admin/SkillManager.jsx';
import MessageInbox from '../components/admin/MessageInbox.jsx';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('PROJECTS'); // 'PROJECTS' | 'SKILLS' | 'MESSAGES'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login', { replace: true });
  };

  const tabs = [
    { id: 'PROJECTS', label: 'Projects & Case Studies', icon: '📁' },
    { id: 'SKILLS', label: 'Skills & Competencies', icon: '⚡' },
    { id: 'MESSAGES', label: 'Contact Inquiries', icon: '✉️' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Admin Control Center
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Portfolio CMS Dashboard
          </h1>
          <p className="text-xs text-neutral-400">
            Authenticated as <span className="font-mono text-neutral-200 font-medium">@{user?.username || 'admin'}</span> &bull; All mutations persist to MongoDB
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white transition-colors shadow-sm"
          >
            <span>Sign Out</span>
            <span className="font-mono text-[11px]">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-neutral-100 text-neutral-950 shadow-md'
                : 'border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'PROJECTS' && <ProjectManager />}
        {activeTab === 'SKILLS' && <SkillManager />}
        {activeTab === 'MESSAGES' && <MessageInbox />}
      </div>
    </div>
  );
}

export default AdminDashboard;
