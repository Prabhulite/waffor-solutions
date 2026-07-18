import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

// 12 Food Categories Data
const CATEGORIES = [
  { id: "pizzas", name: "Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80" },
  { id: "burgers", name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
  { id: "waffles", name: "Waffles", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=300&q=80" },
  { id: "pasta", name: "Pasta", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80" },
  { id: "fries", name: "Fries", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" },
  { id: "shakes", name: "Shakes", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=300&q=80" },
  { id: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80" },
  { id: "desserts", name: "Desserts", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80" },
  { id: "sandwiches", name: "Sandwiches", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=300&q=80" },
  { id: "biryani", name: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80" },
  { id: "noodles", name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80" },
  { id: "salads", name: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" }
];

// Food Items Data grouped by category
const FOOD_ITEMS = [
  // Pizzas
  { id: 1, category: "pizzas", name: "Margherita Pizza 🍕", price: 249, rating: 4.6, desc: "Classic cheese pizza topped with mozzarella and fresh basil leaves.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=350&q=80" },
  { id: 2, category: "pizzas", name: "Pepperoni Pizza 🍕", price: 349, rating: 4.8, desc: "Double pepperoni with extra mozzarella cheese.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=350&q=80" },
  { id: 3, category: "pizzas", name: "Veggie Supreme Pizza 🍕", price: 299, rating: 4.5, desc: "Olives, bell peppers, onions, tomatoes, and mushrooms.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=350&q=80" },
  // Burgers
  { id: 4, category: "burgers", name: "Classic Cheese Burger 🍔", price: 149, rating: 4.4, desc: "Smashed beef patty, melted cheddar, lettuce, pickles, and chef sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=350&q=80" },
  { id: 5, category: "burgers", name: "Spicy Chicken Burger 🍔", price: 199, rating: 4.6, desc: "Crispy chicken breast, jalapenos, and spicy mayo.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=350&q=80" },
  { id: 6, category: "burgers", name: "Double Patty Burger 🍔", price: 249, rating: 4.7, desc: "Double patty, double cheese, caramelized onions.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=350&q=80" },
  // Waffles
  { id: 7, category: "waffles", name: "Classic Maple Waffle 🧇", price: 129, rating: 4.5, desc: "Fresh golden waffle served with organic maple syrup and whipped cream.", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=350&q=80" },
  { id: 8, category: "waffles", name: "Chocolate Loaded Waffle 🧇", price: 179, rating: 4.8, desc: "Waffle smothered in milk & white Belgian chocolate chips.", image: "https://images.unsplash.com/photo-1598214886806-c87b80b709be?auto=format&fit=crop&w=350&q=80" },
  // Pasta
  { id: 9, category: "pasta", name: "Alfredo Penne Pasta 🍝", price: 229, rating: 4.4, desc: "Creamy white Alfredo sauce pasta loaded with mushrooms and herbs.", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=350&q=80" },
  { id: 10, category: "pasta", name: "Arrabiata Red Pasta 🍝", price: 209, rating: 4.3, desc: "Spicy tomato sauce pasta with garlic and red chili flakes.", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=350&q=80" },
  // Fries
  { id: 11, category: "fries", name: "Salted French Fries 🍟", price: 99, rating: 4.2, desc: "Golden salted crispy French fries.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=350&q=80" },
  { id: 12, category: "fries", name: "Peri Peri Fries 🍟", price: 119, rating: 4.5, desc: "Fries tossed in spicy African peri-peri seasoning.", image: "https://images.unsplash.com/photo-1600957139142-f22744f51481?auto=format&fit=crop&w=350&q=80" },
  // Shakes
  { id: 13, category: "shakes", name: "Oreo Milkshake 🥤", price: 139, rating: 4.7, desc: "Thick creamy shake blended with Oreo cookies.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=350&q=80" },
  // Beverages
  { id: 14, category: "beverages", name: "Iced Cold Coffee ☕", price: 119, rating: 4.4, desc: "Chilled sweetened espresso milk blend.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=350&q=80" },
  { id: 15, category: "beverages", name: "Lemon Mint Mojito 🍹", price: 99, rating: 4.6, desc: "Cooling muddled mint, fresh lime juice, and soda.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=350&q=80" },
  // Desserts
  { id: 16, category: "desserts", name: "Chocolate Brownie 🍫", price: 149, rating: 4.7, desc: "Fudgy warm chocolate brownie cake slice.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=350&q=80" },
  // Sandwiches
  { id: 17, category: "sandwiches", name: "Veg Club Sandwich 🥪", price: 139, rating: 4.3, desc: "Double-decker toasted sandwich with cheese, veggies, and green chutney.", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=350&q=80" },
  // Biryani
  { id: 18, category: "biryani", name: "Chicken Dum Biryani 🍗", price: 249, rating: 4.9, desc: "Long-grain basmati rice cooked with spiced marinated chicken in layers.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=350&q=80" },
  // Noodles
  { id: 19, category: "noodles", name: "Hakka Veg Noodles 🍜", price: 159, rating: 4.5, desc: "Stir-fried noodles with crisp fresh vegetables and Chinese seasonings.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=350&q=80" },
  // Salads
  { id: 20, category: "salads", name: "Classic Caesar Salad 🥗", price: 149, rating: 4.4, desc: "Romaine lettuce, parmesan cheese, crunchy croutons, and Caesar dressing.", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=350&q=80" }
];

function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  // Load cart from LocalStorage on mount
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

  // Filter items based on active category and search query
  const filteredItems = FOOD_ITEMS.filter((item) => {
    const matchesCategory = activeCategory ? item.category === activeCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const totalAmount = Object.entries(cart).reduce((total, [itemId, qty]) => {
    const item = FOOD_ITEMS.find((f) => f.id === parseInt(itemId));
    return total + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "#fff" }}>
      {/* CSS Styles injection */}
      <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255, 183, 3, 0.15) !important;
          border-color: #ffb703 !important;
        }
        .sidebar-item:hover {
          color: #ffb703 !important;
          background: rgba(255, 183, 3, 0.05) !important;
        }
        .add-btn:hover {
          background: #ffb703 !important;
          color: #121212 !important;
        }
        .qty-control {
          background: #ffb703;
          color: #121212;
          font-weight: 800;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          transition: all 0.2s;
        }
        .qty-control:hover {
          background: #ffa700;
          transform: scale(1.1);
        }
      `}</style>

      <Navbar />
      <Hero />

      {/* Categories / Food Catalog Container */}
      <div id="menu-section" style={{ padding: "60px 5%", maxWidth: "1300px", margin: "0 auto" }}>
        
        {/* State 1: Full Categories Grid (Zomato/Swiggy Home View) */}
        {!activeCategory ? (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px", textAlign: "left" }}>
              In the Mood for Something Special?
            </h2>
            <p style={{ color: "#718096", fontSize: "16px", marginBottom: "40px", textAlign: "left" }}>
              Select a category below to view our handpicked, freshly prepared gourmet dishes.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "25px"
            }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="category-card"
                  style={{
                    background: "#1e1e1e",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "20px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "15px",
                      border: "3px solid rgba(255, 183, 3, 0.2)"
                    }}
                  />
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: 0 }}>
                    {cat.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          
          /* State 2: Shifting Category view. Categories shift to Left Sidebar, Subcategories/foods populate the Main screen */
          <div style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
            animation: "fadeIn 0.4s ease"
          }}>
            {/* Left Sidebar: Categories List */}
            <div style={{
              width: "250px",
              position: "sticky",
              top: "100px",
              background: "#1e1e1e",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "24px",
              padding: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}>
              <button
                onClick={() => { setActiveCategory(null); setSearchQuery(""); }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  color: "#ffb703",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "10px",
                  cursor: "pointer",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                ← All Categories
              </button>

              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#a0aec0", padding: "0 10px 10px", margin: 0, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                Categories
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "15px" }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="sidebar-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        background: isSelected ? "rgba(255, 183, 3, 0.1)" : "transparent",
                        color: isSelected ? "#ffb703" : "#cbd5e1",
                        fontWeight: isSelected ? "700" : "500",
                        transition: "all 0.2s"
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                      <span>{cat.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Main Content: Subcategory Grid & search */}
            <div style={{ flex: 1 }}>
              {/* Header and Search */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
                <div>
                  <h2 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>
                    {CATEGORIES.find(c => c.id === activeCategory)?.name} Section
                  </h2>
                  <span style={{ fontSize: "14px", color: "#718096" }}>
                    Showing {filteredItems.length} gourmet options
                  </span>
                </div>

                {/* Local Search input */}
                <input
                  type="text"
                  placeholder="Search in this section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    maxWidth: "300px",
                    background: "#1e1e1e",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "30px",
                    padding: "12px 24px",
                    fontSize: "14px"
                  }}
                />
              </div>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <span style={{ fontSize: "40px" }}>🔍</span>
                  <h3 style={{ color: "#a0aec0", marginTop: "15px" }}>No items found matching your filter</h3>
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "25px"
                }}>
                  {filteredItems.map((item) => {
                    const quantity = cart[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: "#1e1e1e",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "24px",
                          padding: "18px",
                          display: "flex",
                          gap: "15px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                          alignItems: "center"
                        }}
                      >
                        {/* Food Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "16px",
                            objectFit: "cover",
                            border: "1px solid rgba(255,255,255,0.05)"
                          }}
                        />

                        {/* Details */}
                        <div style={{ flex: 1, textAlign: "left" }}>
                          <span style={{ fontSize: "12px", color: "#ffb703", fontWeight: "700" }}>
                            ★ {item.rating}
                          </span>
                          <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "2px 0 6px" }}>
                            {item.name}
                          </h3>
                          <p style={{ fontSize: "12px", color: "#a0aec0", margin: "0 0 10px", lineHeight: "1.4", height: "34px", overflow: "hidden" }}>
                            {item.desc}
                          </p>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>
                              ₹{item.price}
                            </span>

                            {/* Swiggy Style counter or ADD Button */}
                            {quantity === 0 ? (
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="add-btn"
                                style={{
                                  border: "2px solid #ffb703",
                                  background: "transparent",
                                  color: "#ffb703",
                                  padding: "6px 16px",
                                  borderRadius: "30px",
                                  fontWeight: "700",
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  transition: "all 0.2s"
                                }}
                              >
                                ADD +
                              </button>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button className="qty-control" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span style={{ fontWeight: "800", fontSize: "16px", color: "#ffb703" }}>{quantity}</span>
                                <button className="qty-control" onClick={() => updateQuantity(item.id, 1)}>+</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (Swiggy style checkout bar) */}
      {totalItems > 0 && (
        <div style={{
          position: "fixed",
          bottom: "25px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "800px",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          padding: "16px 28px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
          zIndex: 9999,
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <div>
            <span style={{ fontSize: "13px", fontWeight: "600", opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {totalItems} {totalItems === 1 ? "Item" : "Items"} Added
            </span>
            <h4 style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "800" }}>
              ₹{totalAmount} <span style={{ fontSize: "12px", opacity: 0.7, fontWeight: "normal" }}>(plus taxes)</span>
            </h4>
          </div>
          <button
            onClick={() => navigate("/place-order")}
            style={{
              background: "white",
              color: "#059669",
              border: "none",
              padding: "12px 28px",
              borderRadius: "30px",
              fontWeight: "800",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
            }}
          >
            View Cart & Place Order 🛒
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;