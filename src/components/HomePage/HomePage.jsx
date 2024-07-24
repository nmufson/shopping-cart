import { useState } from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <main className={styles.homeContainer}>
      <h1>Welcome to MyStore</h1>
      <p>
        TrendyHaven is your one-stop destination for fashion-forward clothing
        and exquisite jewelry for both men and women. Step into a world of
        endless possibilities and let us redefine your shopping journey.
      </p>
      <Link to="../shop/" className={styles.shopLink}>
        click this for Shop
      </Link>
    </main>
  );
};
