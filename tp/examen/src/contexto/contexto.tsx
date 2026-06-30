import { createContext, useContext, useState, type ReactNode } from 'react';
import datosproductos from "../../docs/verduleria.json";
import type FrutaVerdura from '../modelo/FrutaVerdura';

//Interfaz
export interface productoType {
    productosDisponibles: FrutaVerdura[];
    productosSeleccionados: FrutaVerdura[];
    presupuestoInicial: number;
    montoGastado: number;
    montoDisponible: number;

    agregarProducto: (codigo: string) => string | null;
    quitarProducto: (producto: FrutaVerdura) => void;
    puedeGenerarCompra: () => string | null;
}

//Contexto
export const Contexto = createContext<productoType | undefined>(undefined);


//Proveedor
export function Proveedor({ children }: { children: ReactNode }) {
    const presupuestoInicial = 120000
    //Variables
    const [productosDisponibles, setProductosDisponibles] = useState<FrutaVerdura[]>(
        datosproductos.map((p) => ({ ...p, cantidad: 0 } as FrutaVerdura))
    );
    const [productosSeleccionados, setProductosSeleccionados] = useState<FrutaVerdura[]>([]);
    const montoGastado = productosSeleccionados.reduce(
        (total, producto) =>
            total + (producto.precioVenta * producto.stockActual),
        0
    );
    const montoDisponible = presupuestoInicial - montoGastado


    function agregarProducto(codigo: string): string | null {
        const producto = productosDisponibles.find(
            (p) => p.codigo === codigo
        )
        if (!producto) {
            return "El código ingresado no es válido, intente nuevamente"
        }
        if (producto.precioVenta > montoDisponible) {
            return "La compra no cubre las necesidades básicas o excede el presupuesto disponible."
        }
        setProductosSeleccionados((prev) => {
            const existente = prev.find(
                (p) => p.codigo === producto.codigo
            )
            if (existente) {
                return prev.map((p) =>
                    p.codigo === producto.codigo
                        ? { ...p, cantidad: p.stockActual + 1 }
                        : p
                )
            }
            return [...prev, { ...producto, stockActual: 1 }]
        })
        return null
    }


    function quitarProducto(producto: FrutaVerdura) {
        setProductosSeleccionados((prev) => {
            const existente = prev.find(
                (p) => p.codigo === producto.codigo
            )
            if (!existente) return prev
            if (existente.stockActual === 1) {
                return prev.filter(
                    (p) => p.codigo !== producto.codigo
                )
            }
            return prev.map((p) =>
                p.codigo === producto.codigo
                    ? { ...p, cantidad: p.stockActual - 1 }
                    : p
            )
        })
    }



    const cantidadTotal = productosSeleccionados.reduce(
        (total, producto) =>
            total + producto.stockActual,
        0
    );

    // -----------------------------------------------------------------------------------
    // MÉTODO: COMPROBAR / VALIDAR CONDICIONES DE LA PLANTILLA
    const puedeGenerarCompra = (): string | null => {
        return null;
    }

    //Funciones


    //Validaciones

    return (
        // Pasamos todas las variables y métodos al Contexto para que los hijos las consuman
        <Contexto.Provider
            value={{
                productosDisponibles,
                productosSeleccionados,
                presupuestoInicial,
                montoGastado,
                montoDisponible,
                agregarProducto,
                quitarProducto,
                puedeGenerarCompra,
            }}
        >
            {children}
        </Contexto.Provider>
    );
};

//Hook
export const useContexto = () => {
    const context = useContext(Contexto);
    if (context === undefined) {
        throw new Error("useCompra debe utilizarse dentro de un Proveedor");
    }
    return context;
}