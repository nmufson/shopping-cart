import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to MyStore</h1>
      <p>Welcome! Write a paragraph here perhaps?</p>
      <Link to="../shop/" className={styles.shopLink}>
        click this for Shop
      </Link>
    </div>
  );
};

export default Home;
