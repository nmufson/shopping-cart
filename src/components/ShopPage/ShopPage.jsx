import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './ShopPage.module.css';
import { Item } from '../Item/Item';

export const ShopPage = () => {
  const [data, loading, error] = useOutletContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main className={styles.shopContainer}>
        {data.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </main>
    </>
  );
};
