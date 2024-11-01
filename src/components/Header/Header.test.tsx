import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

vi.mock('./CartIcon', () => ({
  default: ({ 'aria-label': ariaLabel }: { 'aria-label': string }) => (
    <div aria-label={ariaLabel}>Cart Icon</div>
  ),
}));

describe('Header', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  describe('Cart Quantity Display', () => {
    it('displays correct total quantity from cart items', () => {
      const cartItems = [
        { quantity: 2, id: 1, title: 'Item 1', price: 10 },
        { quantity: 3, id: 2, title: 'Item 2', price: 20 },
      ];

      renderWithRouter(<Header cartItems={cartItems} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('displays 0 when cart is empty', () => {
      renderWithRouter(<Header cartItems={[]} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles invalid cart items gracefully', () => {
      const invalidCartItems = [
        { quantity: 'invalid' },
        { quantity: null },
        {},
      ];

      renderWithRouter(<Header cartItems={invalidCartItems} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  it('toggles dropdown menu when hamburger button is clicked', async () => {
    renderWithRouter(<Header cartItems={[]} />);

    const menuButton = screen.getByLabelText('Toggle Menu');

    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();

    await userEvent.click(menuButton);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();

    await userEvent.click(menuButton);
    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
  });
});
