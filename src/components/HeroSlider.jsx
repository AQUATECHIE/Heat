import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/Hero.css";

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get("/hero");

        if (data?.images?.length > 0) {
          setHeroImage(data.images[0]);
        }
      } catch (error) {
        console.log("Failed to load hero image");
      }
    };

    fetchHero();
  }, []);

  return (
    <section className="hero">
      {heroImage && (
        <>
          <img
            src={heroImage.url}
            alt="hero"
            className="hero-image"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <Link to="/products" className="hero-btn">
              SHOP NOW
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;