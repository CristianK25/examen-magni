import { useNavigate } from 'react-router-dom';
import type ProvinciaModelo from '../modelo/Provincia'


interface ProvinciaProps {
    provincia: ProvinciaModelo
}
function Provincia({ provincia }: ProvinciaProps) {
    const cambiarPagina = useNavigate();

    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center bg-white max-w-xs">
            <h2 className="text-lg font-bold mb-2">{provincia.provincia}</h2>

            <img
                src={provincia.bandera}
                alt={provincia.provincia}
                className="w-32 h-20 object-cover mb-2 border rounded"
            />
            <p className="text-gray-600 text-sm mb-3">Capital: {provincia.capital}</p>

            <button
                onClick={
                    () => cambiarPagina(`/detalle/${provincia.provincia}`)
                }
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 font-medium">
                VER MÁS
            </button>
        </div>
    )
}


export default Provincia