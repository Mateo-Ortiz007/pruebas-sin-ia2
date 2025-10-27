import express from "express";
import { pool } from "../../conexion.js";

const router = express.Router();

// POST: login
router.post("/", async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const user = rows[0];

    // Comparación simple de contraseñas
    if (user.contrasena !== contrasena)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" });
  }
});

export default router;
