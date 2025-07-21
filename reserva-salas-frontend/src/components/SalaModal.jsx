import { useState, useEffect } from "react";

export function SalaModal({ open, onClose, onSave, initialData }) {
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setCapacidad(initialData.capacidad);
    } else {
      setNombre("");
      setCapacidad("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !capacidad) return;
    onSave({ nombre, capacidad: parseInt(capacidad, 10) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Sala" : "Nueva Sala"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded w-full p-2"
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className="border rounded w-full p-2"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
