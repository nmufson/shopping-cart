import { useState } from 'react';
import styles from './NavBar.module.css';
import cartIcon from '../../assets/images/cart.svg';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header className={styles.header}>
      <div>
        <h2>MyStore</h2>
      </div>
      <div className={styles.navContainer}>
        <div>
          <Link to="home/">Home</Link>
        </div>
        <div>
          <Link to="shop/">Shop</Link>
        </div>
        <div>
          <h3>About</h3>
        </div>
      </div>
      <div className={styles.cartIconContainer}>
        <img src={cartIcon} alt="Cart Icon" />
      </div>
    </header>
  );
};
