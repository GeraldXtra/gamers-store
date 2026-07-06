# gamers-store — Frontend

A full-stack gaming gadgets e-commerce platform. This is the frontend: **React + Vite + Pure CSS (CSS Modules)**. The backend (Node.js + Express + MySQL) is a separate phase, covered in `backend/README.md` once we get there.

This document is the single source of truth for the frontend build. Read your section, build your pages, and refer back to this whenever you're unsure where something goes.

---

## Design Variables — Quick Reference

The full file (`styles/variables.css`) has a detailed comment above every single variable explaining exactly where to use it — read that while you're actually coding. This table is just for a fast lookup.

| Variable                     | What it's for                    | Who needs it                                                            |
| ---------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `--color-bg-primary`         | Main page background             | Everyone — every page                                                   |
| `--color-bg-secondary`       | Card/panel backgrounds           | David, Ibrahim, Gerald, Oreoluwa, John, Kingsley                        |
| `--color-bg-elevated`        | Hover state background           | Inside Button/ProductCard only — nobody touches directly                |
| `--color-text-primary`       | Headings, primary text           | Everyone                                                                |
| `--color-text-secondary`     | Descriptions, muted text         | Everyone                                                                |
| `--color-border`             | Card outlines, input borders     | David, Ibrahim, Oreoluwa, John, Kingsley                                |
| `--color-accent-primary`     | CTA button color, links          | Inside Button component — Oreoluwa also for the "Forgot password?" link |
| `--color-accent-sale`        | Sale/discount badges             | David, Gerald, Ibrahim                                                  |
| `--color-accent-cart`        | Cart badge, wishlist active icon | Gerald, David, Ibrahim                                                  |
| `--font-heading`             | All headings                     | Everyone                                                                |
| `--font-body`                | All body copy                    | Everyone                                                                |
| `--font-size-xs`             | Badge text, form errors          | David, Oreoluwa, Ibrahim                                                |
| `--font-size-sm`             | Nav, footer, descriptions        | Gerald, everyone's body copy                                            |
| `--font-size-base`           | Default text size                | Everyone (default)                                                      |
| `--font-size-lg`             | Sub-headings, card titles        | David, John, Kingsley                                                   |
| `--font-size-xl`             | Page title (top of each page)    | Everyone, once per page                                                 |
| `--font-size-2xl`            | Hero headline only               | Gerald only (Home)                                                      |
| `--space-xs` → `--space-2xl` | Spacing scale (4px → 48px)       | Everyone — see full file for which gap size fits which use              |
| `--container-max-width`      | Centered content wrapper         | Everyone, every page                                                    |
| `--button-height-sm/md`      | Button sizing                    | Inside Button component only                                            |
| `--radius-sm/md`             | Border-radius                    | Everyone, any rounded corner                                            |

---

## Team & Page Ownership

| Member            | Branch                                          | Pages you own                                                                       |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Gerald** (Lead) | `feature/gerald-home`                           | Home (entire homepage: hero, all product grids, banners)                            |
| **Oreoluwa**      | `feature/oreoluwa-login-signup-accountSettings` | Login, Sign Up, Account Settings                                                    |
| **David**         | `feature/david-shop-product`                    | Shop, Single Product                                                                |
| **Ibrahim**       | `feature/ibrahim-wishlist-checkout`             | Wishlist, Checkout (cart review + shipping + order summary, combined into one page) |
| **John**          | `feature/john-static-pages`                     | About, FAQ, Contact Us, Get In Touch                                                |
| **Kingsley**      | `feature/kingsley-static-pages`                 | Terms and Conditions, Store Locator, Pricing Plans                                  |

**15 pages total.** Everyone builds inside their own `pages/` folder(s) and, where noted below, their own `services/` file. Nobody edits another member's page folder without asking first.

---

## Reference Pages — What Each Page Should Actually Look Like

We're using **Gizmos**, a real electronics/gaming store theme, as our visual reference. Every page below is a real, live page on the official demo — open it, study the layout, then build your own version in React. This is for **visual/UX reference only** — it's a WordPress/WooCommerce site, not code to copy.

