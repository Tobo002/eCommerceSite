export default function CustomerInfoStep({ customerInfo, onChange }) {
  const handleChange = (field) => (e) => {
    onChange({ ...customerInfo, [field]: e.target.value });
  };

  return (
    <div className="checkout-step">
      <h2>Customer Information</h2>
      <div className="checkout-form">
        <label className="checkout-form__field">
          Full Name
          <input
            type="text"
            value={customerInfo.fullName}
            onChange={handleChange('fullName')}
            required
          />
        </label>
        <label className="checkout-form__field">
          Email
          <input
            type="email"
            value={customerInfo.email}
            onChange={handleChange('email')}
            required
          />
        </label>
        <label className="checkout-form__field">
          Address
          <input
            type="text"
            value={customerInfo.address}
            onChange={handleChange('address')}
            required
          />
        </label>
        <div className="checkout-form__row">
          <label className="checkout-form__field">
            City
            <input
              type="text"
              value={customerInfo.city}
              onChange={handleChange('city')}
              required
            />
          </label>
          <label className="checkout-form__field">
            Postal Code
            <input
              type="text"
              value={customerInfo.postalCode}
              onChange={handleChange('postalCode')}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export const EMPTY_CUSTOMER_INFO = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
};

export function isCustomerInfoValid(customerInfo) {
  return Object.values(customerInfo).every((value) => value.trim() !== '');
}
