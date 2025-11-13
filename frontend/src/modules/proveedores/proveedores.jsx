import { useEffect, useState } from "react";
import "./proveedores.css";

function Proveedores() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [proveedores, setProveedor] = useState([]);
  const [newMarca, setNewMarca] = useState("");
  const [newTipoDeProducto, setNewTipoDeProducto] = useState("");
  const [newEmpresa, setNewEmpresa] = useState("");

  const [marcaToEdit, setMarcaToEdit] = useState("");
  const [tipodeproductoToEdit, setTipoDeProductoToEdit] = useState("");
  const [empresaToEdit, setEmpresaToEdit] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedModalOpen, setEditedModalOpen] = useState(false);
  const [proveedoresToEdit, setProveedoresToEdit] = useState(null);
  const [proveedortoDelete, setProveedoresToDelete] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/proveedores`)
      .then((res) => res.json())
      .then((data) => setProveedor(data))
      .catch((err) => console.error("Error al obtener el proveedor", err));
  }, []);

  const addProvider = () => {
    if (!newMarca || !newTipoDeProducto || !newEmpresa) return;

    fetch(`${API_URL}/proveedores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marca: newMarca,
        tipo_de_productos: newTipoDeProducto,
        empresa: newEmpresa,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProveedor([...proveedores, data]))
      .catch((err) => console.error("Error al agregar el proveedor", err));

    setNewMarca("");
    setNewTipoDeProducto("");
    setNewEmpresa("");
  };

  const openEditModal = (proveedor) => {
    setProveedoresToEdit(proveedor);
    setMarcaToEdit(proveedor.marca);
    setTipoDeProductoToEdit(proveedor.tipo_de_productos);
    setEmpresaToEdit(proveedor.empresa);
    setEditedModalOpen(true);
  };

  const saveEdit = () => {
    if (!proveedoresToEdit) return;

    fetch(`${API_URL}/proveedores/${proveedoresToEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marca: marcaToEdit,
        tipo_de_productos: tipodeproductoToEdit,
        empresa: empresaToEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Actualizar el estado local
        setProveedor(
          proveedores.map((pr) => (pr.id === proveedoresToEdit.id ? data : pr))
        );
        setEditedModalOpen(false);
        setProveedoresToEdit(null);
      })
      .catch((err) => console.error("Error al actualizar el proveedor", err));
  };

  const confirmDeleteProvider = (proveedor) => {
    setProveedoresToDelete(proveedor);
    setDeleteModalOpen(true);
  };

  const deleteProvider = () => {
    if (!proveedortoDelete) return;

    fetch(`${API_URL}/proveedores/${proveedortoDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProveedor(
          proveedores.filter((pr) => pr.id !== proveedortoDelete.id)
        );
        setDeleteModalOpen(false);
        setProveedoresToDelete(null);
      })
      .catch((err) => console.error("Error al eliminar el proveedor", err));
  };

  return (
    <div className="container-proveedores">
      <h1>Suppliers</h1>

      {/* Formulario agregar proveedor */}
      <input
        type="text"
        placeholder="Brand"
        value={newMarca}
        onChange={(e) => setNewMarca(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product type"
        value={newTipoDeProducto}
        onChange={(e) => setNewTipoDeProducto(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        value={newEmpresa}
        onChange={(e) => setNewEmpresa(e.target.value)}
      />
      <button onClick={addProvider}>Add</button>

      {/* Lista de proveedores */}
      <ul>
        {proveedores.map((prov) => (
          <li key={prov.id}>
            {prov.marca} - {prov.tipo_de_productos} - {prov.empresa}
            <button onClick={() => openEditModal(prov)}>Edit</button>
            <button onClick={() => confirmDeleteProvider(prov)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Modal de edición */}
      {editedModalOpen && (
        <div className="modal-proveedores">
          <div className="modal-content-proveedores">
            <h2>Edit supplier</h2>
            <label className="Label-inputs">Brand</label>
            <input
              type="text"
              value={marcaToEdit}
              onChange={(e) => setMarcaToEdit(e.target.value)}
            />
            <label className="Label-inputs">Product Type</label>
            <input
              type="text"
              value={tipodeproductoToEdit}
              onChange={(e) => setTipoDeProductoToEdit(e.target.value)}
            />
            <label className="Label-inputs">CoMpany</label>
            <input
              type="text"
              value={empresaToEdit}
              onChange={(e) => setEmpresaToEdit(e.target.value)}
            />
            <button onClick={saveEdit}>Keep</button>
            <button onClick={() => setEditedModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteModalOpen && (
        <div className="modal-proveedores">
          <div className="modal-content-proveedores">
            <h2>¿ Delete Supplier?</h2>
            <p>
              {proveedortoDelete?.marca} -{" "}
              {proveedortoDelete?.tipo_de_productos} -{" "}
              {proveedortoDelete?.empresa}
            </p>
            <button onClick={deleteProvider}>Delete</button>
            <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proveedores;
