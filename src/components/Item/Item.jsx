import { useEffect, useState } from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';

export const Item = ({ item }) => {
  const price = String(item.price);
  let displayPrice;
  if (price.includes('.')) {
    const index = price.indexOf('.');
    price.slice(index + 1).length === 2
      ? (displayPrice = price)
      : (displayPrice = `${price}0`);
  } else {
    displayPrice = `${price}.00`;
  }

  return (
    <div className={styles.itemContainer}>
      <div>
        <img src={item.image} alt="" />
      </div>
      <div>
        <p>{item.title}</p>
        <p>${displayPrice}</p>
      </div>
      <div>
        <button>
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};
