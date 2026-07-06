import { useCart } from '../../context/CartContext.jsx';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function CartReviewStep() {
  const { items, cartTotal } = useCart();

  return (
    <div className="checkout-step">
      <h2>Review Your Cart</h2>
      <ul className="checkout-review__list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="checkout-review__item">
            <div>
              <p className="checkout-review__name">{product.name}</p>
              <p className="checkout-review__meta">
                Qty {quantity} · {product.brand}
              </p>
            </div>
            <span className="checkout-review__price">
              {formatPrice(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="checkout-review__total">
        <span>Subtotal</span>
        <span className="checkout-review__total-value">{formatPrice(cartTotal)}</span>
      </div>
    </div>
  );
}
