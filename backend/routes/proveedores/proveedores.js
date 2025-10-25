import express from "express";
import { pool } from "../../conexion.js";

const router = express.Router();

// GET /proveedores
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM proveedores");
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener el proveedor", details: err });
  }
});

// POST /proveedores
router.post("/", async (req, res) => {
  try {
    const { marca, tipo_de_productos, empresa } = req.body;

    const [result] = await pool.query(
      "INSERT INTO proveedores (marca, tipo_de_productos, empresa) VALUES (?, ?, ?)",
      [marca, tipo_de_productos, empresa]
    );

    res.status(201).json({
      id: result.insertId,
      marca,
      tipo_de_productos,
      empresa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar proveedor" });
  }
});

// PUT /proveedores/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { marca, tipo_de_producto, empresa } = req.body;
  try {
    await pool.query(
      "UPDATE proveedores SET marca=?, tipo_de_productos=?, empresa=? WHERE id=?",
      [marca, tipo_de_producto, empresa, id]
    );
    res.json({ id, marca, tipo_de_producto, empresa });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar proveedor" });
  }
});

// DELETE /proveedores/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM proveedores WHERE id=?", [id]);
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar proveedor" });
  }
});

export default router;
