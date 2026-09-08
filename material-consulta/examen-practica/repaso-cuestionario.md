# 📘 Cuestionario de Repaso y Guía de Estudio (React + TypeScript)

Este documento está diseñado para repasar y afianzar los conceptos clave antes de arrancar el examen de práctica.
Puedes responder directamente debajo de cada pregunta completando la sección `> RESPUESTA:`.

---

## 🟢 FASE 1: BASE (Comprensión de la Plantilla)

### Pregunta 1: El Modelo (`src/modelo/Modelo.ts`)
¿Por qué creamos una `interface` en un archivo separado (ej. `Modelo.ts`) y la exportamos por defecto, en lugar de escribir los tipos directamente adentro del contexto o de las páginas?

> RESPUESTA: 
Creando un modelo por separado, aparte de separar responsabilidades, donde la definicion de que es ese "Modelo" en especifico, tambien facilita que cuando necesito que ese modelo cambie en alguna variable o modificacion, solo tengo que hacerlo en ese archivo especifico modelo.ts. Al importar ese modelo en paginas o componentes, puedo acceder a sus variable nuevas o modificadas sin tener que modificarlo en todas las paginas. Aparte en el contexto no manejamos un modelo unico y especifico en memoria como tal, sino que normalmente se utilizan en este tipo de examenes, arreglos de ese modelo, ya que el contexto va a manejar el uso de ese modelo como listas o tablas. Simulando una base de datos en frontend. 

**DEVOLUCIÓN:**
¡Excelente respuesta! Has captado a la perfección los beneficios principales:
1. **Separación de Responsabilidades y Única Fuente de Verdad:** Si un día el examen te pide agregar un campo "poblacion" a la provincia, solo lo cambias en `Modelo.ts` y TypeScript te avisará automáticamente (con errores de compilación) en qué páginas o componentes te falta actualizar el código.
2. **Reusabilidad en el Contexto:** Como bien dices, el Contexto no suele guardar un solo objeto, sino un `array` de objetos (`Modelo[]`) que simula tu base de datos (una lista, una tabla, etc.). Tener el tipo definido claramente ayuda a tipar el estado global de forma segura (`useState<Modelo[]>([])`).

No hay errores en tu definición. ¡Muy bien! Avanzamos.
---

### Pregunta 2: Conexión del Estado Global (`src/contexto/context.tsx`)
En el archivo `context.tsx` tenemos estas tres partes principales:
1. `createContext`
2. `Proveedor` (`Provider`)
3. `useContexto()` (Custom Hook)

¿Cuál es la función exacta de cada una de estas 3 partes y por qué usamos `useContexto()` en lugar de llamar a `useContext(Contexto)` manualmente en cada página?

> RESPUESTA: 
El hook de useContexto se que se utiliza para no tener que llamar a UseContext y si no me equvoco, al modelo. UseContexto en vez de dos llamadas distintas a otras dos cosas. En el proveedor se escriben las funciones que se van a realizar sobre la interfaz de Contextotype, sobre los arreglos y demas. Tambien se fija cuales van a ser los lugares que tienen acceso a ese proveedor. En este caso, todo lo que este encerrado dentro de la etiqueta <Proveedor> <Proveedor/>, tendra acceso a todas las funciones que yo indique ahi mismo en el return, no recuerdo para que mas servia o alguna otra definicion. El create context es una libreria de react, se usa para definir el contexto pero olvide para que servia y que significaba.

**DEVOLUCIÓN:**
Tienes muy buenas nociones, pero vamos a afinar los conceptos para que te queden grabados a fuego:

1. **`useContexto()` (Custom Hook):** ¡Acertaste de lleno! Al crear nuestro propio hook (`export const useContexto = () => useContext(Contexto)`), logramos dos cosas:
   - En lugar de importar `useContext` de React y `Contexto` de nuestro archivo en cada página, solo importamos `useContexto()`. ¡Código más limpio!
   - Además, nos permite poner un `if (context === undefined) throw new Error(...)` adentro, para que si te olvidas de poner el `<Proveedor>` en `main.tsx`, la consola te avise con un error claro en vez de romperse silenciosamente.
