import { Link } from "react-router";

const pistas = [
  { id: "1", tipo: "padel", nombre: "Pista Pádel 1" },
  { id: "2", tipo: "padel", nombre: "Pista Pádel 2" },
  { id: "3", tipo: "tenis", nombre: "Pista Tenis 1" },
  { id: "4", tipo: "tenis", nombre: "Pista Tenis 2" },
];

export default function Instalaciones() {
  return (
    <div className="p-10">
      <h1 className="text-2xl text-black font-bold px-2 mb-6">Reservar Instalaciones</h1>
      <ul className="space-y-6">
        {pistas.map((pista) => (
          <li
            key={pista.id}
            className="relative bg-white border rounded-xl shadow-md overflow-hidden cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80 blur-sm"
              style={{
                backgroundImage: `url(/${pista.tipo}.webp)`,
                zIndex: 0,
              }}
            />

            <div className="relative z-10 p-6">
              <h2 className="text-lg text-black font-semibold">{pista.nombre}</h2>
              <p className="text-sm text-gray-800 mb-4 capitalize">
                Tipo: {pista.tipo}
              </p>
              <Link
                to={`/instalaciones/${pista.id}`}
                className="text-indigo-600 hover:underline"
              >
                Ver detalles
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}