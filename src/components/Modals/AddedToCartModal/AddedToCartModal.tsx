import { useNavigate } from 'react-router-dom';
import { CartItem, Product } from '../../../types';
import styles from './AddedToCartModal.module.css';
import CheckMarkIcon from '../../icons/CheckMarkIcon';

interface ModalProps {
  item: Product;
  addedQuantity: number;
  cartItems: CartItem[];
  onClose: () => void;
}

const AddedToCartModal = ({
  item,
  addedQuantity,
  cartItems,
  onClose,
}: ModalProps) => {
  const navigate = useNavigate();

  // make this an added subtotal of what the user just added

  const cartSubtotal = cartItems
    .reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/shop');
  };

  // show the added quantity and added subtotal
  // at bottom show Cart subtotal with number of total items

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className={`${styles.modal} modal`}>
        {/* perhaps add a checkmark here or something  */}
        <div className={styles.confirmationDiv}>
          <h2 className={styles.addedToCartAlert}>Item Added to Cart!</h2>
          <CheckMarkIcon
            size={40}
            color="currentColor"
            className={styles.cartIcon}
            aria-label="Shopping Cart"
          />
        </div>

        <h2>{item.title}</h2>
        <p>${(addedQuantity * item.price).toFixed(2)}</p>
        <p>Quantity: {addedQuantity}</p>
        <p>Cart Subtotal: ${cartSubtotal}</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleContinueShopping}
            className={styles.closeButton}
          >
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

export default AddedToCartModal;
