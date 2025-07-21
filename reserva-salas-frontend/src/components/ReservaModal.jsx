import { useState, useEffect } from "react";

export function ReservaModal({ open, onClose, onSave, initialData, salas }) {
  const [usuario, setUsuario] = useState("");
  const [salaId, setSalaId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    if (initialData) {
      setUsuario(initialData.usuario);
      setSalaId(initialData.salaId);
      // ✅ Convertir fecha ISO a formato datetime-local
      setFechaInicio(initialData.fechaInicio.slice(0, 16));
      setFechaFin(initialData.fechaFin.slice(0, 16));
    } else {
      setUsuario("");
      setSalaId("");
      setFechaInicio("");
      setFechaFin("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario || !salaId || !fechaInicio || !fechaFin) return;

    onSave({
      usuario,
      salaId: parseInt(salaId),
      fechaInicio: new Date(fechaInicio).toISOString(), // ✅ Convertir a formato ISO
      fechaFin: new Date(fechaFin).toISOString() // ✅ Convertir a formato ISO
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Reserva" : "Nueva Reserva"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded w-full p-2"
          />
          <select
            value={salaId}
            onChange={(e) => setSalaId(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="">Selecciona una sala</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
          <label className="block">
            Fecha inicio:
            <input
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border rounded w-full p-2 mt-1"
            />
          </label>
          <label className="block">
            Fecha fin:
            <input
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border rounded w-full p-2 mt-1"
            />
          </label>
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
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
