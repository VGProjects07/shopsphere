import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { apiRequest } from "../api/client.js";

export default function AuthPage() {
  const { dispatch } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        console.log("Attempting signup with:", { name: form.name, email: form.email });
        // Call signup API
        const response = await apiRequest("/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password
          })
        });

        console.log("Signup response:", response);

        dispatch({
          type: "LOGIN",
          payload: {
            token: response.token,
            user: response.user
          }
        });
        navigate("/profile");
      } else if (mode === "login") {
        console.log("Attempting login with:", { email: form.email });
        // Call login API
        const response = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });

        console.log("Login response:", response);

        dispatch({
          type: "LOGIN",
          payload: {
            token: response.token,
            user: response.user
          }
        });
        navigate(response.user.role === "admin" ? "/admin" : "/profile");
      }
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await apiRequest("/auth/password-reset/request", {
        method: "POST",
        body: JSON.stringify({ email: form.email })
      });
      setResetToken(`Reset token: ${response.token} (valid for 15 minutes)`);
      setForm({ ...form, email: "" });
    } catch (err) {
      setError(err.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <section className="auth-card">
        <div className="auth-switch">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} disabled={loading}>Login</button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} disabled={loading}>Signup</button>
          <button type="button" className={mode === "reset" ? "active" : ""} onClick={() => setMode("reset")} disabled={loading}>Reset</button>
        </div>
        {mode !== "reset" ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && <input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required disabled={loading} />}
            <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required disabled={loading} />
            <input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required disabled={loading} />
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Processing..." : mode === "login" ? "Login" : "Create account"}
              </button>
              <button type="button" className="secondary-button" onClick={() => setForm({ name: "", email: "", password: "" })} disabled={loading}>
                Reset
              </button>
            </div>
          </form>
        ) : (
          <div className="auth-form">
            <input type="email" placeholder="Enter email for reset" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} disabled={loading} />
            <button type="button" className="secondary-button" onClick={handleResetRequest} disabled={loading}>
              {loading ? "Sending..." : "Send reset email"}
            </button>
            {resetToken && <p className="token-box">{resetToken}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
