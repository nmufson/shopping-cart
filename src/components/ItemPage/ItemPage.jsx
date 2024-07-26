import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ItemPage.module.css';
import PropTypes from 'prop-types';
import { getByDisplayValue } from '@testing-library/react';

export const ItemPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  return (
    <div className={styles.itemPageContainer}>
      <div className={styles.itemImageContainer}>
        <img src={item.image} alt="" />
      </div>
      <div>
        <div>
          <div>
            <h3>{item.title}</h3>
          </div>
          <div>
            <p>${item.displayPrice}</p>
          </div>
          <span></span>
          <div>
            <p>{item.description}</p>
          </div>
        </div>
        <div>
          <p>Quantity:</p>
          <input type="text" />
        </div>
        <div>
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};
