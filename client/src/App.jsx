import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { useStore } from "./context/StoreContext.jsx";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { state } = useStore();
  if (!state.user) return <Navigate to="/auth" replace />;
  if (adminOnly && state.user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
