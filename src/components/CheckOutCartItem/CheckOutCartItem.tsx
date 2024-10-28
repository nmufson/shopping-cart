import styles from './CheckOutCartItem.module.css';
import { useState } from 'react';
import CartQuantityInput from '../CartQuantityInput/CartQuantityInput';
import { CartItem } from '../../types';

interface CheckOutCartItemProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item: CartItem;
  onRemove: () => void;
  className?: string;
}

const CheckOutCartItem = ({
  setCartItems,
  item,
  onRemove,
  className = '',
}: CheckOutCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const rowClassName = `${styles.row} ${
    className.includes('removed') ? styles.removed : ''
  }`;

  return (
    <div className={rowClassName}>
      <div className={styles.productDiv}>
        <img
          src={item.image}
          alt={item.title}
          className={styles.productImage}
        />
        <div className={styles.productNameRemoveDiv}>
          <p className={styles.productTitle}>{item.title}</p>
          <button onClick={onRemove} className={styles.removeButton}>
            Remove
          </button>
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <div className={styles.quantityDiv}>
          <CartQuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            setCartItems={setCartItems}
            item={item}
            checkout={true}
          />
        </div>
        <div className={styles.priceDiv}>
          <p>${item.displayPrice}</p>
        </div>
        <div className={styles.totalDiv}>
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCartItem;
