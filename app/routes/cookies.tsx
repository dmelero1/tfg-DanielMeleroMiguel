import { FaArrowLeft } from 'react-icons/fa';

export default function PoliticaCookies() {
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
        <h1 className="text-3xl font-bold mb-6 text-center">Política de Cookies</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="font-medium text-blue-800">
            Este sitio web utiliza cookies para mejorar la experiencia de navegación del usuario. Al continuar usando el sitio, aceptas el uso de cookies.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">1. ¿Qué son las cookies?</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a recordar tus preferencias y mejorar el servicio.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">2. Cookies que usamos</h2>
        <ul className="mb-6 pl-8 border-l-4 border-blue-200 space-y-2 list-disc">
          <li>Cookies de sesión</li>
          <li>Cookies analíticas (Google Analytics u otras)</li>
          <li>Cookies funcionales para guardar tus preferencias</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">3. Gestión de cookies</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Puedes deshabilitar las cookies desde la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades del sitio.
        </p>
      </div>
    </div>
  );
}