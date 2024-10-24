import styles from './CheckOutCartItem.module.css';
import { useState } from 'react';
import CartQuantityInput from '../CartQuantityInput/CartQuantityInput';
import { CartItem } from '../../types';

interface CheckOutCartItemProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  item: CartItem;
}

const CheckOutCartItem = ({
  cartItems,
  setCartItems,
  item,
}: CheckOutCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const removeItem = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  // add ability to navigate to item page
  return (
    <tr className={styles.row}>
      <td className={styles.productCell}>
        <div className={styles.productInfo}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.productImage}
          />
          <div>
            <p className={styles.productTitle}>{item.title}</p>
            <button onClick={removeItem} className={styles.removeButton}>
              Remove
            </button>
          </div>
        </div>
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
      <td className={styles.priceCell}>${item.displayPrice}</td>
      <td className={styles.totalCell}>
        ${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CheckOutCartItem;
