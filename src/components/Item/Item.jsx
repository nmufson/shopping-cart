import { useEffect, useState } from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ItemCard = ({ item }) => {
  return (
    <Link to={`/${item.slug}`} state={{ item }}>
      <div className={styles.itemContainer}>
        <div>
          <img src={item.image} alt="" />
        </div>
        <div>
          <p>{item.title}</p>
          <p>${item.displayPrice}</p>
        </div>
      </div>
    </Link>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
};
