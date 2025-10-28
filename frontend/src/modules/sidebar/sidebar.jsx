import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";
function Sidebar() {
  const [ExitOpenModal, setExitModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // elimina el login guardado
    navigate("/login"); // redirige al login
  };

  return (
    <div className="sidebar">
      <h2>Panel</h2>
      <button onClick={() => navigate("/productos")}>🛒 Productos</button>
      <button onClick={() => navigate("/proveedores")}>📦 Proveedores</button>
      <button onClick={() => navigate("/clientes")}>👥 Clientes</button>

      <hr />
      <button onClick={() => setExitModalOpen(true)}>🔒 Cerrar sesión</button>

      {ExitOpenModal && (
        <div className="modal-overlar">
          <div className="modal">
            <h3>¿Quieres cerrar sesíon ?</h3>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="confirm">
                si
              </button>
              <button
                onClick={() => setExitModalOpen(false)}
                className="cancel"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
