import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselImage {
  url: string;
  altText: string;
}

const Carousel: React.FC = () => {
  const images: CarouselImage[] = [
    {
      url: 'https://img.businessoffashion.com/resizer/v2/VFIGZIPEVZFF3NIXMJQUZH5YU4.jpg?auth=9a95529ed812f398a7aaaa9618d0561aa34777a6ce6c43ac29e65b9c2467b7b4&width=1440',
      altText: 'Group of people gathered wearing street wear',
    },
    {
      url: 'https://techwearstorm.com/cdn/shop/files/style-streetwear-06.webp',
      altText: 'Man walking while wearing jean jacket and sunglasses',
    },
    {
      url: 'https://www.boardsportsource.com/wp-content/uploads/2022/03/x-tra-MONSTER-Cord-Cloudworker-Twill-Daniel-Ledermann-by-Hannes-Mautner-28-1920x1080.jpg',
      altText: 'Skateboarder with beanie and green jacket',
    },
    {
      url: 'https://www.highsnobiety.com/static-assets/dato/1690970245-inside-nigerias-booming-streetwear-renaissance-07.jpg',
      altText: 'Group wearing street wear clothing and looking at camera',
    },
    {
      url: 'https://fashionista.com/.image/t_share/MTY0NzI5OTM2OTUzNzQ2OTk1/streetwear-women-opportunity.jpg',
      altText: 'Two women wearing fashion outfits',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slidesContainer}>
        {images.map((image: CarouselImage, index: number) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ''
            }`}
          >
            <img src={image.url} alt={`Slide ${index + 1}: ${image.altText}`} />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className={`${styles.navButton} ${styles.prev}`}
        aria-label="Previous slide"
      ></button>

      <button
        onClick={goToNext}
        className={`${styles.navButton} ${styles.next}`}
        aria-label="Next slide"
      ></button>

      <div className={styles.bars}>
        {images.map((_: CarouselImage, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.bar} ${
              index === currentIndex ? styles.active : ''
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
