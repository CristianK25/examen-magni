import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import PaginaPage from './paginas/pagina'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPage />} />
      </Routes>
    </>
  )
}

export default App
