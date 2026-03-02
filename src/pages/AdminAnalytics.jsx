import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/AdminAnalytics.css";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/admin/analytics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) return <h2>Loading Analytics...</h2>;

  return (
    <div className="admin-analytics">
      <h2>Admin Analytics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p>₦{data.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{data.totalOrders}</p>
        </div>

        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{data.totalProducts}</p>
        </div>

        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{data.totalUsers}</p>
        </div>
      </div>

      <h3>Revenue (Last 6 Months)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.monthlyRevenue}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="_id.month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ff6600"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminAnalytics;