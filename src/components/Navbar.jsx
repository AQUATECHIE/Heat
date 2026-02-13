import logo from "../assets/hero-logo.png"
import { useState } from "react";
import "../styles/Navbar.css";
import { FaBars, FaSearch, FaUser, FaShoppingBag, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <FaBars className="icon" />
          <FaSearch
            className="icon"
            onClick={() => setSearchOpen(true)}
          />
        </div>

        <div className="nav-logo">
          <img src={logo} alt="Brand Logo" />
        </div>

        <div className="nav-right">
          <FaUser className="icon" />
          <FaShoppingBag className="icon" />
        </div>
      </nav>

      {searchOpen && (
        <div className="search-dropdown">
          <div className="search-top">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
              />
            </div>
            <FaTimes
              className="close-icon"
              onClick={() => setSearchOpen(false)}
            />
          </div>

          <div className="recent-search">
            <h4>RECENT SEARCH</h4>
            <p>Nike Air Jordan 1 Retro</p>
            <p>Prada Nordstrom</p>
            <p>Bosphore Wearable Wallet</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;