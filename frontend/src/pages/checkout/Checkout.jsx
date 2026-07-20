import { useState } from "react";
import styles from "./Checkout.module.css";

const sampleCart = [
  { id: 1, name: "Wireless Gaming Mouse XF-550", price: 45.99, quantity: 1 },
  { id: 2, name: "RGB Mechanical Keyboard Pro", price: 89.99, quantity: 2 },
];

function Checkout() {
  const [cartItems, setCartItems] = useState(sampleCart);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", { formData, cartItems });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.breadcrumb}>Home / Checkout</p>
        <h1 className={styles.title}>Checkout</h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is currently empty.</p>
        ) : (
          <form className={styles.layout} onSubmit={handleSubmit}>
            <div className={styles.mainColumn}>
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Your Cart</h2>
                <div className={styles.cartList}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemImagePlaceholder}></div>
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemPrice}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className={styles.itemQuantity}>
                        <button
                          type="button"
                          className={styles.qtyButton}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className={styles.qtyButton}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className={styles.itemSubtotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        className={styles.removeItem}
                        onClick={() => handleRemove(item.id)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Billing Details</h2>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={styles.inputFull}
                  required
                />
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </section>

              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Select Payment Method</h2>
                <div className={styles.paymentPlaceholder}>
                  Payment integration coming soon
                </div>
              </section>
            </div>

            <aside className={styles.summaryCard}>
              <h2 className={styles.cardTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button type="submit" className={styles.placeOrder}>
                Place Order
              </button>
              <p className={styles.secureNote}>🔒 Secure Checkout</p>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;