import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // importamos useNavigate
import "./register.css";

function Registro() {
  const API_URL = import.meta.env.VITE_API_URL;
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
    fetch(`${API_URL}/register`)
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
        contrasena: newcontrasena,
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
    <div className="container-main-register">
      <div className="container-register">
        <h2>Register</h2>
        <div className="linea-container">
          <hr className="linea" />
        </div>
        <label className="input-label">Name</label>
        <input
          type="text"
          value={newNombreDeUsuario}
          onChange={(e) => setNewNombreDeUsuario(e.target.value)}
          required
        />

        <label className="input-label">Last-name</label>
        <input
          type="text"
          value={newApellidoDeUsuario}
          onChange={(e) => setNewApellidoDeUsuario(e.target.value)}
          required
        />

        <label className="input-label">Document</label>
        <input
          type="text" // cambiado a text porque maxLength NO funciona con number
          maxLength="10"
          value={newCedulaDelUsuario}
          onChange={(e) => setNewCedulaDelUsuario(e.target.value)}
          required
        />

        <label className="input-label">Phone</label>
        <input
          type="text" // igual, para permitir maxLength
          maxLength="10"
          value={newTelefonoDelUsuario}
          onChange={(e) => setNewTelefonoDelUsuario(e.target.value)}
          required
        />

        <label className="input-label">Gender</label>
        <select
          value={newGeneroDelUsuario}
          onChange={(e) => setNewGeneroDelUsuario(e.target.value)}
        >
          <option value="">Selecciona tu género</option>
          <option value="Masculino">Masculine</option>
          <option value="Femenino">Female</option>
          <option value="Otro">Other</option>
        </select>

        <label className="input-label">Email</label>
        <input
          type="email"
          value={newemail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          value={newcontrasena}
          onChange={(e) => setNewContrasena(e.target.value)}
          required
        />

        <button onClick={addUsuario}>Sing up</button>
      </div>
    </div>
  );
}

export default Registro;
