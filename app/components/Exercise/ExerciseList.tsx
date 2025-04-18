import React, { useState } from "react";
import { exercises } from "../../data/exerciseData";
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

  const filtered = selectedGroup === "Todos"
    ? exercises
    : exercises.filter(e => e.muscleGroup === selectedGroup);

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
