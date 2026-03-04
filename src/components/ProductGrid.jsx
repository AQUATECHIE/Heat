import { useState } from "react";
import "../styles/ProductGrid.css";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import api from "../api/axios";

const ProductGrid = ({ title, products = [] }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilter = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          minPrice,
          maxPrice,
        },
      });

      setFilteredProducts(data.products);
      setFilterOpen(false);
    } catch (error) {
      console.error("Filter failed");
    }
  };

  const resetFilter = () => {
    setFilteredProducts(products);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <section className="product-page">
      <h2 className="page-title">{title}</h2>

      {/* FILTER BUTTON */}
      <div className="filter-row">
        <span onClick={() => setFilterOpen(!filterOpen)}>⚙ Filter</span>
      </div>

      {/* FILTER PANEL */}
      {filterOpen && (
        <div className="filter-panel">
          <h4>Filter by Price</h4>

          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <div className="filter-actions">
            <button onClick={applyFilter}>Apply</button>
            <button onClick={resetFilter}>Reset</button>
          </div>
        </div>
      )}

      <p className="item-count">{filteredProducts.length} items</p>

      <div className="grid">
        {filteredProducts.map((item) => {
          const active = isInWishlist(item._id);

          return (
            <div key={item._id} className="card">
              {/* Wishlist */}
              <div
                className={`wishlist-btn ${active ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
              >
                <FaRegBookmark />
              </div>

              {item.discount && (
                <div className="discount">-{item.discount}%</div>
              )}

              <Link to={`/product/${item._id}`} className="card-link">
                <img src={item.images?.[0]?.url} alt={item.name} />

                <h4>{item.name}</h4>

                <p className="price">
                  ₦{Number(item.price).toLocaleString()}
                </p>
              </Link>
            </div>
          );
        })}
      </div>

      <button className="see-all-btn">SEE ALL</button>
    </section>
  );
};

export default ProductGrid;