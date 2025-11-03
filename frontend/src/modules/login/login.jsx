import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsAuthenticated }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
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
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
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

      <div className="right-side"></div>
    </div>
  );
}

export default Login;
