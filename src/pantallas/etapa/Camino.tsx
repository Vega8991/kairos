// src/pantallas/etapa/Camino.tsx
// Lo que se ve mientras vais hacia el lugar: una pregunta para hablar en voz alta.
import { motion } from 'motion/react';
import type { Etapa } from '../../contenido/tipos';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

export function Camino({ etapa, onSeguir }: { etapa: Etapa; onSeguir: () => void }) {
  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · Antes de llegar
      </motion.p>
      <motion.p className="pregunta" {...aparecer(0.3)}>
        {etapa.camino.pregunta}
      </motion.p>
      <motion.div className="linea" {...aparecer(0.6)} />
      <motion.p className="susurro" {...aparecer(0.8)}>
        {etapa.camino.indicacion}
      </motion.p>
      <motion.button className="boton" {...aparecer(1.2)} whileTap={{ scale: 0.97 }} onClick={onSeguir}>
        {etapa.camino.boton}
      </motion.button>
    </Pantalla>
  );
}
