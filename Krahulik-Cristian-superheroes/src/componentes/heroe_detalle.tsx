import type Modelo from '../modelo/heroe'

interface HeroeProp {
    heroe: Modelo
}

function HeroeDetalle({ heroe }: HeroeProp) {

    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">{heroe.nombre}</h1>
            <div className="w-96 grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center justify-center h-64 w-full bg-gray-100 rounded overflow-hidden">
                    <img src={`/${heroe.imagen}`} alt={heroe.nombre} className="w-full h-full object-cover" />
                </div>
                <p className="flex justify-between border-b py-1">
                    <span className="font-semibold">Editorial:</span>
                    <span>{heroe.editorial}</span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span className="font-semibold">Año Creacion:</span>
                    <span>{heroe.anioCreacion}</span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span className="font-semibold">Origen:</span>
                    <span>{heroe.origen}</span>
                </p>
                <p className="flex justify-between border-b py-1">
                    <span className="font-semibold">Nivel de Poder:</span>
                    <span>{heroe.nivelPoder}</span>
                </p>
            </div>
            <p>Poderes</p>
            <ul>
                {heroe.poderes.map(
                    (i) => (
                        <li>i</li>
                    )
                )}
            </ul>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Volver
            </button>
        </div>
    )
}
export default HeroeDetalle