import React from "react";
import type { Exercise } from "../../types/exercise";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

type Props = {
    exercise: Exercise;
};

const ExerciseCard = ({ exercise }: Props) => {
    const { id, name, imageUrl, muscleGroup, difficulty, equipment } = exercise;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img src={imageUrl} alt={name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-xl font-bold text-black">{name}</h3>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{muscleGroup}</span>
                    <span className={`px-3 py-1 text-sm rounded-full border-2
                        ${difficulty === "Principiante"
                                ? "bg-green-100 text-green-700 border-green-500"
                                : difficulty === "Medio"
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-500"
                                    : "bg-red-100 text-red-700 border-red-500"
                        }`}
                    >
                        {difficulty}
                    </span>
                </div>
                <p className="text-sm text-gray-600">Equipamiento: {equipment}</p>
                <Link
                    to={`/exercises/${id}`}
                    className="mt-auto flex items-center justify-center gap-2 bg-gray-400 text-white py-2 rounded-full transition duration-300 hover:bg-gray-600"
                >
                    <FaEye />
                    Ver detalles
                </Link>
            </div>
        </div>
    );
};

export default ExerciseCard;