import React from 'react';
import styles from './CheckoutModal.module.css';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    onClose();
    navigate('/home');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="modal" onClick={onClose}>
        <h2>Checkout Complete</h2>
        <p>Thank you for using my shopping cart!</p>
        <div className={styles.buttonGroup}>
          <button onClick={handleReturnHome}>Return Home</button>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
