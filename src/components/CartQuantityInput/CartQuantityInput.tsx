import styles from './CartQuantiyInput.module.css';
import { CartItem } from '../../types';

interface CartQuantityInputProps {
  quantity: number;
  setQuantity: (value: number) => void;
  checkout?: boolean; // Optional prop to indicate if we're on checkout page
  setCartItems?: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item?: CartItem;
}

const CartQuantityInput = ({
  quantity,
  setQuantity,
  checkout = false,
  setCartItems,
  item,
}: CartQuantityInputProps) => {
  const updateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);

    if (checkout && setCartItems && item) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (cartItem) => cartItem.id === item.id
        );
        existingItem.quantity = newQuantity;
        return [...prevItems];
      });
    }
  };

  const increment = () => {
    updateQuantity(quantity + 1);
  };

  const decrement = () => {
    updateQuantity(Math.max(1, quantity - 1));
  };

  return (
    <div className={styles.quantityInput}>
      <button onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <div className={styles.inputWrapper}>
        {!checkout && <span>Quantity: </span>}
        <span>{quantity}</span>
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default CartQuantityInput;
