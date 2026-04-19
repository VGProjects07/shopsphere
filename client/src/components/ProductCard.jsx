import { Link } from "react-router-dom";
import RatingStars from "./RatingStars.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductCard({ product }) {
  const { dispatch, state, addToCart } = useStore();
  const wished = state.wishlist.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <button
        type="button"
        className={`wishlist-badge ${wished ? "active" : ""}`}
        onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
      >
        ♥
      </button>
      <Link to={`/products/${product.slug}`} className="product-image-link">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>
      <div className="product-meta">
        <span className="pill">{product.categoryName}</span>
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <RatingStars rating={product.rating} count={product.reviewCount} />
        <div className="product-bottom">
          <div>
            <strong>₹{product.price.toFixed(2)}</strong>
            <span>{product.discountPercent}% off</span>
          </div>
          <button
            type="button"
            className="primary-button compact"
            onClick={() => addToCart(product, 1)}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
