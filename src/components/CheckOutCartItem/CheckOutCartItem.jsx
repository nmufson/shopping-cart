const CheckOutCartItem = ({ cartItems, setCartItems, item }) => {
  const removeItem = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.productCell}>
        <div className={styles.productInfo}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.productImage}
          />
          <p className={styles.productTitle}>{item.title}</p>
        </div>
      </td>
      <td className={styles.priceCell}>${item.displayPrice}</td>
      <td className={styles.quantityCell}>
        <CartQuantityDiv
          cartItems={cartItems}
          setCartItems={setCartItems}
          item={item}
        />
      </td>
      <td className={styles.totalCell}>
        ${(item.displayPrice * item.quantity).toFixed(2)}
      </td>
      <td className={styles.removeCell}>
        <button onClick={removeItem}>X</button>
      </td>
    </tr>
  );
};

export default CheckOutCartItem;
