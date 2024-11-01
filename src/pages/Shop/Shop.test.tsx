import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import Shop from './Shop';

vi.mock('../../hooks/useLayoutContext', () => ({
  useLayoutContext: vi.fn(),
}));

vi.mock('../../components/ItemCard/ItemCard', () => ({
  default: ({ item }: { item: any }) => (
    <div data-testid="mock-item-card">{item.title}</div>
  ),
}));

describe('Shop', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      slug: 'test-product-1',
      price: 99.99,
      displayPrice: '99.99',
      image: '/test-image-1.jpg',
      rating: { rate: 4.5, count: 100 },
      description: 'Test description 1',
    },
    {
      id: 2,
      title: 'Test Product 2',
      slug: 'test-product-2',
      price: 149.99,
      displayPrice: '149.99',
      image: '/test-image-2.jpg',
      rating: { rate: 4.0, count: 80 },
      description: 'Test description 2',
    },
  ];

  it('renders list of products when data is available', () => {
    (useLayoutContext as any).mockReturnValue({
      data: mockProducts,
      error: null,
    });

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-item-card')).toHaveLength(2);
  });

  it('displays error message when error occurs', () => {
    (useLayoutContext as any).mockReturnValue({
      data: [],
      error: 'Failed to fetch products',
    });

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Error: Failed to fetch products')
    ).toBeInTheDocument();
  });
});
