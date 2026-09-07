import { useState } from "react"
import { useContexto } from "../contexto/heroes_context"

function PaginaComparador() {
    const { elementos } = useContexto()
    const [primerSuper, setPrimerSuper] = useState("")
    const [segundoSuper, setSegundoSuper] = useState("")

    const [superheroeMasFuerte, setsuperheroeMasFuerte] = useState("")

    const compararSuperheroes = function (idSuper1, idSuper2) {
        if (!idSuper1 || !idSuper2) {
            setsuperheroeMasFuerte("Por favor selecciona ambos héroes");
            return;
        }
        if (idSuper1 === idSuper2) {
            return (
                setsuperheroeMasFuerte("Son el mismo superheroe, elige dos distintos")
            )
        } else {
            let heroe1 = elementos.find((heroe) => heroe.id === Number(idSuper1))
            let heroe2 = elementos.find((heroe) => heroe.id === Number(idSuper2))
            if (heroe1.nivelPoder > heroe2.nivelPoder) {
                setsuperheroeMasFuerte(`El superheroe mas fuerte es: ${heroe1.nombre}`)
            } else {
                setsuperheroeMasFuerte(`El superheroe mas fuerte es: ${heroe2.nombre}`)
            }
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Comparador de Heroes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg max-w-2xl mx-auto bg-white">
                <label htmlFor="izq">Primer SuperHeroe</label>
                <select
                    value={primerSuper}
                    onChange={(e) => setPrimerSuper(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                >
                    <option value="">Selecciona un héroe...</option>
                    {elementos.map(
                        (i, index) => (
                            <option key={index} value={i.id}>{i.nombre}</option>
                        )
                    )}
                </select>

                <label htmlFor="der">Segundo SuperHeroe</label>
                <select
                    value={segundoSuper}
                    onChange={(e) => setSegundoSuper(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                >
                    <option value="">Selecciona un héroe...</option>
                    {elementos.map(
                        (i, index) => (
                            <option key={index} value={i.id}>{i.nombre}</option>
                        )
                    )}
                </select>
                <button
                    onClick={() => compararSuperheroes(primerSuper, segundoSuper)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                    Comparar
                </button>
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">{superheroeMasFuerte}</h1>
        </div>
    )
}
export default PaginaComparador