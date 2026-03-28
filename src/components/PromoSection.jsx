import "../styles/PromoSection.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const PromoSection = () => {

  const navigate = useNavigate();

  const [promos, setPromos] = useState([]);

  const fetchPromos = async () => {
    try {

      const { data } = await api.get("/promos");

      setPromos(data);

    } catch (error) {

      console.error("Failed to fetch promos");

    }
  };

  useEffect(() => {

    fetchPromos();

  }, []);

  return (
    <section className="promo-section">

      {promos.map((promo) => (

        <div key={promo._id} className="promo-card">

          <img src={promo.image?.url} alt={promo.title} />

          <h3>{promo.title}</h3>

          <button onClick={() => navigate(promo.link)}>
            START SHOPPING
          </button>

        </div>

      ))}

    </section>
  );

};

export default PromoSection;