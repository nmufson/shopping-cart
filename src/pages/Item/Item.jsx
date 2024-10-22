import { useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { getByDisplayValue } from '@testing-library/react';

const Item = () => {
  // useLocation returns location object that represents current URL
  // contains state we want passed among other things
  // location.state good for passing data when going to new route using Link
  const location = useLocation();
  const { item } = location.state || {};
  // order matters when destructuring context, need to pull everything
  const [
    data,
    loading,
    error,
    currentItem,
    setCurrentItem,
    cartItems,
    setCartItems,
  ] = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // finds index where the cartItem id equals the itemPage id
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      const updatedCartItems = cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + quantity }; // Add the new quantity to existing
        }
        return cartItem; // Return unchanged cart items
      });
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it with the current quantity
      const itemWithQuantity = { ...item, quantity }; // Use current quantity
      setCartItems((prevCartItems) => [...prevCartItems, itemWithQuantity]);
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.itemPageContainer}>
      <div className={styles.itemImageContainer}>
        <img src={item.image} alt="" />
      </div>
      <div>
        <div>
          <div>
            <h3>{item.title}</h3>
          </div>
          <div>
            <p>${item.displayPrice}</p>
          </div>
          <span></span>
          <div>
            <p>{item.description}</p>
          </div>
        </div>
        <div>
          <p>Quantity:</p>
          <QuantityInputDiv quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
