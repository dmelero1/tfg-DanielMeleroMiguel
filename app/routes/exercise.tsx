// src/pages/exercise.tsx
import React from "react";
import ExerciseList from "../components/Exercise/ExerciseList";

const ExercisePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700 px-6 pt-4">Ejercicios</h1>
      <ExerciseList />
    </div>
  );
};

export default ExercisePage;
