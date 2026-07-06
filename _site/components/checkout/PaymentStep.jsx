export default function PaymentStep({ paymentInfo, onChange }) {
  const handleChange = (field) => (e) => {
    onChange({ ...paymentInfo, [field]: e.target.value });
  };

  return (
    <div className="checkout-step">
      <h2>Payment Details</h2>
      <p className="checkout-step__note">This is a demo checkout — no real payment is processed.</p>
      <div className="checkout-form">
        <label className="checkout-form__field">
          Cardholder Name
          <input
            type="text"
            value={paymentInfo.cardName}
            onChange={handleChange('cardName')}
            required
          />
        </label>
        <label className="checkout-form__field">
          Card Number
          <input
            type="text"
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            value={paymentInfo.cardNumber}
            onChange={handleChange('cardNumber')}
            required
          />
        </label>
        <div className="checkout-form__row">
          <label className="checkout-form__field">
            Expiry Date
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={handleChange('expiry')}
              required
            />
          </label>
          <label className="checkout-form__field">
            CVV
            <input
              type="text"
              inputMode="numeric"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={handleChange('cvv')}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export const EMPTY_PAYMENT_INFO = {
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

export function isPaymentInfoValid(paymentInfo) {
  return Object.values(paymentInfo).every((value) => value.trim() !== '');
}
