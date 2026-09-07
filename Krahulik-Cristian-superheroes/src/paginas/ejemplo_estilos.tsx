// 📌 ARCHIVO DE CONSULTA / MACHETE DE ESTILOS TAILWIND

export function EjemplosEstilos() {
    return (
        <div>
            {/* 1. GRILLA DE 4 COLUMNAS (Para listas de tarjetas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4"></div>

            {/* 2. TARJETA INDIVIDUAL (Card) */}
            <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center bg-white"></div>

            {/* 3. BOTÓN PRINCIPAL */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">Boton</button>

            {/* 4. BOTÓN SECUNDARIO / VOLVER */}
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium">Volver</button>

            {/* 5. INPUT DE BÚSQUEDA */}
            <input className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            {/* 6. VISTA DETALLE EN 2 COLUMNAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg max-w-2xl mx-auto bg-white"></div>

            {/* 7. TÍTULO PRINCIPAL DE PÁGINA (H1) */}
            <h1 className="text-2xl font-bold text-center mb-6">Título de la Página</h1>

            {/* 9. CONTENEDOR ESTIRADO ANCHO FIJO (Para filas de datos) */}
            <div className="w-96 grid grid-cols-1 gap-4 mb-6"></div>

            {/* 8. RENGLÓN CLAVE-VALOR SEPARADO (Izquierda / Derecha) */}
            <p className="flex justify-between border-b py-1">
                <span className="font-semibold">Etiqueta:</span>
                <span>Valor</span>
            </p>

            {/* 10. IMAGEN EN CONTENEDOR (Estirada cubriendo el recuadro) */}
            <div className="flex items-center justify-center h-64 w-full bg-gray-100 rounded overflow-hidden">
                <img src="/assets/img/ejemplo.png" alt="ejemplo" className="w-full h-full object-cover" />
            </div>

            {/* 11. IMAGEN CON TAMAÑO FIJO Y SOMBRA (Alternativa directa) */}
            <img src="/assets/img/ejemplo.png" alt="ejemplo" className="w-48 h-32 object-cover rounded shadow my-2" />

            {/* 12. BOTÓN COMPACTO PEQUEÑO (Ancho ajustado al texto) */}
            <button className="bg-gray-700 text-white px-2.5 py-1 text-xs rounded hover:bg-gray-800 font-medium w-fit">Botón Pequeño</button>

            {/* 13. BARRA SUPERIOR NAV / HEADER CON FLEXBOX (En una sola línea) */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 border rounded shadow-sm w-full"></div>

            {/* 14. SELECT / DESPLEGABLE ESTILIZADO SIMPLE (Directo sin cambiar estructura) */}
            <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer">
                <option value="">Seleccione una opción...</option>
            </select>

            {/* 15. OPCIONAL: CAMPO AGRUPADO VERTICAL (Label arriba de Input/Select) */}
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Etiqueta</label>
                <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer w-full">
                    <option value="">Opción</option>
                </select>
            </div>

            {/* 16. OPCIONAL: ELEMENTO QUE OCUPA 2 COLUMNAS EN GRILLA (Boton o div a lo ancho) */}
            <div className="md:col-span-2"></div>
        </div>
    );
}
