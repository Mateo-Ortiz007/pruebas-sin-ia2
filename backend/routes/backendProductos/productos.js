import express from "express";
import { pool } from "../../conexion.js"; // Si tienes un archivo db.js con la conexión

const router = express.Router();

// GET productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos_de_la_tienda");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST producto
router.post("/", async (req, res) => {
  const { nombre, tipo, fecha, precio } = req.body;
  const [result] = await pool.query(
    "INSERT INTO productos_de_la_tienda (nombre, tipo, fecha, precio) VALUES (?, ?, ?, ?)",
    [nombre, tipo, fecha, precio]
  );
  res.status(201).json({ id: result.insertId, nombre, tipo, fecha, precio });
});

// PUT producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha, precio } = req.body;
  await pool.query(
    "UPDATE productos_de_la_tienda SET nombre=?, tipo=?, fecha=?, precio=? WHERE id=?",
    [nombre, tipo, fecha, precio, id]
  );
  res.json({ id, nombre, tipo, fecha, precio });
});

// DELETE producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM productos_de_la_tienda WHERE id=?", [id]);
  res.json({ message: "Producto eliminado" });
});

export default router;
