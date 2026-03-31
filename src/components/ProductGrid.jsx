import { useState, useEffect } from "react";
import "../styles/ProductGrid.css";
import wishlistIcon from "../assets/icon/wishlist.svg";
import { Link, useSearchParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import filterIcon from "../assets/icon/filter.svg";
import api from "../api/axios";

const ProductGrid = ({ title, products = [] }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [wishlistToast, setWishlistToast] = useState(false);
  const [sizeModal, setSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* UPDATE GRID WHEN PRODUCTS CHANGE */

  useEffect(() => {
    setFilteredProducts(products);
    setPage(1);
  }, [products]);

  /* LOAD MORE PRODUCTS */

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const { data } = await api.get("/products", {
        params: {
          page: nextPage,
          minPrice,
          maxPrice,
          category,
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

  /* APPLY PRICE FILTER */

  const applyFilter = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          minPrice,
          maxPrice,
          page: 1,
          category,
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
      <div className="product-toolbar">
        <h2 className="page-title">{title}</h2>

        <div className="filter-row" onClick={() => setFilterOpen(!filterOpen)}>
          <img src={filterIcon} alt="filter" />
          Filter
        </div>
      </div>

      {/* FILTER PANEL */}

      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <h4>Filter by Price</h4>

            <button
              className="close-filter"
              onClick={() => setFilterOpen(false)}
            >
              ×
            </button>
          </div>

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

      {/* PRODUCT GRID */}

      <div className="grid">
        {filteredProducts.map((item) => {
          const active = isInWishlist(item._id);
          const hasDiscount = item.discount > 0;

          return (
            <div key={item._id} className="card">
              {hasDiscount && (
                <div className="discount-badge">-{item.discount}%</div>
              )}

              {/* WISHLIST */}

              <div
                className={`wishlist-btn ${active ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();

                  const hasSizes = item.specifications?.size?.length;

                  if (hasSizes) {
                    setSelectedProduct(item);
                    setSizeModal(true);
                  } else {
                    toggleWishlist(item);

                    setWishlistToast(true);

                    setTimeout(() => {
                      setWishlistToast(false);
                    }, 2500);
                  }
                }}
              >
                <img src={wishlistIcon} alt="" />
              </div>

              {/* PRODUCT */}

              <Link to={`/product/${item._id}`} className="card-link">
                <img src={item.images?.[0]?.url} alt={item.name} />

                <p>{item.name}</p>

                <h4 className="price">
                  {hasDiscount ? (
                    <>
                      <span className="old-price">
                        R{item.price.toLocaleString()}
                      </span>

                      <span className="new-price">
                        R{item.finalPrice?.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <>R{item.price.toLocaleString()}</>
                  )}
                </h4>
              </Link>
            </div>
          );
        })}
      </div>

      {/* LOAD MORE */}

      {hasMore && (
        <button className="see-all-btn" onClick={loadMoreProducts}>
          {loadingMore ? "Loading..." : "SEE ALL"}
        </button>
      )}

      {/* TOAST */}

      {wishlistToast && (
        <div className="wishlist-toast">
          <span>Product saved</span>

          <button
            className="toast-close"
            onClick={() => setWishlistToast(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* SIZE MODAL */}

      {sizeModal && selectedProduct && (
        <div className={`size-modal-overlay ${isDesktop ? "desktop" : ""}`}>
          <div className="size-modal">
            <h3>Select Size</h3>

            <div className="size-options">
              {selectedProduct.specifications?.size?.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="size-actions">
              <button
                onClick={() => {
                  if (!selectedSize) return alert("Please select size");

                  toggleWishlist({
                    ...selectedProduct,
                    selectedSize,
                  });

                  setSizeModal(false);
                  setSelectedSize(null);

                  setWishlistToast(true);

                  setTimeout(() => {
                    setWishlistToast(false);
                  }, 2500);
                }}
              >
                Add to Wishlist
              </button>

              <button
                onClick={() => {
                  setSizeModal(false);
                  setSelectedSize(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
