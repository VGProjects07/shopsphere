import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">New season, smarter shopping</span>
        <h1>Build an Amazon-style experience with motion, speed, and personality.</h1>
        <p>
          ShopSphere combines flash deals, personalized picks, wishlist syncing, and a smooth checkout flow into one responsive storefront.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="primary-button">Explore products</Link>
          <Link to="/admin" className="secondary-button">View dashboard</Link>
        </div>
      </div>
      <div className="hero-card-grid">
        <div className="floating-card accent">
          <span>Live Search</span>
          <strong>Suggestions in real time</strong>
        </div>
        <div className="floating-card">
          <span>Orders</span>
          <strong>Track Pending to Delivered</strong>
        </div>
        <div className="floating-card">
          <span>MockPay</span>
          <strong>Payment-ready checkout</strong>
        </div>
      </div>
    </section>
  );
}
