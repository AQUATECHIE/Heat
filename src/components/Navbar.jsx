import logo from "../assets/hero-logo.png";
import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import menuIcon from "../assets/icon/MenuIcon (2).svg";
import serachIcon from "../assets/icon/search.svg";
import userIcon from "../assets/icon/user.svg";
import aboutIcon from "../assets/icon/Frame.svg";
import callIcon from "../assets/icon/call.svg";
import mailIcon from "../assets/icon/Frame1.svg";
import cartIcon from "../assets/icon/cart.svg";
import profileIcon from "../assets/icon/profile.svg";
import homeIcon from "../assets/icon/home.svg";
import wishlistIcon from "../assets/icon/wishlist.svg";
import logoutIcon from "../assets/icon/logout.svg";
import busIcon from "../assets/icon/bus.svg";
import timeIcon from "../assets/icon/c-times.svg";
import api from "../api/axios";
import "../styles/Navbar.css";
// import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* =============================
     SEARCH PRODUCTS
  ============================== */

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      try {
        const { data } = await api.get(`/products?keyword=${searchTerm}`);
        setResults(data.products || data);
      } catch (error) {
        console.error(error);
      }
    };

    const debounce = setTimeout(fetchProducts, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img
            src={menuIcon}
            alt="menu"
            className="icon"
            onClick={() => setSidebarOpen(true)}
          />
          <img
            src={serachIcon}
            alt="search"
            className="icon"
            onClick={() => setSearchOpen(true)}
          />
        </div>

        <Link to="/" className="nav-logo">
          <img src={logo} alt="Brand Logo" />
        </Link>

        <div className="nav-right">
          {/* USER ICON */}
          <div className="icon-link">
            <img
              src={userIcon}
              alt="user"
              className="icon"
              onClick={() => {
                if (!user) {
                  navigate("/auth");
                } else {
                  setProfileOpen(!profileOpen);
                }
              }}
            />
          </div>

          {/* CART */}
          <div
            className="cart-wrapper"
            onClick={() => {
              if (location.pathname === "/checkout") {
                navigate("/cart");
              } else {
                setCartOpen(true);
              }
            }}
          >
            <img src={cartIcon} alt="cart" className="icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>

        {/* PROFILE MODAL */}
        {profileOpen && user && (
          <div className="profile-dropdown">
            <div className="profile-header">
              <span>{user.name}</span>
              <img
                src={timeIcon}
                alt="cancel"
                className="close-profile"
                onClick={() => setProfileOpen(false)}
              />
            </div>

            <Link to="/orders" onClick={() => setProfileOpen(false)}>
              <img src={busIcon} alt="order" style={{ color: "black" }} /> My
              Orders
            </Link>

            <Link to="/profile" onClick={() => setProfileOpen(false)}>
              <img src={profileIcon} alt="profile" style={{ color: "black" }} />{" "}
              My Profile
              {/* <FaUserCircle />  */}
            </Link>

            <Link to="/address" onClick={() => setProfileOpen(false)}>
              <img src={homeIcon} alt="home" style={{ color: "black" }} /> My
              Delivery Address
            </Link>

            <Link to="/wishlist" onClick={() => setProfileOpen(false)}>
              <img
                src={wishlistIcon}
                alt="wishlist"
                style={{ color: "black" }}
              />{" "}
              Wishlist
            </Link>

            <button onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" style={{ color: "black" }} />{" "}
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* OVERLAY */}
      {(searchOpen || sidebarOpen || profileOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setSearchOpen(false);
            setSidebarOpen(false);
            setProfileOpen(false);
          }}
        ></div>
      )}

      {/* SEARCH DROPDOWN */}
      {searchOpen && (
        <div className="search-dropdown">
          <div className="search-top">
            <div className="search-input-wrapper">
              <img src={serachIcon} alt="search" className="search-icon" />
              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <img
              src={timeIcon}
              className="close-icon"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
                setResults([]);
              }}
            />
          </div>

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

          {!searchTerm && (
            <div className="recent-search">
              <h4>POPULAR SEARCH</h4>
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
          <NavLink
            to="/wishlist"
            onClick={() => setSidebarOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img src={wishlistIcon} alt="" /> Wishlist
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setSidebarOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img src={aboutIcon} alt="" /> About Us
          </NavLink>

          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {" "}
            <img src={mailIcon} alt="" />
            Info.admin@heatonlykickcollectibles.com
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {" "}
            <img src={callIcon} alt="" />
            +27665394231
          </p>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
