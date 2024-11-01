import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CheckOutCartItem from './CheckOutCartItem';

vi.mock('./CartQuantityInput', () => ({
  default: ({ quantity }: { quantity: number }) => (
    <div data-testid="mock-quantity-input">Quantity: {quantity}</div>
  ),
}));

describe('CheckOutCartItem', () => {
  const mockSetCartItems = vi.fn();
  const mockOnRemove = vi.fn();

  const mockItem = {
    id: 1,
    title: 'Test Product',
    slug: 'test-product',
    price: 9.99,
    displayPrice: '9.99',
    quantity: 2,
    image: '/test-image.jpg',
  };

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays item details correctly', () => {
    renderWithRouter(
      <CheckOutCartItem
        setCartItems={mockSetCartItems}
        item={mockItem}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();

    expect(screen.getByText('$19.98')).toBeInTheDocument();

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('calls onRemove when remove button is clicked', async () => {
    renderWithRouter(
      <CheckOutCartItem
        setCartItems={mockSetCartItems}
        item={mockItem}
        onRemove={mockOnRemove}
      />
    );

    await userEvent.click(screen.getByText('Remove'));
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('renders product links with correct URLs', () => {
    renderWithRouter(
      <CheckOutCartItem
        setCartItems={mockSetCartItems}
        item={mockItem}
        onRemove={mockOnRemove}
      />
    );

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/test-product');
    });
  });
});
