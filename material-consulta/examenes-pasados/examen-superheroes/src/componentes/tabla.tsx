import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/heroes_context";

function TablaSuperheroes() {
    const { elementosFiltrados } = useContexto();
    const navegarHacia = useNavigate()

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Tabla de superheroes</h1>
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Editorial</th>
                        <th className="px-4 py-2">Origen</th>
                        <th className="px-4 py-2">Poderes</th>
                        <th className="px-4 py-2">Nivel de Poder</th>
                        <th className="px-4 py-2">Acciones</th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {elementosFiltrados.map(
                        (heroe) => {
                            return (
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{heroe.nombre}</td>
                                    <td className="px-4 py-2">{heroe.editorial}</td>
                                    <td className="px-4 py-2">{heroe.origen}</td>
                                    <td className="px-4 py-2">
                                        <ul>
                                            {heroe.poderes.map(
                                                (poder) => (
                                                    <li>{poder}</li>
                                                )
                                            )}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-2">{heroe.nivelPoder}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => navegarHacia(`/heroes/${heroe.id}`)}
                                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium">
                                            Ver Detalle
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default TablaSuperheroes