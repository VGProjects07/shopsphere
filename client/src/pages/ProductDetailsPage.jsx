import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import RatingStars from "../components/RatingStars.jsx";
import ReviewList from "../components/ReviewList.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { state, dispatch, addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    // Use local mock data instead of API call
    const productData = state.products.find((item) => item.slug === slug);
    if (productData) {
      setProduct({
        ...productData,
        reviews: state.reviews[productData.id] || []
      });
    } else {
      setError("Product not found");
    }
    setLoading(false);
  }, [slug, state.products, state.reviews]);

  const recommendations = useMemo(() => {
    if (!product) return [];
    return state.products.filter((item) => item.id !== product.id).slice(0, 3);
  }, [product, state.products]);

  if (loading) {
    return <div className="page"><div className="loading">Loading product...</div></div>;
  }

  if (error || !product) {
    return <div className="page"><p className="error">{error || "Product not found."}</p></div>;
  }

  const submitReview = (event) => {
    event.preventDefault();
    if (!reviewText.trim()) return;
    dispatch({
      type: "ADD_REVIEW",
      payload: {
        productId: product.id,
        review: { id: Date.now(), name: state.user?.name || "Guest reviewer", rating: 5, comment: reviewText }
      }
    });
    setReviewText("");
  };

  return (
    <div className="page">
      <section className="details-hero">
        <img src={product.imageUrl} alt={product.name} className="details-image" />
        <div className="details-copy">
          <span className="pill">{product.categoryName}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <RatingStars rating={product.rating} count={product.reviewCount} />
          <div className="price-row">
            <strong>₹{product.price.toFixed(2)}</strong>
            <span>{product.discountPercent}% off</span>
          </div>
          <div className="cta-row">
            <button type="button" className="primary-button" onClick={() => addToCart(product, 1)}>Add to cart</button>
            <button type="button" className="secondary-button" onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}>Save to wishlist</button>
          </div>
        </div>
      </section>
      <section className="section-block two-column">
        <div>
          <div className="section-head"><h2>Reviews & ratings</h2></div>
          <ReviewList reviews={product.reviews || []} />
          {state.user && (
            <form className="review-form" onSubmit={submitReview}>
              <textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Write a review" />
              <button type="submit" className="primary-button compact">Submit review</button>
            </form>
          )}
        </div>
        <div>
          <div className="section-head"><h2>Recommended for you</h2></div>
          <div className="product-grid">
            {recommendations.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
