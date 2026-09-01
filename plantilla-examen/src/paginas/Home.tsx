import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/HeroeContext";
import type Modelo from "../modelo/Hero";


export default function Pagina1() {
    const {
        elementosDisponibles,
        elementosSeleccionados,
    } = useContexto();

    const [codigoBuscado, setCodigoBuscado] = useState("");
    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
    const navigate = useNavigate();



    return (
        <div className="p-4 space-y-4 max-w-7xl mx-auto">

            {/* CONTENEDOR DE LA GRILLA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {heroes.map((producto) => (

                    /* LA TARJETA INDIVIDUAL */
                    <div
                        key={producto.id}
                        className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                    >
                        {/* Si tuvieras imagen, iría acá arriba */}
                        <div className="bg-gray-200 h-32 w-full flex items-center justify-center text-gray-500">
                            [Espacio para Imagen]
                        </div>

                        {/* CUERPO DE LA TARJETA */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg text-gray-900">{producto.titulo}</h3>
                            <p className="text-sm text-gray-600 mt-1 flex-grow">{producto.descripcion}</p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-extrabold text-blue-600 text-xl">${producto.precio}</span>
                                <button
                                    onClick={() => manejarClic(producto)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>

                    </div>
        </div>
            );
}
