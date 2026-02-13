import "../styles/ProductGrid.css";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductGrid = ({ title, products }) => {
  
  return (
    <section className="product-page">
      <h2 className="page-title">{title}</h2>

      <div className="filter-row">
        <span>⚙ Filter</span>
      </div>

      <p className="item-count">{products.length} items</p>

      <div className="grid">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="card-link"
          >
            <div className="card">
              <div className="bookmark">
                <FaRegBookmark />
              </div>

              {item.discount && (
                <div className="discount">
                  -{item.discount}%
                </div>
              )}

              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p className="price">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <button className="see-all-btn">SEE ALL</button>
    </section>
  );
};

export default ProductGrid;