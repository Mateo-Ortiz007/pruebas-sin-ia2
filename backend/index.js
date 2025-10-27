import express from "express";
import cors from "cors";
import loginRoutes from "./routes/login/login.js";
import registerRoutes from "./routes/login/register.js";
import clientesRoutes from "./routes/clientes/clientes.js";
import proveedoresRoutes from "./routes/proveedores/proveedores.js";
import productos_de_la_tiendaRoutes from "./routes/productos_de_la_tienda/productos_de_la_tienda.js";

const app = express(); // <— declarar app primero
app.use(
  cors({
    origin: "*", // Permite cualquier IP/origen
  })
);
app.use(express.json());

// Rutas
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/clientes", clientesRoutes);
app.use("/productos_de_la_tienda", productos_de_la_tiendaRoutes);

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`)
);
