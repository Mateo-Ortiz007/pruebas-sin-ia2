import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import tienda2 from "./asset/tienda2.png";

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
    <div className="main-container">
      <div className="login">
        <div className="login-content">
          <h2>SHOP STORE</h2>
          <hr className="linea" />
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button onClick={handleLogin}>Sign in</button>
          <button className="register" onClick={() => navigate("/registro")}>
            Ir a Registro
          </button>
        </div>
      </div>

      <div
        className="right-side"
        style={{ backgroundImage: `url(${tienda2})` }}
      ></div>

      <p>Login creado por Mateo Ortiz</p>
    </div>
  );
}

export default Login;
