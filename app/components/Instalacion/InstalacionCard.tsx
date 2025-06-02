import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

type Pista = {
  id: string;
  tipo: "padel" | "tenis";
  nombre: string;
};

export default function InstalacionCard({ pista }: { pista: Pista }) {
  const imagenSrc =
    pista.tipo === "padel"
      ? "/padel.webp"
      : "/tenis.webp";
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-48 border bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="w-full md:w-1/4 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{pista.nombre}</h2>
          <p className="text-sm text-indigo-300 tracking-wider uppercase">{pista.tipo}</p>
        </div>
        <Link
          to={`/instalaciones/${pista.id}`}
          className="mt-4 text-white hover:underline text-sm flex items-center gap-1"
        >
          <FaEye />
          Ver detalles
        </Link>
      </div>
      <div className="w-full md:w-3/4 h-48 md:h-full">
        <img
          src={imagenSrc}
          alt={pista.nombre}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}