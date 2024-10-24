import { useMemo } from 'react';
import styles from './Header.module.css';
import { CartIcon } from '../icons';
import { CartItem } from '../../types';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  // runs when cartItems changes rather than on each render
  const totalCartQuantity = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
      const quantity =
        item && typeof item.quantity === 'number' ? item.quantity : 0;
      return total + quantity;
    }, 0);
  }, [cartItems]);

  return (
    <header className={styles.header}>
      <Link to="shop/">
        <p className={styles.myStoreP}>MyStore</p>
      </Link>
      <div className={styles.navContainer}>
        <Link to="home/">
          <p>Home</p>
        </Link>
        <Link to="shop/">
          <p>Shop</p>
        </Link>
        <Link to="about/">
          <p>About</p>
        </Link>
      </div>

      <Link to="checkout/">
        <div className={styles.cartIconContainer}>
          <p>{totalCartQuantity}</p>
          <CartIcon
            size={40}
            color="currentColor"
            className={styles.cartIcon}
            aria-label="Shopping Cart"
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;
