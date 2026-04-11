import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { apiRequest } from "../api/client.js";

export default function Navbar() {
  const { state, dispatch } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!state.searchTerm.trim()) return [];
    return state.products
      .filter((product) => product.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [state.products, state.searchTerm]);

  const handleSearchChange = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
    // For now, just use local suggestions since backend isn't connected
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.slug}`);
    dispatch({ type: "SET_SEARCH", payload: product.name });
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="brand-mark">
          <span>Shop</span>Sphere
        </Link>
        <div className="search-wrap">
          <input
            value={state.searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            onFocus={() => state.searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search products, brands, categories..."
          />
          {(showSuggestions && suggestions.length > 0) && (
            <div className="suggestion-box">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((current) => !current)}>
          Menu
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/cart">Cart ({state.cart.length})</NavLink>
          {state.user && <NavLink to="/profile">Profile</NavLink>}
          {state.user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          {state.user ? (
            <button type="button" className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/auth">Login</NavLink>
          )}
        </nav>
      </header>
      {state.notifications[0] && (
        <div className={`toast ${state.notifications[0].type}`}>
          {state.notifications[0].message}
        </div>
      )}
    </>
  );
}
