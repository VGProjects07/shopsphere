import { useState } from "react";
import Hero from "../components/Hero.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import CategoryChips from "../components/CategoryChips.jsx";
import ProductCard from "../components/ProductCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { useFilteredProducts } from "../hooks/useFilteredProducts.js";

export default function HomePage() {
  const { state } = useStore();
  const [activeCategory, setActiveCategory] = useState("");
  const featured = state.products.filter((product) => product.featured);
  const filtered = useFilteredProducts(state.products, state.searchTerm, activeCategory);

  return (
    <div className="page">
      <Hero />
      <CategoryChips categories={state.categories} activeCategory={activeCategory} onChange={setActiveCategory} />
      <ProductCarousel title="Featured Products" products={featured} />
      <section className="section-block">
        <div className="section-head">
          <h2>All Products</h2>
        </div>
        <div className="product-grid">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
