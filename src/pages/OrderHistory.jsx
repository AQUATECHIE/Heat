import { useEffect, useState } from "react";
import api from "../api/axios";
import Footer from "../components/Footer";
import "../styles/OrdersPage.css";
import searchIcon from "../assets/icon/search.svg";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await api.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data || []);
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading orders...</h2>;
  }

  if (!orders || orders.length === 0) {
    return (
      <>
        <div className="orders-page">
          <h2>My Orders</h2>

          <div className="no-orders">
            <p>No orders yet.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="orders-page">
        <h2>My Orders</h2>

        {/* SEARCH BAR */}

        <div className="search-bar">
          <img src={searchIcon} alt="searchIcon" />
          <input placeholder="Search" />
        </div>

        {orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* HEADER */}

            <div className="order-header">
              <span>Order: #{order._id.slice(-4)}</span>

              <span className={`status ${order.status}`}>{order.status}</span>
            </div>

            {/* ITEMS */}

            {order.orderItems?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <span className="item-name">
                    {item.name} (x{item.quantity})
                  </span>

                  <span className="item-price">
                    R{item.price.toLocaleString()}
                  </span>

                  <span className="item-size">
                    Size - {item.size || item.selectedSize}
                  </span>
                </div>

                <span className="item-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default OrdersHistory;
