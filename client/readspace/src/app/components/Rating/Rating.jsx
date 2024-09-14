export default function Rating({
  rating = 1,
  isDisabled = false,
  handleRatingSubmit,
  name,
}) {
  // Handle rating change when a star is clicked
  const handleRatingChange = (index) => {
    if (!isDisabled && handleRatingSubmit) {
      handleRatingSubmit(index + 1);
    }
  };

  return (
    <div className="rating rating-sm">
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
