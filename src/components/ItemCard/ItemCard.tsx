import styles from './ItemCard.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ItemCardProps {
  item: Product;
  onClick: (item: Product) => void;
  // data: Product[];
  // currentItem: Product | null;
  // cartItems: CartItem[];
  // setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ItemCard = ({
  item,
  onClick,
}: // data,
// currentItem,
// cartItems,
// setCartItems,
ItemCardProps) => {
  return (
    <Link to={`/${item.slug}`} state={{ item }}>
      <div className={styles.itemContainer} onClick={() => onClick(item)}>
        <div>
          <img src={item.image} alt={item.title} />
        </div>
        <div>
          <p>{item.title}</p>
          <p>${item.displayPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
