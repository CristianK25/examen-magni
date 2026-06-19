import { Routes, Route } from 'react-router-dom';
import ListaCompraFinalPage from './paginas/lista_compra_final';
import ListaProductoPage from './paginas/lista_productos';
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
