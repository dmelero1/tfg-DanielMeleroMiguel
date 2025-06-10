import { FaArrowLeft } from 'react-icons/fa';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative">
      <button 
        onClick={() => window.history.back()} 
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Volver atrás"
      >
        <FaArrowLeft className="text-gray-700 text-xl" />
      </button>
      
      <div className="p-8 text-black max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidad</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="font-medium text-blue-800">
            En esta plataforma nos tomamos muy en serio la protección de tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">1. Datos que Recopilamos</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Al registrarte recopilamos datos como nombre, correo electrónico y preferencias de reserva. Estos datos se usan exclusivamente para ofrecerte el servicio.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">2. Uso de la Información</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Usamos tus datos para gestionar reservas, enviarte notificaciones y mejorar la experiencia del usuario. Nunca vendemos tu información a terceros.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">3. Tus Derechos</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Puedes acceder, modificar o eliminar tus datos personales en cualquier momento escribiéndonos a nuestro correo de contacto.
        </p>
        
        <div className="flex justify-center mt-8">
          <div className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-md">
            dmsport@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}