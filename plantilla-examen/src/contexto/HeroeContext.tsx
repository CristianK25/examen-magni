import { createContext, useContext, useState, type ReactNode } from 'react';
import type Modelo from '../modelo/Hero';
import datos from "../../docs/heroes.json";

// Interfaz que define los datos y métodos que el Contexto expondrá
export interface ContextoType {
    elementosDisponibles: Modelo[];
    elementosSeleccionados: Modelo[];

    agregarElemento: (codigo: string) => string | null;
    quitarElemento: (elemento: Modelo) => void;
}

// 1. Creación del Contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);

// 2. Componente Proveedor (Provider)
export function Proveedor({ children }: { children: ReactNode }) {
    const [elementosDisponibles, setElementosDisponibles] = useState<Modelo[]>(datos);

    return (
        // Pasamos todas las variables y métodos al Contexto para que los hijos las consuman
        <Contexto.Provider
            value={{
                elementosDisponibles,
                elementosSeleccionados,
                agregarElemento,
                quitarElemento,
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
