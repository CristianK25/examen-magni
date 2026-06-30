import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContexto } from '../contexto/contexto'
import type FrutaVerdura from "../modelo/FrutaVerdura";

export default function ListaVerduleriaPage() {

    const {
        productosDisponibles,
        productosSeleccionados,
        presupuestoInicial,
        montoDisponible,
        montoGastado,
        agregarProducto,
        puedeGenerarCompra,
        quitarProducto,
    } = useContexto()

    const [codigoBuscado, setCodigoBuscado] = useState("");

    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

    const navigate = useNavigate();

    const formatearDinero = (monto: number) => {
        return "$" + monto.toLocaleString("es-AR");
    };

    const comprarProducto = () => {
        // Normalizamos el texto (quitamos espacios y pasamos a mayúscula)
        const codigoNormalizado = codigoBuscado.trim().toUpperCase();

        // 1. Llamamos al contexto pasándole el código normalizado
        const resultado = agregarProducto(codigoNormalizado);

        // 2. Si nos devolvió un texto de error, lo guardamos para que se muestre en rojo
        if (resultado) {
            setErrorValidacion(resultado);
        } else {
            // 3. Si todo salió bien (devolvió null), borramos errores y limpiamos el input
            setErrorValidacion(null);
            setCodigoBuscado("");
        }
    };

    const handleConfirmar = () => {
        const resultado = puedeGenerarCompra();
        if (resultado) {
            setErrorValidacion(resultado);
        } else {
            setErrorValidacion(null);
            navigate("/final");
        }
    };

    return (
        <div>
            {/* Contenedor Grid para poner las tablas lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 1. TABLA IZQUIERDA: PRODUCTOS DISPONIBLES */}
                <div className="border border-gray-300 bg-white rounded shadow-sm h-fit">
                    <div className="flex gap-4 p-3 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Ingresar Código Producto (Ej: P001)"
                            value={codigoBuscado}
                            onChange={(e) => setCodigoBuscado(e.target.value)}
                            className="border border-gray-300 rounded p-2 flex-grow text-xs"
                        />
                        <input
                            type="numer"
                            placeholder="Ingresar la cantidad"
                            onChange={(e) => setCodigoBuscado(e.target.value)}
                            className="border border-gray-300 rounded p-2 flex-grow text-xs"
                        />
                        <button
                            onClick={comprarProducto}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded text-xs transition-colors"
                        >
                            Buscar y Comprar
                        </button>
                    </div>

                    {/* Contenedor del scroll */}
                    <div className="max-h-[400px] overflow-y-auto p-2">
                        <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio x Kilo</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Stock</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosDisponibles.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                                            No hay más productos disponibles.
                                        </td>
                                    </tr>
                                ) : (
                                    productosDisponibles.map((producto: FrutaVerdura) => (
                                        <tr key={producto.codigo} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2 font-medium text-gray-900">{producto.codigo}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{producto.nombre}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{formatearDinero(producto.precioVenta)}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{producto.stockActual}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    onClick={() => agregarProducto(producto.codigo)}
                                                    className="bg-blue-600 border border-blue-700 text-white px-3 py-1 font-semibold text-xs hover:bg-blue-700 rounded transition-colors"
                                                >
                                                    Comprar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 2. TABLA DERECHA: CARRITO DE COMPRAS */}
                <div className="border border-gray-300 bg-white rounded shadow-sm h-fit">
                    <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t flex justify-between items-center">
                        <span>Carrito de compras</span>
                        <span className="text-blue-700">Total: {formatearDinero(montoGastado)}</span>
                    </div>
                    {/* Contenedor del scroll */}
                    <div className="max-h-[465px] overflow-y-auto p-2">
                        <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio x kilo</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Cantidad</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Subtotal</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosSeleccionados.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="border border-gray-300 p-4 text-center text-gray-500">
                                            Aún no has comprado ningún producto.
                                        </td>
                                    </tr>
                                ) : (
                                    productosSeleccionados.map((producto: FrutaVerdura) => (
                                        <tr key={producto.codigo} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2 font-medium text-gray-900">{producto.codigo}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{producto.nombre}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{producto.precioVenta}</td>
                                            <td className="border border-gray-300 p-2 text-gray-900">{producto.stockActual}</td>
                                            <td className="border border-gray-300 p-2 text-gray-900 font-semibold">{formatearDinero(producto.precioVenta * (producto.stockActual || 1))}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    onClick={() => quitarProducto(producto)}
                                                    className="bg-red-600 border border-red-700 text-white px-3 py-1 font-semibold text-xs hover:bg-red-700 rounded transition-colors"
                                                >
                                                    Quitar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className="border border-gray-300 p-4 bg-white rounded shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    {/* Mensaje de error de validación en rojo si las reglas deportivas fallaron */}
                    {errorValidacion ? (
                        <p className="text-red-600 font-bold text-sm border border-red-300 bg-red-50 p-2 rounded">
                            {errorValidacion}
                        </p>
                    ) : null}
                </div>

                <button
                    onClick={handleConfirmar}
                    className="bg-gray-700 border border-gray-800 text-white px-6 py-2 font-bold text-sm hover:bg-gray-800 rounded self-end"
                >
                    Confirmar Compra
                </button>
            </div>
        </div>
    )
}