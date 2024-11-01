import styles from './ItemCard.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import renderStars from '../../utils/renderStars';

interface ItemCardProps {
  item: Product;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link to={`/${item.slug}`} state={{ item }}>
      <div className={styles.itemContainer}>
        <div className={styles.imageDiv}>
          <img src={item.image} alt={item.title} />
        </div>

        <p className={styles.itemTitle}>{item.title}</p>

        <div className={styles.priceRatingDiv}>
          <p>${item.displayPrice}</p>
          {renderStars({
            rating: item.rating.rate,
            count: item.rating.count,
            className: styles.starRating,
          })}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
