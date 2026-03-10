import "../styles/PromoSection.css";
import { useNavigate } from "react-router-dom";
import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";

const PromoSection = () => {
  const navigate = useNavigate();
  return (
    <section className="promo-section">
      {/* Duffel Bag */}
      <div className="promo-card">
        <img src={bagImage} alt="GG Black Large Duffle Bag" />
        <h3>GG BLACK LARGE DUFFLE BAG</h3>
        <button onClick={() => navigate("/products")}>START SHOPPING</button>
      </div>

      {/* Jacket */}
      <div className="promo-card">
        <img src={jacketImage} alt="LV Padded Leather Blouson" />
        <h3>LV PADDED LEATHER BLOUSON</h3>
        <button onClick={() => navigate("/products")}>START SHOPPING</button>
      </div>
    </section>
  );
};

export default PromoSection;
