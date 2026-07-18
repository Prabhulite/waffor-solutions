import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Food Items reference for matching local storage IDs
const FOOD_ITEMS = [
  { id: 1, name: "Margherita Pizza 🍕", price: 249, rating: 4.6, desc: "Classic cheese pizza topped with mozzarella and fresh basil leaves.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=350&q=80" },
  { id: 2, name: "Pepperoni Pizza 🍕", price: 349, rating: 4.8, desc: "Double pepperoni with extra mozzarella cheese.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=350&q=80" },
  { id: 3, name: "Veggie Supreme Pizza 🍕", price: 299, rating: 4.5, desc: "Olives, bell peppers, onions, tomatoes, and mushrooms.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=350&q=80" },
  { id: 4, name: "Classic Cheese Burger 🍔", price: 149, rating: 4.4, desc: "Smashed beef patty, melted cheddar, lettuce, pickles, and chef sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=350&q=80" },
  { id: 5, name: "Spicy Chicken Burger 🍔", price: 199, rating: 4.6, desc: "Crispy chicken breast, jalapenos, and spicy mayo.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=350&q=80" },
  { id: 6, name: "Double Patty Burger 🍔", price: 249, rating: 4.7, desc: "Double patty, double cheese, caramelized onions.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=350&q=80" },
  { id: 7, name: "Classic Maple Waffle 🧇", price: 129, rating: 4.5, desc: "Fresh golden waffle served with organic maple syrup and whipped cream.", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=350&q=80" },
  { id: 8, name: "Chocolate Loaded Waffle 🧇", price: 179, rating: 4.8, desc: "Waffle smothered in milk & white Belgian chocolate chips.", image: "https://images.unsplash.com/photo-1598214886806-c87b80b709be?auto=format&fit=crop&w=350&q=80" },
  { id: 9, name: "Alfredo Penne Pasta 🍝", price: 229, rating: 4.4, desc: "Creamy white Alfredo sauce pasta loaded with mushrooms and herbs.", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=350&q=80" },
  { id: 10, name: "Arrabiata Red Pasta 🍝", price: 209, rating: 4.3, desc: "Spicy tomato sauce pasta with garlic and red chili flakes.", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=350&q=80" },
  { id: 11, name: "Salted French Fries 🍟", price: 99, rating: 4.2, desc: "Golden salted crispy French fries.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=350&q=80" },
  { id: 12, name: "Peri Peri Fries 🍟", price: 119, rating: 4.5, desc: "Fries tossed in spicy African peri-peri seasoning.", image: "https://images.unsplash.com/photo-1600957139142-f22744f51481?auto=format&fit=crop&w=350&q=80" },
  { id: 13, name: "Oreo Milkshake 🥤", price: 139, rating: 4.7, desc: "Thick creamy shake blended with Oreo cookies.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=350&q=80" },
  { id: 14, name: "Iced Cold Coffee ☕", price: 119, rating: 4.4, desc: "Chilled sweetened espresso milk blend.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=350&q=80" },
  { id: 15, name: "Lemon Mint Mojito 🍹", price: 99, rating: 4.6, desc: "Cooling muddled mint, fresh lime juice, and soda.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=350&q=80" },
  { id: 16, name: "Chocolate Brownie 🍫", price: 149, rating: 4.7, desc: "Fudgy warm chocolate brownie cake slice.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=350&q=80" },
  { id: 17, name: "Veg Club Sandwich 🥪", price: 139, rating: 4.3, desc: "Double-decker toasted sandwich with cheese, veggies, and green chutney.", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=350&q=80" },
  { id: 18, name: "Chicken Dum Biryani 🍗", price: 249, rating: 4.9, desc: "Long-grain basmati rice cooked with spiced marinated chicken in layers.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=350&q=80" },
  { id: 19, name: "Hakka Veg Noodles 🍜", price: 159, rating: 4.5, desc: "Stir-fried noodles with crisp fresh vegetables and Chinese seasonings.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=350&q=80" },
  { id: 20, name: "Classic Caesar Salad 🥗", price: 149, rating: 4.4, desc: "Romaine lettuce, parmesan cheese, crunchy croutons, and Caesar dressing.", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=350&q=80" }
];

function PlaceOrder() {
  const [cart, setCart] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalStage, setModalStage] = useState("FIELDS"); // "FIELDS" -> "PAYMENT" -> "SUCCESS"
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // "UPI", "CARD", "COD", "NET"
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    const saved = localStorage.getItem("waffor_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart local storage", e);
      }
    }
  }, []);

  const updateQuantity = (itemId, change) => {
    setCart((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = currentQty + change;
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = newQty;
      }
      localStorage.setItem("waffor_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartItems = Object.entries(cart).map(([itemId, qty]) => {
    const item = FOOD_ITEMS.find((f) => f.id === parseInt(itemId));
    return item ? { ...item, quantity: qty } : null;
  }).filter(Boolean);

  const itemsTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = itemsTotal > 0 ? 30 : 0;
  const platformFee = itemsTotal > 0 ? 5 : 0;
  const gstTaxes = itemsTotal > 0 ? Math.round(itemsTotal * 0.05) : 0;
  const grandTotal = itemsTotal + deliveryFee + platformFee + gstTaxes;

  const handleDetailsConfirm = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim() || !deliveryAddress.trim()) {
      setErrorMsg("Please fill in Name, Phone, and Address fields.");
      return;
    }
    setErrorMsg("");
    setModalStage("PAYMENT");
  };

  const generateInvoicePDF = (orderId, name, phone, address, items, total) => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Top colored bar
      doc.setFillColor(25, 25, 25);
      doc.rect(0, 0, 210, 45, "F");

      // Brand Title
      doc.setTextColor(255, 183, 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("WAFFOR'S CHEF", 20, 28);

      doc.setTextColor(200, 200, 200);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Order Orchestration & Automation Invoice", 20, 36);

      // Reset text color for billing details
      doc.setTextColor(50, 50, 50);

      // Section: Invoice Info
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE SUMMARY", 20, 60);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Order ID: #${orderId}`, 20, 70);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 78);
      doc.text(`Status: Paid (Simulated)`, 20, 86);

      // Section: Customer Info
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("DELIVER TO", 110, 60);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Name: ${name}`, 110, 70);
      doc.text(`Phone: +91 ${phone}`, 110, 78);
      const splitAddress = doc.splitTextToSize(`Address: ${address}`, 80);
      doc.text(splitAddress, 110, 86);

      // Divider line
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(20, 105, 190, 105);

      // Table Headers
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Item Description", 20, 115);
      doc.text("Qty", 120, 115);
      doc.text("Price", 145, 115);
      doc.text("Total", 172, 115);

      // Divider line
      doc.line(20, 120, 190, 120);

      // Table Content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      let currentY = 130;

      items.forEach((item) => {
        const cleanName = item.name.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
        doc.text(cleanName, 20, currentY);
        doc.text(String(item.quantity), 122, currentY);
        doc.text(`Rs. ${item.price}`, 145, currentY);
        doc.text(`Rs. ${item.price * item.quantity}`, 172, currentY);
        currentY += 10;
      });

      doc.line(20, currentY, 190, currentY);
      currentY += 12;

      // Price breakdown
      const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const tax = Math.round(subtotal * 0.05);

      doc.setFont("helvetica", "normal");
      doc.text("Subtotal:", 125, currentY);
      doc.text(`Rs. ${subtotal}`, 172, currentY);
      currentY += 8;

      doc.text("Delivery Fee:", 125, currentY);
      doc.text("Rs. 30", 172, currentY);
      currentY += 8;

      doc.text("Platform Fee:", 125, currentY);
      doc.text("Rs. 5", 172, currentY);
      currentY += 8;

      doc.text("GST & Taxes (5%):", 125, currentY);
      doc.text(`Rs. ${tax}`, 172, currentY);
      currentY += 10;

      doc.line(120, currentY - 5, 190, currentY - 5);

      // Grand Total
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Grand Total:", 125, currentY);
      doc.text(`Rs. ${total}`, 172, currentY);

      // Footer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("Thank you for ordering with WAFFOR's Chef! Your food is being prepared.", 20, 270);

      doc.save(`Invoice_WafforChef_${orderId}.pdf`);
    } catch (pdfErr) {
      console.error("PDF generation error: ", pdfErr);
    }
  };

  const handleCopyOrderId = () => {
    if (createdOrderId) {
      navigator.clipboard.writeText(String(createdOrderId));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const executeOrderCreation = async (paymentOutcome = "SUCCESS") => {
    setIsSubmitting(true);
    setErrorMsg("");

    // Concatenate cart contents into a single string for backend compat
    let itemsDescription = cartItems.map(item => `${item.quantity}x ${item.name.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim()}`).join(", ");
    
    // Append COD/PENDING flags
    if (paymentOutcome === "SUCCESS") {
      itemsDescription += " (COD)";
    } else if (paymentOutcome === "PENDING") {
      itemsDescription += " (COD) (PENDING)";
    }

    // Keep the original total price for all order outcomes
    let orderCost = grandTotal;

    const currentCartItems = [...cartItems];

    try {
      const apiEndpoint = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/orders";
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName,
          item: itemsDescription,
          amount: orderCost
        })
      });

      if (!response.ok) {
        throw new Error("Order creation failed on backend");
      }

      const orderData = await response.json();
      setCreatedOrderId(orderData.id);
      
      // Clear cart
      localStorage.removeItem("waffor_cart");
      setCart({});

      setModalStage("SUCCESS");

      // Auto-trigger confirmation dialogue box to download the PDF invoice
      setTimeout(() => {
        const confirmDownload = window.confirm(`Order #${orderData.id} placed successfully!\n\nWould you like to download your official PDF Invoice?`);
        if (confirmDownload) {
          generateInvoicePDF(orderData.id, customerName, phoneNumber, deliveryAddress, currentCartItems, grandTotal);
        }
      }, 600);

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to place order. Make sure ActiveMQ is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "50px 5%", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "30px", textAlign: "left" }}>
          Secure Checkout
        </h2>

        {cartItems.length === 0 && modalStage !== "SUCCESS" ? (
          <div style={{
            background: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "24px",
            padding: "60px 20px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <span style={{ fontSize: "60px" }}>🛒</span>
            <h3 style={{ fontSize: "22px", fontWeight: "700", marginTop: "20px" }}>
              Your Cart is Empty
            </h3>
            <p style={{ color: "#a0aec0", margin: "10px 0 30px" }}>
              Add items from the menu to place an order.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "#ffb703",
                color: "#121212",
                border: "none",
                padding: "12px 30px",
                borderRadius: "30px",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "flex-start"
          }}>
            {/* Left: Cart Items List */}
            <div style={{
              background: "#1e1e1e",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "24px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", textAlign: "left" }}>
                Items in Cart
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", justifySpaceBetween: "space-between", gap: "15px", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={item.image} alt={item.name} style={{ width: "55px", height: "55px", borderRadius: "10px", objectFit: "cover" }} />
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "15px", fontWeight: "700", margin: 0 }}>{item.name}</h4>
                        <span style={{ fontSize: "13px", color: "#a0aec0" }}>₹{item.price} each</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ background: "transparent", color: "#ffb703", border: "1px solid #ffb703", borderRadius: "50%", width: "24px", height: "24px", fontWeight: "800", cursor: "pointer" }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: "700", color: "#fff", width: "15px", textAlign: "center" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ background: "transparent", color: "#ffb703", border: "1px solid #ffb703", borderRadius: "50%", width: "24px", height: "24px", fontWeight: "800", cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontWeight: "800", minWidth: "55px", textAlign: "right" }}>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bill details card */}
            <div style={{
              background: "#1e1e1e",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "24px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              textAlign: "left"
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>
                Bill Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a0aec0" }}>
                  <span>Item Total</span>
                  <span>₹{itemsTotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a0aec0" }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a0aec0" }}>
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a0aec0" }}>
                  <span>GST & Restaurant Taxes (5%)</span>
                  <span>₹{gstTaxes}</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#ffb703",
                  borderTop: "1px dashed rgba(255,255,255,0.1)",
                  paddingTop: "12px",
                  marginTop: "8px"
                }}>
                  <span>To Pay</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setErrorMsg("");
                  setModalStage("FIELDS");
                  setShowModal(true);
                }}
                style={{
                  width: "100%",
                  background: "#10b981",
                  border: "2px solid #10b981",
                  color: "white",
                  padding: "16px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "800",
                  marginTop: "25px",
                  boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)"
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* POPUP MODAL WINDOW OVERLAY */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000
        }}>
          <div style={{
            background: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "28px",
            padding: "35px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            position: "relative"
          }}>
            
            {modalStage !== "SUCCESS" && (
              <button
                onClick={() => setShowModal(false)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", color: "#cbd5e1", border: "none", fontSize: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            )}

            {/* STAGE 1: Delivery Details Form */}
            {modalStage === "FIELDS" && (
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "20px", color: "#fff" }}>
                  Delivery Details
                </h3>

                <form onSubmit={handleDetailsConfirm}>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#a0aec0", display: "block", marginBottom: "8px" }}>
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      style={{ width: "100%", background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "white", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#a0aec0", display: "block", marginBottom: "8px" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      style={{ width: "100%", background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "white", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#a0aec0", display: "block", marginBottom: "8px" }}>
                      Delivery Address
                    </label>
                    <textarea
                      placeholder="Enter full shipping address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                      rows={3}
                      style={{ width: "100%", background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "white", fontSize: "14px", resize: "none", fontFamily: "inherit" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: "#ffb703",
                      border: "2px solid #ffb703",
                      color: "#121212",
                      padding: "16px",
                      borderRadius: "30px",
                      fontWeight: "800",
                      fontSize: "15px",
                      cursor: "pointer"
                    }}
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>
            )}

            {/* STAGE 2: Payment Selection (COD Only with Yes/No Choices) */}
            {modalStage === "PAYMENT" && (
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                  <button
                    onClick={() => setModalStage("FIELDS")}
                    style={{ background: "transparent", border: "none", color: "#a0aec0", fontSize: "18px", cursor: "pointer", padding: 0 }}
                  >
                    ←
                  </button>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", margin: 0, color: "#fff" }}>
                    Confirm Payment Method
                  </h3>
                </div>

                {errorMsg && (
                  <div style={{ background: "rgba(239, 68, 68, 0.08)", color: "#ef4444", padding: "12px", borderRadius: "10px", marginBottom: "15px", fontSize: "13px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255,183,3,0.08)",
                  border: "2px solid #ffb703",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "30px"
                }}>
                  <span style={{ fontSize: "32px" }}>💵</span>
                  <div>
                    <span style={{ display: "block", fontWeight: "800", fontSize: "16px", color: "#fff" }}>
                      Cash on Delivery (COD)
                    </span>
                    <span style={{ display: "block", fontSize: "12px", color: "#a0aec0", marginTop: "2px" }}>
                      Pay with cash after food arrives at your address.
                    </span>
                  </div>
                </div>

                {/* Confirm prompt */}
                <h4 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "15px", textAlign: "center" }}>
                  Confirm Payment & Send Food to Kitchen?
                </h4>

                <div style={{ display: "flex", gap: "15px" }}>
                  <button
                    onClick={() => executeOrderCreation("SUCCESS")}
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      background: "#10b981",
                      border: "2px solid #10b981",
                      color: "white",
                      padding: "16px",
                      borderRadius: "30px",
                      fontWeight: "800",
                      fontSize: "15px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)"
                    }}
                  >
                    {isSubmitting ? "Processing..." : "Yes"}
                  </button>

                  <button
                    onClick={() => executeOrderCreation("PENDING")}
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      background: "#64748b",
                      border: "2px solid #64748b",
                      color: "white",
                      padding: "16px",
                      borderRadius: "30px",
                      fontWeight: "800",
                      fontSize: "15px",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Processing..." : "No"}
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: Success Receipt with visible Order ID & Copy badge */}
            {modalStage === "SUCCESS" && (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <span style={{ fontSize: "65px", display: "block", marginBottom: "15px" }}>🎉</span>
                <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#10b981", margin: "0 0 10px" }}>
                  Order Placed Successfully!
                </h3>
                <p style={{ color: "#a0aec0", fontSize: "14px", margin: "0 0 25px", lineHeight: "1.5" }}>
                  Your order is being processed. You can search or copy your Order ID below to keep track of its progress.
                </p>

                {/* ID badge and copy button */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#121212",
                  border: "1px dashed #ffb703",
                  borderRadius: "16px",
                  padding: "15px 20px",
                  marginBottom: "20px"
                }}>
                  <div style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "11px", color: "#718096", display: "block", letterSpacing: "1px" }}>YOUR ORDER ID</span>
                    <span style={{ fontSize: "22px", fontWeight: "900", color: "#ffb703" }}>#{createdOrderId}</span>
                  </div>

                  <button
                    onClick={handleCopyOrderId}
                    style={{
                      background: copied ? "#10b981" : "rgba(255, 183, 3, 0.1)",
                      color: copied ? "white" : "#ffb703",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {copied ? "Copied! ✓" : "Copy ID 📋"}
                  </button>
                </div>

                <div style={{
                  background: "#121212",
                  borderRadius: "16px",
                  padding: "15px 20px",
                  marginBottom: "25px",
                  textAlign: "left",
                  fontSize: "13px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#718096" }}>Customer</span>
                    <span style={{ fontWeight: "700" }}>{customerName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#718096" }}>Payment Method</span>
                    <span style={{ fontWeight: "700", color: paymentMethod === "COD" ? "#ffb703" : "#10b981" }}>
                      {paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod === "UPI" ? "UPI" : "Card"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#718096" }}>Amount Charged</span>
                    <span style={{ fontWeight: "800" }}>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => generateInvoicePDF(createdOrderId, customerName, phoneNumber, deliveryAddress, cartItems.length > 0 ? cartItems : [{ id: 999, name: "Gourmet Order Items", price: grandTotal, quantity: 1 }], grandTotal)}
                  style={{
                    background: "rgba(255, 183, 3, 0.12)",
                    border: "2px solid #ffb703",
                    color: "#ffb703",
                    padding: "14px 30px",
                    borderRadius: "30px",
                    fontWeight: "800",
                    fontSize: "15px",
                    cursor: "pointer",
                    width: "100%",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  📥 Download PDF Invoice
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    // Automatic loading redirect
                    navigate(`/track-order?orderId=${createdOrderId}`);
                  }}
                  style={{
                    background: "#10b981",
                    border: "2px solid #10b981",
                    color: "white",
                    padding: "14px 30px",
                    borderRadius: "30px",
                    fontWeight: "800",
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
                    width: "100%"
                  }}
                >
                  Track Order Timeline 🚀
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PlaceOrder;