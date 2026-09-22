// src/ui/Pantalla.tsx
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE } from './movimiento';

interface PantallaProps {
  children: ReactNode;
  /** Contenido pegado arriba, para dejar sitio al árbol en foco */
  arriba?: boolean;
}

export function Pantalla({ children, arriba }: PantallaProps) {
  return (
    <motion.section
      className={arriba ? 'pantalla pantalla-arriba' : 'pantalla'}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="pantalla-contenido">{children}</div>
    </motion.section>
  );
}
