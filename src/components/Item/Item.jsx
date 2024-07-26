import { useEffect, useState } from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Item = ({ item }) => {
  return (
    <Link to={`/${item.slug}`} state={{ item: item }}>
      <div className={styles.itemContainer}>
        <div>
          <img src={item.image} alt="" />
        </div>
        <div>
          <p>{item.title}</p>
          <p>${item.displayPrice}</p>
        </div>
        <div>
          <button>
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};
