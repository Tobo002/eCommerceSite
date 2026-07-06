export const CATEGORIES = [
  { value: 'guitars', label: 'Guitars' },
  { value: 'drums', label: 'Drums' },
  { value: 'brass', label: 'Brass' },
  { value: 'dj', label: 'DJ' },
  { value: 'amps', label: 'Amps' },
  { value: 'sound', label: 'Sound' },
];

export const BRANDS = ['Echo', 'Nova', 'Pulse', 'Apex'];

const VALID_CATEGORIES = new Set(CATEGORIES.map(({ value }) => value));
const VALID_BRANDS = new Set(BRANDS);

export const RATING_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
];

export const DEFAULT_FILTERS = {
  categories: [],
  brands: [],
  minPrice: '',
  maxPrice: '',
  minRating: 0,
};

export function filterProducts(productList, filters) {
  return productList.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    if (filters.minPrice !== '' && product.price < Number(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice !== '' && product.price > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    return true;
  });
}

function toggleValue(values, value) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function toggleCategory(filters, category) {
  return {
    ...filters,
    categories: toggleValue(filters.categories, category),
  };
}

export function toggleBrand(filters, brand) {
  return {
    ...filters,
    brands: toggleValue(filters.brands, brand),
  };
}

export function updatePriceFilter(filters, field, value) {
  return {
    ...filters,
    [field]: value,
  };
}

export function updateRatingFilter(filters, minRating) {
  return {
    ...filters,
    minRating: Number(minRating),
  };
}

export function clearFilters() {
  return { ...DEFAULT_FILTERS };
}

export function getProductsLink(category) {
  if (!category) {
    return '/products';
  }

  return `/products?category=${encodeURIComponent(category)}`;
}

function parseListParam(param, validSet) {
  if (!param) {
    return [];
  }

  return param.split(',').filter((value) => validSet.has(value));
}

export function filtersFromSearchParams(searchParams) {
  const minRating = Number(searchParams.get('minRating') ?? 0);

  return {
    categories: parseListParam(searchParams.get('category'), VALID_CATEGORIES),
    brands: parseListParam(searchParams.get('brand'), VALID_BRANDS),
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    minRating: Number.isNaN(minRating) ? 0 : minRating,
  };
}

export function filtersToSearchParams(filters) {
  const params = new URLSearchParams();

  if (filters.categories.length > 0) {
    params.set('category', filters.categories.join(','));
  }

  if (filters.brands.length > 0) {
    params.set('brand', filters.brands.join(','));
  }

  if (filters.minPrice !== '') {
    params.set('minPrice', filters.minPrice);
  }

  if (filters.maxPrice !== '') {
    params.set('maxPrice', filters.maxPrice);
  }

  if (filters.minRating > 0) {
    params.set('minRating', String(filters.minRating));
  }

  return params;
}
