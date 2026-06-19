import { useNavigate } from "react-router-dom";
import { useContexto } from "../contexto/contexto"
import { useState } from "react";
import type Modelo from "../modelo/Modelo";

export default function PaginaPage() {

    const {
        variable
    } = useContexto()

    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

    const navigate = useNavigate();

    const formatearDinero = (monto: number) => {
        return "$" + monto.toLocaleString("es-AR");
    };

    return (
        <div>

        </div>
    )
}