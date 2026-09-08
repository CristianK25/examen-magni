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
export default interface Pelicula{
    id: number;
    titulo: string;
    anio: number;
    director: string;
    generos: string[];
    calificacion?: number;
}
```

**DEVOLUCIÓN:**
¡Impecable!
- Usaste `export default interface` correctamente para exportarlo de forma predeterminada.
- Cambiaste inteligentemente `año` por `anio` (es una gran práctica evitar la 'ñ' u otros caracteres latinos en los nombres de variables y propiedades).
- Declaraste los arreglos de strings (`string[]`) y tipos simples de manera exacta.
- Usaste el `?` perfecto para marcar el campo opcional.
¡Un 10/10 para arrancar! Avanza con el Bloque 2 cuando gustes.

---

## 🏗️ BLOQUE 2: Creación del Estado Global (Context API)

### Requerimiento 2.1
En un archivo `contextoPeliculas.tsx`, escribe todo el código necesario para crear el Contexto, la interfaz del Tipo de Contexto (`ContextoType`), el custom hook `usePeliculasContext()` con su respectivo manejo de errores, y la estructura base del `PeliculasProvider`.
El tipo de contexto debe proveer el estado `peliculas` (arreglo de `Pelicula`).

> CÓDIGO:
```tsx

```
Nose como escribirlo realmente, voy a usar una plantilla siempre. esa plantilla que tengo @contextoPeliculas.tsx

**DEVOLUCIÓN:**
¡Es una estrategia totalmente válida y muy inteligente! Llevar una plantilla (*boilerplate*) armada al examen te ahorra 10 minutos valiosos de escribir una estructura que siempre es idéntica.

Sin embargo, hay un detalle **CRÍTICO** para aprobar: **Tienes que adaptar la plantilla a la consigna**.
Fíjate que tu plantilla genérica usa la palabra `elementos` y el tipo `Modelo`. Pero la consigna te pedía explícitamente:
*"El tipo de contexto debe proveer el estado `peliculas` (arreglo de `Pelicula`)."*

Si dejas tu plantilla tal cual con `elementos`, te vas a confundir más adelante cuando los requerimientos hablen de "películas". 
Lo que deberías modificar rápidamente en tu plantilla al empezar el examen es:
1. **El import:** `import type Pelicula from '../modelo/Modelo';` (suponiendo que le llamas así al archivo)
2. **La interfaz:** `export interface ContextoType { peliculas: Pelicula[]; }`
3. **El estado:** `const [peliculas, setPeliculas] = useState<Pelicula[]>([]);`
4. **El provider:** `<Contexto.Provider value={{ peliculas }}>`

Si logras hacer esa rápida adaptación de 30 segundos, tu estrategia de la plantilla es perfecta y te asegurará aprobar la parte más pesada. 

¡Avanza con el **Bloque 3** (Fetch)! Ese puedes escribirlo directamente en el bloque de código intentando adaptar lo que está comentado en tu plantilla.

---

## 🌐 BLOQUE 3: Carga Asíncrona (Fetch)

### Requerimiento 3.1
Dentro del componente `PeliculasProvider` que creaste antes, escribe la lógica mediante `useEffect` para cargar el archivo `../datos/lista_peliculas.json`.
- Al inicializar el proveedor, debe realizar el fetch.
- Se debe almacenar el JSON parseado dentro del estado `peliculas`.
- Debes manejar cualquier error imprimiéndolo en consola.

> CÓDIGO:
```tsx
useEffect( () => {
    fetch(`../datos/lista_peliculas.json`).then( res => res.json() ).then( datos => setPeliculas(datos)).catch( error => console.log(error))
},[] )
```

**DEVOLUCIÓN:**
¡Excelente trabajo! 
- La estructura del `useEffect` es perfecta, incluyendo el arreglo de dependencias vacío `[]` al final para que se ejecute una sola vez al cargar la aplicación.
- La cadena de Promesas (`.then().then().catch()`) está impecable y hace exactamente lo que pedía la consigna.
- **Tu observación sobre los paréntesis es 100% correcta:** en JavaScript, cuando una función flecha recibe un único parámetro, los paréntesis son completamente opcionales. Escribir `res => res.json()` en lugar de `(res) => res.json()` demuestra que tienes un dominio sólido de la sintaxis más moderna (ES6).
- *Pequeño tip técnico:* En el bloque `.catch()`, aunque usar `console.log(error)` funciona y cumple el objetivo, suele ser buena costumbre usar `console.error(error)`. Esto hace que el mensaje se pinte de rojo en las herramientas de desarrollador del navegador (DevTools), facilitando mucho encontrar el problema si el archivo JSON no carga.

¡Otro 10/10! Adelante con el **Bloque 4** (Renderizado de Listas).

---

## 🎨 BLOQUE 4: Renderizado de Listas

### Requerimiento 4.1 (Modo Rápido)
Asume que ya tienes el arreglo `peliculas`. **Escribe únicamente el código del `.map()`** que usarías dentro del JSX para renderizar un `div` por cada película mostrando su `titulo`, su `anio` y separando con comas los `generos` (con `.join()`). No olvides poner el `key` al contenedor.

> CÓDIGO:
```tsx
<div>
    {peliculas.map(
        
    )}
<div/>
```

---

## 🔍 BLOQUE 5: Filtrado de Datos (.filter)

### Requerimiento 5.1 (Modo Rápido)
Tienes un texto guardado en `busqueda` y el arreglo global `peliculas`. **Escribe únicamente la declaración de la constante `peliculasFiltradas`** usando `.filter()` para que devuelva solo las películas cuyo título contenga lo escrito en la búsqueda (hazlo *case-insensitive*, ignorando mayúsculas y minúsculas).

> CÓDIGO:
```tsx

```

---

## 🧮 BLOQUE 6: Estado Derivado y Reducción (.reduce)

### Requerimiento 6.1 (Modo Rápido)
Tienes el arreglo `peliculas`. **Escribe únicamente la lógica matemática (usando `.reduce()`)** para calcular y guardar en una constante el "Promedio de Calificación" de todas las películas.
*Consideración:* Como la calificación es opcional (`?`), debes asegurarte de sumar solo aquellas películas que sí la tengan definida.

> CÓDIGO:
```tsx

```

---

## 🚀 BLOQUE 7: Enrutamiento Dinámico (React Router)

### Requerimiento 7.1 (Modo Rápido)
**Escribe únicamente el bloque de etiquetas `<Routes>...</Routes>`** necesario para configurar estas dos únicas rutas:
- La raíz `/` renderiza el componente `<Home />`
- La ruta `/pelicula/ID` renderiza `<DetallePelicula />` (haciendo que el ID sea dinámico).

> CÓDIGO:
```tsx

```

### Requerimiento 7.2 (Modo Rápido)
**Escribe únicamente la función de un evento `onClick={...}`** para un botón. Al hacer clic, debe navegar a la URL `/pelicula/42` y enviar de forma oculta el objeto `{ esFavorita: true }`. Asume que ya hiciste `const navigate = useNavigate();` arriba.

> CÓDIGO:
```tsx

```

### Requerimiento 7.3 (Modo Rápido)
En la pantalla de destino, **escribe únicamente las dos constantes/hooks** necesarias para extraer el **ID** que vino en la URL y el **objeto** que vino por el estado de navegación oculto.

> CÓDIGO:
```tsx

```

---
*Fin del cuestionario práctico (Versión Exprés para Examen).*
