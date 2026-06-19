import { createContext, useContext, useState, type ReactNode } from 'react';
import type Modelo from '../modelo/Modelo';
//import datosProductos from "../../../docs/productos_super.json";

//Interfaz
export interface ContextoType {
    variable: Modelo[];
}

//Contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);


//Proveedor
export function Proveedor({ children }: { children: ReactNode }) {
    //Variables
    const [variable, setVariable] = useState<Modelo[]>([]);


    //Funciones


    //Validaciones

    return (
        // Pasamos todas las variables y métodos al Contexto para que los hijos las consuman
        <Contexto.Provider
            value={{
                variable,
            }}
        >
            {children}
        </Contexto.Provider>
    );
}

//Hook
export const useContexto = () => {
    const context = useContext(Contexto);
    if (context === undefined) {
        throw new Error("useCompra debe utilizarse dentro de un Proveedor");
    }
    return context;
};