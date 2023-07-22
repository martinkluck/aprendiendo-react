import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Router from './Router.jsx';
import { beforeEach } from 'vitest';
import { getCurrentPath } from './utils.js';
import { Link } from './Link.jsx';
import Route from './Route.jsx';

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn(),
}));

describe('Router', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('should render without problems', () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it('should render 404 if no routes match', () => {
    render(
      <Router
        routes={[]}
        defaultComponent={() => <div>404</div>}
      />
    );
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should render the first matching route', () => {
    getCurrentPath.mockReturnValue('/about');
    const routes = [
      {
        path: '/',
        component: () => <div>Home</div>,
      },
      {
        path: '/about',
        component: () => <div>About</div>,
      },
    ];
    render(<Router routes={routes} />);
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/');
    render(
      <Router>
        <Route path='/' component={() => {
          return (
            <>
              <h1>Home</h1>
              <Link to='/about'>Ir a About</Link>
            </>
          );
        }} />
        <Route path='/about' component={() => <h1>About</h1>} />
      </Router>
    );

    // click on the link
    const button = screen.getByText(/Ir a About/);
    fireEvent.click(button);

    // Check that the new page is rendered
    const aboutTitle = await screen.findByText('About');
    expect(aboutTitle).toBeTruthy();
  });
});
