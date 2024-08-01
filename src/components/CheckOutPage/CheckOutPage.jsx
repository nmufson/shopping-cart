import styles from './CheckOutPage.module.css';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const CheckOutPage = () => {
  const [
    data,
    loading,
    error,
    currentItem,
    setCurrentItem,
    cartItems,
    setCartItems,
  ] = useOutletContext();

  return (
    <div className={styles.checkOutPageContainer}>
      <div className={styles.shoppingCartContainer}>
        <div>
          <h3>Shopping Cart</h3>
        </div>
        <table className={styles.checkOutTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CheckOutCartItem
                key={item.id}
                cartItems={cartItems}
                setCartItems={setCartItems}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className={styles.priceContainer}></div>
      </div>
    </div>
  );
};

const CheckOutCartItem = ({ cartItems, setCartItems, item }) => {
  const removeItem = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.productCell}>
        <div className={styles.productInfo}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.productImage}
          />
          <p className={styles.productTitle}>{item.title}</p>
        </div>
      </td>
      <td className={styles.priceCell}>${item.displayPrice}</td>
      <td className={styles.quantityCell}>
        <CartQuantityDiv
          cartItems={cartItems}
          setCartItems={setCartItems}
          item={item}
        />
      </td>
      <td className={styles.totalCell}>
        ${(item.displayPrice * item.quantity).toFixed(2)}
      </td>
      <td className={styles.removeCell}>
        <button onClick={removeItem}>X</button>
      </td>
    </tr>
  );
};

CheckOutCartItem.propTypes = {
  item: PropTypes.object,
};

const CartQuantityDiv = ({ cartItems, setCartItems, item }) => {
  // use state to control the input value so user can type whatever they want
  // handleBlur sees when we tab or click away from input, and then
  // runs updateCartItem which uses setCartItems
  // the value of our input element is now our inputValue state
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  // useEffect(() => {
  //   setInputValue(item.quantity.toString());
  // }, [item.quantity]);

  const updateCartItem = (newValue) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: newValue } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    let newValue = parseInt(inputValue, 10);
    if (isNaN(newValue) || newValue < 1) {
      newValue = 1;
    }
    setInputValue(newValue.toString());
    updateCartItem(newValue);
  };

  const increment = () => {
    // we make a shallow copy of cartItems so React recognizes the state
    // change and delivers a new render
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const decrement = () => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <input
        type="number"
        className={styles.input}
        value={inputValue}
        // {} insetad of "" so that JSX interprets them as numbers instead of strings
        min={1}
        step={1}
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <button onClick={increment}>+</button>
    </div>
  );
};
