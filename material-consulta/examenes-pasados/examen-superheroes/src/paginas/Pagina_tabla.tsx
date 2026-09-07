import { useNavigate } from "react-router-dom"
import TablaSuperheroes from "../componentes/tabla"

function PaginaTabla() {
    const navegarHacia = useNavigate()
    return (
        <div>
            <button
                onClick={() => navegarHacia(`/`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Volver
            </button>
            <TablaSuperheroes />
        </div>
    )
}
export default PaginaTabla