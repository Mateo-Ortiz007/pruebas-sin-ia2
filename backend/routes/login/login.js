import express from "express";
import { pool } from "../../conexion.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const user = rows[0];
    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Retornamos datos públicos del usuario (sin contraseña)
    res.json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" });
  }
});

export default router;
