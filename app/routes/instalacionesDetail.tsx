import { useParams } from "react-router";
import { useState } from "react";
import SelectorHoras from "../components/Instalacion/SelectorHoras";

export default function InstalacionDetail() {
  const { pistaId } = useParams();

  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [duracion, setDuracion] = useState<number>(30);
  const [nPersonas, setNPersonas] = useState<number>(1);
  const [complemento, setComplemento] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      pistaId,
      horaSeleccionada,
      duracion,
      nPersonas,
      complemento,
    });
    alert("Reserva realizada ✅");
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Detalle de la Pista</h1>
        <p className="text-gray-300 mb-6">Pista seleccionada: <strong>{pistaId}</strong></p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <SelectorHoras
            horaSeleccionada={horaSeleccionada}
            setHoraSeleccionada={setHoraSeleccionada}
          />

          {horaSeleccionada && (
            <>
              <div>
                <label htmlFor="duracion" className="block mb-1 font-medium">Duración:</label>
                <select
                  id="duracion"
                  value={duracion}
                  onChange={(e) => setDuracion(Number(e.target.value))}
                  className="p-2 border rounded text-black bg-white w-full"
                >
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1h 30min</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Número de personas:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNPersonas(n)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        nPersonas === n
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="complementos" className="block mb-1 font-medium">Complementos:</label>
                <select
                  id="complementos"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className="p-2 border rounded text-black bg-white w-full"
                >
                  <option value="">Ninguno</option>
                  <option value="raquetas">Raquetas</option>
                  <option value="pelotas">Pelotas</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md"
              >
                Reservar
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}