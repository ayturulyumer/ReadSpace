export default function Rating({
  rating = 0,
  isDisabled = false,
  handleSetUserRating,
  name,
}) {
  // Handle rating change when a star is clicked
  const handleRatingChange = (index) => {
    if (!isDisabled) {
      handleSetUserRating(index + 1);
    }
  };

  return (
    <div className="rating rating-xs">
      <input
        type="radio"
        name={name}
        className="rating-hidden"
        checked={rating === 0}
        readOnly
      />
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name={name}
          className={`mask mask-star-2  bg-yellow-800 ${
            index < rating ? "checked" : "bg-gray-300"
          }`}
          checked={index + 1 <= rating}
          disabled={isDisabled}
          onChange={() => handleRatingChange(index)}
        />
      ))}
    </div>
  );
}
