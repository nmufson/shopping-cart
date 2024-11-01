import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

vi.mock('../../components/Carousel/Carousel', () => ({
  default: () => <div data-testid="mock-carousel">Carousel Mock</div>,
}));

describe('Home', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders main components and content', () => {
    renderWithRouter(<Home />);

    expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();

    expect(screen.getByText('Welcome to Shop Fast')).toBeInTheDocument();

    expect(
      screen.getByText(/Handpicked collections for every style/)
    ).toBeInTheDocument();

    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('navigates to shop page when Shop Now is clicked', async () => {
    renderWithRouter(<Home />);

    const shopLink = screen.getByRole('link');
    expect(shopLink).toHaveAttribute('href', '/shop/');
  });
});
