import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function AuthPage() {
  const { dispatch } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const admin = form.email === "admin@shopsphere.com" && form.password === "password123";
    const customer = form.email === "ava@example.com" && form.password === "password123";

    if (admin || customer) {
      dispatch({
        type: "LOGIN",
        payload: {
          token: "mock-jwt-token",
          user: {
            name: admin ? "Admin User" : "Ava Shopper",
            email: form.email,
            role: admin ? "admin" : "customer"
          }
        }
      });
      navigate(admin ? "/admin" : "/profile");
    } else {
      setError("Invalid credentials. Try admin@shopsphere.com or ava@example.com with password123");
    }
  };

  const handleResetRequest = () => {
    setResetToken("Mock reset token: RESET-12345 (valid for 15 minutes)");
  };

  return (
    <div className="page auth-page">
      <section className="auth-card">
        <div className="auth-switch">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Signup</button>
          <button type="button" className={mode === "reset" ? "active" : ""} onClick={() => setMode("reset")}>Reset</button>
        </div>
        {mode !== "reset" ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && <input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />}
            <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            <input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button type="submit" className="primary-button">
                {mode === "login" ? "Login" : "Create account"}
              </button>
              <button type="button" className="secondary-button" onClick={() => setForm({ name: "", email: "", password: "" })}>
                Reset
              </button>
            </div>
          </form>
        ) : (
          <div className="auth-form">
            <input type="email" placeholder="Enter email for reset" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <button type="button" className="secondary-button" onClick={handleResetRequest}>
              Send reset email
            </button>
            {resetToken && <p className="token-box">{resetToken}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
