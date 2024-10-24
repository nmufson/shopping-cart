import styles from './CheckOut.module.css';
import { CartItem } from '../../types';
import CheckOutCartItem from '../../components/CheckOutCartItem/CheckOutCartItem';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { useState } from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CheckoutModal from '../../components/Modals/checkoutModal/CheckoutModal';

const CheckOut = () => {
  const { cartItems, setCartItems } = useLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCartQuantity = cartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (cartItems.length === 0)
    return <p className={styles.emptyCartMessage}>Cart is Empty</p>;

  // on remove from cartItems, make it show 'this item was removed from cart' with link
  return (
    <>
      <div className={styles.checkOutPageContainer}>
        <div className={styles.shoppingCartContainer}>
          <div>
            <h1>Your Shopping Cart ({totalCartQuantity} items)</h1>
          </div>
          <table className={styles.checkOutTable}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Item Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
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
        <div className={styles.orderSummary}>
          <OrderSummary></OrderSummary>
        </div>
      </div>
      {isModalOpen && <CheckoutModal closeModal={closeModal}></CheckoutModal>}
    </>
  );
};

export default CheckOut;
