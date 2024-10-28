import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Item.module.css';
import { useNavigate } from 'react-router-dom';
import CartQuantityInput from '../../components/CartQuantityInput/CartQuantityInput';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { Product } from '../../types';
import { renderStars } from '../../utils/starRating';
import AddedToCartModal from '../../components/Modals/AddedToCartModal/AddedToCartModal';

const Item = () => {
  // passed item state through our Link in ItemCard
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, cartItems, setCartItems } = useLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(1);

  const item =
    location.state?.item || data.find((item: Product) => item.slug === slug);

  if (!item) {
    return <div>Product not found</div>;
  }

  // have add to cart bring them back to home page and show a modal with what they added to cart
  // quantity, total price
  // give them option to proceed to checkout or close modal

  const addItemToCart = (item: Product, addedQuantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += addedQuantity;
        return [...prevItems]; // Create new array reference to trigger re-render
      } else {
        const itemWithQuantity = { ...item, quantity: addedQuantity };
        return [...prevItems, itemWithQuantity];
      }
    });
  };

  const handleAddToCart = () => {
    addItemToCart(item, addedQuantity);
    setIsModalOpen(true);
  };

  const handleBuyNow = () => {
    addItemToCart(item, addedQuantity);
    navigate('/checkout');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.itemPageContainer}>
        <div className={styles.imageDiv}>
          <img src={item.image} alt={item.title} className={styles.itemImage} />
        </div>

        <div className={styles.itemInfoDiv}>
          <div className={styles.titlePriceRatingDiv}>
            <h3>{item.title}</h3>
            {renderStars({
              rating: item.rating.rate,
              count: item.rating.count,
              className: styles.starRating,
              itemPage: true,
            })}

            <p className={styles.displayPriceP}>${item.displayPrice}</p>
          </div>
          <div className={styles.cartActionsContainer}>
            <div className={styles.cartQuantityDiv}>
              <div className={styles.quantityDiv}>
                <p>Quantity:</p>
                <CartQuantityInput
                  quantity={addedQuantity}
                  setQuantity={setAddedQuantity}
                />
              </div>
            </div>
            <div className={styles.buttonDiv}>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
          <div className={styles.descriptionDiv}>
            <strong>Description:</strong>
            <p>{item.description}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddedToCartModal
          item={item}
          addedQuantity={addedQuantity}
          cartItems={cartItems}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Item;
