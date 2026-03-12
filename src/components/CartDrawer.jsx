import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "../styles/CartDrawer.css";

const CartDrawer = ({ open, onClose }) => {
  const { cart, updateCartItem, removeCartItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.quantity * (item.product.finalPrice || item.product.price),
    0,
  );

  return (
    <>
      <div
        className={`cart-drawer ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="cart-head">
          <h3>MY CART</h3>

          <button onClick={onClose}>×</button>
        </div>

        {/* ITEMS */}

        <div className="cart-items">
          {cart.length === 0 && (
            <div className="empty-cart">
              <div className="cart-wheel">🛒</div>

              <h3>Your cart is currently empty</h3>

              <button
                className="start-shopping-btn"
                onClick={() => {
                  onClose();
                  navigate("/products");
                }}
              >
                START SHOPPING
              </button>
            </div>
          )}

          {cart.map((item) => (
            <div key={item.product._id} className="cart-card">
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
              />

              <div className="cart-info">
                <p className="cart-name">{item.product.name}</p>

                <p className="cart-price">
                  R
                  {(
                    item.product.finalPrice || item.product.price
                  ).toLocaleString()}
                </p>

                {item.selectedSize && (
                  <p className="cart-size">Size - {item.selectedSize}</p>
                )}

                <div className="cart-qty">
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

                  <FaTrash
                    className="delete-icon"
                    onClick={() => removeCartItem(item.product._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}

        {cart.length > 0 && (
          <div className="cart-footer">
            <p>Shipping calculated at checkout</p>

            <button
              className="checkout-btn"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              CHECKOUT • R{total.toLocaleString()}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
