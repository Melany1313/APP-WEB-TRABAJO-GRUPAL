import { FaEdit, FaTrash } from "react-icons/fa";

export function ReservaTable({ reservas, salas, onEdit, onDelete }) {
  const getSalaNombre = (id) => {
    const sala = salas.find((s) => s.id === id);
    return sala ? sala.nombre : "Desconocida";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full table-auto">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Usuario</th>
            <th className="p-3">Sala</th>
            <th className="p-3">Inicio</th>
            <th className="p-3">Fin</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No hay reservas registradas
              </td>
            </tr>
          )}
          {reservas.map((reserva) => (
            <tr key={reserva.id} className="border-t">
              <td className="p-3">{reserva.usuario}</td>
              <td className="p-3">{getSalaNombre(reserva.salaId)}</td>
              <td className="p-3">{formatDate(reserva.fechaInicio)}</td>
              <td className="p-3">{formatDate(reserva.fechaFin)}</td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(reserva)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(reserva.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
