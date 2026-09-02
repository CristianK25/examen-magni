# Examen Final – Angular – Programación 4
## TUP – UTN

Dado el conjunto de datos JSON, incluidos en el archivo **lista_provincias.json**

Genere como mínimo los siguientes componentes de React:
* Componente **provincia.tsx**
* Componente **provincias_argentinas.tsx**
* Componente **provincia_detalle.tsx**
* Componente **busqueda.tsx** (menú) con un vínculo al componente **provincias_argentinas.tsx**, un input con la leyenda "Superficie Provincia Mayor a:" y un botón:

```text
+-----------------------------------------------------------------------------------+
| Provincias | Superficie Provincia Mayor a: | [          ] | [ BUSCAR ]            |
+-----------------------------------------------------------------------------------+
```

* **Context** `provincias_context.ts`
* **Clase o interface o type** `Provincia.ts`

**Provincia {**
> provincia: string;  
> abreviatura: string;  
> capital: string;  
> bandera: string;  
> fechaAutonomia: string;  
> población: number;  
> superficie: number;  
> nroDepartamentos: string;  

**}**

---

### Componente provincia.tsx
La plantilla de este componente se corresponde a: (si lo desea puede crear su propia plantilla)

```text
+----------------------------+
|          Mendoza           |
|  +----------------------+  |
|  |     [  Escudo /  ]   |  |
|  |     [  Bandera  ]    |  |
|  +----------------------+  |
|      Capital - Mendoza     |
|         [ VER MAS ]        |
+----------------------------+
```

---

### Componente provincias_argentinas.tsx
Debe mostrar la totalidad de las provincias presentes en el archivo lista_provincias.json, deberá codificar un método en el context que obtenga los datos del archivo json mediante una llamada http, una vez obtenidos los datos deberá presentar las provincias haciendo uso del componente provincia presentado anteriormente, mostrando un máximo de 4 provincias por fila, debería quedar algo como:

```text
+-------------------+-------------------+-------------------+-------------------+
| Buenos Aires      | Catamarca         | Chaco             | Chubut            |
| Córdoba           | Corrientes        | Entre Ríos        | Formosa           |
| Jujuy             | La Pampa          | La Rioja          | +---------------+ |
|                   |                   |                   | |    Mendoza    | |
|                   |                   |                   | | [Escudo/Bandera]| |
|                   |                   |                   | |Capital-Mendoza| |
|                   |                   |                   | |   [VER MAS]   | |
|                   |                   |                   | +---------------+ |
+-------------------+-------------------+-------------------+-------------------+
| Misiones          | Neuquén           | Rio Negro         | Salta             |
| San Juan          | San Luis          | Santa Cruz        | Santa Fe          |
| Sgto. del Estero  | Tierra del Fuego  | Tucumán           |                   |
+-------------------+-------------------+-------------------+-------------------+
```

Al hacer click sobre el botón **Ver Mas** deberá direccionarse al **componente provincia_detalle.tsx** que muestre la totalidad de los datos de la provincia seleccionada, mostrando la información en 2 columnas, además deberá tener un link o botón que permita volver al componente provincias_argentinas.tsx

Ejemplo:
```text
Provincia:         Buenos Aires
Abreviatura:       BA
Capital:           La Plata

Bandera:           [ Escudo / Bandera ]
Fecha Autonomía:   1820-11-01
Población:         15625084          Promedio Población: XXXXXXXX
Superficie:        307571            Promedio Superficie: XXXXXXXX
Nº Departamentos:  135
                   [ VOLVER ]
```

Además, deberá mostrar los valores promedios de los campos población y superficie, los cuales serán calculados mediante una función o 2 funciones específicas que se encuentre en el contexto de la aplicación.

---

### Componente Buscador
En la parte superior de la pantalla inicial deberá existir un buscador que permita filtrar por la superficie de la provincia, por ejemplo, si se ingresa la "100000" deberá mostrar solo las provincias cuya superficie sea igual o superior a la superficie ingresada. El método deberá estar en el contexto de la aplicación.
