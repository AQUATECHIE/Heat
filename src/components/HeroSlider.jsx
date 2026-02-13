import { useEffect, useState } from "react";
import "../styles/Hero.css";

import slide1 from "../assets/hero-img1.png";
import slide2 from "../assets/Property 1=Frame 437.png";
import slide3 from "../assets/Property 1=Frame 438.png";

const Hero = () => {
  const slides = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000); // slower for luxury feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {slides.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${
            index === currentIndex ? "active" : ""
          }`}
        >
          <img src={image} alt={`slide-${index}`} />
          <div className="hero-overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default Hero;