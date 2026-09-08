import { useContexto } from '../contexto/context';
import { useNavigate } from 'react-router-dom';

export default function PaginaBase() {
    const { elementos } = useContexto();
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Página Base</h1>
        </div>
    );
}
