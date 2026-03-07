import { useState } from "react";
import "../styles/ProductGrid.css";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import filterIcon from "../assets/icon/filter.svg";
import api from "../api/axios";

const ProductGrid = ({ title, products = [] }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const { data } = await api.get("/products", {
        params: {
          page: nextPage,
          minPrice,
          maxPrice,
        },
      });

      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      setFilteredProducts((prev) => [...prev, ...data.products]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more products");
    } finally {
      setLoadingMore(false);
    }
  };
 const applyFilter = async () => {
  try {
    const { data } = await api.get("/products", {
      params: {
        minPrice,
        maxPrice,
        page: 1
      },
    });

    setFilteredProducts(data.products);
    setPage(1);
    setHasMore(true);
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
        <img
          src={filterIcon}
          alt="filter"
          onClick={() => setFilterOpen(!filterOpen)}
        />{" "}
        Filter
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

                <p className="price">R{Number(item.price).toLocaleString()}</p>
              </Link>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button className="see-all-btn" onClick={loadMoreProducts}>
          {loadingMore ? "Loading..." : "SEE ALL"}
        </button>
      )}
    </section>
  );
};

export default ProductGrid;
