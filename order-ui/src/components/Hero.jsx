import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [courierHovered, setCourierHovered] = useState(false);
  const [pizzaHovered, setPizzaHovered] = useState(false);
  const [waffleHovered, setWaffleHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#191919",
        color: "white",
        padding: "80px 5%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "550px"
      }}
    >
      {/* Background Decorative Blurs */}
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "rgba(255, 183, 3, 0.08)",
        borderRadius: "50%",
        filter: "blur(100px)",
        top: "-100px",
        left: "-100px",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "rgba(255, 95, 64, 0.06)",
        borderRadius: "50%",
        filter: "blur(100px)",
        bottom: "-100px",
        right: "-100px",
        pointerEvents: "none"
      }} />

      {/* Main Grid Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "50px",
          alignItems: "center",
          zIndex: 10
        }}
      >
        {/* Left Column: Text & Actions */}
        <div style={{ textAlign: "left" }}>
          {/* Logo Badge (Like Village Chef logo but for WAFFOR) */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "35px" }}>
            <div style={{
              width: "45px",
              height: "45px",
              background: "#ffb703",
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ transform: "rotate(45deg)", fontSize: "20px" }}>🍋</span>
            </div>
            <div>
              <span style={{ fontSize: "24px", fontWeight: "300", fontFamily: "cursive", color: "#ffb703", display: "block", lineHeight: "1" }}>WAFFOR's</span>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#fff", display: "block", lineHeight: "1", letterSpacing: "1px" }}>CHEF</span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 5.5vw, 64px)",
              fontWeight: "800",
              lineHeight: "1.1",
              letterSpacing: "-1.5px",
              marginBottom: "20px"
            }}
          >
            Grab Big Deals On <br />
            <span style={{ color: "#ffb703" }}>Yummy Meals!</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#a0aec0",
              marginBottom: "35px",
              maxWidth: "480px",
              lineHeight: "1.6"
            }}
          >
            Experience instant food order processing orchestrated dynamically by Camunda workflows, dispatched instantly with ActiveMQ, and tracked in real-time.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "25px", marginBottom: "40px" }}>
            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={() => {
                const element = document.getElementById("menu-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                background: btnHovered ? "#ffc333" : "#ffb703",
                color: "#121212",
                padding: "16px 36px",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "700",
                transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: btnHovered ? "0 10px 25px rgba(255, 183, 3, 0.3)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              Get Started
            </button>

            {/* Happy Customer Avatars */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex" }}>
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80"
                ].map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt="Customer Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "3px solid #191919",
                      marginLeft: i > 0 ? "-12px" : "0",
                      objectFit: "cover"
                    }}
                  />
                ))}
              </div>
              <div>
                <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#fff" }}>
                  ★ 4.8
                </span>
                <span style={{ display: "block", fontSize: "11px", color: "#718096" }}>
                  (18.5k reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skillet Image & Floating Elements */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "450px"
          }}
        >
          {/* Main Roasted Chicken Skillet Image */}
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "50%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              overflow: "hidden",
              border: "5px solid rgba(255,255,255,0.05)"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80"
              alt="Roasted Chicken Skillet"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover"
              }}
            />
          </div>

          {/* Floating Emoji 😋 */}
          <div style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            background: "#1f1f1f",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
          }}>
            😋
          </div>

          {/* Floating Emoji 🔥 */}
          <div style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            background: "#1f1f1f",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
          }}>
            🔥
          </div>

          {/* Floating Card: Courier Info */}
          <div
            onMouseEnter={() => setCourierHovered(true)}
            onMouseLeave={() => setCourierHovered(false)}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "-10px",
              background: "rgba(25, 25, 25, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50px",
              padding: "10px 20px 10px 10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              transform: courierHovered ? "scale(1.05) translateY(-3px)" : "scale(1) translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="Courier Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#fff" }}>
                Jon Williamson
              </span>
              <span style={{ display: "block", fontSize: "11px", color: "#a0aec0" }}>
                Food Courier
              </span>
            </div>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#ffb703",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              marginLeft: "10px"
            }}>
              📞
            </div>
          </div>

          {/* Floating Card: Product Card (Belgian Waffles) */}
          <div
            onMouseEnter={() => setWaffleHovered(true)}
            onMouseLeave={() => setWaffleHovered(false)}
            style={{
              position: "absolute",
              top: "5%",
              right: "-30px",
              background: "rgba(25, 25, 25, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              transform: waffleHovered ? "scale(1.05) translateY(-3px)" : "scale(1) translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 100
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=150&q=80"
              alt="Belgian Waffle Thumbnail"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#fff" }}>
                Choco Waffle
              </span>
              <span style={{ display: "block", fontSize: "11px", color: "#ffb703" }}>
                ★★★★★
              </span>
              <span style={{ display: "block", fontSize: "13px", color: "#fff", fontWeight: "700", marginTop: "2px" }}>
                ₹179/-
              </span>
            </div>
          </div>

          {/* Floating Card: Product Card (Cheese Pizza) */}
          <div
            onMouseEnter={() => setPizzaHovered(true)}
            onMouseLeave={() => setPizzaHovered(false)}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "-10px",
              background: "rgba(25, 25, 25, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              transform: pizzaHovered ? "scale(1.05) translateY(-3px)" : "scale(1) translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80"
              alt="Cheese Pizza Thumbnail"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#fff" }}>
                Cheese Pizza
              </span>
              <span style={{ display: "block", fontSize: "11px", color: "#ffb703" }}>
                ★★★★★
              </span>
              <span style={{ display: "block", fontSize: "13px", color: "#fff", fontWeight: "700", marginTop: "2px" }}>
                ₹299/-
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;