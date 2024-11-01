import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from './Item';

// Mock all required dependencies
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../hooks/useLayoutContext', () => ({
  useLayoutContext: vi.fn(),
}));

vi.mock('../../components/CartQuantityInput/CartQuantityInput', () => ({
  default: ({ quantity, setQuantity }: any) => (
    <div data-testid="mock-quantity-input">
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <span>{quantity}</span>
    </div>
  ),
}));

vi.mock('../../components/Modals/AddedToCartModal/AddedToCartModal', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="mock-modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock('../../utils/renderStars', () => ({
  default: ({ rating, count }: any) => (
    <div>
      Rating: {rating} ({count} reviews)
    </div>
  ),
}));

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLayoutContext } from '../../hooks/useLayoutContext';

describe('Item', () => {
  const mockNavigate = vi.fn();
  const mockSetCartItems = vi.fn();

  const mockItem = {
    id: 1,
    title: 'Test Product',
    slug: 'test-product',
    price: 99.99,
    displayPrice: '99.99',
    image: '/test-image.jpg',
    rating: { rate: 4.5, count: 100 },
    description: 'Test description',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as any).mockReturnValue(mockNavigate);
    (useParams as any).mockReturnValue({ slug: 'test-product' });
    (useLayoutContext as any).mockReturnValue({
      data: [mockItem],
      cartItems: [],
      setCartItems: mockSetCartItems,
    });
  });

  it('renders item details correctly from location state', () => {
    (useLocation as any).mockReturnValue({
      state: { item: mockItem },
    });

    render(<Item />);

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.displayPrice}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockItem.title)).toHaveAttribute(
      'src',
      mockItem.image
    );
  });

  it('renders item details correctly from data lookup', () => {
    (useLocation as any).mockReturnValue({ state: null });

    render(<Item />);

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.displayPrice}`)).toBeInTheDocument();
  });

  it('shows "Product not found" when item does not exist', () => {
    (useLocation as any).mockReturnValue({ state: null });
    (useLayoutContext as any).mockReturnValue({
      data: [],
      cartItems: [],
      setCartItems: mockSetCartItems,
    });

    render(<Item />);

    expect(screen.getByText('Product not found')).toBeInTheDocument();
  });

  it('adds item to cart when "Add to Cart" is clicked', async () => {
    (useLocation as any).mockReturnValue({ state: { item: mockItem } });

    render(<Item />);

    await userEvent.click(screen.getByText('Add to Cart'));

    expect(mockSetCartItems).toHaveBeenCalled();
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
  });

  it('navigates to checkout when "Buy Now" is clicked', async () => {
    (useLocation as any).mockReturnValue({ state: { item: mockItem } });

    render(<Item />);

    await userEvent.click(screen.getByText('Buy Now'));

    expect(mockSetCartItems).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('updates quantity when using quantity input', async () => {
    (useLocation as any).mockReturnValue({ state: { item: mockItem } });

    render(<Item />);

    const quantityInput = screen.getByTestId('mock-quantity-input');
    await userEvent.click(quantityInput.querySelector('button')!);

    // When adding to cart, the increased quantity should be used
    await userEvent.click(screen.getByText('Add to Cart'));
    expect(mockSetCartItems).toHaveBeenCalled();
  });

  it('closes modal when close button is clicked', async () => {
    (useLocation as any).mockReturnValue({ state: { item: mockItem } });

    render(<Item />);

    // Open modal
    await userEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();

    // Close modal
    await userEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });
});
