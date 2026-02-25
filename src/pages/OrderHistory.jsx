import { useEffect, useState } from "react";
import api from "../api/axios";
import Footer from "../components/Footer";
import "../styles/OrdersPage.css";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await api.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading orders...</h2>;
  }

  if (orders.length === 0) {
    return (
      <>
        <div className="orders-page">
          <h2>My Orders</h2>
          <p>No orders yet.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="orders-page">
        <h2>My Orders</h2>

        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      ₦{item.price.toLocaleString()} x {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              Total: ₦{order.totalAmount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default OrdersHistory;