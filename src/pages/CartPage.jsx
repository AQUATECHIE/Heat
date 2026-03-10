import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/CartPage.css";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";

const CartPage = () => {
  const { cart, updateCartItem, removeCartItem } = useCart();
  const navigate = useNavigate();

  const [loginModal, setLoginModal] = useState(false);

  const token = localStorage.getItem("token");

  const total = cart.reduce(
    (sum, item) =>
      sum + item.quantity * (item.product.finalPrice || item.product.price),
    0
  );

  /* =========================
     CHECKOUT HANDLER
  ========================= */

  const handleCheckout = () => {
    if (!token) {
      setLoginModal(true);
      return;
    }

    navigate("/checkout");
  };

  const goToLogin = () => {
    localStorage.setItem("redirectAfterLogin", "/cart");
    navigate("/auth");
  };

  return (
    <>
      <div className="cart-page" style={{ marginTop: "20px" }}>
        <h2>My Cart</h2>

        <div className="cart-header">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>

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
            <div className="cart-left">
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
              />

              <div className="cart-info">
                <h4>{item.product.name}</h4>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateCartItem(item.product._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartItem(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <FaTrash
                    className="delete-icon"
                    onClick={() => removeCartItem(item.product._id)}
                  />
                </div>
              </div>
            </div>

            <div className="cart-price">
              R
              {(
                item.quantity *
                (item.product.finalPrice || item.product.price)
              ).toLocaleString()}
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT • R{total.toLocaleString()}
          </button>
        )}
      </div>

      {/* LOGIN REQUIRED MODAL */}

      {loginModal && (
        <div className="cart-login-overlay">
          <div className="cart-login-modal">
            <h3>Sign in required</h3>

            <p>
              Please sign in or create an account to continue checkout.
            </p>

            <div className="cart-login-actions">
              <button
                className="login-btn"
                onClick={goToLogin}
              >
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