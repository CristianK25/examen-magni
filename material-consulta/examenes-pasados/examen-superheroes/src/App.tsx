import { Routes, Route } from 'react-router-dom'
import PaginaLista from './paginas/Pagina_superheroes_lista'
import PaginaDetalle from './paginas/Pagina_heroe_detalle'
import PaginaComparador from './paginas/Pagina_comparador'
import PaginaTabla from './paginas/Pagina_tabla'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<PaginaLista />} />
        <Route path="/heroes/:idHeroe" element={<PaginaDetalle />} />
        <Route path="/comparar" element={<PaginaComparador />} />
        <Route path="/tabla" element={<PaginaTabla />} />
      </Routes>
    </div>
  )
}

export default App
