import { useContexto } from '../contexto/provincia_context';
import { useNavigate } from 'react-router-dom';
import ProvinciasArgentinas from '../componentes/provincias_argentinas';
import Busqueda from '../componentes/busqueda';

export default function PaginaListaProvincias() {
    const { provincias } = useContexto();
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <Busqueda />
            <ProvinciasArgentinas />
        </div>
    );
}
