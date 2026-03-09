import "../styles/NewRelease.css";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import wishIcon from '../assets/icon/wishlist.svg'
import shoe1 from "../assets/shoe.png";
import shoe2 from "../assets/shoe2.png";
import shoe3 from "../assets/jac.png";
import shoe4 from "../assets/bag.png";

const NewRelease = () => {
  const navigate = useNavigate();

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
    {
      id: 3,
      name: "DIOR B30 SNEAKER",
      price: "R2,100",
      image: shoe3,
    },
    {
      id: 4,
      name: "NIKE AIR FORCE 1",
      price: "R1,000",
      image: shoe4,
    },
  ];

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
          <div className="product-card" key={product.id}>
            <div className="bookmark">
              <img src={wishIcon} alt="wishIcon" />
            </div>

            <img src={product.image} alt={product.name}  className="product-image"/>

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