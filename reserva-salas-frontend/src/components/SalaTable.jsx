import { FaEdit, FaTrash } from "react-icons/fa";

export function SalaTable({ salas, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full table-auto">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Capacidad</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {salas.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No hay salas registradas
              </td>
            </tr>
          )}
          {salas.map((sala) => (
            <tr key={sala.id} className="border-t">
              <td className="p-3">{sala.nombre}</td>
              <td className="p-3">{sala.capacidad} personas</td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(sala)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(sala.id)}
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
