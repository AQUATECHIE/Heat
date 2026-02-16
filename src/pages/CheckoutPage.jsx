import { useCart } from "../context/CartContext";
import { useState } from "react";
import "../styles/CheckoutPage.css";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.price.replace("R", "").replace(",", "")) *
        item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 70 : 0;
  const total = subtotal + shipping;

  /* ===========================
     WHATSAPP ORDER GENERATOR
  ============================ */

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
Size: ${item.size || "N/A"}
Qty: ${item.quantity}
Price: R${
            Number(
              item.price.replace("R", "").replace(",", "")
            ) * item.quantity
          }\n`
      )
      .join("\n");

    const message = `
🛒 *NEW ORDER - HEATONLY*

👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}, ${formData.city}

---------------------------
📦 ORDER DETAILS
---------------------------
${itemsText}

Subtotal: R${subtotal}
Shipping: R${shipping}
*Total: R${total}*
`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = "2348024962596";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <>
      <div className="checkout-page">
        {/* ORDER SUMMARY */}
        <div className="order-summary" style={{ marginTop: "50px" }}>
          <h3>ORDER SUMMARY</h3>

          {cartItems.map((item, index) => (
            <div key={index} className="summary-item">
              <div className="summary-img-wrapper">
                <img src={item.images?.[0]} alt={item.name} />
                <span className="quantity-badge">
                  {item.quantity}
                </span>
              </div>

              <div className="summary-details">
                <p>{item.name}</p>
                {item.size && <span>Size - {item.size}</span>}
              </div>

              <div className="summary-price">
                R
                {(
                  Number(
                    item.price.replace("R", "").replace(",", "")
                  ) * item.quantity
                ).toLocaleString()}
              </div>
            </div>
          ))}

          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <span>R{subtotal.toLocaleString()}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>R{shipping}</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>R{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="checkout-section">
          <h3>Contact</h3>

          <input
            type="text"
            placeholder="email"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="phone"
            onChange={handleChange}
          />
        </div>

        {/* DELIVERY */}
        <div className="checkout-section">
          <h3>Delivery</h3>

          <input
            type="text"
            placeholder="firstName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="lastName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="address"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="city"
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

          <button
            className="pay-btn"
            onClick={handleWhatsAppCheckout}
          >
            PAY NOW
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;