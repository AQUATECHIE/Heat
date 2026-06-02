import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";
import "../styles/CartPage.css";
import deleteIcon from "../assets/icon/delete.svg";

const CartPage = () => {
  const { cart, updateCartItem, removeCartItem } = useCart();

  const navigate = useNavigate();

  const [loginModal, setLoginModal] = useState(false);

  const token = localStorage.getItem("token");

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.quantity * (item.product.finalPrice || item.product.price),
    0,
  );

  const shipping = cart.length > 0 ? 50 : 0;

  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const goToLogin = () => {
    localStorage.setItem("redirectAfterLogin", "/cart");
    navigate("/auth");
  };

  return (
    <>
      <section className="cart-page">
        <div className="cart-layout">
          {/* LEFT */}

          <div className="cart-left-section">
            <h2>Your Shopping Cart</h2>

            {cart.length === 0 && (
              <div className="empty-cart">
                <div className="cart-wheel">🛒</div>

                <h3>Your cart is currently empty</h3>

                <button
                  className="start-shopping-btn"
                  onClick={() => navigate("/products")}
                >
                  START SHOPPING
                </button>
              </div>
            )}

            {cart.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />

                <div className="cart-info">
                  <div className="cart-top">
                    <h4>{item.product.name}</h4>

                    <span className="cart-price">
                      R
                      {(
                        item.quantity *
                        (item.product.finalPrice || item.product.price)
                      ).toLocaleString()}
                    </span>
                  </div>

                  {item.selectedSize && (
                    <p className="cart-size">Size - {item.selectedSize}</p>
                  )}

                  <div className="quantity-controls">
                    <div className="qty-box">
                      <button
                        onClick={() =>
                          updateCartItem(item.product._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateCartItem(item.product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <img
                      src={deleteIcon}
                      alt=""
                      className="delete-icon"
                      onClick={() => removeCartItem(item.product._id)}
                      width={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}

          {cart.length > 0 && (
            <div className="order-summary">
              <h2 style={{ marginTop: "-70px" }}>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <span>R{subtotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>

                <span>R{shipping}</span>
              </div>

              <div className="summary-divider"></div>

              <div
                className="summary-row"
                style={{ fontSize: "22px", fontWeight: "700" }}
              >
                <span>Total</span>

                <span>R{total.toLocaleString()}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                CHECKOUT • R{total.toLocaleString()}
              </button>
            </div>
          )}
        </div>

        {/* RELATED */}

        <div className="cart-related">
          <h2>You might also like</h2>

          <div className="related-grid">
            {cart.slice(0, 4).map((item) => (
              <Link
                key={item.product._id}
                className="related-card"
                to={`/product/${item.product._id}`}
              >
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />

                <p>{item.product.name}</p>

                <span>
                  R
                  {Number(
                    item.product.finalPrice || item.product.price,
                  ).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}

      {loginModal && (
        <div className="cart-login-overlay">
          <div className="cart-login-modal">
            <h3>Sign in required</h3>

            <p>Please sign in or create an account to continue checkout.</p>

            <div className="cart-login-actions">
              <button className="login-btn" onClick={goToLogin}>
                SIGN IN
              </button>

              <button
                className="cancel-btn"
                onClick={() => setLoginModal(false)}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CartPage;
