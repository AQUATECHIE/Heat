import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx"; 
import "../styles/ProductDetails.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import hoodie from "../assets/jac.png";
import glasses from "../assets/shoe.png";
import Footer from "../components/Footer";

const dummyProducts = [
  {
    id: "1",
    name: "ADIDA ADICOLOR OVERSIZE Full-Zip Hoodie",
    price: "R700",
    images: [hoodie, hoodie],
    category: "clothes",
  },
  {
    id: "2",
    name: "RAY-BAN META HEADLINER (GEN2) GLASSES",
    price: "R1,000",
    images: [glasses, glasses],
    category: "accessories",
  },
  {
    id: "3",
    name: "LV TRAINER SNEAKER",
    price: "R1,800",
    images: [glasses, glasses],
    category: "shoes",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = dummyProducts.find((p) => p.id === id);

  const { addToCart } = useCart(); // 👈 USE GLOBAL CART

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) return <div>Product not found</div>;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
  if (product.category === "shoes" && !selectedSize) {
    setSizeError(true);
    return;
  }

  setSizeError(false);

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    images: product.images,   
    selectedSize,
    quantity,
  });
};

  return (
    <>
      <div className="product-details">
        {/* Image Slider */}
        <div className="slider">
          <FaChevronLeft className="arrow left" onClick={prevImage} />
          <img src={product.images[currentImage]} alt="product" />
          <FaChevronRight className="arrow right" onClick={nextImage} />

          <div className="dots">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={index === currentImage ? "dot active" : "dot"}
              ></span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">{product.price}</p>
        </div>

        {/* SIZE SECTION → ONLY FOR SHOES */}
        {product.category === "shoes" && (
          <div className="sizes">
            <div className="size-header">
              <span>SIZE:</span>
              <span
                className="size-guide"
                onClick={() => setSizeGuideOpen(true)}
              >
                Size Guide
              </span>
            </div>

            <div className="size-options">
              {product.sizes.map((size) => (
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

        {/* Quantity */}
        <div className="quantity-section">
          <span>QUANTITY:</span>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button
            className={`add-to-cart ${
              product.category === "shoes" && !selectedSize
                ? "disabled"
                : ""
            }`}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>

        <button className="buy-now">BUY NOW</button>

        {/* Shipping */}
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