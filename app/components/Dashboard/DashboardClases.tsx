import React, { useState } from "react";
import imgFondo from "../Dashboard/ImgDashboard/fondoClases.jpg"
const horarios: {
  "lunes-miércoles-viernes": { hora: string; clase: string }[];
  "martes-jueves": { hora: string; clase: string }[];
  "sabados-domingos": { hora: string; clase: string }[];
} = {
  "lunes-miércoles-viernes": [
    { hora: "08:00 - 09:00", clase: "Entrenamiento Funcional" },
    { hora: "10:00 - 11:00", clase: "Yoga" },
    { hora: "18:00 - 19:00", clase: "Cardio HIIT" },
  ],
  "martes-jueves": [
    { hora: "09:00 - 10:00", clase: "Pilates" },
    { hora: "11:00 - 12:00", clase: "Spinning" },
    { hora: "17:00 - 18:00", clase: "Entrenamiento en Fuerza" },
  ],
  "sabados-domingos": [
    { hora: "10:00 - 11:00", clase: "Yoga" },
    { hora: "12:00 - 13:00", clase: "Cardio HIIT" },
  ],
};

const DashboardClases = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (tipo: string) => {
    if (openAccordion === tipo) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(tipo);
    }
  };

  return (
    <div className="py-8 px-4 bg-gray-100"
    style={{ 
        backgroundImage: `url(${imgFondo})`,
        backgroundSize: "cover" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Horarios de Clases</h2>
        
        <div className="space-y-4">
          <div>
            <button
              onClick={() => toggleAccordion("lunes-miércoles-viernes")}
              className="w-full text-left bg-blue-700 text-white p-4 rounded-lg hover:bg-blue-800 transition"
            >
              Lunes - Miércoles - Viernes
            </button>
            {openAccordion === "lunes-miércoles-viernes" && (
              <div className="p-4 bg-blue-100 rounded-b-lg">
                <ul>
                  {horarios["lunes-miércoles-viernes"].map((horario, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-bold">{horario.hora}</span>: {horario.clase}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleAccordion("martes-jueves")}
              className="w-full text-left bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
            >
              Martes - Jueves
            </button>
            {openAccordion === "martes-jueves" && (
              <div className="p-4 bg-green-100 rounded-b-lg">
                <ul>
                  {horarios["martes-jueves"].map((horario, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-bold">{horario.hora}</span>: {horario.clase}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleAccordion("sabados-domingos")}
              className="w-full text-left bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition"
            >
              Sábados - Domingos
            </button>
            {openAccordion === "sabados-domingos" && (
              <div className="p-4 bg-yellow-100 rounded-b-lg">
                <ul>
                  {horarios["sabados-domingos"].map((horario, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-bold">{horario.hora}</span>: {horario.clase}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClases;