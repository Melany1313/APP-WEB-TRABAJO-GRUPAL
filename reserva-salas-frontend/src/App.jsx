
import { useState } from "react";
import { Toaster } from "sonner";
import SalasPage from "./components/SalasPage";
import ReservasPage from "./components/ReservasPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("salas");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster richColors position="top-right" />
      <header className="flex justify-between items-center mb-6 border-b pb-2">
        <h1 className="text-3xl font-bold">Sistema de Reservas</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("salas")}
            className={`px-4 py-2 rounded-t ${activeTab === "salas" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Salas
          </button>
          <button
            onClick={() => setActiveTab("reservas")}
            className={`px-4 py-2 rounded-t ${activeTab === "reservas" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Reservas
          </button>
        </div>
      </header>
      {activeTab === "salas" ? <SalasPage /> : <ReservasPage />}
    </div>
  );
}
