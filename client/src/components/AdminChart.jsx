export default function AdminChart({ data }) {
  const maxSales = Math.max(...data.map((item) => item.sales));
  return (
    <div className="chart-card">
      {data.map((item) => (
        <div key={item.month} className="chart-bar-group">
          <div className="chart-bar" style={{ height: `${(item.sales / maxSales) * 100}%` }} />
          <span>{item.month}</span>
        </div>
      ))}
    </div>
  );
}
