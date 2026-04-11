import { useState } from "react";
import OrderTimeline from "../components/OrderTimeline.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function ProfilePage() {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState({ name: state.user?.name || "", email: state.user?.email || "", phone: state.user?.phone || "" });

  return (
    <div className="page">
      <section className="section-block profile-layout">
        <div className="profile-card">
          <h1>User Profile</h1>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" value={form.email} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            </div>
          </div>
          <button type="button" className="primary-button compact" onClick={() => dispatch({ type: "UPDATE_PROFILE", payload: form })}>
            Save profile
          </button>
        </div>
        <div className="profile-card">
          <h2>Order tracking</h2>
          {state.orders.length ? state.orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="summary-row">
                <strong>Order #{order.id}</strong>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <OrderTimeline status={order.status} />
            </div>
          )) : <p>No orders placed yet.</p>}
        </div>
      </section>
      <section className="section-block">
        <div className="section-head">
          <h2>Wishlist</h2>
          <p>Saved items stay one click away.</p>
        </div>
        <div className="product-grid">
          {state.wishlist.length ? state.wishlist.map((item) => <ProductCard key={item.id} product={item} />) : <p>No wishlist items yet.</p>}
        </div>
      </section>
    </div>
  );
}
