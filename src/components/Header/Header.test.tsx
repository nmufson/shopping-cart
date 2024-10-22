import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header component', () => {
  it('renders correct Header elements', () => {
    render(
      // wrapping in Router adds the react router context of using
      // Router methods like Link
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /MyStore/
    );
  });

  it('contains navigation links', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText('Home').getAttribute('href')).toBe('/home/');
    expect(screen.getByText('Shop').getAttribute('href')).toBe('/shop/');
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
