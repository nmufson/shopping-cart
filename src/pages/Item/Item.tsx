import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Item.module.css';
import { useNavigate } from 'react-router-dom';
import CartQuantityInput from '../../components/CartQuantityInput/CartQuantityInput';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { Product } from '../../types';

const Item = () => {
  // passed item state through our Link in ItemCard
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, cartItems, setCartItems } = useLayoutContext();
  const [quantity, setQuantity] = useState(1);

  const item =
    location.state?.item || data.find((item: Product) => item.slug === slug);

  if (!item) {
    return <div>Product not found</div>;
  }

  // have add to cart bring them back to home page and show a modal with what they added to cart
  // quantity, total price
  // give them option to proceed to checkout or close modal

  const handleAddToCart = () => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    let addedItem;

    if (existingItem) {
      existingItem.quantity += quantity;
      setCartItems([...cartItems]); // Create new array reference to trigger re-render
      addedItem = existingItem;
    } else {
      const itemWithQuantity = { ...item, quantity };
      setCartItems([...cartItems, itemWithQuantity]);
      addedItem = itemWithQuantity;
    }

    navigate('/shop', {
      state: {
        showModal: true,
        addedItem,
      },
    });
  };

  return (
    <div className={styles.itemPageContainer}>
      <img src={item.image} alt={item.title} className={styles.itemImage} />
      <div className={styles.itemInfoContainer}>
        <div>
          <div>
            <h3>{item.title}</h3>
          </div>
          <div>
            <p>${item.displayPrice}</p>
          </div>
          <div>
            <p>{item.description}</p>
          </div>
        </div>
        <div>
          <CartQuantityInput quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className={styles.buttonDiv}>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
