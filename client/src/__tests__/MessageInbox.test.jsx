import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice.js';
import MessageInbox from '../components/admin/MessageInbox.jsx';
import * as api from '../api/index.js';

// Mock API functions for message inquiries
jest.mock('../api/index.js', () => ({
  getMessages: jest.fn(),
  markMessageRead: jest.fn(),
}));

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        token: 'mock-jwt-token',
        user: { username: 'admin' },
        isAuthenticated: true,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe('MessageInbox Admin Component', () => {
  const sampleMessages = [
    {
      _id: 'msg-1',
      name: 'Jordan Tech Lead',
      email: 'jordan@cloud.org',
      message: 'Great DevOps architecture in your portfolio!',
      read: false,
      createdAt: '2026-08-20T10:00:00.000Z',
    },
    {
      _id: 'msg-2',
      name: 'Sam Manager',
      email: 'sam@enterprise.io',
      message: 'Available for an interview next week?',
      read: true,
      createdAt: '2026-08-19T14:30:00.000Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and renders contact inquiries with unread indicator', async () => {
    api.getMessages.mockResolvedValueOnce(sampleMessages);

    renderWithProviders(<MessageInbox />);

    // Shows unread count badge
    await waitFor(() => {
      expect(screen.getByText(/1 unread/i)).toBeInTheDocument();
      expect(screen.getByText('Jordan Tech Lead')).toBeInTheDocument();
      expect(screen.getByText(/jordan@cloud\.org/i)).toBeInTheDocument();
      expect(screen.getByText(/Great DevOps architecture in your portfolio!/i)).toBeInTheDocument();
      expect(screen.getByText('Sam Manager')).toBeInTheDocument();
    });
  });

  test('allows marking an unread message as read', async () => {
    api.getMessages.mockResolvedValueOnce(sampleMessages);
    api.markMessageRead.mockResolvedValueOnce({
      ...sampleMessages[0],
      read: true,
    });

    renderWithProviders(<MessageInbox />);

    await waitFor(() => {
      expect(screen.getByText('Jordan Tech Lead')).toBeInTheDocument();
    });

    const markReadBtn = screen.getByRole('button', { name: /Mark as Read/i });
    fireEvent.click(markReadBtn);

    await waitFor(() => {
      expect(api.markMessageRead).toHaveBeenCalledWith('msg-1', 'mock-jwt-token');
      expect(screen.getByText(/Message marked as read/i)).toBeInTheDocument();
    });
  });
});
