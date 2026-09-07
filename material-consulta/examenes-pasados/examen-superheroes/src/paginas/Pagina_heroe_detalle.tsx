import { useContexto } from '../contexto/heroes_context';
import { useNavigate, useParams } from 'react-router-dom';
import HeroeDetalle from '../componentes/heroe_detalle';

export default function PaginaHeroeDetalle() {
    const { elementos } = useContexto();
    const { idHeroe } = useParams()

    const heroeSeleccionado = elementos.find(
        h => h.id === Number(idHeroe)
    );

    if (!heroeSeleccionado) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-500">Cargando o héroe no encontrado...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <HeroeDetalle heroe={heroeSeleccionado} />
        </div>
    );
}
