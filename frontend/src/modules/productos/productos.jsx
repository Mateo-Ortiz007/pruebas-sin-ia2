import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./productos.css";

function Productos() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [productos, setProductos] = useState([]);
  const [newNombre, setNewNombre] = useState("");
  const [newtipo, setNewTipo] = useState("");
  const [newFecha, setNewFecha] = useState("");
  const [newprecio, setNewPrecio] = useState("");
  const [filtrado, setFiltrado] = useState("all");

  const [editedModalOpen, setEditedModalOpen] = useState(false);
  const [productosToEdit, setProductosToEdit] = useState(null);
  const [editedNombre, setEditedNombre] = useState("");
  const [editedTipo, setEditedTipo] = useState("");
  const [editedFecha, setEditedFecha] = useState("");
  const [editedPrecio, setEditedPrecio] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/productos_de_la_tienda`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const addProduct = () => {
    if (!newNombre || !newtipo || !newFecha || !newprecio) return;

    fetch(`${API_URL}/productos_de_la_tienda`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: newNombre,
        tipo: newtipo,
        fecha: newFecha,
        precio: newprecio,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProductos([...productos, data]))
      .catch((err) => console.error("Error al agregar el producto:", err));

    setNewNombre("");
    setNewTipo("");
    setNewFecha("");
    setNewPrecio("");
  };

  const openEditModal = (producto) => {
    setProductosToEdit(producto);
    setEditedNombre(producto.nombre);
    setEditedTipo(producto.tipo);
    // ✅ formatea solo para el input sin alterar la DB
    const fechaSolo = producto.fecha
      ? new Date(producto.fecha).toISOString().split("T")[0]
      : "";
    setEditedFecha(fechaSolo);
    setEditedPrecio(producto.precio);
    setEditedModalOpen(true);
  };

  const saveEdit = () => {
    if (!productosToEdit) return;

    fetch(`${API_URL}/productos_de_la_tienda/${productosToEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: editedNombre,
        tipo: editedTipo,
        fecha: editedFecha,
        precio: editedPrecio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(productos.map((p) => (p.id === data.id ? data : p)));
        setEditedModalOpen(false);
      })
      .catch((err) => console.error("Error al actualizar producto:", err));
  };

  const confirmDeleteProduct = (producto) => {
    setProductToDelete(producto);
    setDeleteModalOpen(true);
  };

  const deleteProduct = () => {
    if (!productToDelete) return;

    fetch(`${API_URL}/productos_de_la_tienda/${productToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProductos(productos.filter((p) => p.id !== productToDelete.id));
        setDeleteModalOpen(false);
        setProductToDelete(null);
      })
      .catch((err) => console.error("Error al eliminar producto:", err));
  };

  const filterProducts =
    filtrado === "all"
      ? productos
      : productos.filter(
          (producto) =>
            producto.tipo &&
            producto.tipo.toLowerCase() === filtrado.toLowerCase()
        );

  return (
    <div className="products-main-container ">
      <div className="products-container">
        <h1>Productos</h1>

        <label className="label-products">Producto</label>

        <input
          type="text"
          value={newNombre}
          placeholder="Ingrese el nombre del nuevo producto"
          onChange={(e) => setNewNombre(e.target.value)}
        />

        <label className="label-products">Tipo</label>

        <input
          type="text"
          value={newtipo}
          placeholder="Ingrese el tipo del nuevo producto"
          onChange={(e) => setNewTipo(e.target.value)}
        />

        <label className="label-products">
          fecha de caducidad del producto
        </label>

        <input
          type="date"
          value={newFecha}
          placeholder="Ingrese la fecha de caducidad del nuevo producto"
          onChange={(e) => setNewFecha(e.target.value)}
        />

        <label className="label-products">Precio</label>
        <input
          type="number"
          value={newprecio}
          placeholder="Ingrese el precio del producto"
          onChange={(e) => setNewPrecio(e.target.value)}
        />

        <button onClick={addProduct}>Agregar</button>

        {editedModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar producto</h2>
              <input
                type="text"
                value={editedNombre}
                onChange={(e) => setEditedNombre(e.target.value)}
              />
              <input
                type="text"
                value={editedTipo}
                onChange={(e) => setEditedTipo(e.target.value)}
              />
              <input
                type="date"
                value={editedFecha}
                onChange={(e) => setEditedFecha(e.target.value)}
              />
              <input
                type="number"
                value={editedPrecio}
                onChange={(e) => setEditedPrecio(e.target.value)}
              />
              <button onClick={saveEdit}>Guardar</button>
              <button onClick={() => setEditedModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {deleteModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>¿Eliminar producto?</h2>
              <p>¿Estás seguro de eliminar "{productToDelete?.nombre}"?</p>
              <button onClick={deleteProduct}>Sí, eliminar</button>
              <button onClick={() => setDeleteModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <FaFilter size={20} />
          <select
            onChange={(e) => setFiltrado(e.target.value)}
            value={filtrado}
          >
            <option value="all">Todos</option>
            {[...new Set(productos.map((p) => p.tipo))].map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <ul>
          {filterProducts.map((producto) => (
            <li key={producto.id}>
              {producto.nombre}{" "}
              <small style={{ color: "#888", marginLeft: "10px" }}>
                Fecha de vencimiento: {producto.fecha}
              </small>
              <small style={{ color: "#888", marginLeft: "10px" }}>
                precio:{producto.precio}
              </small>
              <button
                className="lapiz"
                onClick={() => openEditModal(producto)}
                style={{ marginLeft: "10px" }}
              >
                ✏️
              </button>
              <button
                className="button-delete"
                onClick={() => confirmDeleteProduct(producto)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Productos;
