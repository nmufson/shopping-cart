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

export const useLayoutContext = () => useOutletContext<LayoutContext>();
