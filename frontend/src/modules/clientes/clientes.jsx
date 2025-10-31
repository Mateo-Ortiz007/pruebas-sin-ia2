import { useEffect, useState } from "react";
import "./clientes.css"; // archivo de estilos específico

function Clientes() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [clientes, setClientes] = useState([]);
  const [newNombre, setNewNombre] = useState("");
  const [newApellido, setNewApellido] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContrasena, setNewContrasena] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState(null);
  const [nombreToEdit, setNombreToEdit] = useState("");
  const [apellidoToEdit, setApellidoToEdit] = useState("");
  const [emailToEdit, setEmailToEdit] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  // Obtener clientes
  useEffect(() => {
    fetch(`${API_URL}/clientes`)
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al obtener clientes:", err));
  }, []);

  // Agregar cliente
  const addCliente = () => {
    if (!newNombre || !newApellido || !newEmail || !newContrasena) return;

    fetch(`${API_URL}/clientes/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: newNombre,
        apellido: newApellido,
        email: newEmail,
        contrasena: newContrasena,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientes([...clientes, data]))
      .catch((err) => console.error("Error al agregar cliente:", err));

    setNewNombre("");
    setNewApellido("");
    setNewEmail("");
    setNewContrasena("");
  };

  // Abrir modal de edición
  const openEditModal = (cliente) => {
    setClienteToEdit(cliente);
    setNombreToEdit(cliente.nombre);
    setApellidoToEdit(cliente.apellido);
    setEmailToEdit(cliente.email);
    setEditModalOpen(true);
  };

  // Guardar cambios
  const saveEdit = () => {
    if (!clienteToEdit) return;

    fetch(`${API_URL}/clientes/${clienteToEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreToEdit,
        apellido: apellidoToEdit,
        email: emailToEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientes(
          clientes.map((c) => (c.id === clienteToEdit.id ? data : c))
        );
        setEditModalOpen(false);
        setClienteToEdit(null);
      })
      .catch((err) => console.error("Error al actualizar cliente:", err));
  };

  // Confirmar eliminación
  const confirmDelete = (cliente) => {
    setClienteToDelete(cliente);
    setDeleteModalOpen(true);
  };

  // Eliminar cliente
  const deleteCliente = () => {
    if (!clienteToDelete) return;

    fetch(`${API_URL}/clientes/${clienteToDelete.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setClientes(clientes.filter((c) => c.id !== clienteToDelete.id));
        setDeleteModalOpen(false);
        setClienteToDelete(null);
      })
      .catch((err) => console.error("Error al eliminar cliente:", err));
  };

  return (
    <div className="container-clientes">
      <h1>Clientes</h1>

      {/* Formulario agregar cliente */}
      <input
        type="text"
        placeholder="Nombre"
        value={newNombre}
        onChange={(e) => setNewNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={newApellido}
        onChange={(e) => setNewApellido(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={newContrasena}
        onChange={(e) => setNewContrasena(e.target.value)}
      />
      <button onClick={addCliente}>Agregar Cliente</button>

      {/* Lista de clientes */}
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} {cliente.apellido} - {cliente.email}
            <button onClick={() => openEditModal(cliente)}>Editar</button>
            <button onClick={() => confirmDelete(cliente)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Modal de edición */}
      {editModalOpen && (
        <div className="modal-clientes">
          <div className="modal-content-clientes">
            <h2>Editar Cliente</h2>
            <input
              type="text"
              value={nombreToEdit}
              onChange={(e) => setNombreToEdit(e.target.value)}
            />
            <input
              type="text"
              value={apellidoToEdit}
              onChange={(e) => setApellidoToEdit(e.target.value)}
            />
            <input
              type="email"
              value={emailToEdit}
              onChange={(e) => setEmailToEdit(e.target.value)}
            />
            <button onClick={saveEdit}>Guardar</button>
            <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Eliminar Cliente?</h2>
            <p>
              {clienteToDelete?.nombre} {clienteToDelete?.apellido} -{" "}
              {clienteToDelete?.email}
            </p>
            <button onClick={deleteCliente}>Eliminar</button>
            <button onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;
