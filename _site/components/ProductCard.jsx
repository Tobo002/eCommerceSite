import { useCart } from '../context/CartContext.jsx';
import './ProductCard.css';

const productImages = import.meta.glob('../photos/*.{jpg,png}', {
  eager: true,
  import: 'default',
});

function getProductImage(filename) {
  return productImages[`../photos/${filename}`] ?? null;
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function formatCategory(category) {
  return category === 'dj' ? 'DJ' : category.charAt(0).toUpperCase() + category.slice(1);
}

function ProductImage({ product }) {
  const src = getProductImage(product.image);

  return (
    <div className="product-card__image">
      {src ? (
        <img
          src={src}
          alt={product.name}
          className="product-card__image-photo"
        />
      ) : null}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card card">
      <ProductImage product={product} />

      <div className="product-card__body">
        <p className="product-card__category">{formatCategory(product.category)}</p>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__meta">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__rating">{product.rating} ★</span>
        </div>

        <button
          type="button"
          className="btn btn--primary product-card__btn"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
