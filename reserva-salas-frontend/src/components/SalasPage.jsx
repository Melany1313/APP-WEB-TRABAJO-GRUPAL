import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SalaTable } from "./SalaTable";
import { SalaModal } from "./SalaModal";

const API_URL = "http://localhost:5050/api/salas";

export default function SalasPage() {
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSala, setEditingSala] = useState(null);

  const fetchSalas = async () => {
    try {
      const res = await axios.get(API_URL);
      setSalas(res.data);
    } catch (error) {
      toast.error("Error cargando salas");
    }
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingSala) {
        // Agregar id para PUT
        await axios.put(`${API_URL}/${editingSala.id}`, { id: editingSala.id, ...data });
        toast.success("Sala actualizada");
      } else {
        await axios.post(API_URL, data);
        toast.success("Sala creada");
      }
      setModalOpen(false);
      setEditingSala(null);
      fetchSalas();
    } catch (error) {
      toast.error("Error guardando sala");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta sala?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Sala eliminada");
      fetchSalas();
    } catch (error) {
      toast.error("Error eliminando sala");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setEditingSala(null);
            setModalOpen(true);
          }}
        >
          + Nueva Sala
        </button>
      </div>
      <SalaTable
        salas={salas}
        onEdit={(sala) => {
          setEditingSala(sala);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <SalaModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingSala}
        />
      )}
    </div>
  );
}
