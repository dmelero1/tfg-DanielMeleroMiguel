import { Link } from "react-router";

type Pista = {
  id: string;
  tipo: "padel" | "tenis";
  nombre: string;
};

export default function InstalacionCard({ pista }: { pista: Pista }) {
  return (
    <div className="border p-4 bg-gray-700 rounded shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold">{pista.nombre}</h2>
      <p className="capitalize">Tipo: {pista.tipo}</p>
      <Link
        to={`/pistas/${pista.id}`}
        className="text-blue-500 underline mt-2 inline-block"
      >
        Ver detalles
      </Link>
    </div>
  );
}