// src/App.tsx
import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, animate, useMotionValue, type MotionValue } from 'motion/react';
import { Arbol } from './arbol/Arbol';
import type { EtapaId } from './contenido/tipos';
import { Anillo } from './pantallas/etapa/Anillo';
import { Camino } from './pantallas/etapa/Camino';
import { Crecer } from './pantallas/etapa/Crecer';
import { Enigma } from './pantallas/etapa/Enigma';
import { Revelacion } from './pantallas/etapa/Revelacion';
import { Umbral } from './pantallas/etapa/Umbral';
import { Final } from './pantallas/Final';
import { Portada } from './pantallas/Portada';
import { Cabecera } from './ui/Cabecera';
import { Fondo } from './ui/Fondo';
import { EASE } from './ui/movimiento';
import { useViaje, type Viaje } from './viaje/useViaje';

export default function App() {
  const viaje = useViaje();
  const { paso, nivel } = viaje;
  const [hojaAbierta, setHojaAbierta] = useState<EtapaId | null>(null);

  // Un solo valor mueve todo el árbol: 0 semilla, 1 raíz, 2 tronco, 3 copa, 4 fruto
  const objetivo = paso.tipo === 'final' ? nivel + 1 : nivel;
  const crecimiento = useMotionValue(objetivo);

  useEffect(() => {
    const controles = animate(crecimiento, objetivo, { duration: 2.4, ease: EASE });
    return () => controles.stop();
  }, [crecimiento, objetivo]);

  const modoArbol =
    paso.tipo === 'final' ? 'final' : paso.tipo === 'etapa' && paso.momento === 'crecer' ? 'foco' : 'fondo';
  const acento = paso.tipo === 'etapa' ? paso.etapa.acento : '#c9a35c';

  const retroceder = () => {
    setHojaAbierta(null);
    viaje.retroceder();
  };

  return (
    <div
      className="app"
      style={{ '--acento': acento } as CSSProperties}
      // Android abre un menú contextual con la pulsación larga; solo se permite al escribir
      onContextMenu={(e) => {
        if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
        }
      }}
    >
      <Fondo paso={paso} />
      <Arbol
        crecimiento={crecimiento}
        modo={modoArbol}
        hojas={viaje.hojas}
        onTocarHoja={paso.tipo === 'final' ? setHojaAbierta : undefined}
      />
      <Cabecera paso={paso} nivel={nivel} onAtras={retroceder} />
      <AnimatePresence mode="wait">
        <PasoActual
          key={viaje.indice}
          viaje={viaje}
          crecimiento={crecimiento}
          hojaAbierta={hojaAbierta}
          onAbrirHoja={setHojaAbierta}
          onCerrarHoja={() => setHojaAbierta(null)}
        />
      </AnimatePresence>
    </div>
  );
}

interface PasoActualProps {
  viaje: Viaje;
  crecimiento: MotionValue<number>;
  hojaAbierta: EtapaId | null;
  onAbrirHoja: (id: EtapaId) => void;
  onCerrarHoja: () => void;
}

function PasoActual({ viaje, crecimiento, hojaAbierta, onAbrirHoja, onCerrarHoja }: PasoActualProps) {
  const { paso, avanzar } = viaje;

  if (paso.tipo === 'portada') return <Portada onEmpezar={avanzar} />;
  if (paso.tipo === 'final') {
    return (
      <Final
        hojas={viaje.hojas}
        fecha={viaje.fechaFinal}
        hojaAbierta={hojaAbierta}
        onAbrirHoja={onAbrirHoja}
        onCerrarHoja={onCerrarHoja}
      />
    );
  }

  const { etapa, momento } = paso;
  switch (momento) {
    case 'umbral':
      return <Umbral etapa={etapa} onSeguir={avanzar} />;
    case 'camino':
      return <Camino etapa={etapa} onSeguir={avanzar} />;
    case 'enigma':
      return <Enigma etapa={etapa} superado={viaje.superado} onSeguir={avanzar} />;
    case 'revelacion':
      return <Revelacion etapa={etapa} onSeguir={avanzar} />;
    case 'anillo':
      return (
        <Anillo
          etapa={etapa}
          hoja={viaje.hojas[etapa.id]}
          onGuardar={(texto) => viaje.guardarHoja(etapa.id, texto)}
          onSeguir={avanzar}
        />
      );
    case 'crecer':
      return (
        <Crecer
          etapa={etapa}
          crecimiento={crecimiento}
          superado={viaje.superado}
          onCrecido={viaje.desbloquear}
          onSeguir={avanzar}
        />
      );
  }
}
