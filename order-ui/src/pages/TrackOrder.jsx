import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrderById, approvePendingPayment, getAllOrders } from "../services/orderService";

function TrackOrder() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchRecentOrders();
  }, [order]); // Refetch recent orders when order status changes

  const fetchRecentOrders = async () => {
    try {
      const res = await getAllOrders();
      // Keep the 5 most recent orders
      const sorted = res.data.sort((a, b) => b.id - a.id).slice(0, 5);
      setRecentOrders(sorted);
    } catch (e) {
      console.error("Could not fetch recent orders:", e);
    }
  };

  const handleApprovePayment = async () => {
    if (!order) return;
    setIsApproving(true);
    try {
      await approvePendingPayment(order.id);
      await fetchAndTrackOrder(order.id);
    } catch (err) {
      console.error("Failed to approve payment: ", err);
    } finally {
      setIsApproving(false);
    }
  };

  const fetchAndTrackOrder = async (orderId) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      setOrder(null);
      setErrorMsg("Order not found. Please double check the ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const trackOrder = (e) => {
    if (e) e.preventDefault();
    if (!id) return;
    fetchAndTrackOrder(id);
  };

  // Automatically track if orderId is in query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdParam = params.get("orderId");
    if (orderIdParam) {
      setId(orderIdParam);
      fetchAndTrackOrder(orderIdParam);
    }
  }, [location.search]);

  // Derive the steps list dynamically
  const getStatusSteps = () => {
    const isPending = order && order.item && (order.item.includes("PENDING") || order.item.includes("(PENDING)"));
    return [
      { key: "PLACED", label: "Order Placed", desc: "Your order has been recorded" },
      { key: "PAYMENT_SUCCESS", label: "Payment Confirmed", desc: isPending ? "Cash on Delivery payment pending" : "Transaction completed successfully" },
      { key: "PREPARING", label: "Preparing Food", desc: "The kitchen is cooking your meal" },
      { key: "DELIVERED", label: "Delivered", desc: "Your meal has arrived!" }
    ];
  };

  const stepsList = getStatusSteps();

  // Find the index of the current status to know which steps are completed
  const getCurrentStepIndex = (steps) => {
    if (!order) return -1;
    // Map intermediate backend statuses to our step list keys
    let currentKey = order.status;
    if (currentKey === "OUT_FOR_DELIVERY") {
      currentKey = "PREPARING"; // Keep preparing highlighted, or count it as active
    }
    return steps.findIndex(step => step.key === currentKey);
  };

  const currentStepIndex = getCurrentStepIndex(stepsList);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#121212", color: "#fff" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "50px 5%", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        
        {/* Track Form */}
        <form 
          onSubmit={trackOrder} 
          style={{ 
            width: "100%", 
            background: "#1e1e1e", 
            padding: "35px", 
            borderRadius: "24px", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)", 
            border: "1px solid rgba(255, 255, 255, 0.05)",
            marginBottom: "30px"
          }}
        >
          <h1 style={{
            fontSize: "32px",
            fontWeight: "900",
            background: "linear-gradient(135deg, #fff 0%, #ffb703 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            textAlign: "center"
          }}>
            Track Order
          </h1>
          <p style={{ color: "#a0aec0", textAlign: "center", marginBottom: "30px", fontSize: "15px" }}>
            Enter your Order ID to track status in real-time.
          </p>

          {errorMsg && (
            <div style={{
              background: "rgba(239, 68, 68, 0.08)",
              color: "#f87171",
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "14px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              textAlign: "center"
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <input
              type="number"
              placeholder="Enter Order ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ 
                flex: 1,
                background: "#121212",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px 18px",
                color: "white",
                fontSize: "16px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: "linear-gradient(135deg, #ffb703 0%, #ff8f00 100%)",
                color: "black",
                border: "none",
                padding: "0 30px",
                borderRadius: "14px",
                fontWeight: "700",
                fontSize: "16px",
                boxShadow: "0 8px 20px rgba(255, 183, 3, 0.15)",
                cursor: "pointer"
              }}
            >
              {isLoading ? "..." : "Track"}
            </button>
          </div>

          {/* Recent Orders Tabs (Interactive Quick Select) */}
          {recentOrders.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", color: "#a0aec0", fontWeight: "600" }}>Recent:</span>
              {recentOrders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setId(o.id.toString());
                    fetchAndTrackOrder(o.id);
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "6px 12px",
                    color: o.id.toString() === id ? "#ffb703" : "#fff",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.2s"
                  }}
                >
                  #{o.id} ({o.customerName})
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Visual Timeline Details */}
        {order && (
          <div
            style={{
              width: "100%",
              background: "#1e1e1e",
              padding: "35px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              animation: "fadeIn 0.5s ease"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <div>
                <span style={{ fontSize: "13px", color: "#a0aec0", fontWeight: "700" }}>ORDER # {order.id}</span>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#fff", marginTop: "2px" }}>
                  {order.item}
                </h3>
              </div>
              <span style={{
                background: "linear-gradient(135deg, rgba(255, 183, 3, 0.1) 0%, rgba(255, 143, 0, 0.1) 100%)",
                color: "#ffb703",
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                border: "1px solid rgba(255, 183, 3, 0.2)"
              }}>
                ₹{order.amount}
              </span>
            </div>

            {/* Action Card: Approve pending COD payment */}
            {order.item && (order.item.includes("PENDING") || order.item.includes("(PENDING)")) && order.status === "PLACED" && (
              <div style={{
                background: "rgba(255, 183, 3, 0.04)",
                border: "1px dashed rgba(255, 183, 3, 0.3)",
                borderRadius: "20px",
                padding: "25px",
                textAlign: "center",
                marginBottom: "30px",
                animation: "fadeIn 0.5s ease"
              }}>
                <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>💵</span>
                <h4 style={{ fontSize: "18px", fontWeight: "800", color: "#ffb703", margin: "0 0 8px" }}>
                  Cash Payment Required
                </h4>
                <p style={{ fontSize: "14px", color: "#a0aec0", margin: "0 0 20px", lineHeight: "1.5" }}>
                  This order was placed as Cash on Delivery. To start kitchen preparation, confirm that the payment is authorized.
                </p>
                <button
                  onClick={handleApprovePayment}
                  disabled={isApproving}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "14px 28px",
                    borderRadius: "14px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: isApproving ? "not-allowed" : "pointer",
                    boxShadow: "0 6px 20px rgba(16, 185, 129, 0.2)",
                    width: "100%"
                  }}
                >
                  {isApproving ? "Confirming..." : "Confirm & Approve Payment"}
                </button>
              </div>
            )}

            {/* Stepper Timeline */}
            {order.status === "CANCELLED" ? (
              <div style={{
                background: "rgba(239, 68, 68, 0.05)",
                color: "#f87171",
                padding: "35px 25px",
                borderRadius: "20px",
                textAlign: "center",
                border: "1px solid rgba(239, 68, 68, 0.15)",
                marginTop: "10px"
              }}>
                <span style={{ fontSize: "55px", display: "block", marginBottom: "15px" }}>❌</span>
                <h3 style={{ fontSize: "24px", fontWeight: "900", color: "#fff", margin: "0 0 10px" }}>
                  Order Cancelled
                </h3>
                <p style={{ fontSize: "15px", color: "#a0aec0", margin: 0, lineHeight: "1.6" }}>
                  This order was automatically cancelled because payment processing failed.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", position: "relative", gap: "30px" }}>
                {/* Stepper Line */}
                <div style={{
                  position: "absolute",
                  left: "17px",
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  zIndex: 1
                }} />

                {/* Progress Stepper Line */}
                {currentStepIndex > 0 && (
                  <div style={{
                    position: "absolute",
                    left: "17px",
                    top: "10px",
                    height: `${(currentStepIndex / (stepsList.length - 1)) * 88}%`,
                    width: "2px",
                    background: "linear-gradient(to bottom, #22c55e, #ffb703)",
                    zIndex: 2,
                    transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  }} />
                )}

                {/* Steps */}
                {stepsList.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.key} style={{ display: "flex", gap: "20px", zIndex: 3, position: "relative" }}>
                      {/* Circle Indicator */}
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: isCompleted ? "#22c55e" : "#121212",
                        border: isCompleted ? "none" : "2px solid rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isCompleted ? "#fff" : "#a0aec0",
                        fontWeight: "800",
                        fontSize: "14px",
                        boxShadow: isCurrent ? "0 0 0 5px rgba(34, 197, 94, 0.2)" : "none",
                        transition: "all 0.3s ease"
                      }}>
                        {isCompleted ? "✓" : idx + 1}
                      </div>

                      {/* Step details */}
                      <div>
                        <h4 style={{
                          fontSize: "17px",
                          fontWeight: "800",
                          color: isCompleted ? "#fff" : "#718096",
                          margin: 0
                        }}>
                          {step.label}
                        </h4>
                        <p style={{
                          fontSize: "13px",
                          color: isCompleted ? "#a0aec0" : "#4a5568",
                          margin: "2px 0 0"
                        }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* LIVE RIDER ROUTING MAP ANIMATION (Interactivity Showcase!) */}
                {(order.status === "OUT_FOR_DELIVERY" || order.status === "DELIVERED") && (
                  <div style={{
                    marginTop: "20px",
                    background: "#121212",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "20px",
                    padding: "20px",
                    animation: "fadeIn 0.5s ease"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffb703" }}>
                        🛵 GPS Live Driver Routing
                      </span>
                      <span style={{ fontSize: "12px", color: "#a0aec0" }}>
                        {order.status === "DELIVERED" ? "Driver Arrived" : "ETA: 12 Mins"}
                      </span>
                    </div>

                    <div style={{ position: "relative", height: "80px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                      {/* Animated path line */}
                      <div style={{
                        position: "absolute",
                        left: "30px",
                        right: "30px",
                        height: "4px",
                        background: "rgba(255, 255, 255, 0.08)",
                        borderRadius: "2px"
                      }} />

                      {/* Dotted travel path */}
                      <div style={{
                        position: "absolute",
                        left: "30px",
                        right: "30px",
                        height: "4px",
                        borderTop: "4px dotted #ffb703",
                        opacity: order.status === "DELIVERED" ? 0.3 : 1
                      }} />

                      {/* Restaurant Location */}
                      <div style={{ position: "absolute", left: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontSize: "20px" }}>🍳</span>
                        <span style={{ fontSize: "10px", color: "#a0aec0", fontWeight: "700", marginTop: "4px" }}>Chef</span>
                      </div>

                      {/* Home Location */}
                      <div style={{ position: "absolute", right: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontSize: "20px" }}>🏡</span>
                        <span style={{ fontSize: "10px", color: "#a0aec0", fontWeight: "700", marginTop: "4px" }}>Home</span>
                      </div>

                      {/* Delivery Driver Icon */}
                      <div style={{
                        position: "absolute",
                        left: order.status === "DELIVERED" ? "calc(100% - 45px)" : "30px",
                        animation: order.status === "DELIVERED" ? "none" : "driveRider 8s infinite linear",
                        fontSize: "24px",
                        marginTop: "-15px"
                      }}>
                        🛵
                      </div>
                    </div>

                    {/* Inline Animation Style declaration */}
                    <style>{`
                      @keyframes driveRider {
                        0% { left: 40px; }
                        100% { left: calc(100% - 80px); }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default TrackOrder;