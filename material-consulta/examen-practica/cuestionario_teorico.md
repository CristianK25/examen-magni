# 📘 Cuestionario Teórico Avanzado: React + TypeScript

Este cuestionario evalúa tu comprensión profunda sobre cómo y por qué funcionan las herramientas clave en React y TypeScript. Responde a cada pregunta en la sección `> RESPUESTA:`.

---

## 🟢 TEMA 1: React Hooks (Estado y Ciclo de Vida)

### Pregunta 1.1: Asincronismo de `useState`
Si tienes un estado `const [contador, setContador] = useState(0)` y ejecutas `setContador(contador + 1)` tres veces seguidas en la misma función, ¿cuál será el valor final de `contador` en el siguiente renderizado? ¿Por qué ocurre esto y cómo lo solucionarías si necesitaras que el resultado sea 3?

> RESPUESTA:
Tengo entendido que el set de una variable que esta conectada con el useState, apenas la llamo, se actualiza el valor y se actualiza visualmente en la pagina. Nose que tiene que ver que este en la misma funcion repetido. Tengo entendido que tendria que actualizarse 3 veces a nivel codigo y visual tambien. 

**DEVOLUCIÓN:**
¡Qué bueno que surgió esto porque es una de las "trampas" más comunes en React! 
En realidad, el valor final **será 1, no 3**, y visualmente la página **se actualizará una sola vez**. 
React agrupa (hace "batching") las actualizaciones de estado por razones de rendimiento. Además, la variable `contador` mantiene su valor original durante **toda la ejecución de la función**. Por lo tanto, internamente estás ejecutando: `setContador(0 + 1)`, luego `setContador(0 + 1)` y luego `setContador(0 + 1)`. 
Para solucionar esto y lograr que termine en 3, debes usar lo que se llama una **función de actualización** (updater function), que te da acceso al valor previo exacto en ese micro-instante, así: `setContador(prev => prev + 1)`.

### Pregunta 1.2: Dependencias en `useEffect`
¿Qué ocurre exactamente cuando omites el array de dependencias en un `useEffect`, qué ocurre si le pasas un array vacío `[]`, y qué ocurre si le pasas una variable `[id]`? Explica el ciclo de ejecución en cada escenario.

> RESPUESTA:
Nose de que parte es. Nose bien como funciona el use effect, se que se ejecuta apenas puede ejecutarse en la app. Necesito info

**DEVOLUCIÓN:**
¡No hay problema! El `useEffect` es fundamental para manejar "efectos secundarios" (como hacer un `fetch` a una API, modificar el DOM o escuchar eventos). Su comportamiento cambia radicalmente según el segundo parámetro (el array de dependencias):

1. **Si omites el array** (`useEffect(() => {...})`): La función se ejecuta **después de CADA renderizado** del componente (cada vez que cambie cualquier estado o prop). ¡Cuidado! Si haces un *fetch* aquí y guardas el resultado en un estado, el estado cambiará, el componente se renderizará de nuevo y volverá a hacer el *fetch*, creando un **bucle infinito** que colgará la app.
2. **Si le pasas un array vacío** (`useEffect(() => {...}, [])`): La función se ejecuta **una única vez**, justo cuando el componente se "monta" (aparece en pantalla) por primera vez. Esta es la forma correcta de hacer un *fetch* inicial (por ejemplo, para pedir la lista de películas al arrancar).
3. **Si le pasas variables** (`useEffect(() => {...}, [id])`): La función se ejecuta al montarse y luego **cada vez que la variable `id` cambie**. Es perfecto para actualizar datos; por ejemplo, si el usuario selecciona una película diferente y necesitas traer sus detalles específicos.

### Pregunta 1.3: Limpieza (Cleanup) en `useEffect`
¿Para qué sirve la función de retorno (`return () => { ... }`) dentro de un `useEffect`? Da un ejemplo concreto de un problema grave (como fugas de memoria o errores) que ocurriría si no usas esta función al suscribirte a un evento o temporizador.

