import { Link } from 'react-router-dom';
import products from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { getProductsLink } from '../utils/filterProducts.js';
import './HomePage.css';

const categories = [
  { slug: 'guitars', label: 'Guitars', description: 'Electric, acoustic, and more' },
  { slug: 'drums', label: 'Drums', description: 'Kits, snares, and practice gear' },
  { slug: 'brass', label: 'Brass', description: 'Trumpets, trombones, and cornets' },
  { slug: 'dj', label: 'DJ', description: 'Controllers, mixers, and headphones' },
  { slug: 'amps', label: 'Amps', description: 'Combo amps and stacks' },
  { slug: 'sound', label: 'Sound', description: 'Mics, speakers, and interfaces' },
];

const featuredProducts = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Welcome to TB Tunes</p>
          <h1 className="hero__title">Find your sound.</h1>
          <p className="hero__subtitle">
            Explore instruments and gear across every genre — from studio essentials to stage-ready setups.
          </p>
        </div>
      </section>

      <section className="home__section">
        <div className="home__container">
          <header className="home__section-header">
            <h2>Shop by Category</h2>
            <p>Browse our curated collections</p>
          </header>

          <div className="categories-grid">
            {categories.map(({ slug, label, description }) => (
              <Link key={slug} to={getProductsLink(slug)} className="category-card card">
                <span className="category-card__label">{label}</span>
                <span className="category-card__description">{description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section home__section--muted">
        <div className="home__container">
          <header className="home__section-header">
            <h2>Featured Products</h2>
            <p>Top-rated picks from our catalog</p>
          </header>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
