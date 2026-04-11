import { useState } from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductCarousel({ title, products }) {
  const [start, setStart] = useState(0);
  const visible = products.slice(start, start + 3);

  return (
    <section className="section-block">
      <div className="section-head">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button type="button" onClick={() => setStart((current) => Math.max(current - 1, 0))}>Prev</button>
          <button type="button" onClick={() => setStart((current) => Math.min(current + 1, Math.max(products.length - 3, 0)))}>Next</button>
        </div>
      </div>
      <div className="product-grid carousel-grid">
        {visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