> RESPUESTA:
nose para que funciona

**DEVOLUCIÓN:**
La función de retorno (también llamada *cleanup function*) sirve para "limpiar" la basura que pueda dejar tu `useEffect` justo antes de que el componente se destruya (desmonte) o antes de que el efecto se vuelva a ejecutar.

**Ejemplo de problema grave (Fuga de memoria):**
Imagina que en tu `useEffect` inicias un temporizador con `setInterval` que ejecuta código cada 1 segundo. Si el usuario navega a otra página, el componente desaparece de la pantalla, ¡pero el temporizador sigue corriendo en segundo plano para siempre consumiendo recursos! Si el usuario entra y sale de esa página 10 veces, tendrás 10 temporizadores zombis corriendo al mismo tiempo. 

Para evitarlo, usas el *cleanup*:
```javascript
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  
  // React ejecutará esto justo antes de que el componente se destruya
  return () => {
    clearInterval(timer); 
  };
}, []);
```
Esto también aplica para cuando agregas eventos (`window.addEventListener`), donde la limpieza sería quitarlos (`window.removeEventListener`) para evitar errores en consola y cuelgues en la aplicación.

---

## 🟡 TEMA 2: Context API y Arquitectura de Estado

### Pregunta 2.1: Contexto vs Props
Imagina un árbol de componentes de 5 niveles de profundidad. ¿Cuál es el principal problema (conocido como *Prop Drilling*) que resuelve Context API en este escenario? Nombra al menos una desventaja de usar Contexto globalmente para absolutamente todo el estado de la aplicación.

> RESPUESTA:
el prop drilling supongo que es cuando un componente "bisabuelo" tiene que pasarle datos a un componente "nieto" por ejemplo. Un componente que tiene un flujo de 5 mas, es un mar de props donde varios componentes tienen props solamente para pasarselo a otro componente. Cuando se usa el contexto, podes armar un proveedor y indicar en que partes de la app tienen acceso a ese contexto, y sus elementos y funciones son accesibles desde lo que este encapsulando el proveedor. Quiza la desventaja que veo yo, es tener que escribir la misma linea por cada componente que tengas que quieras acceder a cosas del contexto, o incluso, a la misma variable. 

**DEVOLUCIÓN:**
¡Excelente definición de *Prop Drilling*! Lo entendiste a la perfección: evita hacer un "pasamanos" de props a través de componentes intermedios que en realidad no necesitan esos datos.

Sobre la desventaja que mencionas, tener que escribir el Hook (ej. `const { peliculas } = useContexto()`) en realidad es mucho más limpio que declarar las props y pasarlas componente por componente. Las **dos desventajas principales** de meter absolutamente todo en el Contexto global son:
1. **Problemas de Rendimiento (Re-renders innecesarios):** (¡Esto te servirá para la pregunta 2.2!) Cuando un dato en el Contexto cambia, todos los componentes que escuchan a ese Contexto se re-renderizan. Si metes estados que cambian muy rápido (como lo que el usuario tipea en un `input`) en un contexto global gigante, congelarás la aplicación.
2. **Pérdida de Reusabilidad:** Si un componente (ej. un `TarjetaPelicula`) en lugar de recibir `props` lee directamente del Contexto Global, ya no podrás usar ese componente en otro proyecto, porque estará fuertemente "atado" a que exista ese proveedor.

### Pregunta 2.2: Re-renderizados por Contexto
Si el estado global que provee tu `Contexto` cambia, ¿qué componentes específicos de tu aplicación volverán a renderizarse automáticamente? ¿Se renderizan todos los hijos del Proveedor o solo los que consumen el contexto usando `useContext`?

> RESPUESTA:


### Pregunta 2.3: `createContext` Tipado
Al declarar `const Contexto = createContext<MiTipoContexto | undefined>(undefined);`, ¿por qué la buena práctica en TypeScript exige inicializarlo en `undefined` y luego hacer la comprobación `if (!contexto)` dentro de nuestro Hook personalizado `useContexto()`?

