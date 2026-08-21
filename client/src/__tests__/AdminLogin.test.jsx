import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice.js';
import AdminLogin from '../pages/AdminLogin.jsx';
import * as api from '../api/index.js';

// Mock API layer for admin login test
jest.mock('../api/index.js', () => ({
  loginAdmin: jest.fn(),
}));

function renderWithProviders(ui, initialAuthState = {}) {
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

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
  };
}

describe('AdminLogin Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with username, password, and submit button', () => {
    renderWithProviders(<AdminLogin />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In to Dashboard/i })).toBeInTheDocument();
  });

  test('allows input typing for credentials', () => {
    renderWithProviders(<AdminLogin />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('admin');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles successful login submission and updates store', async () => {
    api.loginAdmin.mockResolvedValueOnce({
      token: 'jwt-super-secret-token',
      user: { id: 'admin-1', username: 'admin' },
    });

    const { store } = renderWithProviders(<AdminLogin />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Sign In to Dashboard/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'adminPassword123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.loginAdmin).toHaveBeenCalledWith({
        username: 'admin',
        password: 'adminPassword123',
      });
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('jwt-super-secret-token');
      expect(state.user.username).toBe('admin');
    });
  });

  test('displays error message when login fails with invalid credentials', async () => {
    api.loginAdmin.mockRejectedValueOnce(new Error('Invalid credentials.'));

    const { store } = renderWithProviders(<AdminLogin />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Sign In to Dashboard/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials./i)).toBeInTheDocument();
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
