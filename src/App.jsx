import { BrowserRouter, Route, Routes } from "react-router-dom"

import AcompanhamentoOnibus from "./pages/acompanhamentoOnibus"
import Home from "./pages/home"
import ParadasProximas from "./pages/paradasProximas"
import PrevisoesParada from "./pages/previsoesParada"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/paradas-proximas' element={<ParadasProximas />} />

        <Route path='/previsoes-parada/:codParada' element={<PrevisoesParada />} />

        <Route path='/acompanhamento-onibus/:codItinerario' element={<AcompanhamentoOnibus />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