2. **`Proveedor` (`Provider`):** ¡Excelente! Es el componente contenedor. Ahí es donde creas los `useState`, los `useEffect`, y las funciones para modificar los arreglos. Todo lo que metas en la prop `value={...}` del proveedor, estará disponible para los componentes "hijos" (lo que va en `<Proveedor> {children} </Proveedor>`).
3. **`createContext`:** Aquí te refresco la memoria. Es una función nativa de React que crea una "tubería" vacía. Su único trabajo es crear el objeto Contexto que sirve de puente entre el Proveedor (que inyecta los datos en la tubería) y el consumidor (las páginas que leen de la tubería). Es como crear el "canal de radio" al que luego todos se van a conectar.

¡Vas muy bien encaminado! Sigamos con la 3.
---

### Pregunta 3: Envoltura Inicial (`src/main.tsx`)
En `main.tsx` envolvemos `<App />` con `<Proveedor>` y `<BrowserRouter>`. 
¿Qué pasaría si colocamos `<App />` **afuera** de `<Proveedor>` o afuera de `<BrowserRouter>`?

> RESPUESTA: 
Encerrar el App con Proveedor le da a App el acceso a utilizar todas las funciones que se hayan definido en el "value=". Si ponemos App afuera, este ya no tendra accesos a utilizar esas funciones o variables que manda Proveedor a travez del canal Contexto creado con CreateContext. 

**DEVOLUCIÓN:**
Muy bien en la primera parte. Efectivamente, si `<App />` (y por ende, todas las páginas adentro de él) estuviera afuera de `<Proveedor>`, al intentar usar `useContexto()` saltaría el error porque estarías intentando conectarte a un canal de radio desde afuera del área de cobertura de la antena.

Te faltó mencionar qué pasa con `<BrowserRouter>`: 
Al igual que el Proveedor da acceso al Contexto, `<BrowserRouter>` es el proveedor de las herramientas de rutas. Si sacas a `<App />` de adentro de `<BrowserRouter>`, todas las etiquetas como `<Routes>`, `<Route>` y hooks como `useNavigate()` dejarían de funcionar y tirarían error, porque necesitan estar envueltos en el enrutador principal para saber en qué URL estás.

¡Bien comprendido el concepto de envolver (wrapper)! Avanzamos con la 4.

---

### Pregunta 4: Enrutamiento (`src/App.tsx`)
¿Cómo funcionan las etiquetas `<Routes>` y `<Route path="..." element={<Componente />} />` dentro de `App.tsx` y qué ventaja nos da usar rutas relativas?

> RESPUESTA: 
Routes se encuentra en App y se hace para definir cuales van a ser las rutas o paginas a las que se van a redirigir el front. Route path lo que hace es definir cual es la ruta relativa añadida a la url base, y cual es el elemento que se va a dibujar o llamar una vez se haya puesto esa ruta en la url del navegador. 
```
<Route path="/" element={<PaginaBase />} />
```
este codigo significa que a la ruta principal o si a la ruta base le agregas "/", te va a llevar a la pagina base.
```
<Route path="/final" element={<PaginaFinal />} />
```
este codigo significa que a la ruta principal, se le agrega "/final", react va a renderizar PaginaFinal.

**DEVOLUCIÓN:**
¡Perfecto! Lo explicaste con muchísima claridad. 
- `<Routes>` funciona como un "switch" (un conmutador) que lee la URL y busca qué ruta coincide.
- `<Route>` define la regla: "si la URL dice esto (`path`), dibuja este componente (`element`)".

El detalle de "la ruta relativa añadida a la URL base" es clave, porque significa que si mañana subes tu proyecto a `www.tu-universidad.edu.ar/cristian/examen/`, React Router es suficientemente inteligente para entender que `/final` se refiere a esa carpeta, y no rompe los links.

