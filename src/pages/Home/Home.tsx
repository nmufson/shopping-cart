import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Carousel></Carousel>
      <div className={styles.welcomeDiv}>
        <h1>Welcome to Shop Fast</h1>
      </div>
      <Link to="shop/" className={styles.shopLink}>
        <div className={styles.introDiv}>
          <p>
            Handpicked collections for every style and occasion. Find your look
            today.
          </p>
          <button>Shop Now</button>
        </div>
      </Link>
    </div>
  );
};

export default Home;
