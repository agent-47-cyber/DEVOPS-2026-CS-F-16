import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { loginAdmin } from '../api/index.js';
import { loginStart, loginSuccess, loginFailure, clearAuthError } from '../redux/authSlice.js';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password) {
      dispatch(loginFailure('Username and password are required.'));
      return;
    }

    dispatch(loginStart());
    try {
      const data = await loginAdmin(credentials);
      dispatch(loginSuccess(data));
      navigate('/admin', { replace: true });
    } catch (err) {
      dispatch(loginFailure(err.message || 'Invalid credentials or server error.'));
    }
  };

  return (
    <div className="flex min-h-[65vh] items-center justify-center py-8">
      <Reveal className="w-full max-w-md">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-8 shadow-2xl backdrop-blur-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Security Gate</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Authentication</h1>
            <p className="text-xs text-neutral-400">
              Enter your credentials to access the portfolio content management system.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-800/60 bg-red-950/30 p-3 text-xs text-red-300">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Username <span className="text-red-400">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter admin username"
                value={credentials.username}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition-all duration-200 hover:bg-neutral-200 hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="border-t border-neutral-800/80 pt-4 text-center">
            <p className="text-[11px] font-mono text-neutral-500">
              Single seeded admin account &bull; Protected by JWT Bearer token
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default AdminLogin;
