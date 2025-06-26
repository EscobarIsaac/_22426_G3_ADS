import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import RoleSelector from "../pages/RoleSelector";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import GradesPage from "../pages/GradesPage";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-blue-100 py-3 px-4 flex justify-between items-center mb-4">
      <div className="space-x-4">
        <Link to="/dashboard" className="text-blue-800 font-semibold hover:underline">🏠 Dashboard</Link>
        <Link to="/grades" className="text-blue-800 font-semibold hover:underline">📊 Calificaciones</Link>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        🔓 Cerrar sesión
      </button>
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <GradesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
