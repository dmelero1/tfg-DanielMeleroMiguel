import imgEmp1 from "../Dashboard/ImgDashboard/emp1.png";
import imgEmp2 from "../Dashboard/ImgDashboard/emp2.png";
import imgEmp3 from "../Dashboard/ImgDashboard/emp3.png";
import imgEmp4 from "../Dashboard/ImgDashboard/emp4.png";
import imgEmp5 from "../Dashboard/ImgDashboard/emp5.png";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const entrenadores = [
    {
        nombre: "Carlos Vicente",
        descripcion: "Especialista en entrenamiento funcional y pérdida de peso. Capaz de ayudarte con cualquier objetivo mediante dietas, ejercicios o rutinas.",
        imagen: imgEmp1,
    },
    {
        nombre: "María Gómez",
        descripcion: "Entrenadora especializada en la respiración, la flexibilidad y la conexión mente-cuerpo. Ayuda a desconectar del estrés y recargar tu energía.",
        imagen: imgEmp2,
    },
    {
        nombre: "Laura López",
        descripcion: "Laura trae precisión y control a cada sesión de Pilates, centrada en fortalecer el core, mejorar la postura y aumentar la conciencia corporal.",
        imagen: imgEmp3,
    },
    {
        nombre: "Miguel Alonso",
        descripcion: "Coach deportivo con experiencia en HIIT y fuerza. Campeón de Castilla la Mancha en Halterofilia en 2018 centra su experiencia en ayudar a los demás.",
        imagen: imgEmp4,
    },
    {
        nombre: "David Torres",
        descripcion: "Con su energía y música, David convierte cada clase de spinning en una experiencia de alto impacto cardiovascular",
        imagen: imgEmp5,
    },
];

const DashboardCarrousel = () => {
    return (
        <div className="px-4 py-6 bg-gray-400">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Conoce a nuestros entrenadores</h2>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {entrenadores.map((entrenador, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <div className="w-full max-w-sm bg-gray-300 shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={entrenador.imagen}
                                    alt={entrenador.nombre}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{entrenador.nombre}</h3>
                                    <p className="text-sm text-gray-900">{entrenador.descripcion}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DashboardCarrousel;