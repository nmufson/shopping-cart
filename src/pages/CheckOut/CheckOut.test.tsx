import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckOut from './CheckOut';

vi.mock('../../components/CheckOutCartItem/CheckOutCartItem', () => ({
  default: ({ item, onRemove }: any) => (
    <div data-testid={`cart-item-${item.id}`}>
      {item.title}
      <button
        onClick={onRemove}
        className="removeButton"
        aria-label="Remove item"
      >
        Remove
      </button>
    </div>
  ),
}));

vi.mock('../../components/OrderSummary/OrderSummary', () => ({
  default: ({ setIsModalOpen }: any) => (
    <div data-testid="order-summary">
      <button onClick={() => setIsModalOpen(true)}>Checkout</button>
    </div>
  ),
}));

vi.mock('../../components/Modals/checkoutModal/CheckoutModal', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="checkout-modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock('../../hooks/useLayoutContext', () => ({
  useLayoutContext: vi.fn(),
}));

import { useLayoutContext } from '../../hooks/useLayoutContext';

describe('CheckOut', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Test Product 1',
      slug: 'test-product-1',
      price: 99.99,
      displayPrice: '99.99',
      quantity: 2,
      image: '/test-image-1.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      slug: 'test-product-2',
      price: 149.99,
      displayPrice: '149.99',
      quantity: 1,
      image: '/test-image-2.jpg',
    },
  ];

  const mockSetCartItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLayoutContext as any).mockReturnValue({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
    });
  });

  it('displays cart items and total quantity correctly', () => {
    render(<CheckOut />);

    expect(
      screen.getByText('Your Shopping Cart (3 items)')
    ).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
  });

  it('shows empty cart message when cart is empty', () => {
    (useLayoutContext as any).mockReturnValue({
      cartItems: [],
      setCartItems: mockSetCartItems,
    });

    render(<CheckOut />);

    expect(screen.getByText(/Cart is Empty/)).toBeInTheDocument();
    expect(screen.getByText('Shop')).toHaveAttribute('href', '/shop');
  });

  it('opens checkout modal when proceeding to checkout', async () => {
    render(<CheckOut />);

    await userEvent.click(screen.getByText('Checkout'));
    expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
  });

  it('displays correct cart headers', () => {
    render(<CheckOut />);

    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});
