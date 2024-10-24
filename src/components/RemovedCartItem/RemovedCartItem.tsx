import styles from './RemovedCartItem.module.css';

const RemovedCartItem = ({ item, onUndo }) => {
  return (
    <div className={styles.removedItem}>
      <p>
        <a href={`/${item.slug}`}>{item.title}</a> was removed from your cart.{' '}
        <button onClick={onUndo} className={styles.undoButton}>
          Undo?
        </button>
      </p>
    </div>
  );
};

export default RemovedCartItem;
