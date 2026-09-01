import React from 'react';

// =====================================================================================
// EXPLICACIÓN DETALLADA DEL MÉTODO .map() EN REACT
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// En React, NO podemos usar bucles "for" tradicionales (como 'for item in lista')
// adentro del código HTML (JSX) que retornamos. 
// Para dibujar listas repetitivas (como filas de tablas, tarjetas, listados, etc.), 
// estamos obligados a usar la función nativa de JavaScript llamada `.map()`.
//
// ¿CÓMO FUNCIONA .map()?:
// Entra una lista de "X" elementos (por ejemplo, una lista de diccionarios/objetos),
// y devuelve una NUEVA lista de la misma cantidad de elementos, pero transformados
// en etiquetas HTML que React pueda entender y dibujar en pantalla.
// =====================================================================================

// 1. Definimos un tipo genérico (nuestro "contrato" o modelo de datos)
export interface MiObjetoGenerico {
  id: number;          // SIEMPRE necesario para la propiedad 'key' de React
  nombre: string;
  categoria: string;
  precio: number;
}

// 2. Simulamos una lista de datos (podría venir de un Contexto, una API, o un JSON)
const datosDeEjemplo: MiObjetoGenerico[] = [
  { id: 1, nombre: "Item A", categoria: "Cat 1", precio: 100 },
  { id: 2, nombre: "Item B", categoria: "Cat 2", precio: 200 },
  { id: 3, nombre: "Item C", categoria: "Cat 1", precio: 300 },
];

export default function EjemploMap() {
  
  // Función genérica simulando una acción (ej. comprar, borrar, seleccionar)
  const realizarAccion = (itemSeleccionado: MiObjetoGenerico) => {
    alert(`Hiciste clic en el item: ${itemSeleccionado.nombre}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ejemplo Genérico de Renderizado con .map()</h2>
      
      {/* 
        ESTRUCTURA DE UNA TABLA HTML BÁSICA 
        - <table>: El contenedor general de la tabla.
        - <thead>: La cabecera, donde van los títulos fijos.
        - <tbody>: El cuerpo, donde van los datos dinámicos generados por el .map().
      */}
      <table border={1} cellPadding={10} style={{ width: "100%", textAlign: "left" }}>
        
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          {/* <tr> (Table Row): Fila de la cabecera */}
          <tr>
            {/* <th> (Table Header): Cada celdita de título, suele estar en negrita */}
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {/* ====================================================================
              INICIO DEL .map()
              ====================================================================
              Sintaxis: { listaQueQuieroRecorrer.map( (variableTemporal) => ( ...HTML... ) ) }
              
              1. Las llaves '{ }' le dicen a React: "Ojo, acá meto código JavaScript".
              2. 'datosDeEjemplo' es el arreglo que queremos iterar.
              3. 'item' es la variable temporal (como el 'for item in lista' de Python) 
                 que va a contener los datos de un solo elemento por cada vuelta.
          */}
          {datosDeEjemplo.map((item: MiObjetoGenerico) => (
            
            // LA PROPIEDAD 'key' (¡CRÍTICO!):
            // Siempre que uses .map(), la etiqueta HTML más externa que devuelvas 
            // DEBE tener la propiedad 'key'. 
            // ¿Para qué? Para que React le ponga un "DNI único" a esta fila. Si mañana 
            // querés borrar solo la fila 2, React busca el key=2 y la borra sin 
            // tener que redibujar toda la tabla entera de vuelta, lo cual parpadearía.
            <tr key={item.id}>
              
              {/* <td> (Table Data): Cada celdita individual de la fila con los datos */}
              <td>{item.id}</td>
              
              {/* Usamos las llaves { } para imprimir las propiedades del objeto/diccionario */}
              <td>{item.nombre}</td>
              <td>{item.categoria}</td>
              <td>${item.precio}</td>
              
              <td>
                {/* 
                  EVENTO onClick CON FUNCIÓN FLECHA:
                  Hacemos 'onClick={() => realizarAccion(item)}' y NO 'onClick={realizarAccion(item)}'.
                  
                  ¿Por qué?
                  Si NO le ponés la flecha '() =>', JavaScript ejecuta la función
                  INMEDIATAMENTE al dibujar la página en pantalla, sin que hagas clic. 
                  Al envolverla en una función flecha '() =>', le decís: 
                  "Che React, guardate esta instrucción en memoria y ejecutala 
                  SOLAMENTE cuando el usuario haga un clic real en el botón".
                */}
                <button onClick={() => realizarAccion(item)}>
                  Hacer Acción
                </button>
              </td>
            </tr>
          ))}
          {/* ====================================================================
              FIN DEL .map()
              ==================================================================== */}
        </tbody>
      </table>
    </div>
  );
}
