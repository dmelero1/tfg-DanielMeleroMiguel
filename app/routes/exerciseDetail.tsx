import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`http://localhost:3001/exercises/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el ejercicio");
        }
        const data = await response.json();
        setExercise(data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener el ejercicio");
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!exercise) return <div>Ejercicio no encontrado</div>;

  const imagePath = `/${exercise.imageUrl}`;

  return (
    <div className="p-8 bg-gray-300 text-black max-w-5xl mx-auto mt-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center uppercase">{exercise.name}</h2>
      <img
        src={imagePath}
        alt={exercise.name}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <h2 className="text-2xl font-bold my-6">Información General</h2>
      <span className="text-xs sm:text-sm bg-blue-100 text-blue-700 border-2 border-blue-500 px-3 sm:px-4 py-1 sm:py-2 mr-2 sm:mr-4 rounded-full cursor-pointer">
        {exercise.muscleGroup}
      </span>
      <span
        className={`text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 mr-2 sm:mr-4 rounded-full border-2
          ${exercise.difficulty === "Principiante"
            ? "bg-green-100 text-green-700 border-green-500"
            : exercise.difficulty === "Medio"
            ? "bg-yellow-100 text-yellow-700 border-yellow-500"
            : "bg-red-100 text-red-700 border-red-500"}`}
      >
        {exercise.difficulty}
      </span>
      <span className="text-xs sm:text-sm bg-gray-200 text-gray-700 border-2 border-gray-400 px-3 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer">
        {exercise.equipment}
      </span>

      <h2 className="text-xl font-semibold mt-5">Descripción: </h2> {exercise.description}

      {exercise.beneficios && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Beneficios:</h3>
          <ol className="list-disc list-inside pl-4">
            {exercise.beneficios.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ol>
        </div>
      )}

      {exercise.pasos && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Instrucciones:</h3>
          <ol className="list-decimal list-inside pl-4">
            {exercise.pasos.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <FaArrowLeft />
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetail;