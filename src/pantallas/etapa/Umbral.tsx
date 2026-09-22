// src/pantallas/etapa/Umbral.tsx
// Antes de salir hacia el lugar: adónde se va, para qué, y qué significa.
import { motion } from 'motion/react';
import type { Etapa } from '../../contenido/tipos';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

export function Umbral({ etapa, onSeguir }: { etapa: Etapa; onSeguir: () => void }) {
  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · {etapa.parte}
      </motion.p>
      <motion.h2 className="titulo" {...aparecer(0.25)}>
        {etapa.titulo}
      </motion.h2>
      <motion.p className="frase" {...aparecer(0.5)}>
        {etapa.frase}
      </motion.p>
      <motion.p className="destino" {...aparecer(0.75)}>
        <span>{etapa.lugar}</span>
        <span aria-hidden> · </span>
        <span>para {etapa.proposito}</span>
      </motion.p>
      <motion.p className="texto" {...aparecer(1)}>
        {etapa.sentido}
      </motion.p>
      <motion.button className="boton" {...aparecer(1.3)} whileTap={{ scale: 0.97 }} onClick={onSeguir}>
        Ponerse en camino
      </motion.button>
    </Pantalla>
  );
}
