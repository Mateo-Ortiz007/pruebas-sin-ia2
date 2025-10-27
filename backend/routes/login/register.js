import express from "express";
import { pool } from "../../conexion.js";

const router = express.Router();

// GET: obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST: registrar usuario (sin hash)
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, cedula, telefono, genero, email, contrasena } =
      req.body;

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, cedula, telefono, genero, email, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, cedula, telefono, genero, email, contrasena]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      apellido,
      cedula,
      telefono,
      genero,
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

export default router;
