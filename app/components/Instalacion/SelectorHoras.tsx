interface Props {
  horaSeleccionada: string | null;
  setHoraSeleccionada: (hora: string | null) => void;
  horasDeshabilitadas: string[];
}

export default function SelectorHoras({
  horaSeleccionada,
  setHoraSeleccionada,
  horasDeshabilitadas
}: Props) {
  const generarHoras = () => {
    const bloques: [number, number][] = [
      [10, 14],
      [17, 21],
    ];

    const horas: string[] = [];
    bloques.forEach(([inicio, fin]) => {
      for (let h = inicio; h < fin; h++) {
        horas.push(`${h.toString().padStart(2, "0")}:00`);
      }
      horas.push(`${fin.toString().padStart(2, "0")}:00`);
    });

    return horas;
  };

  const horas = generarHoras();

  const esDeshabilitada = (hora: string) => horasDeshabilitadas.includes(hora);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Selecciona una hora:</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {horas.map((hora) => {
          const isDisabled = esDeshabilitada(hora);
          const isSelected = horaSeleccionada === hora;

          return (
            <button
              key={hora}
              type="button"
              onClick={() => {
                if (!isDisabled) {
                  setHoraSeleccionada(isSelected ? null : hora);
                }
              }}
              disabled={isDisabled}
              className={`p-2 rounded-xl text-sm font-medium border shadow-sm transition-all
                  ${isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : isDisabled
                    ? "bg-red-200 text-red-700 cursor-not-allowed border-red-300"
                    : "bg-white text-gray-800 hover:bg-blue-100 border-gray-300"
                }`}
            >
              {hora}
            </button>
          );
        })}
      </div>
    </div>
  );
}