> RESPUESTA:
no me acuerdo

**DEVOLUCIÓN:**
Es una pregunta de nivel avanzado, ¡así que es normal no recordarlo! Aquí tienes la razón:

Cuando creas la "tubería" vacía con `createContext` al principio del archivo, **todavía no tienes los datos reales** (porque esos datos los vas a inicializar recién más abajo usando `useState` dentro de tu componente `<Proveedor>`). Por lo tanto, el único valor inicial válido que puedes darle a la tubería es `undefined`.

El problema es que si el tipo es `MiTipoContexto | undefined`, TypeScript te va a dar error ("Object is possibly 'undefined'") en absolutamente todas las páginas donde intentes hacer un `.map()` o acceder a tus datos. 

La comprobación `if (!contexto) throw new Error("Debe usarse dentro de un Proveedor")` que hacemos en el hook `useContexto()` soluciona esto con dos beneficios enormes:
1. **Para TypeScript (Type Narrowing):** Le asegura al compilador que, si el código logra pasar de ese `if`, entonces el contexto **100% seguro existe**. TypeScript automáticamente le quita el `undefined` al tipo y te deja trabajar tranquilo sin tirarte errores.
2. **Para ti (Debugging):** Si por accidente te olvidas de envolver `<App />` con tu `<Proveedor>` en `main.tsx`, en lugar de que la aplicación explote con un error incomprensible de React, la consola te mostrará exactamente ese mensaje claro: "Debe usarse dentro de un Proveedor".

---

## 🔴 TEMA 3: Enrutamiento (React Router DOM)

### Pregunta 3.1: Enrutamiento Estático vs Dinámico
Explica la diferencia entre declarar una ruta como `<Route path="/peliculas/accion" element={<Accion/>} />` frente a `<Route path="/peliculas/:genero" element={<Genero/>} />`. ¿Cómo obtiene el componente `<Genero/>` el valor de la URL?

> RESPUESTA:
la primera opcion va a ser que el codigo sea redundante o repetitivo porque tendremos que hacer el mismo con leves cambios para cada genero existente de peliculas. Pero si utilizas la segunda opcion, en algun lugar o componente donde hagas navigate(`/peliculas/${genero}`) o algo asi (corrigeme si me equivoque), luego en el componente Genero, puedo usar `const {param} = useParams()` para extraer todos los parametros que tiene la url, como solo tiene uno y es el primero, el genero que mande en el navigate, sera el que se mandara por url y extraeremos con esa funcion useparams.

**DEVOLUCIÓN:**
¡Muy bien! Captaste la idea central perfectamente: usar rutas dinámicas te evita tener que crear 20 componentes y 20 rutas diferentes si tienes 20 géneros.

Tu deducción sobre el `navigate` es 100% correcta: harías `navigate('/peliculas/accion')` o `navigate(\`/peliculas/${variableGenero}\`)` y React Router se encarga de que coincida con el patrón de `:genero`.

**Solo un detalle técnico muy importante para corregirte:** 
Cuando usas `useParams()`, el nombre de la variable que extraes tiene que ser **exactamente el mismo nombre** que declaraste en la ruta con los dos puntos (`:`).
Como en el `Route` pusimos `:genero`, la forma correcta de extraerlo es:
`const { genero } = useParams();` (y no `param`). 
¡Si en la ruta lo llamaras `:id`, entonces extraerías `id`!

### Pregunta 3.2: Navegación Imperativa
¿En qué escenario te verías obligado a usar el hook `useNavigate()` en lugar de utilizar un simple componente `<Link to="...">`? Describe un flujo de usuario donde esta diferencia sea crítica.

> RESPUESTA:
para mi realizan la misma accion pero nose los detalles tecnicos. Solo se usar use navigate

