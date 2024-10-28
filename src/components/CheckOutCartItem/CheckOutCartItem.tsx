import styles from './CheckOutCartItem.module.css';
import { useState } from 'react';
import CartQuantityInput from '../CartQuantityInput/CartQuantityInput';
import { CartItem } from '../../types';
import { Link } from 'react-router-dom';

interface CheckOutCartItemProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item: CartItem;
  onRemove: () => void;
}

const CheckOutCartItem = ({
  setCartItems,
  item,
  onRemove,
}: CheckOutCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  return (
    <div className={styles.row}>
      <div className={styles.productDiv}>
        <Link to={`/${item.slug}`}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.productImage}
          />
        </Link>
        <div className={styles.productNameRemoveDiv}>
          <Link to={`/${item.slug}`}>
            {' '}
            <p className={styles.productTitle}>{item.title}</p>
          </Link>
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
