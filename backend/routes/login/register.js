import express from "express";
import { pool } from "../../conexion.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Registrar usuario con bcrypt
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, cedula, telefono, genero, email, contrasena } =
      req.body;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, cedula, telefono, genero, email, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, cedula, telefono, genero, email, hashedPassword]
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
