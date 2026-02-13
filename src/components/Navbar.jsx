import logo from "../assets/hero-logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import {
  FaBars,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          {/* 🔥 Hamburger now triggers sidebar */}
          <FaBars
            className="icon"
            onClick={() => setSidebarOpen(true)}
          />

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

      {/* 🔥 Overlay */}
      {(searchOpen || sidebarOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setSearchOpen(false);
            setSidebarOpen(false);
          }}
        ></div>
      )}

      {/* 🔎 SEARCH DROPDOWN */}
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

      {/* 📂 SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>

        <div className="sidebar-links">
          <NavLink to="/" onClick={() => setSidebarOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setSidebarOpen(false)}>
            All Products
          </NavLink>
          <NavLink to="/sneakers" onClick={() => setSidebarOpen(false)}>
            Sneakers
          </NavLink>
          <NavLink to="/bags" onClick={() => setSidebarOpen(false)}>
            Bags
          </NavLink>
          <NavLink to="/clothes" onClick={() => setSidebarOpen(false)}>
            Clothes
          </NavLink>
          <NavLink to="/collectibles" onClick={() => setSidebarOpen(false)}>
            Collectible items
          </NavLink>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-extra">
          <NavLink to="/wishlist" onClick={() => setSidebarOpen(false)}>
            Wishlist
          </NavLink>
          <NavLink to="/about" onClick={() => setSidebarOpen(false)}>
            About Us
          </NavLink>

          <p>Info.admin@heatonlykickcollectibles.com</p>
          <p>+27665394231</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;