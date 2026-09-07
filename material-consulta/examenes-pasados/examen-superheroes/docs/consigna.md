# Examen Final – React & TypeScript – Programación 4
## TUP – UTN: Catálogo y Comparador de Superhéroes

Dado el conjunto de datos JSON incluidos en el archivo **heroes.json** (disponible en `public/heroes.json`) y las imágenes en `public/images/`.

Genere como mínimo los siguientes componentes y estructuras en React con TypeScript:

* **Modelo / Interface:** `src/modelo/Heroe.ts`
* **Contexto:** `src/contexto/context.tsx` (o `heroes_context.tsx`)
* **Componente:** `src/componentes/heroe.tsx` (Tarjeta individual)
* **Componente / Página:** `src/componentes/superheroes_lista.tsx` (Grilla de héroes)
* **Componente / Página:** `src/componentes/heroe_detalle.tsx` (Vista detallada del héroe)
* **Componente / Página:** `src/componentes/comparador.tsx` (Comparador de batalla entre 2 héroes)
* **Componente:** `src/componentes/busqueda.tsx` (Barra superior con navegación y filtros)

---

### 1. Modelo: `src/modelo/Heroe.ts`

Deberá definir la interface de TypeScript que represente fielmente a los superhéroes del archivo JSON:

```typescript
export default interface Heroe {
    id: number;
    nombre: string;
    anioCreacion: number;
    editorial: string;    // "Marvel" | "DC"
    imagen: string;       // ej: "img1.jpg"
    poderes: string[];    // Array de habilidades
    origen: string;       // Historia breve del héroe
    nivelPoder: number;   // Valor numérico (ej: 70, 85, 95)
}
```

---

### 2. Contexto de la Aplicación (`context.tsx`)

Deberá implementar un contexto global que realice:
1. **Petición HTTP / Fetch:** Obtener los datos desde `/heroes.json` al montarse el componente.
2. **Cálculo de Promedio de Poder:** Función o valor calculado que determine el nivel de poder promedio de todos los superhéroes cargados.
3. **Filtro por Editorial:** Función para filtrar superhéroes según su editorial (*"Todas"*, *"Marvel"*, *"DC"*).
4. **Filtro por Nivel de Poder Mínimo:** Función para filtrar héroes con `nivelPoder` mayor o igual al valor ingresado en el buscador.

---

### 3. Componente `heroe.tsx` (Tarjeta Individual)

La tarjeta presentará a un superhéroe con el siguiente formato:

```text
+----------------------------+
|         Spider-Man         |
|  +----------------------+  |
|  |      [ Imagen ]      |  |
|  +----------------------+  |
|  Editorial: Marvel         |
|  Nivel de Poder: 70 pts    |
|       [ VER DETALLE ]      |
+----------------------------+
```

* Al hacer clic en **[ VER DETALLE ]**, deberá navegar mediante React Router a la ruta `/heroe/:id` correspondiente.

---

### 4. Componente `busqueda.tsx` (Barra Superior de Navegación y Filtros)

Estará presente en la parte superior y contendrá:
* Vínculo a la lista principal: **`Héroes`** (`/`)
* Vínculo a la página de batalla: **`Comparador`** (`/comparar`)
* Filtro por Editorial: Botones o selector para elegir `[ Todas | Marvel | DC ]`.
* Filtro por Nivel de Poder: Input numérico con la leyenda *"Nivel de Poder Mayor a:"* y el botón **`[ BUSCAR ]`**.

```text
+-------------------------------------------------------------------------------------------------------+
| [ Héroes ] | [ Comparar ] | Editorial: [ Todas | Marvel | DC ] | Poder Mayor a: [     ] [ BUSCAR ]     |
+-------------------------------------------------------------------------------------------------------+
```

---

### 5. Componente / Página `superheroes_lista.tsx` (Ruta Principal `/`)

* Deberá presentar los superhéroes utilizando el componente `heroe.tsx` en una **grilla responsiva de máximo 4 tarjetas por fila**.
* Responderá dinámicamente a los filtros aplicados desde `busqueda.tsx`.

```text
+-------------------+-------------------+-------------------+-------------------+
| Spider-Man        | Superman          | Iron Man          | Batman            |
| [ Imagen ]        | [ Imagen ]        | [ Imagen ]        | [ Imagen ]        |
| Marvel - 70 pts   | DC - 95 pts       | Marvel - 85 pts   | DC - 75 pts       |
| [ VER DETALLE ]   | [ VER DETALLE ]   | [ VER DETALLE ]   | [ VER DETALLE ]   |
+-------------------+-------------------+-------------------+-------------------+
| Wonder Woman      | Thor              | Flash             | Hulk              |
| ...               | ...               | ...               | ...               |
+-------------------+-------------------+-------------------+-------------------+
```

