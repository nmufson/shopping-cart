import styles from './ItemCard.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { renderStars } from '../../utils/starRating';

interface ItemCardProps {
  item: Product;
  // data: Product[];
  // currentItem: Product | null;
  // cartItems: CartItem[];

  // setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ItemCard = ({
  item,
}: // data,
// currentItem,
// cartItems,
// setCartItems,
ItemCardProps) => {
  return (
    <Link to={`/${item.slug}`} state={{ item }}>
      <div className={styles.itemContainer}>
        <div className={styles.imageDiv}>
          <img src={item.image} alt={item.title} />
        </div>

        <div className={styles.itemInfo}>
          <p>{item.title}</p>
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
