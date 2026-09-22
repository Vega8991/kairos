// src/pantallas/etapa/Crecer.tsx
// El ritual: mantener el dedo en la pantalla hasta que el árbol crezca.
import { AnimatePresence, motion, useTransform, type MotionValue } from 'motion/react';
import { etapas } from '../../contenido/etapas';
import type { Etapa } from '../../contenido/tipos';
import { MantenerPulsado } from '../../ui/MantenerPulsado';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

interface CrecerProps {
  etapa: Etapa;
  crecimiento: MotionValue<number>;
  superado: boolean;
  onCrecido: () => void;
  onSeguir: () => void;
}

export function Crecer({ etapa, crecimiento, superado, onCrecido, onSeguir }: CrecerProps) {
  const indice = etapas.indexOf(etapa);
  const esUltima = indice === etapas.length - 1;
  const progreso = useTransform(crecimiento, [indice, indice + 1], [0, 1]);

  return (
    <Pantalla arriba>
      {!superado && (
        <MantenerPulsado valor={crecimiento} desde={indice} hasta={indice + 1} onCompleto={onCrecido} />
      )}

      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · {etapa.parte}
      </motion.p>

      <AnimatePresence mode="wait" initial={false}>
        {superado ? (
          <motion.div key="crecido" {...aparecer(0.2)}>
            <p className="pregunta">{etapa.crecer.despues}</p>
            <motion.button className="boton" {...aparecer(1)} whileTap={{ scale: 0.97 }} onClick={onSeguir}>
              {esUltima ? 'Recoger el fruto' : 'Seguir'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="creciendo" {...aparecer(0.3)} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <p className="frase">{etapa.crecer.leccion}</p>
            <p className="susurro instruccion">Mantén el dedo en la pantalla</p>
            <div className="barra" aria-hidden>
              <motion.div style={{ scaleX: progreso }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Pantalla>
  );
}
