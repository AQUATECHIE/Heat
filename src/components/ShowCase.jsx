import "../styles/Showcase.css";
import showcaseImage from "../assets/hero-img2.png";

const Showcase = () => {
  return (
    <section className="showcase">
      <div className="showcase-image">
        <img src={showcaseImage} alt="Sneaker Lifestyle Showcase" />
      </div>
    </section>
  );
};

export default Showcase;