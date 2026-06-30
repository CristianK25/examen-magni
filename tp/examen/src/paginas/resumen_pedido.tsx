import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/contexto"
import { useState } from "react";
import type Modelo from "../modelo/FrutaVerdura";
import type FrutaVerdura from "../modelo/FrutaVerdura";

export default function ResumenPedidoPage() {

    const {
        productosSeleccionados,
        montoDisponible,
        montoGastado,
    } = useContexto()

    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

    const navigate = useNavigate();

    const formatearDinero = (monto: number) => {
        return "$" + monto.toLocaleString("es-AR");
    };
    const cantidadTotal = productosSeleccionados.reduce(
        (total, p) => total + (p.stockActual || 0),
        0
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Cabecera de compra confirmada con círculo de check */}
            <div className="bg-green-50 border border-green-300 p-4 rounded shadow-sm flex items-start gap-4">
            </div>

            <div className="border border-gray-300 bg-white rounded shadow-sm">
                <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t">
                    PRODUCTOS COMPRADOS (Total: {cantidadTotal} Artículos)
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2">
                    <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                        <thead>
                            <tr>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código Producto</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio Compra</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio Venta</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Stock</th>
                                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosSeleccionados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                                        No hay productos seleccionados.
                                    </td>
                                </tr>
                            ) : (
                                productosSeleccionados.map((producto: FrutaVerdura) => (
                                    <tr key={producto.codigo} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-2 font-medium text-gray-900">{producto.codigo}</td>
                                        <td className="border border-gray-300 p-2 text-gray-600">{producto.nombre}</td>
                                        <td className="border border-gray-300 p-2 text-gray-600">{producto.precioCompra}</td>
                                        <td className="border border-gray-300 p-2 text-gray-600">{formatearDinero(producto.precioVenta)}</td>
                                        <td className="border border-gray-300 p-2 text-center font-bold">{producto.stockActual}</td>
                                        <td className="border border-gray-300 p-2 font-semibold text-gray-900">{formatearDinero(producto.stockActual * producto.precioVenta)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 font-bold text-gray-800">
                                <td colSpan={5} className="border border-gray-300 p-2 text-right">
                                    {cantidadTotal} Artículos Comprados
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-955 font-bold">
                                    {formatearDinero(montoGastado)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Botón Aceptar para regresar a la pantalla principal */}
            <div className="flex justify-end">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded text-sm transition-colors shadow-sm"
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}