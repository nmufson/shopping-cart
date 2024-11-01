import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderSummary from './OrderSummary';
import { useLayoutContext } from '../../hooks/useLayoutContext';

vi.mock('../../hooks/useLayoutContext', () => ({
  useLayoutContext: vi.fn(),
}));

describe('OrderSummary', () => {
  const mockSetIsModalOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithCartItems = (
    cartItems: Array<{ price: number; quantity: number }>
  ) => {
    (useLayoutContext as any).mockReturnValue({ cartItems });
    return render(<OrderSummary setIsModalOpen={mockSetIsModalOpen} />);
  };

  it('calculates and displays correct subtotal', () => {
    const cartItems = [
      { price: 13, quantity: 1 },
      { price: 57, quantity: 3 },
    ];
    renderWithCartItems(cartItems);

    expect(screen.getByText('$184.00')).toBeInTheDocument();
  });

  it('calculates and displays correct estimated taxes', () => {
    const cartItems = [{ price: 70, quantity: 2 }];
    renderWithCartItems(cartItems);

    expect(screen.getByText('$7.00')).toBeInTheDocument();
  });

  it('calculates and displays correct total', () => {
    const cartItems = [{ price: 100, quantity: 1 }];
    renderWithCartItems(cartItems);

    expect(screen.getByText('$105.00')).toBeInTheDocument();
  });

  describe('Checkout button', () => {
    it('is disabled when cart is empty', () => {
      renderWithCartItems([]);

      const checkoutButton = screen.getByText('Proceed to Checkout');
      expect(checkoutButton).toBeDisabled();

      userEvent.click(checkoutButton);
      expect(mockSetIsModalOpen).not.toHaveBeenCalled();
    });

    it('is enabled and opens modal when cart has items', async () => {
      renderWithCartItems([{ price: 10, quantity: 1 }]);

      const checkoutButton = screen.getByText('Proceed to Checkout');
      expect(checkoutButton).toBeEnabled();

      await userEvent.click(checkoutButton);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
    });
  });
});
