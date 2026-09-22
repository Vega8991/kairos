// src/pantallas/Portada.tsx
import { motion } from 'motion/react';
import { portada } from '../contenido/textos';
import { Pantalla } from '../ui/Pantalla';
import { aparecer } from '../ui/movimiento';

export function Portada({ onEmpezar }: { onEmpezar: () => void }) {
  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.2)}>
        {portada.saludo}
      </motion.p>
      <motion.h1 className="titulo-portada" {...aparecer(0.4)}>
        {portada.titulo}
      </motion.h1>
      <motion.p className="epigrafe" {...aparecer(0.8)}>
        {portada.epigrafe}
      </motion.p>
      <motion.div className="linea" {...aparecer(1)} />
      {portada.parrafos.map((parrafo, i) => (
        <motion.p key={i} className="texto" {...aparecer(1.3 + i * 0.5)}>
          {parrafo}
        </motion.p>
      ))}
      <motion.button className="boton" {...aparecer(2.4)} whileTap={{ scale: 0.97 }} onClick={onEmpezar}>
        {portada.boton}
      </motion.button>
    </Pantalla>
  );
}
