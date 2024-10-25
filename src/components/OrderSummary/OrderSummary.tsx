import { useLayoutContext } from '../../hooks/useLayoutContext';
import styles from './OrderSummary.module.css';

const OrderSummary: FC = ({ setIsModalOpen }) => {
  const { cartItems } = useLayoutContext();

  const subtotal = cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );

  const estimatedTaxes = (subtotal * 0.05).toFixed(2);
  const total = (subtotal + parseFloat(estimatedTaxes)).toFixed(2);

  return (
    <>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>Order Summary</h2>
      </div>
      <div className={styles.infoDiv}>
        <div className={styles.subtotalDiv}>
          <p>Subtotal: </p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className={styles.shippingDiv}>
          <p>Shipping:</p>
          <p>FREE</p>
        </div>
        <div className={styles.taxesDiv}>
          <p>Est. Taxes:</p>
          <p>${estimatedTaxes}</p>
        </div>
        <div className={styles.orderTotalDiv}>
          <strong>Order Total: </strong>
          <strong>${total}</strong>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.checkoutButton}
      >
        Proceed to Checkout
      </button>
    </>
  );
};

export default OrderSummary;
