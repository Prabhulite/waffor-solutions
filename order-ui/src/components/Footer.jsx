function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        textAlign: "center",
        padding: "40px 20px",
        marginTop: "80px",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{
          color: "#fff",
          marginBottom: "10px",
          fontWeight: "700"
        }}>
          🍽 WAFFOR's Kitchen
        </h2>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          Premium food processing & real-time order delivery orchestration systems.
        </p>
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          paddingTop: "20px",
          fontSize: "14px"
        }}>
          © 2026 WAFFOR's Kitchen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;