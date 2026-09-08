import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type Modelo from '../modelo/Provincia';

// 1. Interfaz de lo que va a proveer el contexto
export interface ContextoType {
    provincias: Modelo[];
    promedioPoblacion: number;
    promedioSuperficie: number;
    filtrarPorSuperficie: (superficie: number) => void;
}

// 2. Creación del contexto
export const Contexto = createContext<ContextoType | undefined>(undefined);

// 3. Proveedor del contexto
export function Proveedor({ children }: { children: ReactNode }) {
    const [elementosPrincipales, setElementosPrincipales] = useState<Modelo[]>([]);
    const [provincias, setProvincias] = useState<Modelo[]>([]);

    const URL_DATOS = '/lista_provincias.json';
    useEffect(() => {
        fetch(URL_DATOS)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setElementosPrincipales(datos);
                setProvincias([...datos]);
            })
            .catch((error) => console.error("Error al cargar:", error));
    }, []);

    /**Promedio poblacion */
    let sumaPoblacion = 0;

    for (const p of elementosPrincipales) {
        sumaPoblacion += p.poblacion;
    }

    const promedioPoblacion = elementosPrincipales.length
        ? Math.round(sumaPoblacion / elementosPrincipales.length)
        : 0;

    /**Promedio Superficie */
    let sumaSuperficie = 0;

    for (const s of elementosPrincipales) {
        sumaSuperficie += s.superficie
    }

    const promedioSuperficie = elementosPrincipales.length
        ? Math.round(sumaSuperficie / elementosPrincipales.length)
        : 0;

    const filtrarPorSuperficie = function (superficieIngresada) {
        let listaFiltrada = []
        for (const p of elementosPrincipales) {
            if (p.superficie >= superficieIngresada) {
                listaFiltrada.push(p)
            }
        }
        setProvincias(listaFiltrada)
    }

    return (
        <Contexto.Provider value={{ provincias, promedioPoblacion, promedioSuperficie, filtrarPorSuperficie }}>
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
