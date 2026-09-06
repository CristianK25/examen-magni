import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type Modelo from '../modelo/Provincia';

// 1. Interfaz de lo que va a proveer el contexto
export interface ContextoType {
    elementos: Modelo[];
    promedioPoblacion: number;
    promedioSuperficie: number;
}

// 2. Creación del contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);

// 3. Proveedor del contexto
export function Proveedor({ children }: { children: ReactNode }) {
    const [elementos, setElementos] = useState<Modelo[]>([]);

    const URL_DATOS = '/lista_provincias.json';
    useEffect(() => {
        fetch(URL_DATOS)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setElementos(datos)
            })
            .catch((error) => console.error("Error al cargar:", error));
    }, []);

    const promedioPoblacion = Math.round(
        elementos.reduce((acum, p) => acum + p.poblacion, 0) / (elementos.length || 1)
    );

    const promedioSuperficie = Math.round(
        elementos.reduce((acum, p) => acum + p.superficie, 0) / (elementos.length || 1)
    );


    return (
        <Contexto.Provider value={{ elementos, promedioPoblacion, promedioSuperficie }}>
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