**DEVOLUCIÓN:**
Es verdad que al final del día ambos cambian la URL y te llevan a otra pantalla, ¡pero su propósito es muy distinto!

- `<Link to="...">` es **Declarativo**. Se usa cuando la intención es que el usuario haga un clic explícito para ir a otra página (ej. los botones del Navbar o un enlace de "Ver detalle"). En HTML se convierte en una clásica etiqueta `<a>`.
- `useNavigate()` es **Imperativo**. Te da el control para navegar "por código", en el momento que tú decidas.

**El escenario crítico (flujo programático):**
Imagina un formulario de "Añadir Película". Cuando el usuario hace clic en "Guardar", no puedes usar un `<Link>` porque te redirigiría inmediatamente. Tú necesitas que el botón ejecute una función que:
1. Valide que los campos no estén vacíos.
2. Haga un *fetch* para guardar la película en la base de datos.
3. Espere la respuesta de éxito.
4. **Y recién ahí**, usar `navigate('/listado')` para llevar al usuario a ver las películas. 
¡Para todos estos flujos donde hay validaciones, esperas o condiciones lógicas antes de viajar, `useNavigate` es tu única opción!

### Pregunta 3.3: Paso de Estado en Navegación
Si utilizas `navigate('/detalle', { state: { objeto: miDato } })`, ¿cómo se recupera ese dato en el componente destino? ¿Qué ventaja tiene este método frente a pasar un ID por la URL y hacer un Fetch de nuevo? ¿Y qué desventaja principal tiene si el usuario actualiza (F5) la página?

> RESPUESTA:
No sabia ni que se podia poner una coma y mas valores, tampoco se que significan esos valores. Nose tampoco que son palabras reservadas y que son variables definidas por el programador. No conozco tampoco como recuperar ese dato, la ventaja en cuanto al id en la url ni cuando el usuario actualiza la pagina

**DEVOLUCIÓN:**
¡No te preocupes! Este es uno de los mejores trucos que te puedes llevar al examen. Te lo desgrano paso a paso:

1. **¿Qué son esos valores?** La función `navigate` acepta un segundo parámetro opcional que es un objeto de configuración. La palabra `state` es **reservada de React Router** y sirve para mandar datos "ocultos" a la siguiente página sin ensuciar la URL. Lo que va adentro de `state` (en este caso `objeto: miDato`) lo **defines tú como programador**. Podría ser: `{ state: { peliculaEntera: miPelicula } }`.
2. **Cómo se recupera:** En el componente destino (por ejemplo, en la página de Detalle), usas el hook `useLocation`:
   ```tsx
   import { useLocation } from 'react-router-dom';
   // Adentro de tu componente:
   const location = useLocation();
   const datoRecibido = location.state.peliculaEntera; 
   ```
3. **La gran ventaja:** Al pasar el objeto entero escondido en la navegación, te ahorras mucho código. No necesitas extraer el ID de la URL usando `useParams()`, ni tienes que ir a buscar esa película al Contexto global usando un `.find()`. ¡El dato ya llegó servido en bandeja!
4. **La desventaja (El problema del F5):** Como este dato viaja "en la memoria RAM" de la navegación, si el usuario está en la página de Detalle y presiona **F5 (Actualizar página)**, ese estado se destruye. Tu variable `location.state` pasará a valer `null` o `undefined` y tu página explotará con un error. En cambio, si usas el ID en la URL (`/detalle/42`), el ID sobrevive al F5 porque sigue escrito en la barra del navegador.

---

## 🟣 TEMA 4: TypeScript en React

### Pregunta 4.1: Tipado de Componentes (Props)
Describe cómo se tipan las *Props* de un componente funcional en React usando TypeScript (usando una `interface`). ¿Cómo le indicas a TypeScript que una propiedad en específico es opcional para que no marque error si no se la pasas al componente?

> RESPUESTA:
los tipados de las props es con interface y se ponen sus variables con `variable: TipoDeVariable | None` y supongo que el none como para indicarle que puede no existir. Que es uno o el otro

