import { useMercado } from '../context/mercado_context';
import type JugadorMercado from '../modelo/JugadorMercado';

// =====================================================================================
// PÁGINA FINAL: PlantillaFinalPage
// =====================================================================================
// ¿QUÉ HACE ESTA PÁGINA SEGÚN EL EXAMEN?:
// 1. Lee la lista de 'jugadoresComprados' del contexto global.
// 2. Muestra los resúmenes financieros (cantidad de contratados, costo total, restante).
// 3. Agrupa a los jugadores contratados por su posición ("ARQ", "DEF", "MED", "DEL")
//    y los muestra en tablas separadas.
// =====================================================================================
export default function PlantillaFinalPage() {
  // 1. Consumimos el contexto usando nuestro Custom Hook de forma limpia
  const { jugadoresComprados, presupuestoDisponible } = useMercado();

  // Auxiliares de formateo y cálculo
  const formatearDinero = (monto: number) => {
    return "$" + monto.toLocaleString("es-AR");
  };

  const costoTotalInvertido = jugadoresComprados.reduce((sum, j) => sum + j.valorMercado, 0);

  // 2. Filtramos los jugadores comprados según su posición
  const arqueros = jugadoresComprados.filter(j => j.codigoPosicion === "ARQ");
  const defensores = jugadoresComprados.filter(j => j.codigoPosicion === "DEF");
  const mediocampistas = jugadoresComprados.filter(j => j.codigoPosicion === "MED");
  const delanteros = jugadoresComprados.filter(j => j.codigoPosicion === "DEL");

  // Componente interno reutilizable para dibujar la tabla de cada posición (para no repetir código HTML)
  const TablaPosicion = ({ titulo, lista }: { titulo: string; lista: JugadorMercado[] }) => {
    // Si no hay jugadores contratados en esta posición, no mostramos la tabla para simplificar
    if (lista.length === 0) return null;

    return (
      <div className="space-y-2">
        <h3 className="font-bold text-sm text-gray-800 tracking-wider uppercase border-b border-gray-400 pb-1 mt-4">
          {titulo}
        </h3>
        <table className="w-full border-collapse border border-gray-300 text-left text-xs bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
              <th className="border border-gray-300 p-2 font-bold text-gray-700">Equipo Actual</th>
              <th className="border border-gray-300 p-2 font-bold text-gray-700">Valor de Mercado</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((jugador) => (
              <tr key={jugador.id}>
                <td className="border border-gray-300 p-2 font-medium">{jugador.nombreCompleto}</td>
                <td className="border border-gray-300 p-2 text-gray-600">{jugador.equipoActual}</td>
                <td className="border border-gray-300 p-2 font-semibold">{formatearDinero(jugador.valorMercado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Título Principal */}
      <h1 className="text-2xl font-bold text-center text-gray-900 border-b border-gray-400 pb-3">
        PLANTILLA FINAL
      </h1>

      {/* ====================================================================
          1. CUADRO RESUMEN
          ==================================================================== */}
      <div className="p-4 border border-gray-300 bg-gray-100 text-sm space-y-1 font-medium rounded">
        <p className="text-gray-700">
          Cantidad de jugadores contratados: <span className="font-bold text-gray-900">{jugadoresComprados.length}</span>
        </p>
        <p className="text-gray-700">
          Costo total invertido: <span className="font-bold text-red-600">{formatearDinero(costoTotalInvertido)}</span>
        </p>
        <p className="text-gray-700">
          Presupuesto restante: <span className="font-bold text-green-700">{formatearDinero(presupuestoDisponible)}</span>
        </p>
      </div>

      {/* ====================================================================
          2. TABLAS AGRUPADAS POR POSICIÓN
          ==================================================================== */}
      <div className="space-y-6">
        <TablaPosicion titulo="ARQUEROS" lista={arqueros} />
        <TablaPosicion titulo="DEFENSORES" lista={defensores} />
        <TablaPosicion titulo="MEDIOCAMPISTAS" lista={mediocampistas} />
        <TablaPosicion titulo="DELANTEROS" lista={delanteros} />
        
        {jugadoresComprados.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-8 border border-dashed border-gray-300">
            No has contratado a ningún jugador todavía.
          </p>
        )}
      </div>

    </div>
  );
}