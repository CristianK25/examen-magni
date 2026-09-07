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

            {/* 14. DESPLEGABLE / SELECT (Para comparadores o filtros) */}
            <select className="border border-gray-300 rounded px-3 py-1.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccione una opción...</option>
            </select>

            {/* 15. LISTA DE ELEMENTOS / PODERES (ul / li) */}
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Elemento 1</li>
                <li>Elemento 2</li>
            </ul>

            {/* 16. ETIQUETA / BADGE / PILL (Para Marvel, DC, categorías o estados) */}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit">
                Categoría / Badge
            </span>

            {/* 17. TABLA HTML LIMPIA (Para listas tabulares o rankings) */}
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                    <tr>
                        <th className="px-4 py-2">Columna 1</th>
                        <th className="px-4 py-2">Columna 2</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2">Dato 1</td>
                        <td className="px-4 py-2">Dato 2</td>
                    </tr>
                </tbody>
            </table>

            {/* 18. CARTEL DE ALERTA / GANADOR / MENSAJE */}
            <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded text-center font-bold my-4">
                🏆 ¡Ganador / Resultado Exitoso!
            </div>

            {/* 19. LAYOUT DE COMPARADOR / BATALLA (Lado a lado con VS) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-6">
                {/* Tarjeta 1 */}
                <div className="border p-4 rounded shadow bg-white w-64 text-center">Héroe 1</div>
                <span className="text-2xl font-extrabold text-red-600">VS</span>
                {/* Tarjeta 2 */}
                <div className="border p-4 rounded shadow bg-white w-64 text-center">Héroe 2</div>
            </div>
        </div>
    );
}

// ================================================================================
// 📌 MACHETE RÁPIDO DE LÓGICA Y REACT (EXAMEN PROG4)
// ================================================================================

// --- 1. RUTAS CON PARÁMETROS (Detalle por ID) ---
// En App.tsx:
// <Route path="/detalle/:id" element={<PaginaDetalle />} />

// En la página que navega al detalle (ej. click en Card o Botón):
// const navigate = useNavigate();
// <button onClick={() => navigate(`/detalle/${item.id}`)}>Ver Detalle</button>

// En PaginaDetalle.tsx:
// import { useParams, useNavigate } from 'react-router-dom';
// const { id } = useParams();
// const item = elementos.find((el) => String(el.id) === id);


// --- 2. CARGA DE DATOS (JSON) ---
// Opción A: Archivo en /public/datos.json (Fetch en el context o componente)
// useEffect(() => {
//     fetch('/datos.json')
//         .then((res) => res.json())
//         .then((data) => setElementos(data))
//         .catch((err) => console.error("Error al cargar datos:", err));
// }, []);

// Opción B: Archivo en /src/datos.json (Import directo)
// import datosIniciales from '../datos.json';
// const [elementos, setElementos] = useState(datosIniciales);


// --- 3. MÉTODOS DE ARRAYS CLAVE ---
// A. FILTRAR (por categoría, búsqueda de texto o número):
// const filtrados = elementos.filter((e) => e.categoria === categoriaSeleccionada);
// const buscados = elementos.filter((e) => e.nombre.toLowerCase().includes(busqueda.toLowerCase()));

// B. BUSCAR UNO SOLO (por id o código):
// const encontrado = elementos.find((e) => e.id === Number(id));

// C. TOTALIZAR / SUMAR (Reduce - para totales, precios, presupuesto):
// const total = seleccionados.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
// const cantidadTotal = seleccionados.reduce((acc, el) => acc + el.cantidad, 0);

// D. AGREGAR SIN DUPLICADOS / SUMAR CANTIDAD:
// function agregarElemento(nuevo) {
//     setSeleccionados((prev) => {
//         const existe = prev.find((item) => item.id === nuevo.id);
//         if (existe) {
//             return prev.map((item) =>
//                 item.id === nuevo.id ? { ...item, cantidad: item.cantidad + 1 } : item
//             );
//         }
//         return [...prev, { ...nuevo, cantidad: 1 }];
//     });
// }

// E. QUITAR O DISMINUIR CANTIDAD:
// function quitarElemento(id) {
//     setSeleccionados((prev) => {
//         const existente = prev.find((item) => item.id === id);
//         if (!existente) return prev;
//         if (existente.cantidad === 1) {
//             return prev.filter((item) => item.id !== id);
//         }
//         return prev.map((item) =>
//             item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
//         );
//     });
// }

// F. VERIFICAR EXISTENCIA (Some):
// const yaEstaSeleccionado = seleccionados.some((item) => item.id === nuevo.id);


// --- 4. FORMULARIOS E INPUTS CONTROLADOS ---
// const [formulario, setFormulario] = useState({ nombre: '', categoria: '', cantidad: 1 });
//
// const handleChange = (e) => {
//     setFormulario({ ...formulario, [e.target.name]: e.target.value });
// };
//
// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formulario.nombre.trim()) return alert("El nombre es obligatorio");
//     // Lógica para guardar o procesar...
// };
//
// // En el JSX:
// <form onSubmit={handleSubmit} className="space-y-4">
//     <input name="nombre" value={formulario.nombre} onChange={handleChange} className="border p-2 rounded w-full" />
//     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
// </form>


// --- 5. RENDERIZADO CONDICIONAL ---
// {/* Mostrar solo si hay error o mensaje: */}
// {error && <p className="text-red-500 font-bold">{error}</p>}
//
// {/* Lista vacía vs Lista con items: */}
// {elementos.length === 0 ? (
//     <p className="text-gray-500">No hay elementos para mostrar.</p>
// ) : (
//     elementos.map((el) => <div key={el.id}>{el.nombre}</div>)
// )}


