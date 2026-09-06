import { Routes, Route } from 'react-router-dom'
import PaginaBase from './paginas/PaginaBase'
import PaginaDetalle from './paginas/PaginaDetalle'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<PaginaBase />} />
        <Route path="/final" element={<PaginaDetalle />} />
      </Routes>
    </div>
  )
}

export default App
