import styles from './Shop.module.css';
import ItemCard from '../../components/ItemCard/ItemCard';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToCartConfirmationModal from '../../components/Modal/Modal';

const Shop = () => {
  const { data, loading, error, cartItems } = useLayoutContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { showModal, addedItem } = location.state || {};

  const handleCloseModal = () => {
    // Replace current location state with no modal
    navigate('/shop', { replace: true });
  };

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
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>

      {showModal && addedItem && (
        <AddToCartConfirmationModal
          addedItem={addedItem}
          cartItems={cartItems}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Shop;
