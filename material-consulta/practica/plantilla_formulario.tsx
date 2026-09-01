import React, { useState } from 'react';

// =====================================================================================
// PLANTILLA: FORMULARIO SIMPLE Y FILTROS (INPUTS)
// =====================================================================================
// Usá esta plantilla cuando el examen te pida:
// 1. Un buscador (escribir texto y filtrar una lista).
// 2. Un formulario para agregar un elemento nuevo a una lista.
//
// El secreto de los inputs en React es el "Componente Controlado":
// El valor del input siempre está atado a un 'useState', y cada vez que el 
// usuario tipea (onChange), actualizamos ese estado.
// =====================================================================================

export default function PlantillaFormulario() {
  // 1. Estado para guardar lo que el usuario escribe en el input
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  
  // 2. Estado para algún mensaje de error o éxito
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Función para manejar el botón de buscar o enviar
  const manejarEnvio = (e: React.FormEvent) => {
    // Evita que la página se recargue al mandar el formulario
    e.preventDefault(); 

    if (textoBusqueda.trim() === "") {
      setMensaje("Por favor, ingresá algún texto antes de buscar.");
      return;
    }

    setMensaje(`Buscando resultados para: "${textoBusqueda}"...`);
    
    // Acá llamarías a tu contexto: buscarProducto(textoBusqueda)
    // o filtrarías tu lista local.
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Buscador de Elementos</h2>

      {/* FORMULARIO */}
      <form onSubmit={manejarEnvio} className="space-y-4">
        
        <div className="flex flex-col">
          <label htmlFor="buscador" className="text-sm font-semibold text-gray-700 mb-1">
            Término de búsqueda
          </label>
          <input
            id="buscador"
            type="text"
            placeholder="Ej: Camiseta..."
            // ESTO ES CLAVE: Atamos el input a la variable de estado
            value={textoBusqueda}
            // ESTO ES CLAVE: Actualizamos el estado letra por letra
            onChange={(e) => setTextoBusqueda(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-900 transition-colors"
        >
          Buscar
        </button>

      </form>

      {/* RENDERIZADO CONDICIONAL DEL MENSAJE */}
      {mensaje ? (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded text-sm font-medium">
          {mensaje}
        </div>
      ) : null}

    </div>
  );
}
