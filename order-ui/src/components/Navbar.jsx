import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [loginHovered, setLoginHovered] = useState(false);

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? "#ffb703" : "#cbd5e1",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "15px",
      padding: "8px 16px",
      borderRadius: "30px",
      backgroundColor: isActive ? "rgba(255, 183, 3, 0.08)" : "transparent",
      transition: "all 0.2s ease"
    };
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#191919",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "16px 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
      }}
    >
      {/* Brand Logo (Matching Hero design) */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none"
        }}
      >
        <div style={{
          width: "32px",
          height: "32px",
          background: "#ffb703",
          borderRadius: "50% 50% 50% 0",
          transform: "rotate(-45deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ transform: "rotate(45deg)", fontSize: "14px" }}>🍋</span>
        </div>
        <div>
          <span style={{ fontSize: "16px", fontWeight: "300", fontFamily: "cursive", color: "#ffb703", display: "block", lineHeight: "1" }}>WAFFOR's</span>
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff", display: "block", lineHeight: "1", letterSpacing: "1px" }}>CHEF</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexWrap: "wrap"
        }}
      >
        <Link style={getLinkStyle("/")} to="/">
          Home
        </Link>

        <Link style={getLinkStyle("/place-order")} to="/place-order">
          Place Order
        </Link>

        <Link style={getLinkStyle("/track-order")} to="/track-order">
          Track Order
        </Link>

        <Link style={getLinkStyle("/dashboard")} to="/dashboard">
          Dashboard
        </Link>
      </div>

      {/* Login Button with Yellow Border */}
      <div>
        <Link
          to="/place-order"
          onMouseEnter={() => setLoginHovered(true)}
          onMouseLeave={() => setLoginHovered(false)}
          style={{
            border: "2px solid #ffb703",
            color: loginHovered ? "#191919" : "#ffb703",
            background: loginHovered ? "#ffb703" : "transparent",
            borderRadius: "30px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            boxShadow: loginHovered ? "0 4px 15px rgba(255, 183, 3, 0.3)" : "none",
            transform: loginHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.2s ease"
          }}
        >
          <span style={{ fontSize: "15px" }}>🔑</span> Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;