import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/contexto";
import type Modelo from "../modelo/modelo";

export default function Pagina1() {
    const {
        elementosDisponibles,
        elementosSeleccionados,
        montoGastado,
        agregarElemento,
        quitarElemento,
        puedeConfirmarOperacion,
    } = useContexto();

    const [codigoBuscado, setCodigoBuscado] = useState("");
    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
    const navigate = useNavigate();

    const formatearDinero = (monto: number) => {
        return "$" + monto.toLocaleString("es-AR");
    };

    const handleAccion = () => {
        const codigoNormalizado = codigoBuscado.trim().toUpperCase();
        
        // --- MODIFICAR Y AGREGAR (Punto 4 de la lista) ---
        // Aquí agregarías la validación del input cantidad:
        // const cantidadNum = parseFloat(cantidadBuscada);
        // if (isNaN(cantidadNum) || cantidadNum <= 0) {
        //     setErrorValidacion("La cantidad debe ser un número mayor a cero.");
        //     return;
        // }
        //
        // Y modificarías la siguiente llamada agregando cantidadNum:
        // const resultado = agregarElemento(codigoNormalizado, cantidadNum);
        // -------------------------------------------------

        const resultado = agregarElemento(codigoNormalizado);

        if (resultado) {
            setErrorValidacion(resultado);
        } else {
            setErrorValidacion(null);
            setCodigoBuscado("");
            // --- AGREGAR (Punto 4) ---
            // setCantidadBuscada("1");
            // -------------------------
        }
    };

    const handleConfirmar = () => {
        const resultado = puedeConfirmarOperacion();
        if (resultado) {
            setErrorValidacion(resultado);
        } else {
            setErrorValidacion(null);
            navigate("/final");
        }
    };

    return (
        <div className="p-4 space-y-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Página Principal</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TABLA IZQUIERDA: ELEMENTOS DISPONIBLES */}
                <div className="border border-gray-300 bg-white rounded shadow-sm h-fit">
                    <div className="flex gap-4 p-3 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Ingresar Código (Ej: P001)"
                            value={codigoBuscado}
                            onChange={(e) => setCodigoBuscado(e.target.value)}
                            className="border border-gray-300 rounded p-2 flex-grow text-xs"
                        />
                        {/* --- AGREGAR (Punto 3 de la lista) --- */}
                        {/* 
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="Cantidad"
                            value={cantidadBuscada}
                            onChange={(e) => setCantidadBuscada(e.target.value)}
                            className="border border-gray-300 rounded p-2 text-xs w-24" 
                        /> 
                        */}
                        {/* -------------------------------------- */}
                        <button
                            onClick={handleAccion}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded text-xs transition-colors"
                        >
                            Acción
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto p-2">
                        <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementosDisponibles.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                                            No hay elementos disponibles.
                                        </td>
                                    </tr>
                                ) : (
                                    elementosDisponibles.map((elemento: Modelo) => (
                                        <tr key={elemento.codigo} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2 font-medium text-gray-900">{elemento.codigo}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{elemento.nombre}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{formatearDinero(elemento.precioVenta)}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    onClick={() => agregarElemento(elemento.codigo)}
                                                    className="bg-blue-600 border border-blue-700 text-white px-3 py-1 font-semibold text-xs hover:bg-blue-700 rounded transition-colors"
                                                >
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLA DERECHA: ELEMENTOS SELECCIONADOS */}
                <div className="border border-gray-300 bg-white rounded shadow-sm h-fit">
                    <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t flex justify-between items-center">
                        <span>Seleccionados</span>
                        <span className="text-blue-700">Total: {formatearDinero(montoGastado)}</span>
                    </div>
                    <div className="max-h-[465px] overflow-y-auto p-2">
                        <table className="w-full border-collapse border border-gray-300 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Código</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Precio</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Cantidad</th>
                                    <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementosSeleccionados.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                                            Aún no has seleccionado ningún elemento.
                                        </td>
                                    </tr>
                                ) : (
                                    elementosSeleccionados.map((elemento: Modelo) => (
                                        <tr key={elemento.codigo} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2 font-medium text-gray-900">{elemento.codigo}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{elemento.nombre}</td>
                                            <td className="border border-gray-300 p-2 text-gray-600">{formatearDinero(elemento.precioVenta)}</td>
                                            
                                            {/* --- MODIFICAR (Punto 5 de la lista) --- */}
                                            {/* Cambiar `{elemento.stockActual}` por `{elemento.cantidadSeleccionada}` */}
                                            <td className="border border-gray-300 p-2 text-center text-gray-900">{elemento.stockActual}</td>
                                            
                                            <td className="border border-gray-300 p-2 text-center">
                                                {/* --- MODIFICAR (Punto 5) --- */}
                                                {/* Cambiar `quitarElemento(elemento)` por `quitarElemento(elemento.codigo)` */}
                                                <button
                                                    onClick={() => quitarElemento(elemento)}
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

            {/* SECCIÓN CONFIRMAR Y ERRORES */}
            <div className="border border-gray-300 p-4 bg-white rounded shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    {errorValidacion ? (
                        <p className="text-red-600 font-bold text-sm border border-red-300 bg-red-50 p-2 rounded">
                            {errorValidacion}
                        </p>
                    ) : null}
                </div>
                <button
                    onClick={handleConfirmar}
                    className="bg-gray-800 border border-gray-900 text-white px-6 py-2 font-bold text-sm hover:bg-gray-900 rounded self-end shadow-sm transition-colors"
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
}
