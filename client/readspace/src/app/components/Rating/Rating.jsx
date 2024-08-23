export default function Rating({
  rating = 1, // Default rating value if not provided
  isDisabled = false,
  handleRatingSubmit,
  name,
}) {
  // Handle rating change when a star is clicked
  const handleRatingChange = (index) => {
    console.log("User rated", index + 1);
    if (!isDisabled && handleRatingSubmit) {
      handleRatingSubmit(index + 1); // Trigger callback with the new rating
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
          checked={index + 1 <= rating} // Adjust the condition here
          disabled={isDisabled}
          onChange={() => handleRatingChange(index)}
        />
      ))}
    </div>
  );
}
