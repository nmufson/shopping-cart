import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

import { Link } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const totalCartQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const itemList = data.map((item) => ({
          ...item,
          slug: createSlug(item.title),
          displayPrice: updatePrice(item.price),
        }));
        setData(itemList);
        setLoading(false);
        console.log(itemList);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar totalCartQuantity={totalCartQuantity(cartItems)} />
      <main>
        <Outlet
          context={[
            data,
            loading,
            error,
            currentItem,
            setCurrentItem,
            cartItems,
            setCartItems,
          ]}
        />
      </main>
    </>
  );
}

export default App;

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading or trailing dashes
};

// dont need this, can use toFixed

const updatePrice = (price) => {
  const priceString = String(price);
  let displayPrice;
  if (priceString.includes('.')) {
    const index = priceString.indexOf('.');
    displayPrice =
      priceString.slice(index + 1).length === 2
        ? priceString
        : `${priceString}0`;
  } else {
    displayPrice = `${price}.00`;
  }

  return displayPrice;
};