---

### 6. Componente / Página `heroe_detalle.tsx` (Ruta `/heroe/:id`)

Al seleccionar un superhéroe, se mostrará su ficha técnica en **2 columnas**:
* **Columna 1:** Imagen ampliada, Nombre, Editorial, Año de Creación e Historia de Origen.
* **Columna 2:** Lista de Poderes (renderizada con `<ul><li>`), Nivel de Poder del héroe y el **Promedio General de Poder** de todos los héroes (obtenido del contexto).
* **Botón `[ VOLVER ]`:** Permite regresar a la lista principal (`/`).

```text
+----------------------------------------------------------------------------------+
|                                    SUPERMAN                                      |
+----------------------------------------+-----------------------------------------+
| [ Imagen Ampliada ]                    | Poderes:                                |
|                                        |  * Superfuerza                          |
| Editorial: DC                          |  * Vuelo                                |
| Año Creación: 1938                     |  * Visión de rayos X                    |
|                                        |  * Invulnerabilidad                     |
| Origen:                                |                                         |
| Último hijo del planeta Krypton...    | Nivel de Poder: 95 pts                  |
|                                        | Promedio General de Poder: XX pts       |
+----------------------------------------+-----------------------------------------+
|                                  [ VOLVER ]                                      |
+----------------------------------------------------------------------------------+
```

---

### 7. Componente / Página `comparador.tsx` (Ruta `/comparar`)

Permitirá seleccionar **dos superhéroes** mediante dos listas desplegables (`<select>`) y compararlos en combate:

```text
+----------------------------------------------------------------------------------+
|                           ⚔️ COMPARADOR DE HÉROES ⚔️                             |
|                                                                                  |
|   Héroe 1: [ Seleccionar... ▼ ]        Héroe 2: [ Seleccionar... ▼ ]             |
|                                                                                  |
|                               [ ENFRENTAR ]                                      |
+----------------------------------------------------------------------------------+
```

Al presionar **[ ENFRENTAR ]**:
1. Se mostrarán las dos tarjetas de los héroes seleccionados lado a lado.
2. Se evaluará cuál de los dos tiene mayor `nivelPoder`.
3. Se mostrará un cartel destacado con el **Ganador de la batalla** y la diferencia de puntos de poder (o mensaje de *Empate* si tienen el mismo poder).
4. Botón **`[ VOLVER ]`** para regresar al catálogo principal.

---

### 8. Componente / Página `superheroes_tabla.tsx` (Vista Alternativa en Tabla)

Para practicar formas alternativas de presentación de datos en exámenes, se solicita agregar la posibilidad de ver los superhéroes en una **Tabla HTML**:

```text
+---------------------------------------------------------------------------------------------------------------+
| ID  | Foto   | Nombre       | Editorial | Año Creación | Poder  | Poderes                 | Acciones      |
+-----+--------+--------------+-----------+--------------+--------+-------------------------+---------------+
| 1   | [Foto] | Spider-Man   | Marvel    | 1962         | 70 pts | Agilidad, Sentido...    | [ VER DETALLE]|
| 2   | [Foto] | Superman     | DC        | 1938         | 95 pts | Superfuerza, Vuelo...   | [ VER DETALLE]|
+---------------------------------------------------------------------------------------------------------------+
```

#### Modalidades de Implementación (Practicar ambas):
1. **Opción A (Navegación por Ruta - `/tabla`):**
   * Crear la página `superheroes_tabla.tsx` asociada a la ruta `/tabla` en `App.tsx`.
   * En `busqueda.tsx` agregar el botón **`[ 📊 Vista Tabla ]`** / **`[ 🎴 Vista Tarjetas ]`** para navegar entre `/` y `/tabla`.
2. **Opción B (Toggle Dinámico en la misma página):**
   * En `superheroes_lista.tsx`, manejar un estado local `const [modoTabla, setModoTabla] = useState(false);`.
   * Agregar botones de alternancia arriba para cambiar condicionalmente entre renderizar la grilla de `<Heroe />` o la `<table>` de HTML dentro de la misma vista.

---

### 9. Enrutamiento (`App.tsx`)

Configurar las siguientes rutas con `react-router-dom`:
* `/` -> Página Principal (Buscador + Lista de Superhéroes en Tarjetas)
* `/tabla` -> Vista Alternativa de Superhéroes en Tabla HTML
* `/heroe/:id` -> Página de Detalle del Superhéroe
* `/comparar` -> Página de Comparación / Batalla

