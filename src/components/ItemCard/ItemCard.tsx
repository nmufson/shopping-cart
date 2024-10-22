import styles from './ItemCard.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

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
  const renderStars = (rating: number) => {
    // Round to nearest half
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    return (
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={
              index < fullStars
                ? styles.starFull
                : index === fullStars && hasHalfStar
                ? styles.starHalf
                : styles.starEmpty
            }
          >
            ★
          </span>
        ))}
        <span className={styles.ratingText}>({item.rating.count})</span>
      </div>
    );
  };

  console.log(item);
  return (
    <Link to={`/${item.slug}`} state={{ item }}>
      <div className={styles.itemContainer}>
        <div>
          <img src={item.image} alt={item.title} />
        </div>
        <div>
          <p>{item.title}</p>
          <p>${item.displayPrice}</p>
          {renderStars(item.rating.rate)}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
