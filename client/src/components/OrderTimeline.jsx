const steps = ["Pending", "Shipped", "Delivered"];

export default function OrderTimeline({ status }) {
  const activeIndex = steps.indexOf(status);
  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <div key={step} className={`timeline-step ${index <= activeIndex ? "active" : ""}`}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}