**DEVOLUCIÓN:**
¡Estás muy bien encaminado con la lógica, pero mezclaste un poquito la sintaxis con otros lenguajes (como Python)! 

En TypeScript no existe la palabra `None`, se usa `undefined` o `null`. Si pones `variable: string | undefined`, sí le estás diciendo "es uno o el otro", pero hay un problema: ¡te obligaría a escribir la prop de todas formas! (`<MiComponente variable={undefined} />`).

**La forma correcta y profesional** de hacer que una prop sea verdaderamente opcional (para que no tengas que escribirla cuando llamas al componente) es agregando un **signo de interrogación `?`** justo antes de los dos puntos.

Ejemplo de cómo se ve en código:
```tsx
interface PropsBoton {
  texto: string;         // <- Prop OBLIGATORIA
  color?: string;        // <- Prop OPCIONAL (gracias al ?)
}

// Ahora TypeScript no tira error si omites el color:
<Boton texto="Guardar" /> 
```

### Pregunta 4.2: Tipos vs Interfaces
Aunque a menudo se usan indistintamente para objetos en React, ¿cuál es la diferencia clave entre declarar un `type` y declarar una `interface` en TypeScript en relación a su capacidad de extenderse (herencia)?

> RESPUESTA:
tengo entendido por teoria general que no hay herencia en las interfacez, que solo son de uso. Y los tipos supongo que son las Clases de java por ejemplo, que se pueden heredar.

**DEVOLUCIÓN:**
¡Cuidado aquí! Te basaste en la lógica de otros lenguajes, pero en TypeScript funciona **exactamente al revés**.

1. **Las Interfaces SÍ tienen herencia:** Puedes usar la palabra clave `extends` (exactamente igual que en Java) para que una interfaz herede todas las propiedades de otra.
   ```tsx
   interface Persona { nombre: string; }
   interface Empleado extends Persona { sueldo: number; } // Hereda 'nombre'
   ```
2. **Los Tipos (`type`) NO tienen herencia tradicional:** No puedes usar `extends`. Para lograr algo similar con un `type`, tienes que "fusionarlos" usando una intersección (el símbolo `&`), lo cual a veces es menos legible.
   ```tsx
   type Persona = { nombre: string; };
   type Empleado = Persona & { sueldo: number; }; // Fusiona ambos
   ```

**Nota muy importante:** Ni los `types` ni las `interfaces` son como las Clases. En TypeScript, los types y las interfaces son "fantasmas": solo existen en tu editor para avisarte si te equivocas, pero **desaparecen por completo** cuando el código se convierte a JavaScript para el navegador. En cambio, una `class` sí es código real que se ejecuta en el navegador. Por eso en React casi siempre usamos Interfaces en lugar de Clases para definir nuestros modelos.

### Pregunta 4.3: Tipado en `useState`
A veces TypeScript puede inferir el tipo automáticamente (`useState(0)`). Sin embargo, ¿en qué casos es estrictamente obligatorio usar genéricos como `useState<Pelicula[]>(...)` o `useState<Usuario | null>(...)`? 

> RESPUESTA:
nose si es generico, si me preguntabas yo tedecia que eso esta bastante definido, un arrelgo de peliculas, y el otro es o un usuario o null. Nose como son los genericos en js

**DEVOLUCIÓN:**
¡Aclaración importantísima! Los "Genéricos" (Generics) son justamente esos **picos `< >`** que le pegamos a funciones como `useState`. Tienes razón en que no existen en JavaScript puro, son una herramienta exclusiva de TypeScript para decirle a una función: "Oye, internamente vas a trabajar con este tipo de dato específico".

¿Cuándo es **estrictamente obligatorio** escribirlos en un `useState`?
Cuando el valor inicial no le da información suficiente a TypeScript para "adivinar" el futuro de la variable.

