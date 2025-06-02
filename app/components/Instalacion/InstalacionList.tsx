import { useEffect, useState } from "react";
import InstalacionCard from "./InstalacionCard";

type Pista = {
    id: string;
    tipo: "padel" | "tenis";
    nombre: string;
};

export default function InstalacionList() {
    const [pistas, setPistas] = useState<Pista[]>([]);
    useEffect(() => {
        const fetchPistas = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/pistas");
                const data = await res.json();
                setPistas(data);
            } catch (err) {
                console.error("Error al obtener pistas:", err);
            }
        };
        fetchPistas();
    }, []);

    return (
        <div className="grid gap-6 p-4">
            {pistas.map((pista) => (
                <InstalacionCard key={pista.id} pista={pista} />
            ))}
        </div>
    );
}