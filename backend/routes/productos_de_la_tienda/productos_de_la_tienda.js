import express from "express";
import { pool } from "../../conexion.js";

const router = express.Router();

// GET: obtener todos los usuarios (para clientes)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, tipo, fecha, precio FROM productos_de_la_tienda"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST: registrar usuario (register)
router.post("/", async (req, res) => {
  try {
    const { nombre, tipo, fecha, precio } = req.body;

    const [result] = await pool.query(
      "INSERT INTO productos_de_la_tienda (nombre, tipo, fecha, precio) VALUES (?, ?, ?, ?)",
      [nombre, tipo, fecha, precio]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      tipo,
      fecha,
      precio,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al producto" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos_de_la_tienda WHERE id=?"[id]);
    res.json({ message: "Producto eliminado correctamente" });
  } catch {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});
export default router;
