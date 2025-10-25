import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Panel</h2>
      <button onClick={() => navigate("/productos")}>🛒 Productos</button>
      <button onClick={() => navigate("/proveedores")}>📦 Proveedores</button>
      <button onClick={() => navigate("/clientes")}>👥 Clientes</button>
    </div>
  );
}

export default Sidebar;
