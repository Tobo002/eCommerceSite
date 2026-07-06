const STEPS = [
  { number: 1, label: 'Cart Review' },
  { number: 2, label: 'Customer Info' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Confirmation' },
];

export default function CheckoutStepper({ currentStep }) {
  return (
    <nav className="checkout-stepper" aria-label="Checkout progress">
      <ol className="checkout-stepper__list">
        {STEPS.map(({ number, label }) => {
          const isComplete = currentStep > number;
          const isActive = currentStep === number;

          return (
            <li
              key={number}
              className={[
                'checkout-stepper__step',
                isComplete && 'checkout-stepper__step--complete',
                isActive && 'checkout-stepper__step--active',
              ].filter(Boolean).join(' ')}
            >
              <span className="checkout-stepper__marker">{number}</span>
              <span className="checkout-stepper__label">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { STEPS };