| Page                               | Owner    | Live Reference                                                                                                                                                                                                                         |
| ---------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                               | Gerald   | https://gizmos.qodeinteractive.com/                                                                                                                                                                                                    |
| About                              | John     | https://gizmos.qodeinteractive.com/about-us/                                                                                                                                                                                           |
| FAQ                                | John     | https://gizmos.qodeinteractive.com/faq-page/                                                                                                                                                                                           |
| Contact Us                         | John     | https://gizmos.qodeinteractive.com/contact-us/                                                                                                                                                                                         |
| Get In Touch                       | John     | https://gizmos.qodeinteractive.com/get-in-touch/                                                                                                                                                                                       |
| Terms and Conditions               | Kingsley | https://gizmos.qodeinteractive.com/terms-conditions/                                                                                                                                                                                   |
| Store Locator                      | Kingsley | https://gizmos.qodeinteractive.com/store-locator/                                                                                                                                                                                      |
| Pricing Plans                      | Kingsley | https://gizmos.qodeinteractive.com/pricing-plans/                                                                                                                                                                                      |
| Shop                               | David    | https://gizmos.qodeinteractive.com/shop/                                                                                                                                                                                               |
| Single Product                     | David    | https://gizmos.qodeinteractive.com/product/fractal-design-s7-tempered-glass-computer-case/ _(one example — every product follows the same `/product/product-name/` layout)_                                                            |
| Login / Sign Up / Account Settings | Oreoluwa | https://gizmos.qodeinteractive.com/my-account/ _(WooCommerce combines all three into this one page — login form and register form side by side, becomes the account dashboard once logged in)_                                         |
| Wishlist                           | Ibrahim  | https://gizmos.qodeinteractive.com/wishlist/                                                                                                                                                                                           |
| Checkout                           | Ibrahim  | https://gizmos.qodeinteractive.com/checkout/ **and** https://gizmos.qodeinteractive.com/cart/ _(look at both — yours combines them into one page, so borrow the item-list layout from Cart and the form/summary layout from Checkout)_ |

---

## Getting Started — Do This First

```bash
# 1. Clone the repo
git clone https://github.com/GeraldXtra/gamers-store.git
cd gamers-store

# 2. Check out YOUR branch (see the table above for your branch name)
git checkout feature/your-branch-name

# 3. Open it in your editor
code .
```

**Then, inside VS Code's terminal — do not skip this:**

```bash
cd frontend
npm install
```

`npm install` downloads all the packages the project depends on (React, React Router, etc.) — nothing runs without this step, and it has to be run fresh by every person on their own machine since `node_modules` isn't stored in the repo.

Once that finishes:

```bash
npm run dev
```

This starts your local preview — it'll print a `localhost` link in the terminal. Open that in your browser and keep it running while you work; it auto-refreshes every time you save a file.

---

## Project Structure

```
frontend/src/
├── assets/                          images/icons — everyone adds their own
├── components/
│   ├── common/                      SHARED — reused across every branch
│   │   ├── Button/                  Gerald
│   │   ├── ProductCard/             Gerald builds for Home — David & Ibrahim reuse it
│   │   └── Banner/                  Gerald builds — used across Home's promo sections
│   ├── layout/                      Gerald — renders once in App.jsx, wraps every page
│   │   ├── AnnouncementBar/
│   │   ├── Header/
│   │   └── Footer/
│   └── sections/                    Gerald — Home page only
│       ├── Hero/
│       ├── CategoryIcons/
│       ├── TopRatedProducts/
│       ├── FeaturedProducts/
│       ├── TrendingProducts/
│       ├── BrandLogos/
│       └── RecentlyAdded/
├── pages/
│   ├── Home/                        Gerald
│   ├── About/                       John
│   ├── FAQ/                         John
│   ├── ContactUs/                   John
│   ├── GetInTouch/                  John
│   ├── TermsAndConditions/          Kingsley
│   ├── StoreLocator/                Kingsley
│   ├── PricingPlans/                Kingsley
│   ├── Shop/                        David
│   ├── ProductDetail/               David
│   ├── Login/                       Oreoluwa
│   ├── SignUp/                      Oreoluwa
│   ├── AccountSettings/             Oreoluwa
│   ├── Wishlist/                    Ibrahim
│   └── Checkout/                    Ibrahim
├── context/                         Gerald
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── services/
│   ├── api.js                       Gerald
│   ├── authService.js               Oreoluwa
│   ├── productService.js            David
│   ├── wishlistService.js           Ibrahim
│   ├── orderService.js              Ibrahim
│   └── contactService.js            John
├── utils/                           shared — anyone can add to it
│   └── formatPrice.js
├── styles/
│   ├── variables.css                Gerald
│   └── index.css                   Gerald
├── App.jsx                          Gerald
└── main.jsx
```

Root-level (outside `src/`): `.env` (never pushed), `.env.example` (pushed — no real values), `.gitignore`, `index.html`, `package.json`, `vite.config.js` — all scaffold/shared, nobody edits these day-to-day.

---

## What Each Folder Actually Does

### `components/common/` — shared building blocks

