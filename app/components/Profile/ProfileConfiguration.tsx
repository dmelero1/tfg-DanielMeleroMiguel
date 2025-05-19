import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ProfileConfiguration = () => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setUsername(parsed.username || "");
            setGenero(parsed.genero || "");
            setFechaNacimiento(parsed.fecha_nacimiento || "");
        }
    }, []);

    const roleColors: { [key: string]: string } = {
        admin: "bg-blue-600 text-white",
        usuario: "bg-green-600 text-white",
        otro: "bg-red-600 text-white",
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleSave = () => {
        if (!user || !user.email) return;

        fetch("http://localhost:3001/update-user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username,
                genero,
                fechaNacimiento,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const updatedUser = {
                        ...user,
                        username,
                        genero,
                        fecha_nacimiento: fechaNacimiento,
                    };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setSuccess("¡Cambios guardados!");
                    setTimeout(() => setSuccess(""), 3000);
                }
            })
            .catch((err) => {
                console.error("Error al guardar cambios", err);
            });
    };

    if (!user) return null;

    return (
        <div className="text-white">
            <div className="flex justify-center mb-6">
                <img
                    src="usuario.webp"
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-600"
                />
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Información personal</h2>
                <span className={`text-sm px-3 py-1 rounded-full font-semibold uppercase ${roleColors[user.role] || "bg-gray-500 text-white"}`}>
                    {user.role}
                </span>
            </div>

            {success && (
                <p className="text-green-400 text-sm text-center mb-4">{success}</p>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Nombre de usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white border border-gray-500 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                    >
                        <option value="">Selecciona tu género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Fecha de nacimiento</label>
                    <input
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                    />
                </div>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleSave}
                        className="w-1/2 text-white font-semibold py-2 px-4 rounded-2xl border-4 border-black border-t-0 bg-blue-600 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000] focus:outline-none"
                    >
                        Guardar cambios
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-1/2 text-white font-semibold py-2 px-4 rounded-2xl border-4 border-black border-t-0 bg-red-600 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000] focus:outline-none"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;