import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

// Mock the API module so frontend unit tests do not make real network requests
jest.mock('../api/index.js', () => ({
  getProjects: jest.fn().mockResolvedValue([
    {
      _id: 'test-proj-1',
      title: 'Mocked Cloud Project',
      description: 'A mock project for frontend verification',
      techStack: ['React', 'Node.js', 'Docker'],
      featured: true,
    },
  ]),
}));

describe('Home Page Component', () => {
  test('renders the editorial hero and selected work', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /say hello to your creative developer/i })).toBeInTheDocument();
    expect(screen.getByText(/Have a look/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Mocked Cloud Project/i)).toBeInTheDocument();
    });
  });

  test('renders contact destination correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const contactLink = screen.getByRole('link', { name: /Start a conversation/i });
    expect(contactLink).toHaveAttribute('href', '/contact');

    await waitFor(() => {
      expect(screen.getByText(/Mocked Cloud Project/i)).toBeInTheDocument();
    });
  });
});
