export default function PriceRange({ minPrice, maxPrice , onChange }) {
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      onChange({ min: value, max: maxPrice });
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      onChange({ min: minPrice, max: value });
    }
  };
  return (
    <div className="collapse-content font-medium flex flex-col">
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-600">${minPrice}</span>
        <span className="text-gray-600">${maxPrice}</span>
      </div>
      <input
        type="range"
        min={0}
        max={1000}
        value={minPrice}
        onChange={handleMinPriceChange}
        onClick={(e) => e.stopPropagation()} // Stop event propagation
        className="range range-xs range-accent mt-4"
      />
      <input
        type="range"
        min={0}
        max={1000}
        value={maxPrice}
        onChange={handleMaxPriceChange}
        onClick={(e) => e.stopPropagation()} // Stop event propagation
        className="range range-xs range-accent mt-4"
      />
    </div>
  );
}
