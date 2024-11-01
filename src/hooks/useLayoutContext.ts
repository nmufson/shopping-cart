import { useOutletContext } from 'react-router-dom';
import { Product, CartItem } from '../types';

type LayoutContext = [
  Product[],
  boolean,
  string | null,
  Product | null,
  React.Dispatch<React.SetStateAction<Product | null>>,
  CartItem[],
  React.Dispatch<React.SetStateAction<CartItem[]>>
];

// useLayoutContext basically calls useOutletContext with our defined types
// had it return object so we could pull specific properties
export const useLayoutContext = () => {
  const context = useOutletContext<LayoutContext>();

  return {
    data: context[0],
    loading: context[1],
    error: context[2],
    currentItem: context[3],
    setCurrentItem: context[4],
    cartItems: context[5],
    setCartItems: context[6],
  };
};
