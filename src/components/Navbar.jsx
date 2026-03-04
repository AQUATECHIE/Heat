import logo from "../assets/hero-logo.png";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { cartCount } = useCart();
  const { user } = useAuth();

  /* =============================
     SEARCH PRODUCTS FROM BACKEND
  ============================== */

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      try {
        const { data } = await api.get(
          `/products?keyword=${searchTerm}`
        );

        setResults(data.products || data);
      } catch (error) {
        console.error(error);
      }
    };

    const debounce = setTimeout(fetchProducts, 400);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <FaBars className="icon" onClick={() => setSidebarOpen(true)} />
          <FaSearch className="icon" onClick={() => setSearchOpen(true)} />
        </div>

        <Link to="/" className="nav-logo">
          <img src={logo} alt="Brand Logo" />
        </Link>

        <div className="nav-right">
          <Link
            to={
              user ? (user.role === "admin" ? "/admin" : "/profile") : "/auth"
            }
            className="icon-link"
          >
            <FaUser className="icon" />
          </Link>

          <Link to="/cart" className="cart-wrapper">
            <FaShoppingBag className="icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      {(searchOpen || sidebarOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setSearchOpen(false);
            setSidebarOpen(false);
          }}
        ></div>
      )}

      {/* SEARCH DROPDOWN */}
      {searchOpen && (
        <div className="search-dropdown">
          <div className="search-top">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />

              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <FaTimes
              className="close-icon"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
                setResults([]);
              }}
            />
          </div>

          {/* SEARCH RESULTS */}
          <div className="search-results">
            {results.length === 0 && searchTerm && (
              <p className="no-results">No products found</p>
            )}

            {results.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="search-result-item"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm("");
                }}
              >
                <img src={product.images?.[0]?.url} alt={product.name} />

                <div>
                  <p>{product.name}</p>
                  <span>₦{product.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* RECENT SEARCH */}
          {!searchTerm && (
            <div className="recent-search">
              <h4>POPULAR SEARCH</h4>
              <p>Nike Air Jordan 1 Retro</p>
              <p>Prada Nordstrom</p>
              <p>Bosphore Wearable Wallet</p>
            </div>
          )}
        </div>
      )}

      {/* SIDEBAR */}
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
          <NavLink to="/orders" onClick={() => setSidebarOpen(false)}>
            Order history
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