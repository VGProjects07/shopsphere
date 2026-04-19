import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function CartPage() {
  const { state, dispatch, addToCart, removeFromCart } = useStore();
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <section className="section-block narrow">
        <div className="section-head">
          <h1>Your Cart</h1>
          <p>Animated cart updates keep the experience snappy as quantities change.</p>
        </div>
        <div className="cart-layout">
          <div className="cart-list">
            {state.cart.length ? state.cart.map((item) => (
              <article key={item.product_id} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{parseFloat(item.price).toFixed(2)} each</p>
                  <div className="qty-row">
                    <button type="button" onClick={() => addToCart({ id: item.product_id }, Math.max(item.quantity - 1, 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => addToCart({ id: item.product_id }, Math.min(item.quantity + 1, item.stock || 99))}>+</button>
                  </div>
                  <p className="cart-item-total">Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <button type="button" className="ghost-button remove-btn" onClick={() => removeFromCart(item.product_id)}>Remove</button>
                </div>
              </article>
            )) : (
              <div className="empty-state">
                <p>Your cart is empty.</p>
                <Link to="/products" className="primary-button compact">Continue shopping</Link>
              </div>
            )}
          </div>
          <aside className="summary-card">
            <h3>Order summary</h3>
            <div className="summary-row"><span>Items ({totalItems})</span><strong>₹{subtotal.toFixed(2)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>Free</strong></div>
            <div className="summary-row total-row"><span>Total</span><strong>₹{subtotal.toFixed(2)}</strong></div>
            <Link to="/checkout" className="primary-button">Proceed to checkout</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
