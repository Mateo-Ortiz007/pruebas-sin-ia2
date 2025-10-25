import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsAuthenticated }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://192.168.0.9:3001";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !contraseña) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login exitoso:", data);
        setError("");
        setIsAuthenticated(true); // ✅ activa sesión
        navigate("/productos"); // ✅ redirige al dashboard
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Ingresar</button>

        <button
          onClick={() => navigate("/registro")}
          style={{ marginTop: "10px", backgroundColor: "#28a745" }}
        >
          Ir a Registro
        </button>
      </div>
    </div>
  );
}

export default Login;
