import { useNavigate } from 'react-router-dom'
import type Modelo from '../modelo/heroe'

interface HeroeProp {
    heroe: Modelo
}

function Heroe({ heroe }: HeroeProp) {
    const navegarHacia = useNavigate()

    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">{heroe.nombre}</h1>
            <img src={`/${heroe.imagen}`} alt={heroe.nombre} />
            <p>Editorial:   {heroe.editorial}</p>
            <p>Nivel de poder:    {heroe.nivelPoder}</p>
            <button
                onClick={() => navegarHacia(`/heroes/${heroe.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Ver Detalle
            </button>
        </div >
    )
}
export default Heroe