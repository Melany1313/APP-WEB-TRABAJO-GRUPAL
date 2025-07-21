import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ReservaTable } from "./ReservaTable";
import { ReservaModal } from "./ReservaModal";

const API_RESERVAS = "http://localhost:5050/api/reservas";
const API_SALAS = "http://localhost:5050/api/salas";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState(null);

  const fetchReservas = async () => {
    try {
      const res = await axios.get(API_RESERVAS);
      setReservas(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error cargando reservas");
    }
  };

  const fetchSalas = async () => {
    try {
      const res = await axios.get(API_SALAS);
      setSalas(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error cargando salas");
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchSalas();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingReserva) {
        // ✅ Incluir el id en el PUT
        await axios.put(`${API_RESERVAS}/${editingReserva.id}`, {
          ...data,
          id: editingReserva.id
        });
        toast.success("Reserva actualizada");
      } else {
        await axios.post(API_RESERVAS, data);
        toast.success("Reserva creada");
      }
      setModalOpen(false);
      setEditingReserva(null);
      fetchReservas();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error guardando reserva");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta reserva?")) return;
    try {
      await axios.delete(`${API_RESERVAS}/${id}`);
      toast.success("Reserva eliminada");
      fetchReservas();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error eliminando reserva");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setEditingReserva(null);
            setModalOpen(true);
          }}
        >
          + Nueva Reserva
        </button>
      </div>
      <ReservaTable
        reservas={reservas}
        salas={salas}
        onEdit={(reserva) => {
          setEditingReserva(reserva);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <ReservaModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingReserva}
          salas={salas}
        />
      )}
    </div>
  );
}
