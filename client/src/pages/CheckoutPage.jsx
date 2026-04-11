import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: state.user?.name || "", address: "", city: "", postalCode: "", paymentMethod: "MockPay" });
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = { id: Date.now(), status: "Pending", total, createdAt: new Date().toLocaleDateString(), shippingAddress: form };
    dispatch({ type: "PLACE_ORDER", payload: order });
    navigate("/profile");
  };

  return (
    <div className="page">
      <section className="section-block checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h1>Checkout</h1>
          <div className="form-grid">
            <input placeholder="Full name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
            <input placeholder="City" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
            <input className="full-span" placeholder="Street address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
            <input placeholder="Postal code" value={form.postalCode} onChange={(event) => setForm({ ...form, postalCode: event.target.value })} />
            <select value={form.paymentMethod} onChange={(event) => setForm({ ...form, paymentMethod: event.target.value })}>
              <option>MockPay</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>
          <div className="payment-card">
            <strong>Payment gateway</strong>
            <p>This project includes a mock payment flow that returns a successful purchase state.</p>
          </div>
          <button type="submit" className="primary-button">Pay ₹{total.toFixed(2)}</button>
        </form>
        <aside className="summary-card">
          <h3>Review items</h3>
          {state.cart.map((item) => <div key={item.id} className="summary-row"><span>{item.name} x {item.quantity}</span><strong>₹{(item.price * item.quantity).toFixed(2)}</strong></div>)}
        </aside>
      </section>
    </div>
  );
}
