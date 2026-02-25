import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";

const CartPage = () => {
  const { cart, updateCartItem, removeCartItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <>
      <div className="cart-page" style={{ marginTop: "20px" }}>
        <h2>My Cart</h2>

        <div className="cart-header">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>

        {cart.length === 0 && <p>Your cart is empty</p>}

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="cart-item"
          >
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
                      updateCartItem(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartItem(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                  <FaTrash
                    className="delete-icon"
                    onClick={() =>
                      removeCartItem(item.product._id)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="cart-price">
              ₦
              {(item.quantity * item.product.price).toLocaleString()}
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            CHECKOUT • ₦{total.toLocaleString()}
          </button>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;