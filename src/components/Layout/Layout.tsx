import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { fetchProducts } from '../../services/productService';
import { Product, CartItem } from '../../types';

const Layout: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Product | null>(null);
  const location = useLocation();

  // can refactor local storage logic into a custom hook
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setData(products);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <div className="loadingDiv">Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <>
      <Header cartItems={cartItems} />
      <Main>
        <Outlet
          context={
            [
              data,
              loading,
              error,
              currentItem,
              setCurrentItem,
              cartItems,
              setCartItems,
            ] as const
          }
        />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
