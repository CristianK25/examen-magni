import { createContext, useContext, useState, type ReactNode } from 'react';
import type Modelo from '../modelo/modelo';

// Interfaz que define los datos y métodos que el Contexto expondrá
export interface ContextoType {
    elementosDisponibles: Modelo[];
    elementosSeleccionados: Modelo[];
    presupuestoInicial: number;
    montoGastado: number;
    montoDisponible: number;

    agregarElemento: (codigo: string) => string | null;
    quitarElemento: (elemento: Modelo) => void;
    puedeConfirmarOperacion: () => string | null;
}

// 1. Creación del Contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);

// 2. Componente Proveedor (Provider)
export function Proveedor({ children }: { children: ReactNode }) {
    
    // Variables de estado inicial (Puedes cambiar esto para cargar desde un JSON)
    const presupuestoInicial = 120000;
    
    const [elementosDisponibles] = useState<Modelo[]>([]); // Aquí iría: jsonDatos.map(p => ({...p}))
    const [elementosSeleccionados, setElementosSeleccionados] = useState<Modelo[]>([]);

    // Cálculos derivados automáticos
    const montoGastado = elementosSeleccionados.reduce(
        (total, item) => total + (item.precioVenta * item.stockActual),
        0
    );
    const montoDisponible = presupuestoInicial - montoGastado;

    // Métodos para interactuar con el estado
    function agregarElemento(codigo: string): string | null {
        const elemento = elementosDisponibles.find((p) => p.codigo === codigo);
        
        if (!elemento) {
            return "El código ingresado no es válido.";
        }
        
        if (elemento.precioVenta > montoDisponible) {
            return "No tienes presupuesto suficiente.";
        }
        
        setElementosSeleccionados((prev) => {
            const existente = prev.find((p) => p.codigo === elemento.codigo);
            if (existente) {
                return prev.map((p) =>
                    p.codigo === elemento.codigo
                        ? { ...p, stockActual: p.stockActual + 1 }
                        : p
                );
            }
            return [...prev, { ...elemento, stockActual: 1 }];
        });
        
        return null; // Null indica que no hubo error
    }

    function quitarElemento(elemento: Modelo) {
        setElementosSeleccionados((prev) => {
            const existente = prev.find((p) => p.codigo === elemento.codigo);
            if (!existente) return prev;
            
            if (existente.stockActual === 1) {
                return prev.filter((p) => p.codigo !== elemento.codigo);
            }
            
            return prev.map((p) =>
                p.codigo === elemento.codigo
                    ? { ...p, stockActual: p.stockActual - 1 }
                    : p
            );
        });
    }

    // MÉTODO: VALIDACIONES DE NEGOCIO PARA CONFIRMAR
    const puedeConfirmarOperacion = (): string | null => {
        // Ejemplo de validación:
        // if (elementosSeleccionados.length === 0) return "Debe seleccionar al menos un elemento.";
        return null;
    };

    return (
        <Contexto.Provider
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
        </Contexto.Provider>
    );
}

// 3. Hook personalizado para usar el contexto más fácilmente
export const useContexto = () => {
    const context = useContext(Contexto);
    if (context === undefined) {
        throw new Error("useContexto debe utilizarse dentro de un Proveedor");
    }
    return context;
};
