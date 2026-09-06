// @ts-nocheck
/* eslint-disable */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type Modelo from '../modelo/heroe';

// 1. Interfaz de lo que va a proveer el contexto
export interface ContextoType {
    elementos: Modelo[];
    elementosFiltrados: Modelo[];
}

// 2. Creación del contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);

// 3. Proveedor del contexto
export function Proveedor({ children }: { children: ReactNode }) {
    const [elementos, setElementos] = useState<Modelo[]>([]);
    const [elementosFiltrados, setElementosFiltrados] = useState<Modelo[]>([]);

    useEffect(() => {
        fetch('./heroes.json')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setElementos(datos);
                setElementosFiltrados(datos);
            })
            .catch((error) => console.error("Error al cargar:", error));
    }, []);


    return (
        <Contexto.Provider value={{ elementos }}>
            {children}
        </Contexto.Provider>
    );
}

// 4. Custom Hook para consumir el contexto fácilmente
export function useContexto() {
    const context = useContext(Contexto);
    if (!context) {
        throw new Error("useContexto debe usarse dentro de un Proveedor");
    }
    return context;
}
