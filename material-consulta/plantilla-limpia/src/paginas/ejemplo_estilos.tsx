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
        </div>
    );
}
