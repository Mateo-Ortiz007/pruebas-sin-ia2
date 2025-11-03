import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsAuthenticated }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordar, setRecordar] = useState(false);

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
      <div className="left-side">
        <div className="login-box">
          <h2>Tienda</h2>
          <hr className="linea" />
          <h2>Login</h2>

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <div className="password-container">
            <input
              type={mostrarPassword ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              {mostrarPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={recordar}
              onChange={() => setRecordar(!recordar)}
            />
            Remember me
          </label>

          {error && <p className="error">{error}</p>}

          <button onClick={handleLogin}>Sign in</button>

          <div className="register-section">
            <span>¿You don't have an account?</span>
            <button
              className="signup-btn"
              onClick={() => navigate("/registro")}
            >
              Sign up free
            </button>
          </div>
        </div>
      </div>

      <div className="right-side">{/* Aquí puedes poner tu imagen */}</div>
    </div>
  );
}

export default Login;
