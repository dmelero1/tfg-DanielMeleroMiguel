import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<typeof form> & { general?: string }>({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({});
        setSuccessMessage("");
    };

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!form.username.trim()) newErrors.username = "El nombre de usuario es requerido.";
        if (!form.email.trim()) newErrors.email = "El correo electrónico es requerido.";
        if (!form.password.trim()) {
            newErrors.password = "La contraseña es requerida.";
        } else if (form.password.length < 5) {
            newErrors.password = "La contraseña debe tener al menos 5 caracteres.";
        }
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrors({ general: data.error });
                return;
            }

            setSuccessMessage(data.message);
            setForm({ username: "", email: "", password: "", role: "user" });
        } catch (err) {
            setErrors({ general: "No se pudo conectar con el servidor." });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-10">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[70vh]">
                <div className="text-gray-300 flex flex-col justify-center px-4">
                    <h2 className="text-2xl font-bold mb-8">Bienvenido administrador</h2>
                    <p className="mb-2">Este formulario permite añadir usuarios a la aplicación.</p>
                    <p className="mb-2">Debe asignar un nombre, un correo y una contraseña a cada usuario.</p>
                    <p className="mb-2">El usuario puede ser usuario (sin privilegios) o admin.</p>
                    <p className="mb-2">
                        Una vez pulse el botón de registrar, el usuario aparecerá en la base de datos.
                    </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border-4 border-black border-t-0 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-0.5 hover:shadow-[1px_2px_0_0_#000] focus:outline-none">
                    <h2 className="text-2xl font-bold mb-4 text-center">Registrar nuevo usuario</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Nombre de usuario"
                            className="w-full p-3 bg-gray-700 rounded border-2 border-black shadow-[2px_4px_0_0_#000]"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            className="w-full p-3 bg-gray-700 rounded border-2 border-black shadow-[2px_4px_0_0_#000]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                className="w-full p-3 bg-gray-700 rounded border-2 border-black shadow-[2px_4px_0_0_#000] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-4 right-4 text-gray-300 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 rounded border-2 border-black shadow-[2px_4px_0_0_#000]"
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>

                        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 rounded-2xl border-2 border-black border-t-0 bg-green-600 shadow-[2px_4px_0_0_#000] transition-transform duration-300 hover:translate-y-0.5 hover:shadow-[1px_2px_0_0_#000] focus:outline-none"
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
