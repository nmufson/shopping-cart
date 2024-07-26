import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './ShopPage.module.css';
import { Item } from '../Item/Item';

export const ShopPage = () => {
  const [data, loading, error, currentItem, setCurrentItem] =
    useOutletContext();

  const selectItem = (item) => {
    setCurrentItem(item);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.shopContainer}>
        {data.map((item) => (
          <Item
            key={item.slug}
            item={item}
            onClick={() => selectItem(item)}
            data={data}
            currentItem={currentItem}
          />
        ))}
      </div>
    </>
  );
};
