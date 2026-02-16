import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";

import sneaker1 from "../assets/jac.png";
import sneaker2 from "../assets/shoe.png";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.quantity * parseInt(item.price.replace(/[^0-9]/g, "")),
    0,
  );

  return (
    <>
      <div className="cart-page" style={{marginTop: "20px"}}>
        <h2>My Cart</h2>

        <div className="cart-header">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>

        {cartItems.map((item) => (
          <div key={item.id + item.selectedSize} className="cart-item">
            <div className="cart-left">
              <img
                src={item.images ? item.images[0] : "/fallback.png"}
                alt=""
              />

              <div className="cart-info">
                <h4>{item.name}</h4>

                {item.selectedSize && (
                  <p className="size-text">Size - {item.selectedSize}</p>
                )}

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <FaTrash
                    className="delete-icon"
                    onClick={() => removeFromCart(item.id, item.size)}
                  />
                </div>
              </div>
            </div>

            <div className="cart-price">
              R{item.quantity * parseInt(item.price.replace(/[^0-9]/g, ""))}
            </div>
          </div>
        ))}

        {/* Checkout */}
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          CHECKOUT • R{total.toLocaleString()}
        </button>

        {/* Related */}
        <div className="related-section">
          <h3>YOU MAY ALSO LIKE</h3>

          <div className="related-grid">
            <div className="related-card">
              <img src={sneaker1} alt="" />
              <p>NIKE AIR JORDAN 1 RETRO</p>
              <span>R1,200</span>
            </div>

            <div className="related-card">
              <img src={sneaker2} alt="" />
              <p>PRADA NORDSTROM</p>
              <span>R1,700</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
