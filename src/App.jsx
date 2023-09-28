import { BrowserRouter, Route, Routes } from "react-router-dom";

import AcompanhamentoOnibus from "./pages/acompanhamentoOnibus";
import Home from "./pages/home";
import MinhasParadas from "./pages/MinhasParadas";
import ParadasProximas from "./pages/paradasProximas";
import PrevisoesParada from "./pages/previsoesParada";
import DrawerAppBar from "./components/appBar";

function App() {
  return (
    <BrowserRouter>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/paradas-proximas" element={<ParadasProximas />} />

        <Route
          path="/previsoes-parada/:codParada"
          element={<PrevisoesParada />}
        />

        <Route
          path="/acompanhamento-onibus/:codItinerario"
          element={<AcompanhamentoOnibus />}
        />

        <Route path="/minhas-paradas" element={<MinhasParadas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
