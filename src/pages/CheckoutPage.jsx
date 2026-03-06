import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";
import api from "../api/axios";
import Footer from "../components/Footer";
import { FaEllipsisV } from "react-icons/fa";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  /* =========================
     LOAD SAVED DELIVERY ADDRESS
  ========================= */

  const fetchSavedAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await api.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data) return;

      setFormData((prev) => ({
        ...prev,
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        email: user?.email || "",
        address: data.address || "",
        city: data.city || "",
        phone: data.phone || "",
      }));
    } catch (error) {
      console.log("No saved address");
    }
  };

  useEffect(() => {
    fetchSavedAddress();
  }, []);

  /* ======================
     CALCULATIONS
  ====================== */

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const shipping = cart.length > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  /* ======================
     WHATSAPP CHECKOUT
  ====================== */

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
        },
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
      ).toLocaleString()}`,
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
        "_blank",
      );

      showModal("Order placed successfully 🔥");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);

      showModal(
        error.response?.data?.message || "Order failed. Please try again.",
        "error",
      );
    }
  };

  return (
    <>
      <div className="checkout-page">
        {/* USER HEADER */}
        <div className="checkout-user">
          <div className="user-left">
            <div className="avatar">{user?.name?.charAt(0)}</div>
            <span>{user?.name}</span>
          </div>

          <div className="menu">
            <FaEllipsisV onClick={() => setMenuOpen(!menuOpen)} />

            {menuOpen && (
              <div className="menu-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* SHIP TO */}
        <div className="ship-section">
          <div className="ship-header">
            <span className="B">Ship to</span>
            <button onClick={() => navigate("/address")}>Update Address</button>
          </div>

          <p className="A">
            Name: {formData.firstName} {formData.lastName}
          </p>
          <p className="A">Address: {formData.address}</p>
          <p className="A">Contact: {formData.phone}</p>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.product._id} className="summary-item">
              <div className="summary-image">
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />
                <span className="quantity-badge">{item.quantity}</span>
              </div>

              <div className="summary-info">
                <p className="product-name">{item.product.name}</p>

                {(item.size || item.selectedSize) && (
                  <span className="product-size">
                    Size - {item.size || item.selectedSize}
                  </span>
                )}
              </div>

              <span className="summary-price">
                ₦{(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="summary-total">
            <div>
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            <div>
              <span>Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>

            <div className="total-row">
              <strong>Total</strong>
              <strong>₦{total.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="payment-section">
          <h3>Payment method</h3>
          <p>All transactions are secured and encrypted.</p>

          <div className="stripe-box">stripe</div>

          <button className="pay-btn" onClick={handleWhatsAppCheckout}>
            PAY VIA WHATSAPP
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
