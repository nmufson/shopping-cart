import styles from './CheckOutPage.module.css';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

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
        <table className={styles.checkoutTable}>
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
              <CheckOutCartItem key={item.id} item={item} />
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

const CheckOutCartItem = ({ item }) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>${item.displayPrice}</td>
      <td>{item.quantity}</td>
      <td>${(item.displayPrice * item.quantity).toFixed(2)}</td>
    </tr>
  );
};
