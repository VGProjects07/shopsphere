export default function RatingStars({ rating, count }) {
  const fullStars = Math.round(rating);
  return (
    <div className="rating-row">
      <span>{"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}</span>
      <small>{count ? `${rating} (${count})` : rating}</small>
    </div>
  );
}
