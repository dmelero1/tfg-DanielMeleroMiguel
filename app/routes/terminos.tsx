import { FaArrowLeft } from 'react-icons/fa';

export default function TerminosCondiciones() {
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
        <h1 className="text-3xl font-bold mb-6 text-center">Términos y Condiciones</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="font-medium text-blue-800">
            Bienvenido a nuestra plataforma. Al acceder y utilizar este sitio web, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices este servicio.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">1. Uso del Servicio</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          El uso de este sitio está destinado exclusivamente a usuarios mayores de 18 años. Nos reservamos el derecho de suspender o cancelar el acceso si se detecta un uso indebido.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">2. Reservas</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Al realizar una reserva, te comprometes a asistir en el horario seleccionado. En caso de no hacerlo, podríamos tomar acciones como penalizaciones o restricciones futuras.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">3. Cambios</h2>
        <p className="mb-6 pl-4 border-l-4 border-blue-200">
          Podemos actualizar estos términos en cualquier momento. Se te notificará en caso de cambios importantes.
        </p>
      </div>
    </div>
  );
}