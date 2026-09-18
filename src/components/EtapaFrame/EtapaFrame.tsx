// src/components/EtapaFrame/EtapaFrame.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Etapa } from '../../types/kairos.types';
import { normalizar } from '../../utils/normalizar';
import { Marco } from '../Marco/Marco';
import { variantesFrame, transicionFrame } from '../frameVariants';

interface EtapaFrameProps {
  etapa: Etapa;
  onResuelto: () => void;
}

export function EtapaFrame({ etapa, onResuelto }: EtapaFrameProps) {
  const [intento, setIntento] = useState('');
  const [error, setError] = useState(false);

  const verificar = () => {
    if (normalizar(intento) === normalizar(etapa.palabraClave)) {
      onResuelto();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1600);
    }
  };

  return (
    <motion.div
      key={etapa.id}
      className="frame"
      variants={variantesFrame}
      initial="entra"
      animate="centro"
      exit="sale"
      transition={transicionFrame}
    >
      <Marco acento={etapa.acento}>
        <p className="kicker" style={{ color: etapa.acento }}>
          {etapa.numero}
        </p>

        <motion.h2
          className="titulo-etapa"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {etapa.titulo}
        </motion.h2>

        <motion.p
          className="frase-etapa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {etapa.frase}
        </motion.p>

        <motion.div
          className="campo-clave"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <input
            value={intento}
            onChange={(e) => setIntento(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && verificar()}
            placeholder="palabra clave"
            style={{ borderColor: error ? '#c0392b' : undefined }}
          />
          <button
            className="boton-minimal"
            style={{ borderColor: etapa.acento }}
            onClick={verificar}
          >
            Continuar
          </button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="mensaje-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              No es la clave correcta.
            </motion.p>
          )}
        </AnimatePresence>
      </Marco>
    </motion.div>
  );
}
