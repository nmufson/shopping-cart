import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemCard from './ItemCard';

vi.mock('../../utils/renderStars', () => ({
  default: ({ rating, count }: { rating: number; count: number }) => (
    <div data-testid="mock-stars">
      Rating: {rating} ({count} reviews)
    </div>
  ),
}));

describe('ItemCard', () => {
  const mockProduct = {
    id: 3,
    title: 'Test Product',
    slug: 'test-product',
    price: 49.99,
    displayPrice: '49.99',
    image: '/test-image.jpg',
    rating: {
      rate: 4.3,
      count: 87,
    },
    description: 'Test description',
  };

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('displays product information correctly', () => {
    renderWithRouter(<ItemCard item={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();

    expect(screen.getByText('$49.99')).toBeInTheDocument();

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', '/test-image.jpg');

    expect(screen.getByTestId('mock-stars')).toBeInTheDocument();
  });

  it('creates link with correct URL and state', () => {
    renderWithRouter(<ItemCard item={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-product');
  });
});
