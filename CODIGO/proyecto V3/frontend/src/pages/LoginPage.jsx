import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const roleLabels = {
  student: "Estudiante",
  teacher: "Profesor",
  admin: "Administrador",
  parent: "Padre de Familia",
};

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      if (res.data.user.role !== role) {
        setError(`Este usuario no tiene permisos como ${roleLabels[role] || role}`);
        return;
      }
      login(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas o error de servidor.");
    }
  };

  const handleGuest = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/guest`);
    login({ ...res.data.user, role });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Ingreso como {roleLabels[role] || "Usuario"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGuest}
            className="text-sm text-gray-600 underline hover:text-blue-600"
          >
            Ingresar como Invitado
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