¡Excelente trabajo! Con esto cerramos la **FASE 1 (BASE)** y tienes dominado el esqueleto de la aplicación.
---

---

## 🟡 FASE 2: ESPECIALIZADA (Técnicas de Examen y Modificación de la Plantilla)

### Pregunta 5: Carga de Datos HTTP / Fetch (`useEffect`)
Para el examen de Provincias se pide cargar `lista_provincias.json` desde un método HTTP.
escribe la estructura típica de un `useEffect` usando `fetch('./lista_provincias.json')` para guardar los datos en el estado local del Contexto:

1. Yo antes lo hacia asi si venia de un json. Nose hacerlo desde un fetch
```typescript
// Escribe el código o pseudo-código aquí:
import provincias from './lista_provincias.json'

```
2. Se me ocurre de esta forma
```typescript
// Escribe el código o pseudo-código aquí:
provincias = fetch('./lista_provincias.json')

```

> RESPUESTA EXPLICADA: 

**DEVOLUCIÓN:**
Es súper común confundir ambas formas, ¡qué bueno que surgió esto!

1. **`import provincias from './lista_provincias.json'`**: Esto funciona gracias a Vite/Webpack, que "empaquetan" el JSON. Pero en los exámenes te piden usar `fetch` para simular que estás pidiendo los datos a una API real (un backend). Si usas el `import`, el profesor puede descontarte puntos porque no estás demostrando que sabes manejar peticiones HTTP asíncronas.

2. **El `fetch` real en React**: `fetch` devuelve una Promesa (porque la red tarda en responder). Por lo tanto, no puedes hacer `provincias = fetch(...)` directamente. Debes usar un `useEffect` para que se ejecute solo al arrancar la app, y esperar la respuesta. 

Esta es la estructura **obligatoria** que debes memorizar para el examen:

```typescript
// Adentro del componente o contexto:
const [provincias, setProvincias] = useState<Modelo[]>([]);

useEffect(() => {
  // 1. Haces el fetch
  fetch('./lista_provincias.json')
    // 2. Conviertes la respuesta HTTP a JSON
    .then((respuesta) => respuesta.json())
    // 3. Guardas los datos en tu estado
    .then((datos) => setProvincias(datos))
    // 4. (Opcional pero recomendado) Atrapas errores
    .catch((error) => console.error("Error al cargar:", error));
}, []); // <- El array vacío es CLAVE: significa "ejecutar solo 1 vez al inicio"
```

¡Copia este snippet mentalmente porque lo vas a usar en **todos** los exámenes! Cuando lo tengas claro, pasemos a la **Pregunta 6** (los métodos de arrays).

---

### Pregunta 6: Métodos de Arrays Clave (`.map`, `.filter`, `.reduce`)
En los exámenes siempre se usan estos 3 métodos de arrays. Explica brevemente para qué sirve cada uno en el contexto del examen:
* **`.map()`**: 
* **`.filter()`**: 
* **`.reduce()`**: 

> RESPUESTA: 
No me acuerdo para que se usaba espeficicamente el map filtre y reduce. Creo que el map era para iterar sobre un array, y aplicar alguna funcion que quieras poner en ese array. Filter nose, y reduce tampoco.

**DEVOLUCIÓN:**
¡Tranquilo! Son los tres jinetes del apocalipsis en JavaScript, pero una vez que les agarras la mano, son súper lógicos. 

* **`.map()` (El Transformador):** Tenías razón, sirve para iterar. En React, **el 99% de las veces lo usas para transformar un arreglo de datos en un arreglo de componentes HTML**.
  *Ejemplo en el examen:* Tienes `[Provincia1, Provincia2]`, le haces `.map()`, y devuelves `[<TarjetaProvincia />, <TarjetaProvincia />]`.
