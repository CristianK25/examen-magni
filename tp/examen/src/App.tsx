import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import PaginaPage from './paginas/resumen_pedido'
import ListaVerduleriaPage from './paginas/lista_verduleria'
import ResumenPedidoPage from './paginas/resumen_pedido'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ListaVerduleriaPage />} />
        <Route path="/final" element={<ResumenPedidoPage />} />
      </Routes>
    </>
  )
}

export default App
