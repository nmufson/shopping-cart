import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RemovedCartItem from './RemovedCartItem';

describe('RemovedCartItem', () => {
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

  it('displays removed item message with correct link', () => {
    renderWithRouter(<RemovedCartItem item={mockItem} onUndo={() => {}} />);

    const link = screen.getByRole('link', { name: 'Test Product' });
    expect(link).toHaveAttribute('href', '/test-product');
    expect(screen.getByText(/was removed from your cart/)).toBeInTheDocument();
  });

  it('calls onUndo when undo button is clicked', async () => {
    const mockUndo = vi.fn();
    renderWithRouter(<RemovedCartItem item={mockItem} onUndo={mockUndo} />);

    await userEvent.click(screen.getByText('Undo?'));
    expect(mockUndo).toHaveBeenCalled();
  });
});
