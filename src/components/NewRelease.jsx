import "../styles/NewRelease.css";
import { FaRegBookmark } from "react-icons/fa";

import shoe1 from "../assets/shoe.png";
import shoe2 from "../assets/shoe2.png";

const NewRelease = () => {
  const products = [
    {
      id: 1,
      name: "LV TRAINER SNEAKER",
      price: "R1,800",
      image: shoe1,
    },
    {
      id: 2,
      name: "BALENCIAGA ALASKA PUFFER BOOT",
      price: "R1,200",
      image: shoe2,
    },
  ];

  return (
    <section className="new-release">
      <div className="section-header">
        <h2>NEW RELEASE</h2>
        <span>See All →</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="bookmark">
              <FaRegBookmark />
            </div>

            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewRelease;