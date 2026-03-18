import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Hero.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* FETCH FROM BACKEND */

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get("/hero");

        if (data?.images) {
          setSlides(data.images);
        }
      } catch (error) {
        console.log("Failed to load hero images");
      }
    };

    fetchHero();
  }, []);

  /* AUTO SLIDE */

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="hero">
      {slides.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${
            index === currentIndex ? "active" : ""
          }`}
        >
          <img src={image.url} alt={`slide-${index}`} />
          <div className="hero-overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default Hero;