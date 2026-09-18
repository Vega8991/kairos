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
      className="frame frame-portada"
      variants={variantesFrame}
      initial="entra"
      animate="centro"
      exit="sale"
      transition={transicionFrame}
    >
      <Marco>
        <p className="kicker">Feliz cumpleaños</p>
        <h1 className="titulo-portada">KAIROS</h1>
        <div className="linea-fina" />

        <motion.p
          className="texto-bienvenida"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hoy cumples 20, Carmen. Y antes de nada quiero que sepas que esto no es
          solo una web, es un camino con tres momentos que he pensado solo para ti.
        </motion.p>

        <motion.p
          className="texto-bienvenida"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Tienes una misión: completar las tres etapas, cada una con su propia
          clave, escondida en un lugar real. Cuando las termines, hay algo
          esperandote al final.
        </motion.p>

        <button className="boton-minimal" onClick={onEmpezar}>
          Empezar el camino
        </button>
      </Marco>
    </motion.div>
  );
}