1. **El caso del array vacío:** Si escribes `useState([])`, TypeScript mira el array y deduce: "Ok, es un array vacío y SIEMPRE estará vacío" (lo clasifica como tipo `never[]`). Si luego intentas meterle un objeto `setLista([{titulo: "Batman"}])`, ¡te tirará error! 
   Por eso **estás obligado** a poner el genérico: `useState<Pelicula[]>([])`. Así le avisas: "Arranca vacío, pero prepárate porque en el futuro contendrá Películas".

2. **El caso del null:** Si al arrancar la app todavía no tienes los datos del usuario, haces `useState(null)`. TypeScript deduce: "Esta variable siempre será null". Cuando haces el *fetch* y quieres guardar los datos con `setUsuario(datos)`, te tirará error.
   Por eso **estás obligado** a usar el genérico: `useState<Usuario | null>(null)`. Le avisas: "Arranca en null, pero en el futuro va a ser un Usuario".

Si el estado inicial es `useState(0)` o `useState(false)`, TypeScript ya es lo suficientemente inteligente para saber que será un `number` o un `boolean`, y ahí sí puedes omitir escribir los `< >`.

---

## 🟠 TEMA 5: Fetch y Manipulación de Datos

### Pregunta 5.1: Ciclo Completo de `fetch`
Al utilizar `fetch`, el flujo correcto incluye llamar a `res.json()`. ¿Por qué `fetch` necesita este paso intermedio? ¿Qué devuelve `fetch()` inicialmente y qué devuelve `res.json()`?

> RESPUESTA:
supongo que no es lo mismo el json formato de archivo, que el json que entiende js y puede controlar directamente. Como que convierte un json nativo a un json que pueda manipular ts. SOLO es algo que se me ocurre. 

**DEVOLUCIÓN:**
¡Tu intuición es sorprendentemente exacta! Le diste al clavo en el concepto fundamental.

Aquí tienes la explicación técnica formal para que te luzcas en el examen:
1. **Lo que devuelve `fetch()`:** Cuando haces la petición, la función no te devuelve tus datos mágicamente; devuelve un objeto **`Response`** de HTTP. Este objeto contiene metadatos de la red (código de estado 200, headers, si falló o no). El "cuerpo" de la respuesta viene como un simple texto plano (un *stream* de texto crudo en formato JSON).
2. **Lo que hace `.json()`:** A un texto plano no puedes hacerle `.map()` ni leer sus propiedades. La función `res.json()` agarra ese texto crudo y lo **parsea (lo convierte)** en arreglos y objetos nativos reales de JavaScript/TypeScript que sí puedes manipular.

*Nota extra de asincronismo:* Descargar la respuesta de la red toma tiempo, y "traducir" el texto a objetos también toma tiempo. Es por eso que ambas funciones devuelven **Promesas**, y por eso en código siempre vemos dos `.then()` encadenados:
`fetch(...) .then(res => res.json()) .then(datos => setEstado(datos))`

### Pregunta 5.2: Inmutabilidad al Modificar Arrays
Si tienes en tu estado un arreglo de objetos y necesitas modificar la propiedad de un elemento específico, no puedes hacer `estado[2].valor = nuevoValor` directamente por las reglas de inmutabilidad de React. ¿Cómo usarías el método `.map()` para lograr este cambio sin mutar el arreglo original?

> RESPUESTA:
podria usar el elementos.find() y buscar ese objeto, una vez que ese objeto se encuentre en mi poder, modificarlo. sino con map se me ocurre hacer lo mismo, verificar si ese es el objeto que busco, cuando lo sea, lo modifico. nose me ocurre otra cosa

**DEVOLUCIÓN:**
¡Mucho cuidado con la primera opción! Si usas `.find()` para obtener el objeto y luego haces `objetoEncontrado.valor = nuevoValor`, estás mutando el objeto original. React no se dará cuenta de que cambió (porque es el mismo espacio en memoria) y **tu pantalla no se actualizará**.

