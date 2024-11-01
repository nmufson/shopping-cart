import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartQuantityInput from './CartQuantityInput';

describe('CartQuantityInput', () => {
  const mockSetQuantity = vi.fn();
  const mockSetCartItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the current quantity', () => {
    render(<CartQuantityInput quantity={3} setQuantity={mockSetQuantity} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('increments quantity when + button is clicked', async () => {
    render(<CartQuantityInput quantity={3} setQuantity={mockSetQuantity} />);

    await userEvent.click(screen.getByText('+'));
    expect(mockSetQuantity).toHaveBeenCalledWith(4);
  });

  it('decrements quantity when - button is clicked', async () => {
    render(<CartQuantityInput quantity={3} setQuantity={mockSetQuantity} />);

    await userEvent.click(screen.getByText('-'));
    expect(mockSetQuantity).toHaveBeenCalledWith(2);
  });

  it('disables decrement button when quantity is 1', () => {
    render(<CartQuantityInput quantity={1} setQuantity={mockSetQuantity} />);

    expect(screen.getByText('-')).toBeDisabled();
  });

  it('updates cart items in checkout mode', async () => {
    const testItem = { id: 1, name: 'Test Item', price: 10, quantity: 2 };

    render(
      <CartQuantityInput
        quantity={2}
        setQuantity={mockSetQuantity}
        setCartItems={mockSetCartItems}
        item={testItem}
        checkout={true}
      />
    );

    await userEvent.click(screen.getByText('+'));

    expect(mockSetQuantity).toHaveBeenCalledWith(3);
    expect(mockSetCartItems).toHaveBeenCalled();
  });
});
