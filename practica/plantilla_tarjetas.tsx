import React from 'react';

// =====================================================================================
// PLANTILLA: GRILLA DE TARJETAS (CARDS)
// =====================================================================================
// Usá esta plantilla cuando el examen te pida mostrar un catálogo de productos,
// películas, vehículos, etc., y NO te pida explícitamente una tabla.
// 
// Clases clave de Tailwind:
// - grid: Activa el sistema de grillas.
// - grid-cols-1 sm:grid-cols-2 md:grid-cols-3: Hace que sea responsivo 
//   (1 columna en celular, 2 en tablet, 3 en compu).
// - gap-4 o gap-6: Es el espacio (hueco) entre las tarjetas.
// =====================================================================================

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenUrl?: string; // Opcional
}

const datosMock: Producto[] = [
  { id: 1, titulo: "Producto 1", descripcion: "Descripción breve 1", precio: 1500 },
  { id: 2, titulo: "Producto 2", descripcion: "Descripción breve 2", precio: 2500 },
  { id: 3, titulo: "Producto 3", descripcion: "Descripción breve 3", precio: 3500 },
];

export default function PlantillaTarjetas() {
  
  const manejarClic = (producto: Producto) => {
    console.log("Seleccionaste:", producto.titulo);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Catálogo de Productos</h2>

      {/* CONTENEDOR DE LA GRILLA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {datosMock.map((producto) => (
          
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
          
        ))}

      </div>
    </div>
  );
}