La opción correcta es la segunda que pensaste: usar `.map()`.
`.map()` es perfecto porque crea un **arreglo totalmente nuevo**. Tu lógica de "verificar si es el objeto" es impecable, pero el truco está en *cómo* lo modificas: no debes alterar el original, sino **retornar una copia nueva** usando el operador de propagación (*spread operator* `...`).

Esta es la sintaxis exacta que usarás decenas de veces en React (anótala mentalmente):
```tsx
const nuevoArreglo = elementos.map((elem) => {
  if (elem.id === idBuscado) {
    // Si ES el que busco, retorno un OBJETO NUEVO copiando sus datos y pisando el que quiero cambiar
    return { ...elem, valor: nuevoValor };
  }
  // Si NO es el que busco, retorno el mismo objeto original
  return elem; 
});

setElementos(nuevoArreglo); // React detecta un arreglo nuevo y actualiza la pantalla
```
¡Fijate bien en ese `{ ...elem, valor: nuevoValor }`, es el santo grial de la inmutabilidad en objetos!

### Pregunta 5.3: Estados Derivados
Si tu estado global mantiene un array de películas `peliculas` (cada una con su `.calificacion`), y necesitas mostrar el "Promedio de Calificaciones" en tu Header. ¿Por qué se considera un "anti-patrón" crear un estado `[promedio, setPromedio]`? ¿Cómo usarías `.reduce()` para resolverlo de forma elegante y optimizada sin crear un estado adicional?

> RESPUESTA:
nose bien como se usa el .reduce ni para que sirve. entonces no entiendo ni se como responder

**DEVOLUCIÓN:**
¡No te preocupes! Vamos a dividir esto en dos partes porque ambas son conceptos clave que suelen tomar en los exámenes.

**1. ¿Por qué es un "anti-patrón" usar un `useState` para el promedio? (Estado Derivado)**
Si creas `const [promedio, setPromedio] = useState(0)`, te metes en un problema de sincronización: cada vez que el usuario agregue, borre o edite una película, vas a tener que acordarte de llamar a `setPromedio()` para recalcular todo. ¡Si te olvidas en un solo lugar, el promedio en la pantalla será mentira!
Lo correcto es calcularlo "al vuelo" guardándolo en una variable normal: `const promedio = calcularPromedio()`. Como cada cambio en el estado `peliculas` obliga a React a re-dibujar (re-renderizar) la pantalla, ese cálculo matemático se va a ejecutar solo y siempre estará 100% actualizado y sincronizado. A esto se le llama **Estado Derivado**.

**2. ¿Qué es y cómo se usa `.reduce()`?**
Como su nombre indica, sirve para "reducir" un array completo a **un solo valor** (ej: la suma total de puntos, el precio total de un carrito de compras).
Funciona pasándole dos cosas a la función: un "acumulador" (una alcancía donde vas guardando la cuenta total) y el elemento actual que está iterando. Además, al final le pasas un `0` para que la alcancía arranque vacía.

Mira qué elegante queda para sacar el promedio:
```tsx
// 1. Sumamos todas las calificaciones usando reduce
const sumaTotal = peliculas.reduce((alcancia, pelicula) => {
    return alcancia + pelicula.calificacion;
}, 0); // <- Este 0 significa que la alcancía empieza en cero

// 2. Sacamos el promedio dividiendo por la cantidad
const promedioFinal = sumaTotal / peliculas.length;
```
¡Y listo! Recorrió todo el arreglo, sumó las calificaciones en la alcancía, y luego dividimos. Todo sin usar ni un solo `useState`.

---
**¡FELICITACIONES! 🎉** 
Has completado todo el Cuestionario Teórico. Tuviste razonamientos excelentes y pudimos ajustar los detalles técnicos. Cuando te sientas listo, abre el archivo `cuestionario_practico.md` y empieza con el Bloque 1. ¡Ahí tendrás que aplicar todo esto escribiendo código de verdad!
