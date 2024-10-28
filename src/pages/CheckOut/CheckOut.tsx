import styles from './CheckOut.module.css';
import { CartItem } from '../../types';
import CheckOutCartItem from '../../components/CheckOutCartItem/CheckOutCartItem';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { useState } from 'react';
import RemovedCartItem from '../../components/RemovedCartItem/RemovedCartItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CheckoutModal from '../../components/Modals/checkoutModal/CheckoutModal';

const CheckOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, setCartItems } = useLayoutContext();

  const [removedItem, setRemovedItem] = useState<{
    item: CartItem;
    index: number;
  } | null>(null);

  const totalCartQuantity = cartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = (itemToRemove: CartItem, index: number) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemToRemove.id
    );
    setCartItems(updatedCartItems);
    setRemovedItem({ item: itemToRemove, index });
  };

  const handleUndo = () => {
    if (removedItem) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(removedItem.index, 0, removedItem.item);
      setCartItems(updatedCartItems);
      setRemovedItem(null);
    }
  };

  if (cartItems.length === 0 && !removedItem)
    return (
      <p className={styles.emptyCartMessage}>
        Cart is Empty. Return to <a href="/shop">Shop</a>
      </p>
    );

  const displayItems = [...cartItems];
  if (removedItem) {
    displayItems.splice(removedItem.index, 0, removedItem.item);
  }

  return (
    <>
      <div className={styles.checkoutPageContainer}>
        <div className={styles.shoppingCartContainer}>
          <div>
            <h1>Your Shopping Cart ({totalCartQuantity} items)</h1>
          </div>

          <div className={styles.checkoutGrid}>
            <div className={styles.gridHeaderRow}>
              <div>
                <h3 className={styles.itemsHeader}>Items</h3>
              </div>
              <div>
                <h3 className={styles.quantityHeader}>Quantity</h3>
              </div>
              <div>
                <h3 className={styles.priceHeader}>Price</h3>
              </div>
              <div>
                <h3 className={styles.totalHeader}>Total</h3>
              </div>
            </div>
            <div className={styles.checkoutGridBody}>
              {displayItems.map((item, index) => {
                const isRemoved = removedItem?.item.id === item.id;

                if (isRemoved) {
                  return (
                    <div
                      key={`removed-${item.id}`}
                      className={styles.removedItem}
                    >
                      <RemovedCartItem item={item} onUndo={handleUndo} />
                    </div>
                  );
                }
                return (
                  <CheckOutCartItem
                    key={item.id}
                    setCartItems={setCartItems}
                    item={item}
                    onRemove={() => handleRemoveItem(item, index)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.orderSummary}>
          <OrderSummary setIsModalOpen={setIsModalOpen}></OrderSummary>
        </div>
      </div>
      {isModalOpen && <CheckoutModal onClose={closeModal}></CheckoutModal>}
    </>
  );
};

export default CheckOut;
