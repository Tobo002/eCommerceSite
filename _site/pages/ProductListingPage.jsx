import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import {
  filterProducts,
  filtersFromSearchParams,
  filtersToSearchParams,
} from '../utils/filterProducts.js';
import './ProductListingPage.css';

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters],
  );

  const handleFiltersChange = (newFilters) => {
    setSearchParams(filtersToSearchParams(newFilters), { replace: true });
  };

  return (
    <div className="listing-page">
      <div className="listing-page__container">
        <header className="listing-page__header">
          <h1>All Products</h1>
          <p>
            Browse our full catalog of instruments and gear
            {' · '}
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </header>

        <div className="listing-page__layout">
          <ProductFilters filters={filters} onChange={handleFiltersChange} />

          {filteredProducts.length > 0 ? (
            <div className="listing-page__grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="listing-page__empty">No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
