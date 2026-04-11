import RatingStars from "./RatingStars.jsx";

export default function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews.length ? reviews.map((review) => (
        <article key={review.id} className="review-card">
          <div className="review-head">
            <strong>{review.name}</strong>
            <RatingStars rating={review.rating} count="" />
          </div>
          <p>{review.comment}</p>
        </article>
      )) : <p>No reviews yet. Be the first to share feedback.</p>}
    </div>
  );
}
