import { useParams } from "react-router-dom";
import { useState } from "react";
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

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  if (!product) return <div>Product not found</div>;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
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
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
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

          <button className="add-to-cart">ADD TO CART</button>
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

        {/* Related */}
        <div className="related">
          <h3>YOU MAY ALSO LIKE</h3>
          <div className="related-grid">
            <div className="related-card">
              <img src={hoodie} alt="" />
              <p>PRADA NORDSTROM</p>
              <span>R1,700</span>
            </div>

            <div className="related-card">
              <img src={glasses} alt="" />
              <p>NIKE AIR JORDAN 1 RETRO</p>
              <span>R1,200</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIZE GUIDE MODAL → ONLY FOR SHOES */}
      {product.category === "shoes" && sizeGuideOpen && (
        <div
          className="size-guide-overlay"
          onClick={() => setSizeGuideOpen(false)}
        >
          <div
            className="size-guide-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <button onClick={() => setSizeGuideOpen(false)}>✕</button>
              <h3>SIZE GUIDE</h3>
            </div>

            <div className="modal-content">
              {/* Table */}
              <table>
                <tbody>
                  <tr>
                    <th>Size</th>
                    <td>39</td>
                    <td>40</td>
                    <td>41</td>
                    <td>42</td>
                    <td>43</td>
                    <td>44</td>
                    <td>45</td>
                    <td>46</td>
                    <td>47</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <th>US</th>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th>EUR</th>
                    <td>39</td>
                    <td>40</td>
                    <td>41</td>
                    <td>42</td>
                    <td>43</td>
                    <td>44</td>
                    <td>45</td>
                    <td>46</td>
                    <td>47</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <th>UK</th>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                  </tr>
                  <tr>
                    <th>JP</th>
                    <td>26</td>
                    <td>26.5</td>
                    <td>27</td>
                    <td>27.5</td>
                    <td>28.5</td>
                    <td>29</td>
                    <td>29.5</td>
                    <td>30</td>
                    <td>30.5</td>
                    <td>31</td>
                  </tr>
                  <tr>
                    <th>KR</th>
                    <td>245</td>
                    <td>250</td>
                    <td>260</td>
                    <td>270</td>
                    <td>280</td>
                    <td>290</td>
                    <td>300</td>
                    <td>310</td>
                    <td>320</td>
                    <td>330</td>
                  </tr>
                </tbody>
              </table>

              {/* How to Measure */}
              <h4>HOW TO MEASURE</h4>

              <p>
                In order to select the correct shoe size, we recommend you
                measure your feet using the following guidelines.
              </p>

              <ul>
                <li>
                  Wear the kind of socks or tights you would normally wear with
                  this type of shoe.
                </li>
                <li>
                  Stand up straight on a flat surface with your heel against a
                  wall.
                </li>
                <li>
                  Measure from the base of your heel to the tip of your longest
                  toe.
                </li>
                <li>
                  Always measure both feet and use your longest foot as your
                  benchmark.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;
