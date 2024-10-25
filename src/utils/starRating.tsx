interface StarRatingProps {
  rating: number;
  count: number;
  className?: string;
  itemPage?: boolean;
}

export const renderStars = ({
  rating,
  count,
  className = '',
  itemPage = false,
}: StarRatingProps) => {
  // Round to nearest half
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    // <div className={className}>

    //   {[...Array(5)].map((_, index) => (
    //     <span
    //       key={index}
    //       className={
    //         index < fullStars
    //           ? 'star-full'
    //           : index === fullStars && hasHalfStar
    //           ? 'star-half'
    //           : 'star-empty'
    //       }
    //     >
    //       ★
    //     </span>
    //   ))}
    //   <span className="rating-text">({count})</span>
    // </div>
    <div className={className}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={
            index < fullStars
              ? 'star-full'
              : index === fullStars && hasHalfStar
              ? 'star-half'
              : 'star-empty'
          }
        >
          ★
        </span>
      ))}
      <span className="rating-text">
        {itemPage ? `| ${count} Reviews` : `(${count})`}
      </span>
    </div>
  );
};
