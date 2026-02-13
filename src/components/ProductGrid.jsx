import "../styles/ProductGrid.css";
import { FaRegBookmark } from "react-icons/fa";

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
          <div className="card" key={item.id}>
            <div className="bookmark">
              <FaRegBookmark />
            </div>

            {item.discount && (
              <div className="discount">-{item.discount}%</div>
            )}

            <img src={item.image} alt={item.name} />

            <h4>{item.name}</h4>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>

      <button className="see-all-btn">SEE ALL</button>
    </section>
  );
};

export default ProductGrid;