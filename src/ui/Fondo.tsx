// src/ui/Fondo.tsx
// Foto de cada lugar teñida con la hora del día: alba, amanecer, mediodía, atardecer, noche.
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { portada } from '../contenido/textos';
import type { Paso } from '../viaje/pasos';
import { CieloNocturno } from './CieloNocturno';

export function Fondo({ paso }: { paso: Paso }) {
  const etapa = paso.tipo === 'etapa' ? paso.etapa : null;
  const escena = etapa?.id ?? paso.tipo;

  return (
    <div className="fondo" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={escena}
          className="fondo-capa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
        >
          {paso.tipo === 'final' ? (
            <CieloNocturno />
          ) : (
            <>
              <div
                className="fondo-imagen"
                style={{ backgroundImage: `url(${etapa?.imagenFondo ?? portada.imagen})` }}
              />
              <div
                className="fondo-cielo"
                style={{ '--cielo': etapa?.cielo ?? portada.cielo } as CSSProperties}
              />
              <div className="fondo-sombra" />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
