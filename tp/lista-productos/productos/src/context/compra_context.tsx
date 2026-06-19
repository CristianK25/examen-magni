import { createContext, useContext, useState, type ReactNode } from 'react';
import type Producto from "../modelo/Producto";
import datosProductos from "../../../docs/productos_super.json";


export interface ProductoType {
    productosDisponibles: Producto[];
    productosSeleccionados: Producto[];
    presupuestoInicial: number;
    montoGastado: number;
    montoDisponible: number;

    agregarProducto: (codigo: string) => string | null;
    quitarProducto: (producto: Producto) => void;
    puedeGenerarCompra: () => string | null;
}

export const Contexto = createContext<ProductoType | undefined>(undefined);


export function Proveedor({ children }: { children: ReactNode }) {
    const presupuestoInicial = 250000;
    const [productosDisponibles, setProductosDisponibles] = useState<Producto[]>(
        datosProductos.map((p) => ({ ...p, cantidad: 0 } as Producto))
    );
    const [productosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]);
    const montoGastado = productosSeleccionados.reduce(
        (total, producto) =>
            total + (producto.precioVenta * producto.cantidad),
        0
    );
    const montoDisponible = presupuestoInicial - montoGastado


    function agregarProducto(codigo: string): string | null {
        const producto = productosDisponibles.find(
            (p) => p.codigoProducto === codigo
        )
        if (!producto) {
            return "El código ingresado no es válido, intente nuevamente"
        }
        if (producto.precioVenta > montoDisponible) {
            return "La compra no cubre las necesidades básicas o excede el presupuesto disponible."
        }
        setProductosSeleccionados((prev) => {
            const existente = prev.find(
                (p) => p.codigoProducto === producto.codigoProducto
            )
            if (existente) {
                return prev.map((p) =>
                    p.codigoProducto === producto.codigoProducto
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                )
            }
            return [...prev, { ...producto, cantidad: 1 }]
        })
        return null
    }


    function quitarProducto(producto: Producto) {
        setProductosSeleccionados((prev) => {
            const existente = prev.find(
                (p) => p.codigoProducto === producto.codigoProducto
            )
            if (!existente) return prev
            if (existente.cantidad === 1) {
                return prev.filter(
                    (p) => p.codigoProducto !== producto.codigoProducto
                )
            }
            return prev.map((p) =>
                p.codigoProducto === producto.codigoProducto
                    ? { ...p, cantidad: p.cantidad - 1 }
                    : p
            )
        })
    }



    const cantidadTotal = productosSeleccionados.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );

    // -----------------------------------------------------------------------------------
    // MÉTODO: COMPROBAR / VALIDAR CONDICIONES DE LA PLANTILLA
    const puedeGenerarCompra = (): string | null => {
        // almenos 15 productos en la cantidad todal
        if (cantidadTotal < 15) {
            return "La compra no cubre las necesidades basicas o excede el predupuesto disponible.";
        }

        // el presupuesto no puede ser negativo 
        if (montoDisponible < 0) {
            return "La compra no cubre las necesidades basicas o excede el predupuesto disponible.";
        }

        // al menos 1 producto por categoria
        // Contamos cuántos productos de cada categoría hay en el carrito
        const cantAlmacen = productosSeleccionados.filter(p => p.codigoCategoria === "ALM").length;
        const cantLimpieza = productosSeleccionados.filter(p => p.codigoCategoria === "LIM").length;
        const cantHigiene = productosSeleccionados.filter(p => p.codigoCategoria === "HIG").length;
        const cantBebidas = productosSeleccionados.filter(p => p.codigoCategoria === "BEB").length;

        // Si de alguna categoría tenemos 0 (es decir, menor a 1), tiramos el error
        if (cantAlmacen < 1 || cantLimpieza < 1 || cantHigiene < 1 || cantBebidas < 1) {
            return "La compra no cubre las necesidades básicas o excede el presupuesto disponible.";
        }

        // Si pasó todas las comprobaciones sin retornar antes, la plantilla es VÁLIDA.
        return null;
    };

    return (
        // Pasamos todas las variables y métodos al Contexto para que los hijos las consuman
        <Contexto.Provider
            value={{
                productosDisponibles,
                productosSeleccionados,
                presupuestoInicial,
                montoDisponible,
                montoGastado,
                agregarProducto,
                puedeGenerarCompra,
                quitarProducto,
            }}
        >
            {children}
        </Contexto.Provider>
    );
}


export const useCompra = () => {
    const context = useContext(Contexto);
    if (context === undefined) {
        throw new Error("useCompra debe utilizarse dentro de un Proveedor");
    }
    return context;
};