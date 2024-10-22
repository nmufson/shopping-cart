import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';
import styles from './Modal.module.css';

interface ModalProps {
  addedItem: CartItem;
  cartItems: CartItem[];
  onClose: () => void;
}

const AddToCartConfirmationModal = ({
  addedItem,
  cartItems,
  onClose,
}: ModalProps) => {
  const navigate = useNavigate();

  const cartSubtotal = cartItems
    .reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <h2>Item Added to Cart!</h2>
        <p>
          {addedItem.title} - Quantity: {addedItem.quantity}
        </p>
        <p>Cart Subtotal: ${cartSubtotal}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.closeButton}>
            Continue Shopping
          </button>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCartConfirmationModal;
