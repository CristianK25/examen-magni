import { createContext, useContext, useState, type ReactNode } from 'react';
import type Modelo from '../modelo/modelo';

// Extendemos el modelo para representar los elementos dentro del carrito/selección
export interface CarritoItem extends Modelo {
    cantidadSeleccionada: number; // Cantidad agregada por el usuario (ej: 0.5, 1.5, 2)
}

// Interfaz del contexto
export interface ContextoConCantidadType {
    elementosDisponibles: Modelo[];
    elementosSeleccionados: CarritoItem[];
    presupuestoInicial: number;
    montoGastado: number;
    montoDisponible: number;

    agregarElemento: (codigo: string, cantidad: number) => string | null;
    quitarElemento: (codigo: string) => void;
    puedeConfirmarOperacion: () => string | null;
}

// 1. Creación del Contexto
export const ContextoConCantidad = createContext<ContextoConCantidadType | undefined>(undefined);

// 2. Proveedor (Provider)
export function ProveedorConCantidad({ children }: { children: ReactNode }) {
    const presupuestoInicial = 120000;

    // Listado de stock en tienda (elementosDisponibles)
    // Para el examen, aquí cargarás los datos desde tu archivo JSON.
    const [elementosDisponibles, setElementosDisponibles] = useState<Modelo[]>([
        // Ejemplo semilla (puedes cambiarlo/borrarlo al integrar tu JSON):
        { codigo: "P001", nombre: "Manzana", precioVenta: 1200, precioCompra: 800, stockActual: 10 },
        { codigo: "P002", nombre: "Banana", precioVenta: 1500, precioCompra: 1000, stockActual: 15 },
        { codigo: "P003", nombre: "Naranja", precioVenta: 1000, precioCompra: 600, stockActual: 8.5 }
    ]);

    // Elementos en el carrito de compras
    const [elementosSeleccionados, setElementosSeleccionados] = useState<CarritoItem[]>([]);

    // Cálculos derivados
    const montoGastado = elementosSeleccionados.reduce(
        (total, item) => total + (item.precioVenta * item.cantidadSeleccionada),
        0
    );
    const montoDisponible = presupuestoInicial - montoGastado;

    // MÉTODO: Agregar elemento con cantidad
    function agregarElemento(codigo: string, cantidad: number): string | null {
        // Validar que la cantidad ingresada sea lógica
        if (isNaN(cantidad) || cantidad <= 0) {
            return "La cantidad ingresada debe ser un número mayor a cero.";
        }

        // Buscar el producto en la lista de disponibles (tienda)
        const productoEnTienda = elementosDisponibles.find((p) => p.codigo === codigo);
        if (!productoEnTienda) {
            return "El código ingresado no es válido, intente nuevamente.";
        }

        // Validar si hay stock disponible suficiente en tienda
        if (productoEnTienda.stockActual < cantidad) {
            return "NO hay stock suficiente, modifique la cantidad.";
        }

        // Validar si el costo excede el presupuesto disponible
        const costoTransaccion = productoEnTienda.precioVenta * cantidad;
        if (costoTransaccion > montoDisponible) {
            return "La compra excede el presupuesto disponible.";
        }

        // Restar el stock en la lista de disponibles (tienda)
        setElementosDisponibles((prevDisponibles) =>
            prevDisponibles.map((p) =>
                p.codigo === codigo
                    ? { ...p, stockActual: Number((p.stockActual - cantidad).toFixed(2)) }
                    : p
            )
        );

        // Agregar o actualizar el carrito (elementosSeleccionados)
        setElementosSeleccionados((prevSeleccionados) => {
            const existente = prevSeleccionados.find((p) => p.codigo === codigo);

            if (existente) {
                // Si ya existe, le incrementamos la cantidad acumulada
                return prevSeleccionados.map((p) =>
                    p.codigo === codigo
                        ? { 
                            ...p, 
                            cantidadSeleccionada: Number((p.cantidadSeleccionada + cantidad).toFixed(2)) 
                          }
                        : p
                );
            }

            // Si es nuevo en el carrito, lo creamos con la cantidad inicial
            return [...prevSeleccionados, { ...productoEnTienda, cantidadSeleccionada: cantidad }];
        });

        return null; // Operación exitosa
    }

    // MÉTODO: Quitar elemento del carrito (y devolver el stock a la tienda)
    function quitarElemento(codigo: string) {
        const itemEnCarrito = elementosSeleccionados.find((p) => p.codigo === codigo);
        if (!itemEnCarrito) return;

        const cantidadADevolver = itemEnCarrito.cantidadSeleccionada;

        // 1. Devolver el stock a los productos disponibles en tienda
        setElementosDisponibles((prevDisponibles) =>
            prevDisponibles.map((p) =>
                p.codigo === codigo
                    ? { ...p, stockActual: Number((p.stockActual + cantidadADevolver).toFixed(2)) }
                    : p
            )
        );

        // 2. Remover por completo el item del carrito
        setElementosSeleccionados((prevSeleccionados) =>
            prevSeleccionados.filter((p) => p.codigo !== codigo)
        );
    }

    // Validación antes de proceder
    const puedeConfirmarOperacion = (): string | null => {
        if (elementosSeleccionados.length === 0) {
            return "Debe seleccionar al menos un artículo para confirmar.";
        }
        return null;
    };

    return (
        <ContextoConCantidad.Provider
            value={{
                elementosDisponibles,
                elementosSeleccionados,
                presupuestoInicial,
                montoGastado,
                montoDisponible,
                agregarElemento,
                quitarElemento,
                puedeConfirmarOperacion,
            }}
        >
            {children}
        </ContextoConCantidad.Provider>
    );
}

// Hook de acceso directo
export const useContextoConCantidad = () => {
    const context = useContext(ContextoConCantidad);
    if (context === undefined) {
        throw new Error("useContextoConCantidad debe utilizarse dentro de un ProveedorConCantidad");
    }
    return context;
};
