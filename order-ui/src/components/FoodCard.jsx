import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FoodCard({ name, price }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        width: "100%",
        maxWidth: "320px",
        padding: "35px 25px",
        borderRadius: "24px",
        boxShadow: hovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.08)" 
          : "0 4px 20px rgba(0, 0, 0, 0.02)",
        border: "1px solid rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        margin: "auto",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px"
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 95, 64, 0.08) 0%, rgba(255, 42, 109, 0.08) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "45px",
          marginBottom: "10px"
        }}
      >
        {name.split(" ").slice(-1)[0]}
      </div>

      <h2 style={{
        fontSize: "22px",
        fontWeight: "700",
        color: "#1e293b",
        margin: 0
      }}>
        {name.split(" ").slice(0, -1).join(" ")}
      </h2>

      <h3 style={{
        fontSize: "20px",
        color: "#64748b",
        fontWeight: "500",
        margin: 0
      }}>
        ₹{price}
      </h3>

      <button
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={() => navigate("/place-order")}
        style={{
          background: btnHovered 
            ? "linear-gradient(135deg, #ff4520 0%, #e61053 100%)" 
            : "linear-gradient(135deg, #ff5f40 0%, #ff2a6d 100%)",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "14px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          width: "100%",
          boxShadow: btnHovered ? "0 8px 20px rgba(255, 95, 64, 0.25)" : "none",
          transform: btnHovered ? "scale(1.02)" : "scale(1)",
          transition: "all 0.2s ease"
        }}
      >
        Order Now
      </button>
    </div>
  );
}

export default FoodCard;