import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './CartPage.css';

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

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page__container">
          <header className="cart-page__header">
            <h1>Your Cart</h1>
          </header>
          <p className="cart-page__empty">Your cart is empty.</p>
          <Link to="/products" className="btn btn--secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <header className="cart-page__header">
          <h1>Your Cart</h1>
          <p>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </header>

        <ul className="cart-page__list">
          {items.map(({ product, quantity }) => {
            const imageSrc = getProductImage(product.image);
            const lineTotal = product.price * quantity;

            return (
              <li key={product.id} className="cart-item">
                <div className="cart-item__image">
                  {imageSrc ? (
                    <img src={imageSrc} alt={product.name} />
                  ) : null}
                </div>

                <div className="cart-item__info">
                  <h2 className="cart-item__name">{product.name}</h2>
                  <p className="cart-item__brand">{product.brand}</p>
                  <p className="cart-item__price">{formatPrice(product.price)}</p>
                </div>

                <div className="cart-item__quantity">
                  <button
                    type="button"
                    className="cart-item__qty-btn"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    −
                  </button>
                  <span className="cart-item__qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="cart-item__qty-btn"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item__line-total">{formatPrice(lineTotal)}</p>

                <button
                  type="button"
                  className="btn-link btn-link--muted"
                  onClick={() => removeItem(product.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="cart-page__summary">
          <div className="cart-page__subtotal">
            <span>Subtotal</span>
            <span className="cart-page__total">{formatPrice(cartTotal)}</span>
          </div>
          <Link to="/checkout" className="btn btn--primary cart-page__checkout">
            Proceed to Checkout
          </Link>
        </footer>
      </div>
    </div>
  );
}
