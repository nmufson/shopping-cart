import styles from './Shop.module.css';
import ItemCard from '../../components/ItemCard/ItemCard';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { Product } from '../../types';

const Shop = () => {
  const { data, error } = useLayoutContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.shopContainer}>
        {data.map((item: Product) => (
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
};

export default Shop;
