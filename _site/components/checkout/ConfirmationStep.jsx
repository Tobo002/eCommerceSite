import { useState } from 'react';
import { Link } from 'react-router-dom';
import SurveyModal from '../SurveyModal.jsx';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function ConfirmationStep({ order }) {
  const [showSurvey, setShowSurvey] = useState(true);

  return (
    <>
      <div className="checkout-step checkout-step--confirmation">
        <h2>Order Confirmed</h2>
        <p className="checkout-confirmation__message">
          Thank you, {order.customerInfo.fullName}! Your order has been placed successfully.
        </p>

        <div className="checkout-confirmation__summary">
          <h3>Order Summary</h3>
          <ul className="checkout-review__list">
            {order.items.map(({ product, quantity }) => (
              <li key={product.id} className="checkout-review__item">
                <div>
                  <p className="checkout-review__name">{product.name}</p>
                  <p className="checkout-review__meta">Qty {quantity}</p>
                </div>
                <span className="checkout-review__price">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-review__total">
            <span>Total Paid</span>
            <span className="checkout-review__total-value">{formatPrice(order.cartTotal)}</span>
          </div>
        </div>

        <p className="checkout-confirmation__email">
          A confirmation email will be sent to {order.customerInfo.email}.
        </p>

        <Link to="/products" className="btn btn--primary">
          Continue Shopping
        </Link>
      </div>

      <SurveyModal
        isOpen={showSurvey}
        onClose={() => setShowSurvey(false)}
      />
    </>
  );
}