- **Button/** — one reusable `<Button>`. Props: `variant` (primary/secondary), `size`, `onClick`, `children`. Use this instead of writing raw `<button>` tags, so every button on the site matches.
- **ProductCard/** — one reusable card for a single product: image, name, price, sale badge, wishlist heart, add-to-cart icon. Takes a `product` object as props. If your page shows products in a grid (Shop, ProductDetail's related items, Wishlist), import this — don't build your own.
- **Banner/** — reusable promo banner (image, heading, price, Shop Now button). Used across Home's promotional sections.

### `components/layout/` — the site shell

AnnouncementBar, Header, and Footer render **once**, inside `App.jsx`, wrapped around whatever page is currently routed. You never import these into your own page file — they just show up automatically because of how routing is structured.

### `components/sections/` — Home page only

Each homepage section as its own component (Hero, CategoryIcons, the product grids, BrandLogos). These only exist inside `pages/Home/Home.jsx`.

### `pages/` — one folder per route

Each folder is a full page: its own `.jsx` file plus a `.module.css` for its styles. Build entirely inside your assigned folder(s).

### `context/` — global state

- **CartContext.jsx** — holds cart items + add/remove/update functions via a `useCart()` hook. The Checkout page reads directly from this — there's no separate cart page or cart backend call, the cart lives in memory until checkout submits it.
- **AuthContext.jsx** — holds the logged-in user + token via a `useAuth()` hook. Needed by Header (to know if someone's logged in), Login, SignUp, AccountSettings, and Checkout.

### `services/` — API calls to the backend

One file per feature area, each wrapping the actual `fetch`/`axios` calls to that part of the backend. `api.js` holds one shared base config (reads `VITE_API_BASE_URL` from `.env`) that every other service file imports instead of hardcoding a URL.

### `utils/`

Small helper functions used in more than one place. `formatPrice.js` is the first one — e.g. `formatPrice(1750)` → `"$1,750.00"` — used anywhere a price is displayed.

### `styles/`

- **variables.css** — every color, font, spacing value, and button size as a CSS custom property. Reference these in your own `.module.css` files instead of hardcoding values, so the whole site stays visually consistent.
- **global.css** — resets and base typography.

---

## Previewing Your Work with App.jsx

While you're building, `App.jsx` is the fastest way to actually _see_ your page in the browser. Temporarily import just your own component and render it directly:

```jsx
// App.jsx — example: David previewing the Shop page while building it
import Shop from "./pages/Shop/Shop";

function App() {
  return <Shop />;
}

export default App;
```

Save, and `npm run dev` will show exactly that page. Swap the import to whatever you're working on next.

**This is completely safe to commit and push on your own branch.** Branches are isolated — editing `App.jsx` this way never touches anyone else's work or `main`. Gerald owns the _final_ `App.jsx` (the real router, with all 15 routes wired in) and will rebuild it properly once your branch is reviewed and merged — so don't worry about "leaving it wrong." Just build, preview, commit, push.

---

## CSS Rule — Read This Before Writing Any CSS

We're using plain CSS, but with **CSS Modules**: name every stylesheet `ComponentName.module.css` (not `ComponentName.css`). Vite handles this automatically — no setup needed. This means your class names are automatically scoped to your own file, so if you write `.card` and someone else also writes `.card` in their own page, they will never clash.

```jsx
import styles from "./Shop.module.css";

<div className={styles.container}>...</div>;
```

---

## Environment Variables

Copy `.env.example` to a new file named `.env` in your `frontend/` folder, and fill in the real value:

```
VITE_API_BASE_URL=http://localhost:5000
```

`.env` is in `.gitignore` — it will never be pushed. If you don't have this file, API calls (via `services/`) won't know where the backend lives.

---

## Committing & Pushing Your Work

```bash
git add .
git commit -m "feat: add product listing grid to Shop page"
git push origin feature/your-branch-name
```

Push only to **your own branch** — never to `main`, never to a teammate's branch. Once your piece is ready, open a Pull Request into Gerald's branch (`feature/gerald-home`) for review — he'll merge it, and it eventually lands on `main` once everything's integrated.

---

## Quick Do's and Don'ts

**Do:**

- Pull before you start each session: `git pull origin main` (once main has updates) or sync with Gerald's branch when asked
- Use the shared components (Button, ProductCard, Banner) instead of rebuilding your own
- Commit often, with clear messages
- Ask before touching a folder that isn't yours

**Don't:**

- Push directly to `main`
- Commit your real `.env` file
- Rebuild a component that already exists in `components/common/`
- Worry about `App.jsx` looking "incomplete" on your branch — that's expected until Gerald merges everyone in

---

_Questions about anything in this document — ask Gerald before guessing._
