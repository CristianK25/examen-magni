import { useContexto } from '../contexto/heroes_context';
import { useNavigate } from 'react-router-dom';
import Heroe from '../componentes/heroe';
import Busqueda from '../componentes/busqueda';
import SuperHeroesLista from '../componentes/superheroes_lista';
import TablaSuperheroes from '../componentes/tabla';
import { useState } from 'react';

export default function PaginaSuperHeroesLista() {
    const { elementos, elementosFiltrados } = useContexto();
    const navigate = useNavigate();
    const [modoTabla, setModoTabla] = useState(false);


    return (
        <div>
            <button
                onClick={() => navigate(`/tabla`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Ir Hacia la Tabla
            </button>
            <Busqueda />
            <button
                onClick={() => setModoTabla(!modoTabla)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium"
            >
                Cambiar Modo
            </button>
            <div>
                {!modoTabla ? <SuperHeroesLista /> : <TablaSuperheroes />}
            </div>
        </div>
    );
}
