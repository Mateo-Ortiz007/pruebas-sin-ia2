import express from "express";
import { pool } from "../../conexion.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET /usuarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, email FROM usuarios"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios", details: err });
  }
});

// POST /usuarios
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)",
      [nombre, apellido, email, hashedPassword]
    );

    res.status(201).json({ id: result.insertId, nombre, apellido, email });
  } catch (err) {
    console.error(err);
  }
});

// DELETE /usuarios/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario", details: err });
  }
});

export default router;
