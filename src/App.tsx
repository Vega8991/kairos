// src/App.tsx
import { AnimatePresence } from 'motion/react';
import { etapas } from './data/etapas.data';
import { useKairosProgreso } from './hooks/useKairosProgreso';
import { Portada } from './components/Portada/Portada';
import { EtapaFrame } from './components/EtapaFrame/EtapaFrame';
import { FrameFinal } from './components/FrameFinal/FrameFinal';
import { Indicador } from './components/Indicador/Indicador';
import './App.css';

function App() {
  const { vista, avanzar } = useKairosProgreso();

  return (
    <div className="app-shell">
      <Indicador vista={vista} />
      <AnimatePresence mode="wait">
        {vista === 'portada' && <Portada onEmpezar={avanzar} />}

        {etapas.map(
          (etapa) =>
            vista === etapa.id && (
              <EtapaFrame key={etapa.id} etapa={etapa} onResuelto={avanzar} />
            )
        )}

        {vista === 'final' && <FrameFinal />}
      </AnimatePresence>
    </div>
  );
}

export default App;
