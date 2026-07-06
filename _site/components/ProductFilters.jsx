import {
  BRANDS,
  CATEGORIES,
  RATING_OPTIONS,
  toggleBrand,
  toggleCategory,
  updatePriceFilter,
  updateRatingFilter,
  clearFilters,
} from '../utils/filterProducts.js';
import './ProductFilters.css';

export default function ProductFilters({ filters, onChange }) {
  return (
    <aside className="product-filters">
      <div className="product-filters__header">
        <h2>Filters</h2>
        <button
          type="button"
          className="btn-link"
          onClick={() => onChange(clearFilters())}
        >
          Clear
        </button>
      </div>

      <fieldset className="product-filters__group">
        <legend>Category</legend>
        {CATEGORIES.map(({ value, label }) => (
          <label key={value} className="product-filters__option">
            <input
              type="checkbox"
              checked={filters.categories.includes(value)}
              onChange={() => onChange(toggleCategory(filters, value))}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <fieldset className="product-filters__group">
        <legend>Brand</legend>
        {BRANDS.map((brand) => (
          <label key={brand} className="product-filters__option">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => onChange(toggleBrand(filters, brand))}
            />
            {brand}
          </label>
        ))}
      </fieldset>

      <fieldset className="product-filters__group">
        <legend>Price Range</legend>
        <label className="product-filters__field">
          Min
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => onChange(updatePriceFilter(filters, 'minPrice', e.target.value))}
          />
        </label>
        <label className="product-filters__field">
          Max
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => onChange(updatePriceFilter(filters, 'maxPrice', e.target.value))}
          />
        </label>
      </fieldset>

      <fieldset className="product-filters__group">
        <legend>Rating</legend>
        {RATING_OPTIONS.map(({ value, label }) => (
          <label key={value} className="product-filters__option">
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === value}
              onChange={() => onChange(updateRatingFilter(filters, value))}
            />
            {label}
          </label>
        ))}
      </fieldset>
    </aside>
  );
}
