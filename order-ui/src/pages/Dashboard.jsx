import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllOrders } from "../services/orderService";

// Helper to generate a deterministic mock date (YYYY-MM-DD) based on Order ID
const getMockDate = (orderId) => {
  const date = new Date();
  // Distribute orders deterministically over the last 3 days
  const offsetDays = orderId % 3;
  date.setDate(date.getDate() - offsetDays);
  return date.toISOString().split("T")[0];
};

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cardHoveredIdx, setCardHoveredIdx] = useState(null);

  // Interactive controls state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("ID_DESC");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchDashboardData();
    // Poll the dashboard statistics every 5 seconds for real-time status updates
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
      setErrorMsg("");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setErrorMsg("Failed to fetch live database records.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Apply Filtering (Search + Status + Date)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.item.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    const orderMockDate = getMockDate(order.id);
    const matchesDate = !dateFilter || orderMockDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // 2. Apply Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortOption) {
      case "ID_ASC":
        return a.id - b.id;
      case "ID_DESC":
        return b.id - a.id;
      case "AMOUNT_ASC":
        return (a.amount || 0) - (b.amount || 0);
      case "AMOUNT_DESC":
        return (b.amount || 0) - (a.amount || 0);
      case "NAME_ASC":
        return a.customerName.localeCompare(b.customerName);
      case "NAME_DESC":
        return b.customerName.localeCompare(a.customerName);
      default:
        return b.id - a.id;
    }
  });

  // 3. Dynamic Metric Computations (Based on filtered results)
  const totalOrders = filteredOrders.length;
  const deliveredCount = filteredOrders.filter((o) => o.status === "DELIVERED").length;
  const preparingCount = filteredOrders.filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELLED").length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.status !== "CANCELLED" ? (o.amount || 0) : 0), 0);

  // Formatting revenue
  const formatRevenue = (value) => {
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  const getStatusBadgeStyle = (status) => {
    let bg = "rgba(160, 174, 192, 0.1)";
    let color = "#a0aec0";

    switch (status) {
      case "PLACED":
        bg = "rgba(14, 165, 233, 0.15)";
        color = "#38bdf8";
        break;
      case "PAYMENT_SUCCESS":
        bg = "rgba(168, 85, 247, 0.15)";
        color = "#c084fc";
        break;
      case "PREPARING":
        bg = "rgba(249, 115, 22, 0.15)";
        color = "#fb923c";
        break;
      case "DELIVERED":
        bg = "rgba(34, 197, 94, 0.15)";
        color = "#4ade80";
        break;
      case "OUT_FOR_DELIVERY":
        bg = "rgba(99, 102, 241, 0.15)";
        color = "#818cf8";
        break;
      case "CANCELLED":
        bg = "rgba(239, 68, 68, 0.15)";
        color = "#f87171";
        break;
    }

    return {
      backgroundColor: bg,
      color: color,
      padding: "6px 12px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: "700",
      display: "inline-block",
      textAlign: "center"
    };
  };

  const statCards = [
    { icon: "📦", label: "Total Orders", val: totalOrders, color: "#c084fc", bg: "rgba(168, 85, 247, 0.08)" },
    { icon: "🚚", label: "Delivered", val: deliveredCount, color: "#4ade80", bg: "rgba(74, 222, 128, 0.08)" },
    { icon: "👨‍🍳", label: "Active Orders", val: preparingCount, color: "#fb923c", bg: "rgba(251, 146, 60, 0.08)" },
    { icon: "💰", label: "Revenue", val: formatRevenue(totalRevenue), color: "#ffb703", bg: "rgba(255, 183, 3, 0.08)" }
  ];

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "40px 5%", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "900",
            fontSize: "clamp(32px, 5vw, 44px)",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #fff 0%, #ffb703 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          WAFFOR Live Dashboard
        </h1>
        <p style={{ textAlign: "center", color: "#a0aec0", marginBottom: "40px", fontSize: "16px" }}>
          Real-time metrics connected directly to MySQL database and ActiveMQ broker.
        </p>

        {errorMsg && (
          <div style={{
            background: "rgba(239, 68, 68, 0.08)",
            color: "#f87171",
            padding: "16px",
            borderRadius: "14px",
            marginBottom: "30px",
            textAlign: "center",
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          {statCards.map((card, idx) => {
            const isHovered = cardHoveredIdx === idx;
            return (
              <div
                key={card.label}
                onMouseEnter={() => setCardHoveredIdx(idx)}
                onMouseLeave={() => setCardHoveredIdx(null)}
                style={{
                  background: "#1e1e1e",
                  borderRadius: "24px",
                  padding: "30px",
                  boxShadow: isHovered ? "0 15px 35px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  textAlign: "center",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "30px"
                  }}
                >
                  {card.icon}
                </div>

                <h3 style={{ color: "#a0aec0", fontSize: "15px", fontWeight: "600", marginBottom: "5px" }}>
                  {card.label}
                </h3>

                <h1 style={{ color: card.color, fontSize: "36px", fontWeight: "800", margin: 0 }}>
                  {loading ? "..." : card.val}
                </h1>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE CONTROLS TOOLBAR */}
        <div style={{
          background: "#1e1e1e",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "24px",
          padding: "25px",
          marginBottom: "35px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Search bar */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              placeholder="🔍 Search orders (Customer / Item)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "#121212",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px 18px",
                color: "white",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>

          {/* Filtering dropdowns */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "13px", color: "#a0aec0", marginRight: "8px", fontWeight: "700" }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  background: "#121212",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="ALL">All Statuses</option>
                <option value="PLACED">Placed</option>
                <option value="PAYMENT_SUCCESS">Payment Confirmed</option>
                <option value="PREPARING">Preparing Food</option>
                <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: "13px", color: "#a0aec0", marginRight: "8px", fontWeight: "700" }}>Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                  background: "#121212",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="ID_DESC">Order ID (Newest)</option>
                <option value="ID_ASC">Order ID (Oldest)</option>
                <option value="AMOUNT_DESC">Amount (High to Low)</option>
                <option value="AMOUNT_ASC">Amount (Low to High)</option>
                <option value="NAME_ASC">Customer Name (A-Z)</option>
                <option value="NAME_DESC">Customer Name (Z-A)</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: "13px", color: "#a0aec0", marginRight: "8px", fontWeight: "700" }}>Calendar:</span>
              <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{
                    background: "#121212",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "12px 18px",
                    color: "white",
                    fontSize: "14px",
                    cursor: "pointer",
                    outline: "none"
                  }}
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    style={{
                      background: "rgba(239, 68, 68, 0.15)",
                      color: "#ef4444",
                      border: "none",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontSize: "13px"
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table & Details Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr",
            gap: "35px",
            alignItems: "start"
          }}
        >
          {/* Live Activity Table */}
          <div
            style={{
              background: "#1e1e1e",
              padding: "35px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#fff", marginBottom: "20px", textAlign: "left" }}>
              🔥 Live Order Queue
            </h2>
            <hr style={{ border: 0, borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginBottom: "25px" }} />

            {loading ? (
              <p style={{ color: "#a0aec0", textAlign: "center" }}>Loading orders...</p>
            ) : sortedOrders.length === 0 ? (
              <p style={{ color: "#a0aec0", textAlign: "center", padding: "20px 0" }}>
                No matching orders found. Place a new order to populate!
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.05)" }}>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>ID</th>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>Customer</th>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>Item Description</th>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>Date</th>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>Amount</th>
                      <th style={{ textAlign: "center", padding: "12px 16px", color: "#a0aec0", fontWeight: "700", fontSize: "14px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                        <td style={{ padding: "16px", fontWeight: "800", color: "#ffb703" }}>#{order.id}</td>
                        <td style={{ padding: "16px", fontWeight: "700", color: "#fff", textAlign: "left" }}>{order.customerName}</td>
                        <td style={{ padding: "16px", color: "#e2e8f0", textAlign: "left" }}>{order.item}</td>
                        <td style={{ padding: "16px", color: "#a0aec0", textAlign: "left", fontSize: "13px" }}>{getMockDate(order.id)}</td>
                        <td style={{ padding: "16px", fontWeight: "700", color: "#fff" }}>₹{order.amount}</td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <span style={getStatusBadgeStyle(order.status)}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Info Sidebar */}
          <div
            style={{
              background: "#1e1e1e",
              padding: "35px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textAlign: "left"
            }}
          >
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#fff", marginBottom: "20px" }}>
              ⚙️ Architecture
            </h2>
            <hr style={{ border: 0, borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginBottom: "25px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "25px", fontSize: "14px", color: "#a0aec0" }}>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "15px", marginBottom: "5px" }}>Order Orchestrator</strong>
                <span>Camunda BPMN engine automates microservice calls.</span>
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "15px", marginBottom: "5px" }}>Broker Queue</strong>
                <span>ActiveMQ JMS notifies subscriber components on creation.</span>
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "15px", marginBottom: "5px" }}>Data Store</strong>
                <span>Isolated MySQL schemas per microservice unit.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;