import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./modules/login/login";
import Productos from "./modules/productos/productos";
import Sidebar from "./modules/sidebar/sidebar";
import Proveedores from "./modules/proveedores/proveedores";
import Clientes from "./modules/clientes/clientes";
import Registro from "./modules/register/register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-layout" style={{ display: "flex" }}>
        {isAuthenticated && <Sidebar />}

        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            {/* Redirigir / al login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/registro" element={<Registro />} />

            {/* Rutas protegidas */}
            <Route
              path="/productos"
              element={
                isAuthenticated ? <Productos /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/proveedores"
              element={
                isAuthenticated ? <Proveedores /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/clientes"
              element={
                isAuthenticated ? <Clientes /> : <Navigate to="/login" />
              }
            />

            {/* Ruta 404 opcional */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
