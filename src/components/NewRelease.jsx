import "../styles/NewRelease.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import wishIcon from "../assets/icon/wishlist.svg";

const NewRelease = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  /* FETCH PRODUCTS */

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      const allProducts = data.products || data;

      /* show only first few for slider */
      const limit = window.innerWidth < 768 ? 5 : 12;

      setProducts(allProducts.slice(0, limit));

    } catch (error) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="new-release">

      <div className="section-header">
        <h2>NEW RELEASE</h2>

        <span
          className="see-all"
          onClick={() => navigate("/products")}
        >
          See All →
        </span>
      </div>

      <div className="product-slider">

        {products.map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >

            <div className="bookmark">
              <img src={wishIcon} alt="wishlist" />
            </div>

            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h4>{product.name}</h4>

              <p>
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default NewRelease;