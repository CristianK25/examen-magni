import { useContexto } from "../contexto/heroes_context"
import Heroe from "./heroe";

function SuperHeroesLista() {
    const { elementosFiltrados } = useContexto();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {elementosFiltrados.map(
                (i, index) => (
                    <Heroe key={index} heroe={i} />
                )
            )}
        </div>
    )
}
export default SuperHeroesLista