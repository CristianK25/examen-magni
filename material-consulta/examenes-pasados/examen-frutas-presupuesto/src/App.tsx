import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ListaVerduleriaPage from './paginas/FrutaListaPage'
import ResumenPedidoPage from './paginas/FrutaResumenPage'

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
