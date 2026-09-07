import { useState } from "react"
import { useContexto } from "../contexto/heroes_context"
import { useNavigate } from "react-router-dom";

function Busqueda() {
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const { elementos, filtrarPorNivelPoder, filtrarPorEditorial } = useContexto();
    const navegarHacia = useNavigate()

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 m-4 bg-gray-50 border border-gray-200 rounded shadow-sm">
            <button
                onClick={() => navegarHacia("/comparar")}
                className="bg-gray-600 text-white px-3 py-1 text-sm rounded hover:bg-gray-700 font-medium w-fit">
                Comparar
            </button>

            <div className="flex items-center gap-1.5 text-sm">
                <span className="font-semibold text-gray-700 mr-1">Editorial:</span>
                <button
                    onClick={() => filtrarPorEditorial("Todas")}
                    className="bg-gray-600 text-white px-2.5 py-1 text-xs rounded hover:bg-gray-700 font-medium w-fit">
                    Todas
                </button>
                <span className="text-gray-400">|</span>
                <button
                    onClick={() => filtrarPorEditorial("Marvel")}
                    className="bg-blue-600 text-white px-2.5 py-1 text-xs rounded hover:bg-blue-700 font-medium w-fit">
                    Marvel
                </button>
                <span className="text-gray-400">|</span>
                <button
                    onClick={() => filtrarPorEditorial("DC")}
                    className="bg-red-600 text-white px-2.5 py-1 text-xs rounded hover:bg-red-700 font-medium w-fit">
                    DC
                </button>
            </div>

            <div className="flex items-center gap-2">
                <p>Filtrar por Nivel mayor a..</p>
                <input
                    className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Poder mayor a..."
                    value={textoBusqueda}
                    onChange={(e) => setTextoBusqueda(e.target.value)}
                />
                <button
                    onClick={() => filtrarPorNivelPoder(Number(textoBusqueda))}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 font-medium w-fit">
                    Buscar
                </button>
            </div>
        </div>
    )
}
export default Busqueda