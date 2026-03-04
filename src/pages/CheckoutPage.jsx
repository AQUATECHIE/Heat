import { useCart } from "../context/CartContext";
import { useState } from "react";
import "../styles/CheckoutPage.css";
import api from "../api/axios";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const { cart } = useCart();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const showModal = (message, type = "success") => {
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);

    if (modalType === "success") {
      window.location.href = "/orders";
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* CALCULATIONS */

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  /* WHATSAPP CHECKOUT */

  const handleWhatsAppCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showModal("Please login first", "error");
        return;
      }

      const { data: order } = await api.post(
        "/orders",
        {
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = `
🛒 *NEW ORDER - HEATONLY*

📦 Order Ref: *${order._id}*
📅 Date: ${new Date(order.createdAt).toLocaleString()}

👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}, ${formData.city}

---------------------------
📦 ORDER DETAILS
---------------------------

${order.orderItems
  .map(
    (item) =>
      `• ${item.name} (x${item.quantity}) - ₦${(
        item.price * item.quantity
      ).toLocaleString()}`
  )
  .join("\n")}

---------------------------
Subtotal: ₦${order.subtotal.toLocaleString()}
Shipping: ₦${order.shipping.toLocaleString()}
*Total: ₦${order.totalAmount.toLocaleString()}*
`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "2348024962596";

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      );

      showModal("Order placed successfully 🔥");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);

      showModal(
        error.response?.data?.message || "Order failed. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      <div className="checkout-page">
        {/* ORDER SUMMARY */}
        <div className="order-summary" style={{ marginTop: "50px" }}>
          <h3>ORDER SUMMARY</h3>

          {cart.map((item) => (
            <div key={item.product._id} className="summary-item">
              <div className="summary-img-wrapper">
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />
                <span className="quantity-badge">{item.quantity}</span>
              </div>

              <div className="summary-details">
                <p>{item.product.name}</p>
              </div>

              <div className="summary-price">
                ₦{(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            <div>
              <span>Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>

            <div className="total-row">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="checkout-section">
          <h3>Contact</h3>

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>

        {/* DELIVERY */}
        <div className="checkout-section">
          <h3>Delivery</h3>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
        </div>

        {/* PAYMENT */}
        <div className="checkout-section">
          <h3>Payment</h3>

          <div
            className="payment-option whatsapp"
            onClick={handleWhatsAppCheckout}
            style={{ cursor: "pointer" }}
          >
            Complete order via WhatsApp
          </div>

          <button className="pay-btn" onClick={handleWhatsAppCheckout}>
            PAY NOW
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <h3>{modalType === "success" ? "Success" : "Error"}</h3>

            <p>{modalMessage}</p>

            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CheckoutPage;