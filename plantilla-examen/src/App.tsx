import { Routes, Route } from 'react-router-dom'
import Pagina1 from './paginas/Detail'
import PaginaFinal from './paginas/Versus'

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
