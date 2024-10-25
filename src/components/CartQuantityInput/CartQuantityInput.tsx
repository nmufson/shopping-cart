import styles from './CartQuantiyInput.module.css';
import { CartItem } from '../../types';

interface CartQuantityInputProps {
  quantity: number;
  setQuantity: (value: number) => void;
  setCartItems?: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item?: CartItem;
}

const CartQuantityInput = ({
  quantity,
  setQuantity,
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
        <span>{quantity}</span>
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default CartQuantityInput;
