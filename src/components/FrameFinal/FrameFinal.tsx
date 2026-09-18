// src/components/FrameFinal/FrameFinal.tsx
import { motion } from 'motion/react';
import { Marco } from '../Marco/Marco';
import { variantesFrame } from '../frameVariants';

interface FrameFinalProps {
  onAtras: () => void;
}

export function FrameFinal({ onAtras }: FrameFinalProps) {
  return (
    <motion.div
      key="final"
      className="frame"
      variants={variantesFrame}
      initial="entra"
      animate="centro"
      exit="sale"
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="boton-atras" onClick={onAtras} aria-label="Volver atrás">
        ← Volver
      </button>

      <Marco>
        <motion.p
          className="linea-final"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Carmen, raíz, vuelo y cauce.
        </motion.p>
        <motion.p
          className="linea-final"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Eso eres pa nosotros.
        </motion.p>
        <motion.p
          className="linea-final destacada"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          Feliz cumpleaños
        </motion.p>
      </Marco>
    </motion.div>
  );
}
