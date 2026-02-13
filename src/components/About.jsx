import "../styles/About.css";
import showcaseImage from "../assets/hero-img2.png";
import missionImage from "../assets/mission.png";
import offerImage from "../assets/abt.png";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="about-page">

        {/* Hero Image */}
        <div className="about-hero">
          <img src={showcaseImage} alt="Sneaker Collection" />
        </div>

        {/* Welcome Text */}
        <div className="about-text">
          <p>
            Welcome to HeatOnly Kick Collectibles, where passion meets expertise.
            As a lifelong sneaker and luxury item enthusiast, I have dedicated
            years to curating a personal collection that embodies style, rarity,
            and authenticity. My journey began as a personal quest to acquire the
            best and most exclusive items on the market. Encouraged by friends
            and fellow collectors, I transformed my passion into a business that
            now helps others own the extraordinary.
          </p>
        </div>

        {/* Mission Image */}
        <div className="about-card-image">
          <img src={missionImage} alt="Mission Illustration" />
        </div>

        {/* Mission Section */}
        <div className="about-section">
          <div className="section-divider">
            <span>OUR MISSION</span>
          </div>

          <p>
            At HeatOnly, our mission is simple: to connect discerning collectors
            with the world’s most coveted sneakers and luxury items. We pride
            ourselves on offering a personalized shopping experience tailored to
            your unique tastes and needs. Whether you're seeking a rare pair of
            sneakers or an exclusive luxury item, our goal is to deliver only
            the best.
          </p>
        </div>

        {/* Offer Image */}
        <div className="about-card-image">
          <img src={offerImage} alt="Shopping Illustration" />
        </div>

        {/* What We Offer */}
        <div className="about-section">
          <div className="section-divider">
            <span>WHAT WE OFFER</span>
          </div>

          <ul>
            <li>
              <strong>Exclusive Access:</strong> We maintain an extensive network
              of trusted sources that allows us to locate hard-to-find items that
              most collectors only dream of acquiring.
            </li>

            <li>
              <strong>Personal Shopping Services:</strong> Struggling to find
              that perfect piece? Let us do the work for you. Our personal
              shopping service is tailored to help you discover and acquire
              exclusive items with ease.
            </li>

            <li>
              <strong>Expert Authentication:</strong> Every item we source is
              meticulously authenticated, so you can purchase with confidence
              and peace of mind.
            </li>
          </ul>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default About;