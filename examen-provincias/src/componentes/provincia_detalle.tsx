import { useNavigate, useParams } from "react-router-dom"
import type ProvinciaModelo from "../modelo/Provincia"
import { useContexto } from "../contexto/provincia_context";

interface ProvinciaDetalleProp {
    provincia: ProvinciaModelo;
}
function ProvinciaDetalle({ provincia }: ProvinciaDetalleProp) {
    const navegarHacia = useNavigate()
    const { promedioPoblacion, promedioSuperficie } = useContexto();

    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center bg-white ">
            <h1 className="text-2xl font-bold text-center mb-6">{provincia.provincia}</h1>
            <div className="w-96 grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                <p className="flex justify-between border-b py-1" >
                    <span>
                        Abreviatura
                    </span>
                    <span>
                        {provincia.abreviatura}
                    </span>
                </p>

                <p className="flex justify-between border-b py-1">
                    <span>Capital:</span>
                    <span>{provincia.capital} </span>
                </p>

                <div className="flex items-center justify-center h-64 w-full bg-gray-100">
                    <img src={`/${provincia.bandera}`} alt={provincia.provincia} className="w-full h-full object-cover" />
                </div>

                <p className="flex justify-between border-b py-1">
                    <span>Fecha Autonomia: </span>
                    <span>{provincia.fechaAutonomia} </span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span>Poblacion </span>
                    <span>{provincia.poblacion} </span>
                </p>

                <p className="flex justify-between border-b py-1">
                    <span>Superficie </span>
                    <span>{provincia.superficie} </span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span>Promedio Poblacion: </span>
                    <span>{promedioPoblacion}</span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span>Promedio Superficie: </span>
                    <span>{promedioSuperficie}</span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span>Numero Departamento: </span>
                    <span>{provincia.nroDepartamentos} </span>
                </p>
                <button
                    onClick={
                        () => navegarHacia('/')
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                    Volver hacia la lista
                </button>
            </div>
        </div>
    )
}

export default ProvinciaDetalle