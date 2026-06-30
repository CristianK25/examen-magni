import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/contexto";
import type Modelo from "../modelo/modelo";

export default function PaginaFinal() {
    const {
        elementosSeleccionados,
        montoGastado,
    } = useContexto();

    const navigate = useNavigate();

    const formatearDinero = (monto: number) => {
        return "$" + monto.toLocaleString("es-AR");
    };

    // --- MODIFICAR (Punto 2 de la lista) ---
    // Reemplazar `p.stockActual || 0` por `p.cantidadSeleccionada || 0`
    const cantidadTotal = elementosSeleccionados.reduce(
        (total, p) => total + (p.stockActual || 0),
        0
    );
    // ---------------------------------------

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Resumen Final</h1>

            <div className="border border-gray-300 bg-white rounded shadow-sm">
                <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t">
                    ELEMENTOS SELECCIONADOS (Total: {cantidadTotal} Artículos)
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2">
                    <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                        <thead>
                            <tr>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio Unitario</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Cantidad</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elementosSeleccionados.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                                        No hay elementos en esta operación.
                                    </td>
                                </tr>
                            ) : (
                                elementosSeleccionados.map((elemento: Modelo) => (
                                    <tr key={elemento.codigo} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-2 font-medium text-gray-900">{elemento.codigo}</td>
                                        <td className="border border-gray-300 p-2 text-gray-600">{elemento.nombre}</td>
                                        <td className="border border-gray-300 p-2 text-gray-600">{formatearDinero(elemento.precioVenta)}</td>
                                        
                                        {/* --- MODIFICAR (Punto 3 de la lista) --- */}
                                        {/* Reemplazar `{elemento.stockActual}` por `{elemento.cantidadSeleccionada}` */}
                                        <td className="border border-gray-300 p-2 text-center font-bold">{elemento.stockActual}</td>
                                        
                                        <td className="border border-gray-300 p-2 font-semibold text-gray-900">
                                            {/* --- MODIFICAR (Punto 3 de la lista) --- */}
                                            {/* Reemplazar `elemento.stockActual * elemento.precioVenta` por `elemento.cantidadSeleccionada * elemento.precioVenta` */}
                                            {formatearDinero(elemento.stockActual * elemento.precioVenta)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 font-bold text-gray-800">
                                <td colSpan={4} className="border border-gray-300 p-2 text-right">
                                    Total de la Operación
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-900 font-bold">
                                    {formatearDinero(montoGastado)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded text-sm transition-colors shadow-sm"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
}
