import styles from './RemovedCartItem.module.css';
import { CartItem } from '../../types';

interface RemovedCartItemProps {
  item: CartItem;
  onUndo: () => void;
}

const RemovedCartItem: React.FC<RemovedCartItemProps> = ({ item, onUndo }) => {
  return (
    // make this link
    <p>
      <a href={`/${item.slug}`} className={styles.removeCartItemA}>
        {item.title}
      </a>{' '}
      was removed from your cart.{' '}
      <button onClick={onUndo} className={styles.undo}>
        Undo?
      </button>
    </p>
  );
};

export default RemovedCartItem;
