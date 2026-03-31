import { useParams, useNavigate, Link } from "react-router-dom";
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
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isDesktop = window.innerWidth >= 1024;
  const [cartModal, setCartModal] = useState(false);

  /* FETCH PRODUCT */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);

      setProduct(data);
      const limit = window.innerWidth >= 1024 ? 4 : 4;
      /* FETCH RELATED PRODUCTS BY CATEGORY */
      const related = await api.get("/products", {
        params: {
          category: data.category,
          limit,
        },
      });

      /* remove current product */
      const filtered = (related.data.products || related.data)
        .filter((p) => p._id !== data._id)
        .slice(0, limit);

      setRelatedProducts(filtered);
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

  console.log(product);
  // console.log(product.specifications.size);

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
    if (product.specifications?.size?.length > 0 && !selectedSize) {
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
  const handleBuyNow = async () => {
    if (product.specifications?.size?.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);

    try {
      await addToCart(product._id, quantity, selectedSize);

      // redirect directly to checkout
      navigate("/checkout");
    } catch (error) {
      console.error(error.response?.data?.message || "Buy now failed");
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
        <div className="product-info">
          {/* PRODUCT TITLE */}
          <div className="product-title">
            <h2>{product.name}</h2>

            <div className="price-box">
              {product.discount > 0 ? (
                <>
                  <span className="old-price">
                    R{Number(product.price).toLocaleString()}
                  </span>

                  <span className="discount-price">
                    R{Number(product.finalPrice).toLocaleString()}
                  </span>

                  <span className="discount-badge">-{product.discount}%</span>
                </>
              ) : (
                <span className="price">
                  R{Number(product.price).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          {/* SIZE SELECTOR */}

          {product.specifications?.size?.length > 0 && (
            <div className="size-section">
              <div className="size-header">
                <span>SIZE:</span>

                <div
                  className="size-guide-link"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  <img src={sizeIcon} alt="size" />
                  <span>Size Guide</span>
                </div>
              </div>

              <div className="size-select-wrapper">
                {isDesktop ? (
                  <select
                    className="size-dropdown"
                    value={selectedSize || ""}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                      setSizeError(false);
                    }}
                  >
                    <option value="" disabled>
                      Select size
                    </option>

                    {product.specifications.size.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div
                    className="mobile-size-selector"
                    onClick={() => setSizeModalOpen(true)}
                  >
                    {selectedSize || "Select size"}
                    <span className="select-arrow">▾</span>
                  </div>
                )}
              </div>
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
          <button className="buy-btn" onClick={handleBuyNow}>
            BUY NOW
          </button>

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
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3 className="related-title">YOU MAY ALSO LIKE</h3>

          <div className="related-slider">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                className="related-card"
                to={`/product/${item._id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img src={item.images?.[0]?.url} alt={item.name} />

                <div className="related-info">
                  <p>{item.name}</p>

                  <span>
                    R{Number(item.finalPrice || item.price).toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {cartModal && (
        <div className="cart-overlay">
          <div className="cart-popup">
            <div className="cart-popup-header">
              <span>ADDED TO SHOPPING CART</span>

              <button
                className="close-popup"
                onClick={() => setCartModal(false)}
              >
                ×
              </button>
            </div>

            <div className="cart-popup-body">
              <img src={product.images?.[0]?.url} alt={product.name} />

              <div className="cart-popup-info">
                <h4>{product.name}</h4>

                <p className="popup-price">
                  R
                  {Number(product.finalPrice || product.price).toLocaleString()}
                </p>

                {selectedSize && (
                  <span className="popup-size">Size - {selectedSize}</span>
                )}
              </div>
            </div>

            <div className="cart-popup-buttons">
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                CHECKOUT
              </button>

              <button
                className="view-cart-btn"
                onClick={() => navigate("/cart")}
              >
                VIEW SHOPPING CART
              </button>
            </div>
          </div>
        </div>
      )}

      <SizeGuideModal
        open={sizeGuideOpen}
        close={() => setSizeGuideOpen(false)}
      />
      {sizeModalOpen && window.innerWidth < 1024 && (
        <div
          className="size-modal-overlay"
          onClick={() => setSizeModalOpen(false)}
        >
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <div className="size-modal-header">
              <span className="label">SELECT A SIZE</span>
            </div>

            <div className="size-list">
              {product.specifications.size.map((size) => (
                <div
                  key={size}
                  className={`size-row ${selectedSize === size ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeModalOpen(false);
                    setSizeError(false);
                  }}
                >
                  {size}

                  {selectedSize === size && (
                    <span className="size-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
