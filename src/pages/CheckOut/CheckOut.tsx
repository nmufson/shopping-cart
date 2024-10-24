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
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
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
    setRemovingItemId(itemToRemove.id);
    setTimeout(() => {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== itemToRemove.id
      );
      setCartItems(updatedCartItems);
      setRemovedItem({ item: itemToRemove, index });
      setRemovingItemId(null); // Reset removing item id
    }, 300); // Duration of your animation
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
    return <p className={styles.emptyCartMessage}>Cart is Empty</p>;

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
          <div className={styles.tableWrapper}>
            <table className={styles.checkoutTable}>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Item Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className={styles.checkoutTableBody}>
                {displayItems.map((item, index) => {
                  const isRemoved = removedItem?.item.id === item.id;
                  const isRemoving = removingItemId === item.id;
                  console.log(isRemoving);
                  if (isRemoved) {
                    return (
                      <tr key={`removed-${item.id}`}>
                        <td colSpan={4}>
                          <RemovedCartItem item={item} onUndo={handleUndo} />
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <CheckOutCartItem
                      key={item.id}
                      setCartItems={setCartItems}
                      item={item}
                      onRemove={() => handleRemoveItem(item, index)}
                      className={isRemoving ? 'styles.removed' : ''}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className={styles.priceContainer}></div>
        </div>
        <div className={styles.orderSummary}>
          <OrderSummary setIsModalOpen={setIsModalOpen}></OrderSummary>
        </div>
      </div>
      {isModalOpen && <CheckoutModal closeModal={closeModal}></CheckoutModal>}
    </>
  );
};

export default CheckOut;
