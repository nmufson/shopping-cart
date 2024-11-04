import { useMemo } from 'react';
import styles from './Header.module.css';
import { CartIcon } from '../icons';
import { CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // runs when cartItems changes rather than on each render
  const totalCartQuantity = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
      const quantity =
        item && typeof item.quantity === 'number' ? item.quantity : 0;
      return total + quantity;
    }, 0);
  }, [cartItems]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      <Link to="shop/">
        <p className={styles.shopFastP}>Shop Fast</p>
      </Link>

      <div className={styles.navContainer}>
        <Link to="home/">
          <p>Home</p>
        </Link>
        <Link to="shop/">
          <p>Shop</p>
        </Link>
      </div>

      <div className={styles.cartMenuDiv}>
        <Link to="checkout/" className={styles.checkOutLink}>
          <div className={styles.cartIconContainer}>
            <div className={styles.cartQuantityWrapper}>
              <p>{totalCartQuantity}</p>
            </div>
            <CartIcon
              color="currentColor"
              className={styles.cartIcon}
              aria-label="Shopping Cart"
            />
            <p className={styles.cartP}>Cart</p>
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className={styles.hamburgerIcon}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.dropdownMenu} data-testid="dropdown-menu">
          <Link to="home/" onClick={() => setIsMenuOpen(false)}>
            <p>Home</p>
          </Link>
          <Link to="shop/" onClick={() => setIsMenuOpen(false)}>
            <p>Shop</p>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
