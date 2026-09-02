// @ts-nocheck
/* eslint-disable */
import { Routes, Route } from 'react-router-dom'
import PaginaBase from './paginas/PaginaBase'
import PaginaFinal from './paginas/PaginaFinal'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<PaginaBase />} />
        <Route path="/final" element={<PaginaFinal />} />
      </Routes>
    </div>
  )
}

export default App
