# TB Tunes

A frontend-only e-commerce demo for musical instruments and gear, built as part of SEG3525 (Commerce électronique).

The application lives entirely inside `_site/` — a React + Vite SPA with mock product data, client-side cart state, faceted filtering, and a multi-step checkout flow.

## Tech Stack

- **React 18** + **React Router 6**
- **Vite 6**
- CSS custom properties (no UI framework)
- Mock JSON data — no backend or API

## Getting Started

```bash
cd _site
npm install
npm run dev
```

Open the URL shown in the terminal (typically http://localhost:5173).

### Other Commands

```bash
npm run build    # production build → _site/dist/
npm run preview  # preview production build locally
```

## Routes

| Path | Page |
|------|------|
| `/` | Homepage — hero, category grid, featured products |
| `/products` | Product listing with faceted filters |
| `/products?category=guitars` | Listing pre-filtered by category |
| `/cart` | Cart with quantity controls |
| `/checkout` | 4-step checkout flow |

Navbar category links and homepage category cards navigate to `/products` with the matching `?category=` query param.

## Features

- **Homepage** — tagline, shop-by-category grid, top-rated featured products
- **Product listing** — all 18 products with filters for category, brand, price range, and rating (combinable, URL-synced)
- **Product cards** — image, name, price, rating, add-to-cart
- **Cart** — add/remove items, update quantities, subtotal, cart badge in navbar
- **Checkout** — cart review → customer info → fake payment → confirmation
- **Post-checkout survey** — optional modal (rating, recommendation, comment) shown after order confirmation

## Project Structure

```
_site/
├── src/              # App entry (main.jsx, App.jsx)
├── components/       # Navbar, ProductCard, ProductFilters, SurveyModal, checkout steps
├── pages/            # HomePage, ProductListingPage, CartPage, CheckoutPage
├── context/          # CartContext (React Context API)
├── data/             # products.js — mock catalog
├── photos/           # Product images (item1–item18)
├── styles/           # Design system (variables, typography, buttons, cards, layout, forms)
├── utils/            # filterProducts helpers
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Product Catalog

18 mock products across six categories:

`guitars` · `drums` · `brass` · `dj` · `amps` · `sound`

Brands: Echo, Nova, Pulse, Apex

## Design System

| Role | Color |
|------|-------|
| Primary | `#F7934C` |
| Accent | `#235789` |
| Dark accent | `#4A6670` |
| Neutrals | whites, light grays, soft blacks |

Tokens and base styles are defined in `_site/styles/`.

## Notes

- Payment and checkout are simulated — no real transactions or backend integration.
- Cart state is in-memory and resets on page refresh.
- `.cursor/` is gitignored; project conventions are in `.cursor/rules/`.
