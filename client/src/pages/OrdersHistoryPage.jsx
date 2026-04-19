import { useStore } from "../context/StoreContext.jsx";
import OrderTimeline from "../components/OrderTimeline.jsx";

export default function OrdersHistoryPage() {
  const { state } = useStore();

  return (
    <div className="page">
      <section className="section-block">
        <div className="section-head">
          <h1>Order History</h1>
          <p>Track your past orders and their status.</p>
        </div>
        {state.userOrders.length ? (
          <div className="orders-list">
            {state.userOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="summary-row">
                    <strong>Order #{order.id}</strong>
                    <span>₹{parseFloat(order.total_amount).toFixed(2)}</span>
                  </div>
                  <div className="order-meta">
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    <span>Payment: {order.payment_method} ({order.payment_status})</span>
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image_url} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity} × ₹{parseFloat(item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <OrderTimeline status={order.order_status} />
              </div>
            ))}
          </div>
        ) : (
          <p>No orders placed yet.</p>
        )}
      </section>
    </div>
  );
}