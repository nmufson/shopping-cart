import styles from './CheckOut.module.css';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CheckOutCartItem from '../../components/CheckOutCartItem/CheckOutCartItem';

const CheckOut = () => {
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

export default CheckOut;
