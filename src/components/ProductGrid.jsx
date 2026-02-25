import "../styles/ProductGrid.css";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const ProductGrid = ({ title, products = [] }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section className="product-page">
      <h2 className="page-title">{title}</h2>

      <div className="filter-row">
        <span>⚙ Filter</span>
      </div>

      <p className="item-count">{products.length} items</p>

      <div className="grid">
        {products.map((item) => {
          const active = isInWishlist(item._id);

          return (
            <div key={item._id} className="card">
              
              {/* Wishlist Button */}
              <div
                className={`wishlist-btn ${active ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault(); // prevent link navigation
                  toggleWishlist(item);
                }}
              >
                <FaRegBookmark />
              </div>

              {/* Discount if exists */}
              {item.discount && (
                <div className="discount">-{item.discount}%</div>
              )}

              <Link to={`/product/${item._id}`} className="card-link">
                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                />
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