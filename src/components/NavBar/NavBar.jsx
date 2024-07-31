import { useState } from 'react';
import styles from './NavBar.module.css';
import cartIcon from '../../assets/images/cart.svg';
import { Link } from 'react-router-dom';

export const NavBar = ({ totalCartQuantity }) => {
  return (
    <header className={styles.header}>
      <div>
        <h2>MyStore</h2>
      </div>
      <div className={styles.navContainer}>
        <Link to="home/">
          <div>
            <p>Home</p>
          </div>
        </Link>
        <div></div>
        <Link to="shop/">
          <div>
            <p>Shop</p>
          </div>
        </Link>
        {/* do the same for About Page */}
        <div>
          <h3>About</h3>
        </div>
      </div>
      <Link to="checkout/">
        <div className={styles.cartIconContainer}>
          <p>{totalCartQuantity}</p>
          <img src={cartIcon} alt="Cart Icon" />
        </div>
      </Link>
    </header>
  );
};