* **`.filter()` (El Colador):** Crea un *nuevo* arreglo solo con los elementos que pasen una prueba. 
  *Ejemplo en el examen:* El examen te dice "Haz un buscador de provincias". Usas `.filter()` para devolver solo las provincias cuyo nombre incluya lo que el usuario escribió.
* **`.reduce()` (La Calculadora):** Reduce todo un arreglo a un solo valor (generalmente sumando). 
  *Ejemplo en el examen:* Te piden "Calcular el promedio de población". Usas `.reduce()` para sumar la población de TODAS las provincias y obtener el total, luego lo divides por la cantidad de provincias para sacar el promedio.

No te preocupes si la sintaxis se te olvida, en la Fase 3 del examen de práctica los vamos a usar todos. Sigamos con la **Pregunta 7**.
---

---

### Pregunta 7: Navegación y Paso de Parámetros (`useNavigate` y `useParams` / `Link`)
Al hacer clic en **"VER MÁS"** en la tarjeta de una provincia, debemos ir a la pantalla de detalle (`provincia_detalle.tsx`).
¿Cuáles son las 2 formas principales de pasar la provincia seleccionada hacia la pantalla de detalle? (ej. usando rutas con ID `/detalle/:id` o estado global / navigate state).

> RESPUESTA: 
usando el useNavigate y el Link si no me equivoco. Poner que el boton realize el useNavigate y la ruta que queremos a la que este definida en App Route. 

**DEVOLUCIÓN:**
¡Exactamente! `useNavigate` y `<Link>` son las dos herramientas para "viajar" a otra ruta. Ahora, el gran truco en el examen es **cómo le pasas los datos** de esa provincia específica a la página de detalle. Tienes dos formas de hacerlo:

1. **Por ID en la URL (`useParams`):** 
   Navegas a `/detalle/4`. En tu `App.tsx` configuras `<Route path="/detalle/:id" ... />`. Luego en la página de detalle usas `const { id } = useParams()` para leer el número 4, y buscas en tu contexto la provincia con ese ID. Es la forma más profesional.

2. **Por estado de navegación (El truco rápido):**
   Puedes pasar el objeto entero escondido en la navegación: 
   `navigate('/detalle', { state: { miProvincia: provincia } })`. 
   Luego, en la página de detalle, lo recuperas con `const { state } = useLocation()`. Es una trampa legal muy útil en los exámenes si no quieres lidiar con buscar IDs.

Ambas son válidas. ¡Ya tienes la 7! Vamos por la última, la **Pregunta 8**.
---

---

### Pregunta 8: Cálculo de Promedios y Derivados
El examen pide calcular el **promedio de población** y el **promedio de superficie**.
¿Es necesario guardar el promedio en un `useState` separado, o es mejor calcularlo como una constante/función derivada directamente dentro del Contexto? ¿Por qué?

> RESPUESTA: 
dentro de el proveedor se podria hacer una variable que sea el resultado o este definido como una funcion. Que esa funcion se encargue de agarrar todas las provincias que existen, calcular su superficie y calcular el promedio, y que ese valor sea asignado en el proveedor.
```typescript
export function Proveedor({ children }: { children: ReactNode }) {
    const [elementos, setElementos] = useState<Modelo[]>([]);
    const promedio_superficie = calcularSuperficie();
```
Me imagino algo como esto

**DEVOLUCIÓN:**
¡Diste en el blanco! 🎯 

Esto se conoce en React como **"Estado Derivado" (Derived State)**. La regla de oro es: *"Si puedes calcular un valor a partir del estado existente, NO crees un nuevo estado (`useState`) para él"*.

Si lo guardaras en un `useState` separado, tendrías la pesadilla de acordarte de actualizar el promedio cada vez que modificas una provincia, borras una provincia, o agregas una nueva. Al hacerlo como una constante (`const promedio = calcularPromedio()`), React ejecuta esa función automáticamente cada vez que `elementos` cambia y se vuelve a renderizar. ¡Es gratis y a prueba de errores!

¡Felicidades! Has completado y aprobado con honores todo el cuestionario de repaso.
---

