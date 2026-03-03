import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ProductDetails.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH PRODUCT
  ========================== */
  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!product) return <div>Product not found</div>;

  /* =========================
     IMAGE NAVIGATION
  ========================== */
  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0
        ? (product.images?.length || 1) - 1
        : prev - 1
    );
  };

  /* =========================
     ADD TO CART
  ========================== */
  const handleAddToCart = async () => {
    if (product.category === "shoes" && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);

    try {
      await addToCart(product._id, quantity, selectedSize);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  return (
    <>
      <div className="product-details">
        {/* IMAGE SLIDER */}
        <div className="slider">
          <FaChevronLeft className="arrow left" onClick={prevImage} />

          <img
            src={product.images?.[currentImage]?.url}
            alt={product.name}
          />

          <FaChevronRight className="arrow right" onClick={nextImage} />

          <div className="dots">
            {product.images?.map((_, index) => (
              <span
                key={index}
                className={index === currentImage ? "dot active" : "dot"}
              ></span>
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">
            ₦{Number(product.price).toLocaleString()}
          </p>
        </div>

        {/* SIZE SECTION (SHOES ONLY) */}
        {product.category === "shoes" &&
          product.specifications?.size && (
            <div className="sizes">
              <div className="size-header">
                <span>SIZE:</span>
              </div>

              <div className="size-options">
                {product.specifications.size.map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? "active" : ""}
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

        {/* QUANTITY */}
        <div className="quantity-section">
          <span>QUANTITY:</span>

          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>

        <button className="buy-now">BUY NOW</button>

        {/* SHIPPING */}
        <div className="shipping">
          <h4>Shipping & Returns</h4>
          <ul>
            <li>Standard Shipping takes 3 working days</li>
            <li>Express Shipping takes 2 working days</li>
            <li>Free returns in 30 days</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;