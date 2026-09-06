import { useContexto } from '../contexto/provincia_context';
import { useNavigate, useParams } from 'react-router-dom';
import ProvinciaDetalle from '../componentes/provincia_detalle';

export default function PaginaDetalle() {
    const { elementos } = useContexto();
    const navigate = useNavigate();
    const { nombre } = useParams();

    const provinciaSeleccionada = elementos.find(
        p => p.provincia === nombre
    );
    return (
        <div className="p-4">
            <ProvinciaDetalle provincia={provinciaSeleccionada} />
        </div>
    );
}
