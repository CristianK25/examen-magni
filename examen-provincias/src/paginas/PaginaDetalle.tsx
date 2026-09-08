import { useContexto } from '../contexto/provincia_context';
import { useNavigate, useParams } from 'react-router-dom';
import ProvinciaDetalle from '../componentes/provincia_detalle';

export default function PaginaDetalleProvincias() {
    const { provincias } = useContexto();
    const { nombre } = useParams();

    const provinciaSeleccionada = provincias.find(
        p => p.provincia === nombre
    );
    return (
        <div className="p-4">
            <ProvinciaDetalle provincia={provinciaSeleccionada} />
        </div>
    );
}
