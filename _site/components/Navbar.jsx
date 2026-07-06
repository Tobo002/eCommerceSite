import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { CATEGORIES, getProductsLink } from '../utils/filterProducts.js';
import './Navbar.css';

function CartIcon() {
  return (
    <svg
      className="navbar__cart-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <Link to="/" className="navbar__logo">
          TB Tunes
        </Link>

        <ul className="navbar__links">
          <li>
            <Link to={getProductsLink()} className="navbar__link">
              All
            </Link>
          </li>
          {CATEGORIES.map(({ value, label }) => (
            <li key={value}>
              <Link to={getProductsLink(value)} className="navbar__link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/cart"
          className="navbar__cart"
          aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
        >
          <CartIcon />
          {itemCount > 0 && (
            <span className="navbar__cart-badge">{itemCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}
