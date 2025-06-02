import { useParams } from "react-router";
import { useState, useEffect } from "react";
import SelectorHoras from "../components/Instalacion/SelectorHoras";
import { FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";

interface Pista {
  id: number;
  nombre: string;
  tipo: string;
}

const InstalacionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pista, setPista] = useState<Pista | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [nPersonas, setNPersonas] = useState<number>(1);
  const [complemento, setComplemento] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPistaYReservas = async () => {
      try {
        const resPista = await fetch(`http://localhost:3001/api/pistas/${id}`);
        const pistaData = await resPista.json();
        setPista(pistaData);

        const fechaHoy = new Date().toISOString().split("T")[0];

        const resReservas = await fetch(
          `http://localhost:3001/api/reservas?pista_id=${id}&fecha=${fechaHoy}`
        );
        const reservas = await resReservas.json();

        const horas = reservas.map((r: { hora: string }) => r.hora);
        setHorasOcupadas(horas);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPistaYReservas();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!horaSeleccionada || !pista) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    const reserva = {
      user_id: userId,
      pista_id: pista.id,
      fecha: new Date().toISOString().split("T")[0],
      hora: horaSeleccionada,
      personas: nPersonas,
      complemento,
    };

    try {
      const response = await fetch("http://localhost:3001/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al guardar la reserva");
      }

      setReservaExitosa(true);
    } catch (err: any) {
      console.error("Error al reservar:", err.message);
      alert(`${err.message}`);
    }
  };

  const getPrecioTotal = () => {
    if (!pista || !horaSeleccionada) return null;

    const base = pista.tipo === "padel" ? 12 : 10;
    const extra = complemento === "raquetas" ? 3 : complemento === "pelotas" ? 2.5 : 0;
    return (base + extra).toFixed(2);
  };

  if (loading) return <p className="text-white p-4">Cargando pista...</p>;
  if (!pista) return <p className="text-red-500 p-4">Pista no encontrada</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Reserva de {pista.nombre}</h1>
        <p className="text-gray-400 mb-6 capitalize">
          Tipo de pista: <strong>{pista.tipo}</strong>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <SelectorHoras
            horaSeleccionada={horaSeleccionada}
            setHoraSeleccionada={setHoraSeleccionada}
            horasDeshabilitadas={horasOcupadas}
          />

          {horaSeleccionada && (
            <>
              <div>
                <label className="block mb-1 font-medium">Número de personas:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNPersonas(n)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${nPersonas === n
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
                <label htmlFor="complementos" className="mb-2 font-medium flex items-center gap-1">
                  Complementos:
                  <FaInfoCircle
                    title="Raquetas: +3€ | Pelotas: +2,5€"
                    className="text-white cursor-pointer"
                  />
                </label>
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

              <div className="text-lg font-semibold text-white bg-gray-700 rounded-xl px-4 py-3 mt-2 flex justify-between items-center">
                <span>Total a pagar:</span>
                <span className="text-green-400">{getPrecioTotal()} €</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md"
              >
                Reservar
              </button>
            </>
          )}

          {reservaExitosa && (
            <p className="mt-4 text-green-400 font-semibold flex items-center gap-2 justify-center">
              <FaRegCheckCircle />
              Instalación reservada con éxito.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default InstalacionDetail;