export type Exercise = {
    id: string;
    name: string;
    muscleGroup: "Pecho" | "Espalda" | "Bíceps" | "Tríceps" | "Abdomen" | "Hombros" | "Piernas" | "Cardio";
    difficulty: "Principiante" | "Medio" | "Avanzado";
    equipment: string;
    imageUrl: string;
    description?: string;
    beneficios?: string[];
    pasos?: string[];
  };
  