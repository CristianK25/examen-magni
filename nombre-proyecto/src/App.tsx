import { Routes, Route } from 'react-router-dom'
import Pagina1 from './paginas/pagina1'
import PaginaFinal from './paginas/paginafinal'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<Pagina1 />} />
        <Route path="/final" element={<PaginaFinal />} />
      </Routes>
    </div>
  )
}

export default App
