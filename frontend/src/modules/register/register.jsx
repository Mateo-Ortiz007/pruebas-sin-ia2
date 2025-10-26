import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // importamos useNavigate
import "./register.css";

function Registro() {
  const API_URL =
    import.meta.env.VITE_API_URL |
    "https://pruebas-sin-ia2.onrender.com/register";
  const navigate = useNavigate(); // inicializamos el hook

  const [usuario, setUsuario] = useState([]);
  const [newNombreDeUsuario, setNewNombreDeUsuario] = useState("");
  const [newApellidoDeUsuario, setNewApellidoDeUsuario] = useState("");
  const [newCedulaDelUsuario, setNewCedulaDelUsuario] = useState("");
  const [newTelefonoDelUsuario, setNewTelefonoDelUsuario] = useState("");
  const [newGeneroDelUsuario, setNewGeneroDelUsuario] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [newcontrasena, setNewContrasena] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/usuarios`)
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const addUsuario = () => {
    if (
      !newNombreDeUsuario ||
      !newApellidoDeUsuario ||
      !newCedulaDelUsuario ||
      !newTelefonoDelUsuario ||
      !newemail ||
      !newcontrasena
    )
      return;

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: newNombreDeUsuario,
        apellido: newApellidoDeUsuario,
        cedula: newCedulaDelUsuario,
        telefono: newTelefonoDelUsuario,
        genero: newGeneroDelUsuario,
        email: newemail,
        contraseña: newcontrasena,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario([...usuario, data]);
        // Redirigir al login después de registrar
        navigate("/login");
      })
      .catch((err) => console.error("Error al agregar usuario", err));

    // Limpiar inputs
    setNewEmail("");
    setNewContrasena("");
  };

  return (
    <div className="container">
      <div className="container-login">
        <h2>Register</h2>
        <div className="linea-container">
          <hr className="linea" />
        </div>
        <label className="input-label">Nombre</label>
        <input
          type="text"
          value={newNombreDeUsuario}
          onChange={(e) => setNewNombreDeUsuario(e.target.value)}
          required
        />
        <label className="input-label">Apellido</label>
        <input
          type="text"
          value={newApellidoDeUsuario}
          onChange={(e) => setNewApellidoDeUsuario(e.target.value)}
          required
        />
        <label className="input-label">Cedula</label>
        <input
          type="number"
          maxLength="10"
          value={newCedulaDelUsuario}
          onChange={(e) => setNewCedulaDelUsuario(e.target.value)}
          required
        />
        <label className="input-label">Telefono</label>
        <input
          type="number"
          maxLength="10"
          value={newTelefonoDelUsuario}
          onChange={(e) => setNewTelefonoDelUsuario(e.target.value)}
          required
        />
        <label className="input-label">Genero</label>
        <select
          value={newGeneroDelUsuario}
          onChange={(e) => setNewGeneroDelUsuario(e.target.value)}
        >
          <option value="">Selecciona tu género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <label className="input-label">Correo</label>
        <input
          type="email"
          value={newemail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <label className="input-label">Contraseña</label>
        <input
          type="password"
          value={newcontrasena}
          onChange={(e) => setNewContrasena(e.target.value)}
          required
        />
        <button onClick={addUsuario}>Registrarse</button>
      </div>
    </div>
  );
}

export default Registro;
