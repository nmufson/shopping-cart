const CheckoutModal = ({ closeModal }) => {
  return (
    <>
      <div className="backdrop" onClick={closeModal} />
      <div className="modal" onClick={closeModal}>
        <h2 className={styles.addedToCartAlert}>Item Added to Cart!</h2>
        <p>
          This is the part where you would apply a payment method and checkout.
        </p>
        <div className={styles.buttonGroup}>
          <button>Home</button>
          <button>Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
