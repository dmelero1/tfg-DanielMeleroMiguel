import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

type BMIRecord = {
  id: number;
  user_id: number;
  height_cm: number;
  weight_kg: number;
  bmi_value: number;
  created_at: string;
};

const getStatus = (bmi: number) => {
  if (bmi < 18.5)
    return {
      label: "Bajo peso",
      color: "bg-yellow-300 text-black",
      message:
        "Puede indicar desnutrición, problemas de salud como trastornos alimentarios o suponer un riesgo aumentado de enfermedades óseas y problemas inmunológicos.",
    };
  if (bmi < 24.9)
    return {
      label: "Normal",
      color: "bg-green-500",
      message: "Indica un peso saludable y generalmente está asociado con menores riesgos de enfermedades crónicas. Se recomienda dieta equilibrada y ejercicio regular.",
    };
  if (bmi < 29.9)
    return {
      label: "Sobrepeso",
      color: "bg-orange-400",
      message:
        "Puede implicar un riesgo mayor de enfermedades cardíacas, hipertensión y diabetes tipo 2. Deberías ajustar tu dieta o aumentar tu actividad física.",
    };
  return {
    label: "Obesidad",
    color: "bg-red-600",
    message:
      "Supone riesgos significativos de enfermedades graves como problemas cardíacos, ciertos tipos de cáncer... Necesidad de intervención médica y cambios en el estilo de vida significativos como prioridad.",
  };
};

const ProfileCalculator = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [latestBMI, setLatestBMI] = useState<BMIRecord | null>(null);
  const [history, setHistory] = useState<BMIRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchHistoryAndLatest = async () => {
    try {
      const [bmiRes, historyRes] = await Promise.all([
        fetch(`http://localhost:3001/api/bmi/${user.id}`),
        fetch(`http://localhost:3001/api/bmi-history/${user.id}`),
      ]);

      if (bmiRes.ok) {
        const latest = await bmiRes.json();
        setLatestBMI(latest);
      } else {
        setLatestBMI(null);
      }

      if (historyRes.ok) {
        const data = await historyRes.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Error al obtener datos de IMC:", err);
    }
  };

  useEffect(() => {
    fetchHistoryAndLatest().finally(() => setLoading(false));
  }, []);

  const handleCalculate = async () => {
    setErrorMessage("");
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return;

    const bmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));

    try {
      setIsCalculating(true);
      const res = await fetch("http://localhost:3001/api/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          height_cm: h,
          weight_kg: w,
          bmi_value: bmi,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Error al guardar IMC.");
        return;
      }

      await fetchHistoryAndLatest();
      setHeight("");
      setWeight("");
    } catch (err) {
      console.error("Error al guardar IMC:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/bmi-history/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const newHistory = history.filter((item) => item.id !== id);
        setHistory(newHistory);

        if (latestBMI?.id === id) {
          const newLatest = newHistory[0] || null;
          setLatestBMI(newLatest);
        }
      }
    } catch (err) {
      console.error("Error eliminando historial:", err);
    }
  };

  const renderBar = (bmi: number) => {
    const { label, color } = getStatus(bmi);
    const percent = Math.min(100, (bmi / 40) * 100);

    return (
      <div className="w-full bg-gray-700 h-6 rounded-4xl overflow-hidden mb-2">
        <div
          className={`${color} h-full text-xs font-bold flex items-center justify-end pr-2 transition-all duration-300`}
          style={{ width: `${percent}%` }}
        >
          {label} ({bmi})
        </div>
      </div>
    );
  };

  if (loading) return <p className="text-center text-white">Cargando datos...</p>;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Calculadora de IMC</h2>

      {errorMessage && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {latestBMI && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tu último resultado:</h3>
          {renderBar(latestBMI.bmi_value)}
          <p className="text-sm text-gray-300">
            {getStatus(latestBMI.bmi_value).message}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 rounded-2xl bg-gray-700 text-white outline-none border-2 border-black shadow-[2px_4px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-0.5 hover:shadow-[1px_2px_0_0_#000]"
            placeholder="Ej: 175"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 rounded-2xl bg-gray-700 text-white outline-none border-2 border-black shadow-[2px_4px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-0.5 hover:shadow-[1px_2px_0_0_#000]"
            placeholder="Ej: 70"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={isCalculating}
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-3xl text-white font-semibold border-2 border-black shadow-[2px_4px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-0.5 hover:shadow-[1px_2px_0_0_#000]"
      >
        {isCalculating ? "Calculando..." : "Calcular IMC"}
      </button>

      {history.length > 1 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Historial de cálculos</h4>
          <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {history.map((item) => (
              <li key={item.id} className="bg-gray-700 rounded p-3 border-2 border-black shadow-[2px_4px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000]">
                <div className="flex justify-between items-center mb-3 text-sm text-gray-300">
                  <span>Fecha: {new Date(item.created_at).toLocaleString()}</span>
                  <div className="flex gap-4 items-center">
                    <span>IMC: {item.bmi_value}</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xl text-red-500 hover:text-red-300"
                      title="Eliminar"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
                  {renderBar(item.bmi_value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCalculator;
