# gamers-store — Complete Backend Project Structure

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                    Gerald
│   ├── routes/
│   │   ├── index.js                 Gerald
│   │   ├── auth.routes.js           Oreoluwa
│   │   ├── product.routes.js        David   (includes /deals — powers WeeklyDiscountDropdown)
│   │   ├── wishlist.routes.js       Ibrahim
│   │   ├── order.routes.js          Ibrahim
│   │   └── contact.routes.js        John
│   ├── controllers/
│   │   ├── auth.controller.js       Oreoluwa
│   │   ├── product.controller.js    David
│   │   ├── wishlist.controller.js   Ibrahim
│   │   ├── order.controller.js      Ibrahim
│   │   └── contact.controller.js    John
│   ├── services/
│   │   ├── auth.service.js          Oreoluwa
│   │   ├── product.service.js       David
│   │   ├── wishlist.service.js      Ibrahim
│   │   ├── order.service.js         Ibrahim
│   │   └── contact.service.js       John
│   ├── models/
│   │   ├── user.model.js            Oreoluwa
│   │   ├── product.model.js         David
│   │   ├── wishlist.model.js        Ibrahim
│   │   ├── order.model.js           Ibrahim
│   │   └── contact.model.js         John
│   ├── middleware/
│   │   ├── auth.middleware.js       Gerald
│   │   └── errorHandler.js          Gerald
│   ├── utils/
│   │   └── generateToken.js         Gerald
│   ├── database/
│   │   └── schema.sql               Gerald
│   └── app.js                       Gerald
├── server.js                        Gerald
├── .env                             Gerald (never pushed)
├── .env.example                     Gerald (pushed)
├── .gitignore
└── package.json
```

**Kingsley — no backend folder.** FAQ, Terms & Conditions, Store Locator, Pricing Plans are all fully static, confirmed by your actual frontend tree.

**Frontend pages still empty (Login, SignUp, AccountSettings, Checkout, ProductDetail, GetInTouch) map to backend as already planned:**
| Empty page | Owner | Backend it needs |
|---|---|---|
| Login, SignUp, AccountSettings | Oreoluwa | `auth.*` files |
| Checkout | Ibrahim | `order.*` files |
| ProductDetail | David | `product.*` files (already built for Shop) |
| GetInTouch | John | `contact.*` files (already built for ContactUs) |

---

No separate "cart" or "deals" table needed — cart stays in `CartContext` until checkout, and "weekly discount" products are just existing rows in `products` where `badge = 'SALE'`, queried differently, not stored differently.
