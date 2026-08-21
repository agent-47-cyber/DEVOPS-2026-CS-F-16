import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function renderProtectedRoute(initialAuthState = {}, initialEntries = ['/admin']) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        ...initialAuthState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/admin/login" element={<div>Admin Login Page</div>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div>Protected Dashboard Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('ProtectedRoute Component', () => {
  test('redirects unauthenticated users to /admin/login', () => {
    renderProtectedRoute({ isAuthenticated: false, token: null });

    expect(screen.getByText(/Admin Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Protected Dashboard Content/i)).not.toBeInTheDocument();
  });

  test('renders protected children when authenticated with valid token', () => {
    renderProtectedRoute({
      isAuthenticated: true,
      token: 'valid-jwt-token',
      user: { username: 'admin' },
    });

    expect(screen.getByText(/Protected Dashboard Content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Admin Login Page/i)).not.toBeInTheDocument();
  });
});
