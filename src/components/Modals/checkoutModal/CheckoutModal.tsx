import styles from './CheckoutModal.module.css';

const CheckoutModal = ({ closeModal }) => {
  return (
    <>
      <div className="backdrop" onClick={closeModal} />
      <div className={`${styles.modal} modal`} onClick={closeModal}>
        <h2>Checkout Complete</h2>
        <p>Thank you for using my shopping cart!</p>
        <div className={styles.buttonGroup}>
          <button>Home</button>
          <button>Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
