import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>Welcome to ShopSphere</h1>
        <p>Discover amazing products at great prices</p>
        <div className="hero-actions">
          <Link to="/products" className="primary-button">Shop Now</Link>
        </div>
      </div>
      <div className="hero-card-grid">
        <div className="floating-card accent">
          <span>Free Shipping</span>
          <strong>On orders over $50</strong>
        </div>
        <div className="floating-card">
          <span>Quality</span>
          <strong>Guaranteed products</strong>
        </div>
        <div className="floating-card">
          <span>Support</span>
          <strong>24/7 customer service</strong>
        </div>
      </div>
    </section>
  );
}
