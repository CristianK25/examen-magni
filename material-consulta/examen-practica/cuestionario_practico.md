# 🛠️ Cuestionario Práctico Avanzado: React + TypeScript (Temática: Películas)

En este documento se plantean requerimientos técnicos precisos. Tu objetivo es escribir el código exacto necesario para resolver cada situación planteada, sin pistas adicionales. La consigna define los requisitos; el cómo lo resuelves depende de ti.

Escribe tu código en los bloques `> CÓDIGO:` habilitados.

---

## 🎬 BLOQUE 1: Tipado e Interfaces

### Requerimiento 1.1
Define la interfaz `Pelicula` en un archivo `Modelo.ts`. Debe contener:
- `id` (número)
- `titulo` (cadena de texto)
- `año` (número)
- `director` (cadena de texto)
- `generos` (arreglo de cadenas de texto)
- `calificacion` (número, opcional)

Exporta esta interfaz por defecto.

> CÓDIGO:
```typescript

```

---

## 🏗️ BLOQUE 2: Creación del Estado Global (Context API)

### Requerimiento 2.1
En un archivo `contextoPeliculas.tsx`, escribe todo el código necesario para crear el Contexto, la interfaz del Tipo de Contexto (`ContextoType`), el custom hook `usePeliculasContext()` con su respectivo manejo de errores, y la estructura base del `PeliculasProvider`.
El tipo de contexto debe proveer el estado `peliculas` (arreglo de `Pelicula`).

> CÓDIGO:
```tsx

```

---

## 🌐 BLOQUE 3: Carga Asíncrona (Fetch)

### Requerimiento 3.1
Dentro del componente `PeliculasProvider` que creaste antes, escribe la lógica mediante `useEffect` para cargar el archivo `../datos/lista_peliculas.json`.
- Al inicializar el proveedor, debe realizar el fetch.
- Se debe almacenar el JSON parseado dentro del estado `peliculas`.
- Debes manejar cualquier error imprimiéndolo en consola.

> CÓDIGO:
```tsx

```

---

## 🎨 BLOQUE 4: Renderizado de Listas

### Requerimiento 4.1
Crea un componente funcional llamado `ListaPeliculas.tsx`.
- Este componente debe obtener el arreglo de películas directamente del contexto global usando el custom hook.
- Debe renderizar un contenedor `div` que envuelva la lista.
- Debe iterar sobre el arreglo y generar un `div` por cada película mostrando su `titulo`, su `año` y separando con comas los géneros (`join(', ')`).
- No olvides la propiedad `key`.

> CÓDIGO:
```tsx

```

---

## 🔍 BLOQUE 5: Filtrado de Datos (.filter)

### Requerimiento 5.1
El componente `Buscador.tsx` tiene un estado local `const [busqueda, setBusqueda] = useState("")` vinculado a un `<input>`.
Escribe una constante llamada `peliculasFiltradas` que contenga únicamente las películas del contexto global cuyo `titulo` contenga el texto guardado en `busqueda` (ignorando mayúsculas y minúsculas).

> CÓDIGO:
```tsx

```

---

## 🧮 BLOQUE 6: Estado Derivado y Reducción (.reduce)

### Requerimiento 6.1
En el componente `Estadisticas.tsx`, tienes acceso a la lista global de películas mediante el contexto.
Escribe el código para obtener el "Promedio de Calificación" de todas las películas.
*Consideración:* Si la calificación es opcional, solo debes incluir en el cálculo las películas que sí posean una calificación.

> CÓDIGO:
```tsx

```

---

## 🚀 BLOQUE 7: Enrutamiento Dinámico (React Router)

### Requerimiento 7.1
En `App.tsx`, configura las rutas para que:
- La ruta raíz `/` renderice `<Home />`
- La ruta `/pelicula/ID` renderice `<DetallePelicula />` (donde ID es dinámico).

> CÓDIGO:
```tsx

```

### Requerimiento 7.2
En un componente cualquiera tienes un botón "Ver Detalle". Al hacer clic, debe navegar a la pantalla de detalle de una película con id `42`, pasando además un objeto completo por estado de navegación (`{ esFavorita: true }`).
Escribe el handler del onClick utilizando el hook adecuado de React Router.

> CÓDIGO:
```tsx

```

### Requerimiento 7.3
En el componente destino `<DetallePelicula />`, escribe las dos líneas de código necesarias para capturar tanto el **ID de la URL** como el **objeto enviado por estado de navegación**.

> CÓDIGO:
```tsx

```

---
*Fin del cuestionario práctico.*
