import { useContexto } from '../contexto/heroes_context';
import { useNavigate } from 'react-router-dom';
import Heroe from '../componentes/heroe'
import Busqueda from '../componentes/busqueda';

export default function SuperHeroesLista() {
    const { elementos, elementosFiltrados } = useContexto();
    const navigate = useNavigate();

    return (
        <div>
            <Busqueda />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {elementosFiltrados.map(
                    (i, index) => (
                        <Heroe key={index} heroe={i} />
                    )
                )}
            </div>
        </div>
    );
}
