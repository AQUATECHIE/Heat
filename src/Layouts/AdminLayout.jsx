import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/hero-logo.png";
import "../styles/AdminLayout.css";
import {
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaChartLine,
} from "react-icons/fa";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
  className={`admin-sidebar 
  ${collapsed ? "collapsed" : ""} 
  ${mobileOpen ? "mobile-open" : ""}`}
>
  <div className="admin-logo">
    <img src={logo} alt="logo" />
  </div>

  <nav className="admin-nav">
    <NavLink to="/admin" end>
      <FaTachometerAlt />
      {!collapsed && <span>Dashboard</span>}
      {collapsed && <div className="tooltip">Dashboard</div>}
    </NavLink>

    <NavLink to="/admin/orders">
      <FaShoppingCart />
      {!collapsed && <span>Orders</span>}
      {collapsed && <div className="tooltip">Orders</div>}
    </NavLink>

    <NavLink to="/admin/users">
      <FaUsers />
      {!collapsed && <span>Users</span>}
      {collapsed && <div className="tooltip">Users</div>}
    </NavLink>

    <NavLink to="/admin/products">
      <FaBox />
      {!collapsed && <span>Products</span>}
      {collapsed && <div className="tooltip">Products</div>}
    </NavLink>

    <NavLink to="/admin/analytics">
      <FaChartLine />
      {!collapsed && <span>Analytics</span>}
      {collapsed && <div className="tooltip">Analytics</div>}
    </NavLink>
  </nav>
</aside>

      {/* MAIN AREA */}
      <div className="admin-main">
        {/* TOPBAR */}
        <div className="admin-topbar">
          <div className="left-controls">
            <FaBars
              className="toggle-btn"
              onClick={() => setCollapsed(!collapsed)}
            />

            <FaBars
              className="mobile-toggle"
              onClick={() => setMobileOpen(true)}
            />
          </div>

          <div className="admin-profile">
            <FaUserCircle
              size={24}
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className="admin-dropdown">
                <p>{user?.name}</p>
                <p>{user?.email}</p>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;