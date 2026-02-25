import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const { data } = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await api.put(
      `/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchOrders();
  };

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>

        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p>₦{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Pending Orders</h4>
          <p>{pendingOrders}</p>
        </div>
      </div>

      {/* ORDERS SECTION */}
      <h3 className="orders-title">All Orders</h3>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="admin-order-card">
            <div className="order-top">
              <div>
                <strong>{order.user?.name}</strong>
                <p className="email">{order.user?.email}</p>
              </div>

              <span
                className={`status-badge ${order.status}`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-details">
              <p>
                Total:{" "}
                <strong>
                  ₦{order.totalAmount.toLocaleString()}
                </strong>
              </p>

              <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="order-actions">
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;