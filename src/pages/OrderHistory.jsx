import { useEffect, useState } from "react";
import "../styles/OrdersPage.css";
import Footer from "../components/Footer";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <>
      <div className="orders-page">
        <h2>Order History</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <strong>{order.id}</strong>
                  <p>{order.date}</p>
                </div>
                <div className="order-total">
                  R{order.total.toLocaleString()}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                    />
                    <div>
                      <p>{item.name}</p>
                      {item.size && (
                        <span>Size: {item.size}</span>
                      )}
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default OrdersHistory;