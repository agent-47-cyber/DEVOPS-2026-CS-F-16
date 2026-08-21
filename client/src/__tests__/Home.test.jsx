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
  test('renders hero headline and professional description', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verify main headline and introduction
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText(/Building robust web applications and automated delivery pipelines/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Mocked Cloud Project/i)).toBeInTheDocument();
    });
  });

  test('renders navigation CTA links correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const projectsLink = screen.getByRole('link', { name: /Explore Projects/i });
    expect(projectsLink).toHaveAttribute('href', '/projects');

    const contactLink = screen.getByRole('link', { name: /Get in Touch/i });
    expect(contactLink).toHaveAttribute('href', '/contact');

    await waitFor(() => {
      expect(screen.getByText(/Mocked Cloud Project/i)).toBeInTheDocument();
    });
  });
});
