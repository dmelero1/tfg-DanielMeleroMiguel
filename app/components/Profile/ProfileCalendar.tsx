import { useEffect, useState } from "react";
import { Link } from "react-router";

import { MdDelete } from "react-icons/md";
import { IoCalendar, IoBed } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ProfileCalendar = () => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [exercises, setExercises] = useState<any[]>([]);
    const [calendarData, setCalendarData] = useState<{ [key: string]: any[] }>({});
    const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

    const getMuscleLabel = (group: string) => {
        switch (group) {
            case "Pectorales": return { label: "Pectorales" };
            case "Piernas": return { label: "Piernas" };
            case "Espalda": return { label: "Espalda" };
            case "Hombros": return { label: "Hombros" };
            case "Bíceps": return { label: "Bíceps" };
            case "Tríceps": return { label: "Tríceps" };
            case "Abdomen": return { label: "Abdomen" };
            case "Cardio": return { label: "Cardio" };
            default: return { label: group };
        }
    };


    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        fetch("http://localhost:3001/exercises")
            .then(res => res.json())
            .then(data => setExercises(data))
            .catch(err => console.error("Error al obtener ejercicios:", err));
    }, []);

    const loadCalendar = () => {
        if (!user?.id) return;

        fetch(`http://localhost:3001/api/calendar/${user.id}`)
            .then(res => res.json())
            .then(data => {
                const newCalendar: { [key: string]: any[] } = {};
                data.forEach((entry: any) => {
                    if (!newCalendar[entry.day_of_week]) newCalendar[entry.day_of_week] = [];
                    newCalendar[entry.day_of_week].push({ ...entry, idAssignment: entry.id });
                });
                setCalendarData(newCalendar);
            })
            .catch(err => console.error("Error al obtener asignaciones:", err));
    };

    useEffect(() => {
        loadCalendar();
    }, []);

    const handleAddExercise = async (day: string, exercise: any) => {
        try {
            const res = await fetch("http://localhost:3001/api/calendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.id,
                    day_of_week: day,
                    exercise_id: exercise.id
                })
            });
            if (res.ok) {
                loadCalendar();
            }
        } catch (err) {
            console.error("Error al añadir ejercicio:", err);
        }
    };

    const handleDeleteAssignment = async (day: string, assignmentId: number) => {
        try {
            const res = await fetch(`http://localhost:3001/api/calendar/${assignmentId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setCalendarData(prev => ({
                    ...prev,
                    [day]: (prev[day] || []).filter((ex: any) => ex.idAssignment !== assignmentId)
                }));
            }
        } catch (err) {
            console.error("Error al eliminar asignación:", err);
        }
    };

    const handleClearCalendar = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/calendar/clear/${user.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                loadCalendar();
            } else {
                console.error("No se pudo borrar el calendario.");
            }
        } catch (err) {
            console.error("Error al borrar el calendario:", err);
        }
    };

    return (
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
                    <IoCalendar />
                    Calendario Semanal
                </h2>
                <button
                    onClick={handleClearCalendar}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3 py-2 rounded"
                    title="Iniciar Nueva Semana"
                >
                    <FiRefreshCw />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-white text-sm font-semibold mb-4">
                {daysOfWeek.map(day => (
                    <div key={day} className="bg-gray-700 py-2 rounded">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {daysOfWeek.map(day => {
                    const dayExercises = calendarData[day] || [];
                    const hasExercises = dayExercises.length > 0;

                    return (
                        <div
                            key={day}
                            className={`p-3 rounded border border-gray-600 text-white text-sm cursor-pointer transition hover:bg-gray-700
                                ${selectedDay === day ? "bg-indigo-950" : day === "Sábado" || day === "Domingo" ? "bg-gray-800" : "bg-gray-900"}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {hasExercises ? (
                                <ul className="space-y-2 mb-4">
                                    {dayExercises.map((ex, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between items-center border-b border-gray-600 py-1 last:border-none"
                                        >
                                            <Link
                                                to={`/exercises/${ex.exercise_id}`}
                                                className="hover:underline text-gray-200 hover:text-blue-300 truncate max-w-[100px]"
                                            >
                                                {ex.nombre}
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteAssignment(day, ex.assignmentId)}
                                                className="text-base text-red-500 hover:text-red-300"
                                                title="Eliminar"
                                            >
                                                <MdDelete />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                                    <IoBed className="text-xl mb-1" />
                                    <span className="text-xs">Descanso</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDay && (
                <div className="mt-8">
                    <h3 className="text-white text-base sm:text-lg font-semibold mb-4">
                        Añadir ejercicio el {selectedDay}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {[...new Set(exercises.map(ex => ex.muscleGroup))].map((group) => (
                            <button
                                key={group}
                                onClick={() => setSelectedMuscle(group)}
                                className={`px-4 py-1 rounded-full text-sm font-semibold transition 
                            ${selectedMuscle === group
                                        ? "bg-indigo-800 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {group}
                            </button>
                        ))}
                    </div>

                    {selectedMuscle && (
                        <div>
                            <label className="text-sm text-gray-300 mb-1 block">Selecciona un ejercicio</label>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {exercises
                                    .filter(ex => ex.muscleGroup === selectedMuscle)
                                    .map((ex) => {
                                        const tag = getMuscleLabel(ex.muscleGroup);
                                        return (
                                            <div
                                                key={ex.id}
                                                className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-xl shadow flex flex-col justify-between transition"
                                            >
                                                <div>
                                                    <h4 className="text-base font-bold mb-1">{ex.name}</h4>
                                                    <p className="text-sm text-gray-300">{tag.label}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddExercise(selectedDay!, ex)}
                                                    className="mt-3 bg-indigo-800 hover:bg-indigo-950 text-white py-1 px-3 rounded text-sm self-end"
                                                >
                                                    Añadir
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileCalendar;
