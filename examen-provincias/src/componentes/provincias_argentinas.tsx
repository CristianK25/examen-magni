import { useContexto } from "../contexto/provincia_context"
import Provincia from "./provincia";

function ProvinciasArgentinas() {
    const {
        provincias
    } = useContexto();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {provincias.map(
                (i, index) =>
                    (<Provincia key={index} provincia={i} />)
            )}
        </div>
    )
}
export default ProvinciasArgentinas;

