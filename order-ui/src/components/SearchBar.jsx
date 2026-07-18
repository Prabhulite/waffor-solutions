function SearchBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        padding: "0 20px"
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search for foods..."
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "16px 24px",
          borderRadius: "18px",
          border: "2px solid rgba(0, 0, 0, 0.05)",
          fontSize: "16px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
          outline: "none",
          transition: "all 0.3s ease"
        }}
      />
    </div>
  );
}

export default SearchBar;