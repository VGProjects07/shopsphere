import AdminChart from "../components/AdminChart.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function AdminDashboardPage() {
  const { state } = useStore();
  const { summary, charts, lowStock } = state.dashboardStats;

  return (
    <div className="page">
      <section className="section-block">
        <div className="section-head">
          <h1>Admin Dashboard</h1>
          <p>Monitor sales, users, inventory, and fulfillment from one control panel.</p>
        </div>
        <div className="stats-grid">
          <article className="stat-card"><span>Total sales</span><strong>₹{summary.totalSales.toLocaleString()}</strong></article>
          <article className="stat-card"><span>Total users</span><strong>{summary.totalUsers.toLocaleString()}</strong></article>
          <article className="stat-card"><span>Total inventory</span><strong>{summary.totalInventory.toLocaleString()}</strong></article>
        </div>
        <div className="dashboard-grid">
          <div className="panel-card">
            <h3>Sales chart</h3>
            <AdminChart data={charts} />
          </div>
          <div className="panel-card">
            <h3>Low inventory</h3>
            {lowStock.map((item) => <div key={item.id} className="summary-row"><span>{item.name}</span><strong>{item.stock} left</strong></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
