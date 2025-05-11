import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 px-4">
      <FaExclamationTriangle className="text-yellow-400 text-8xl mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-gray-400 text-center mb-6 max-w-md">
        La página que estás buscando no existe.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;