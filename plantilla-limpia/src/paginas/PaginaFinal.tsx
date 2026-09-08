import { useContexto } from '../contexto/context';
import { useNavigate } from 'react-router-dom';

export default function PaginaFinal() {
    const { elementos } = useContexto();
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Página Final</h1>
        </div>
    );
}
