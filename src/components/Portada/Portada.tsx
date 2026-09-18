// src/components/Portada/Portada.tsx
import { motion } from 'motion/react';
import { Marco } from '../Marco/Marco';
import { variantesFrame, transicionFrame } from '../frameVariants';

interface PortadaProps {
  onEmpezar: () => void;
}

export function Portada({ onEmpezar }: PortadaProps) {
  return (
    <motion.div
      key="portada"
      className="frame"
      variants={variantesFrame}
      initial="entra"
      animate="centro"
      exit="sale"
      transition={transicionFrame}
    >
      <Marco>
        <p className="kicker">Una experiencia en tres partes</p>
        <h1 className="titulo-portada">KAIROS</h1>
        <div className="linea-fina" />
        <button className="boton-minimal" onClick={onEmpezar}>
          Comenzar
        </button>
      </Marco>
    </motion.div>
  );
}
