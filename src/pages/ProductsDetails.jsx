import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ProductDetails.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import shipIcon from "../assets/icon/ship.svg";

import sizeIcon from "../assets/icon/size.svg";
import SizeGuideModal from "../components/SizeGuideModal";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cartModal, setCartModal] = useState(false);

  /* FETCH PRODUCT */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      nextImage();
    }

    if (distance < -50) {
      prevImage();
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!product) return <div>Product not found</div>;

  /* IMAGE NAVIGATION */

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1,
    );
  };

  /* ADD TO CART */

  const handleAddToCart = async () => {
    if (product.category === "shoes" && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);

    try {
      await addToCart(product._id, quantity, selectedSize);

      /* 🔥 SHOW MODAL */
      setCartModal(true);
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      <div className="product-details">
        {/* IMAGE GALLERY */}
        <div
          className="product-gallery"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <FaChevronLeft className="arrow left" onClick={prevImage} />

          <img
            className="product-image"
            src={product.images?.[currentImage]?.url}
            alt={product.name}
          />

          <FaChevronRight className="arrow right" onClick={nextImage} />

          <div className="dots">
            {product.images?.map((_, index) => (
              <span
                key={index}
                className={index === currentImage ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT TITLE */}
        <div className="product-title">
          <h2>{product.name}</h2>
          <p className="price">R{Number(product.price).toLocaleString()}</p>
        </div>

        {/* SIZE SELECTOR */}
        {product.category === "shoes" && product.specifications?.size && (
          <div className="size-section">
            <div className="size-header">
              <span>SIZE:</span>
              <div onClick={() => setShowSizeGuide(true)}>
                <img
                  src={sizeIcon}
                  alt="size"
                  className="size-guide"
                  
                />
                Size Guide
              </div>
            </div>

            <div className="size-grid">
              {product.specifications.size.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "size active" : "size"}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            {sizeError && (
              <p className="size-error">
                Please select a size before adding to cart.
              </p>
            )}
          </div>
        )}

        {/* QUANTITY + ADD CART */}
        <div className="cart-section">
          <span className="qty-label">QUANTITY:</span>

          <div className="cart-row">
            <div className="qty-box">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="add-cart" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>

        {/* BUY NOW */}
        <button className="buy-btn">BUY NOW</button>

        {/* SHIPPING */}
        <div className="shipping">
          <h3>
            <img src={shipIcon} alt="" />
            Shipping & Returns
          </h3>

          <ul>
            <li>Standard Shipping takes 3 working days</li>
            <li>Express Shipping takes 2 working days</li>
            <li>Free returns in 30 days</li>
          </ul>
        </div>
      </div>

      {/* CART MODAL */}
      {cartModal && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h3>Added to Cart 🛒</h3>
            <p>{product.name} was added to your cart.</p>

            <div className="cart-modal-actions">
              <button
                className="continue-btn"
                onClick={() => setCartModal(false)}
              >
                Continue Shopping
              </button>

              <button className="go-cart-btn" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {showSizeGuide && (
        <SizeGuideModal close={() => setShowSizeGuide(false)} />
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
