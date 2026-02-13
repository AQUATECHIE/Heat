import "../styles/PromoSection.css";

import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";

const PromoSection = () => {
  return (
    <section className="promo-section">
      
      {/* Duffel Bag */}
      <div className="promo-card">
        <img src={bagImage} alt="GG Black Large Duffle Bag" />
        <h3>GG BLACK LARGE DUFFLE BAG</h3>
        <button>SHOP NOW</button>
      </div>

      {/* Jacket */}
      <div className="promo-card">
        <img src={jacketImage} alt="LV Padded Leather Blouson" />
        <h3>LV PADDED LEATHER BLOUSON</h3>
        <button>SHOP NOW</button>
      </div>

    </section>
  );
};

export default PromoSection;