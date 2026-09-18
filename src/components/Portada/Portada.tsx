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
          Hay un ciclo que vuelve a cerrarse hoy, como cada vuelta que da la
          tierra alrededor de lo que la sostiene. Algo que empezó pequeño ya
          ha crecido lo suficiente para merecer un nombre propio y un camino
          propio.
        </motion.p>

        <motion.p
          className="texto-bienvenida"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Ese camino tiene tres tramos, como tres estaciones que la
          naturaleza ya conocía antes de que existieran las palabras para
          nombrarlas. En cada uno hay una clave escondida en un lugar real,
          y al final de los tres, algo espera.
        </motion.p>

        <button className="boton-minimal" onClick={onEmpezar}>
          Empezar el camino
        </button>
      </Marco>
    </motion.div>
  );
}
