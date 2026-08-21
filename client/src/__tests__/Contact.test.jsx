import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../pages/Contact.jsx';
import * as api from '../api/index.js';

// Mock API layer to prevent actual network submissions during testing
jest.mock('../api/index.js', () => ({
  submitMessage: jest.fn(),
}));

describe('Contact Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all required form inputs and submit button', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('allows user to type into input fields and submit successfully', async () => {
    api.submitMessage.mockResolvedValueOnce({
      success: true,
      message: 'Message sent successfully.',
    });

    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Alex Recruiter' } });
    fireEvent.change(emailInput, { target: { value: 'alex@company.com' } });
    fireEvent.change(messageInput, { target: { value: 'We would love to discuss a role.' } });

    expect(nameInput.value).toBe('Alex Recruiter');
    expect(emailInput.value).toBe('alex@company.com');
    expect(messageInput.value).toBe('We would love to discuss a role.');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.submitMessage).toHaveBeenCalledWith({
        name: 'Alex Recruiter',
        email: 'alex@company.com',
        message: 'We would love to discuss a role.',
      });
    });
  });
});
