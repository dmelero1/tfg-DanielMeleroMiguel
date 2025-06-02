import { FaDumbbell, FaUsers, FaTrophy, FaChalkboardTeacher } from "react-icons/fa";
import imgFondo from "../Dashboard/ImgDashboard/imgFondoGym.jpg"

const beneficios = [
  {
    icon: <FaChalkboardTeacher size={40} className="text-blue-600 mx-auto" />,
    titulo: "Entrenadores Certificados",
    descripcion: "Contamos con un equipo de entrenadores profesionales que te guiarán en todo momento.",
  },
  {
    icon: <FaUsers size={40} className="text-green-600 mx-auto" />,
    titulo: "Ambiente Agradable",
    descripcion: "Un entorno cómodo, amigable y motivador para todos los niveles de entrenamiento.",
  },
  {
    icon: <FaDumbbell size={40} className="text-red-600 mx-auto" />,
    titulo: "Clases Variadas",
    descripcion: "Ofrecemos una gran variedad de clases: funcional, spinning, yoga, HIIT, pilates, etc...",
  },
  {
    icon: <FaTrophy size={40} className="text-yellow-600 mx-auto" />,
    titulo: "Resultados Reales",
    descripcion: "El cambio que buscas, se consigue. Con disciplina y esfuerzo, todo se cumple",
  },
];

const DashboardBeneficios = () => {
  return (
    <div className="bg-gray-100 py-12 px-4"
    style={{ backgroundImage: `url(${imgFondo})`,
    backgroundSize: "contain" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-200">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {beneficio.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{beneficio.titulo}</h3>
              <p className="text-gray-600">{beneficio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardBeneficios;