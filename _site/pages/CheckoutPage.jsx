import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CheckoutStepper from '../components/checkout/CheckoutStepper.jsx';
import CartReviewStep from '../components/checkout/CartReviewStep.jsx';
import CustomerInfoStep, {
  EMPTY_CUSTOMER_INFO,
  isCustomerInfoValid,
} from '../components/checkout/CustomerInfoStep.jsx';
import PaymentStep, {
  EMPTY_PAYMENT_INFO,
  isPaymentInfoValid,
} from '../components/checkout/PaymentStep.jsx';
import ConfirmationStep from '../components/checkout/ConfirmationStep.jsx';
import './CheckoutPage.css';

const TOTAL_STEPS = 4;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState(EMPTY_CUSTOMER_INFO);
  const [paymentInfo, setPaymentInfo] = useState(EMPTY_PAYMENT_INFO);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (step < TOTAL_STEPS && items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-page__container">
          <p className="checkout-page__empty">Your cart is empty.</p>
          <Link to="/products" className="btn btn--secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (step === 1) {
      navigate('/cart');
      return;
    }

    setStep((current) => current - 1);
  };

  const handleNext = () => {
    if (step === 2 && !isCustomerInfoValid(customerInfo)) {
      return;
    }

    if (step === 3) {
      if (!isPaymentInfoValid(paymentInfo)) {
        return;
      }

      setCompletedOrder({
        items: [...items],
        cartTotal,
        customerInfo: { ...customerInfo },
      });
      clearCart();
      setStep(4);
      return;
    }

    setStep((current) => current + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CartReviewStep />;
      case 2:
        return (
          <CustomerInfoStep
            customerInfo={customerInfo}
            onChange={setCustomerInfo}
          />
        );
      case 3:
        return (
          <PaymentStep
            paymentInfo={paymentInfo}
            onChange={setPaymentInfo}
          />
        );
      case 4:
        return <ConfirmationStep order={completedOrder} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 2) {
      return !isCustomerInfoValid(customerInfo);
    }

    if (step === 3) {
      return !isPaymentInfoValid(paymentInfo);
    }

    return false;
  };

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <header className="checkout-page__header">
          <h1>Checkout</h1>
          <p className="checkout-page__indicator">Step {step} of {TOTAL_STEPS}</p>
        </header>

        <CheckoutStepper currentStep={step} />

        <div className="checkout-page__content">
          {renderStep()}
        </div>

        {step < TOTAL_STEPS && (
          <footer className="checkout-page__nav">
            <button type="button" className="btn btn--secondary" onClick={handleBack}>
              {step === 1 ? 'Back to Cart' : 'Back'}
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              {step === 3 ? 'Place Order' : 'Next'}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
