import { useState } from "react";
import CategoryChips from "../components/CategoryChips.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { useFilteredProducts } from "../hooks/useFilteredProducts.js";

export default function ProductListingPage() {
  const { state } = useStore();
  const [activeCategory, setActiveCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useFilteredProducts(state.products, state.searchTerm, activeCategory)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter(product => product.rating >= minRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return b.featured - a.featured;
      }
    });

  return (
    <div className="page">
      <section className="section-block narrow">
        <div className="section-head">
          <h1>Product Listing</h1>
          <p>Filter by category and discover recommendations powered by your browsing intent.</p>
        </div>
        <CategoryChips categories={state.categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        <div className="listing-layout">
          <aside className="filter-panel">
            <h3>Filters</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  style={{ width: '80px' }}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  style={{ width: '80px' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Minimum Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                <option value={0}>All ratings</option>
                <option value={4}>4+ stars</option>
                <option value={3}>3+ stars</option>
                <option value={2}>2+ stars</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setActiveCategory("");
                setPriceRange([0, 1000]);
                setMinRating(0);
                setSortBy("featured");
              }}
              style={{ width: '100%' }}
            >
              Clear Filters
            </button>
          </aside>
          <div>
            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
              {filtered.length} products found
            </div>
            <div className="product-grid">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
