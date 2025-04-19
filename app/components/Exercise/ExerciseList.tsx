import React, { useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";

const muscleGroups = [
  "Todos",
  "Pecho",
  "Espalda",
  "Bíceps",
  "Tríceps",
  "Abdomen",
  "Hombros",
  "Piernas",
  "Cardio",
];

const ExerciseList = () => {
  const [selectedGroup, setSelectedGroup] = useState("Todos");
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/exercises")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema al obtener los ejercicios");
        }
        return response.json();
      })
      .then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = selectedGroup === "Todos"
    ? exercises
    : exercises.filter(e => e.muscleGroup === selectedGroup);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {muscleGroups.map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedGroup === group
                ? "bg-indigo-950 text-white"
                : "bg-white text-indigo-950 border-indigo-950 hover:bg-indigo-900 hover:text-white"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;