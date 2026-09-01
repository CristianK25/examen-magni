import { Routes, Route } from 'react-router-dom';
import ListaCompraFinalPage from './paginas/ProductoResumenPage';
import ListaProductoPage from './paginas/ProductoListaPage';
function App() {

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          {/* Ruta principal: Muestra la pantalla de compra de jugadores */}
          <Route path="/" element={<ListaProductoPage />} />

          {/* Ruta final: Muestra el plantel definitivo agrupado */}
          <Route path="/final" element={<ListaCompraFinalPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
