// src/pantallas/etapa/Revelacion.tsx
// El texto de la etapa, frase a frase, al ritmo de quien lo lee.
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Etapa } from '../../contenido/tipos';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

function partirEnFrases(texto: string): string[] {
  return texto.match(/[^.!?]+[.!?]+/g)?.map((f) => f.trim()) ?? [texto];
}

export function Revelacion({ etapa, onSeguir }: { etapa: Etapa; onSeguir: () => void }) {
  const frases = useMemo(() => partirEnFrases(etapa.textoCompletado), [etapa]);
  const [actual, setActual] = useState(0);
  const ultima = actual === frases.length - 1;

  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · Lo que la palabra abre
      </motion.p>

      <button
        className="lectura"
        onClick={() => !ultima && setActual(actual + 1)}
        aria-label={ultima ? undefined : 'Siguiente frase'}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={actual}
            className="frase-revelada"
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
            transition={{ duration: 0.9 }}
          >
            {frases[actual]}
          </motion.span>
        </AnimatePresence>
      </button>

      <div className="puntos" aria-hidden>
        {frases.map((_, i) => (
          <span key={i} className={i <= actual ? 'lleno' : undefined} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {ultima ? (
          <motion.button key="seguir" className="boton" {...aparecer(0.8)} whileTap={{ scale: 0.97 }} onClick={onSeguir}>
            Dejar un anillo
          </motion.button>
        ) : (
          <motion.p key="toca" className="susurro" {...aparecer(1.4)} exit={{ opacity: 0 }}>
            toca el texto para seguir
          </motion.p>
        )}
      </AnimatePresence>
    </Pantalla>
  );
}
