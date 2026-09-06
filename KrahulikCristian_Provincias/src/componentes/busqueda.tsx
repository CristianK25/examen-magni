import { useState } from "react";
import { useContexto } from "../contexto/provincia_context"

function Busqueda() {
    const { elementos, filtrarPorSuperficie } = useContexto();
    const [textoBusqueda, setTextoBusqueda] = useState("");


    return (
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center m-4 mb-6 gap-2 w-full max-w-4xl mx-auto px-8 mt-8 border border-gray-200 p-4 shadow-sm rounded bg-gray-50">
            <p>Provincias | Superficie Provincia Mayor a:  </p>
            <input
                className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
            />
            <button
                onClick={() => filtrarPorSuperficie(Number(textoBusqueda))}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Buscar
            </button>
        </div>
    )
}

export default Busqueda