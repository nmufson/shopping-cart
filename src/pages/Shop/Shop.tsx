import styles from './Shop.module.css';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Product } from '../../types';
import { useLayoutContext } from '../../hooks/useLayoutContext';

const Shop = () => {
  const [
    data,
    loading,
    error,
    currentItem,
    setCurrentItem,
    cartItems,
    setCartItems,
  ] = useLayoutContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.shopContainer}>
        {data.map((item) => (
          <ItemCard
            key={item.slug}
            item={item}
            onClick={() => setCurrentItem(item)}
            data={data}
            currentItem={currentItem}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}
      </div>
    </>
  );
};

export default Shop;
