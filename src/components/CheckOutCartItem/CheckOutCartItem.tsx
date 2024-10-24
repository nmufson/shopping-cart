import styles from './CheckOutCartItem.module.css';
import { useState } from 'react';
import CartQuantityInput from '../CartQuantityInput/CartQuantityInput';
import { CartItem } from '../../types';

interface CheckOutCartItemProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item: CartItem;
  onRemove: () => void;
}

const CheckOutCartItem = ({
  setCartItems,
  item,
  onRemove,
  className,
}: CheckOutCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  // add ability to navigate to item page
  console.log(className);
  return (
    <tr className={`${styles.row} ${className}`}>
      <td className={styles.productCell}>
        <img
          src={item.image}
          alt={item.title}
          className={styles.productImage}
        />
        {/* <div> */}
        <p className={styles.productTitle}>{item.title}</p>
        <button onClick={onRemove} className={styles.removeButton}>
          Remove
        </button>
        {/* </div> */}
      </td>
      <td className={styles.quantityCell}>
        <CartQuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          checkout={true}
          setCartItems={setCartItems}
          item={item}
        />
      </td>
      <td className={styles.priceCell}>
        <p>${item.displayPrice}</p>
      </td>
      <td className={styles.totalCell}>
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
      </td>
    </tr>
  );
};

export default CheckOutCartItem;
