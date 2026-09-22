// src/pantallas/Semilla.tsx
// La semilla que deja el fruto: cerrada hasta su próximo cumpleaños.
import { useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { etapas } from '../contenido/etapas';
import { semilla } from '../contenido/textos';
import type { Hojas } from '../viaje/pasos';
import { aparecer } from '../ui/movimiento';

function diasHasta(fecha: string): number {
  const apertura = new Date(`${fecha}T00:00:00`).getTime();
  return Math.ceil((apertura - Date.now()) / 86_400_000);
}

export function Semilla({ hojas, onCerrar }: { hojas: Hojas; onCerrar: () => void }) {
  const [dias] = useState(() => diasHasta(semilla.apertura));
  const abierta = dias <= 0 || new URLSearchParams(window.location.search).has('semilla');
  const recuerdos = etapas.filter((e) => hojas[e.id]);

  return (
    <motion.div
      className="velo"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="velo-contenido">
        <motion.svg className="icono-semilla" viewBox="0 0 40 40" {...aparecer(0.2)} aria-hidden>
          <ellipse cx="20" cy="28" rx="7" ry="4.5" />
          {abierta && <path d="M20 24 C 20 18, 17 14, 13 11 M20 20 C 21 16, 25 13, 29 12" />}
        </motion.svg>

        {abierta ? (
          <>
            <motion.p className="kicker" {...aparecer(0.4)}>Un año después</motion.p>
            <motion.h2 className="titulo" {...aparecer(0.6)}>{semilla.abierta.titulo}</motion.h2>
            {semilla.abierta.parrafos.map((p, i) => (
              <motion.p key={i} className="texto" {...aparecer(1 + i * 0.6)}>
                {p}
              </motion.p>
            ))}
            {recuerdos.length > 0 && (
              <motion.div {...aparecer(1 + semilla.abierta.parrafos.length * 0.6)}>
                <div className="linea" />
                <p className="susurro">{semilla.abierta.recuerdos}</p>
                {recuerdos.map((e) => (
                  <p key={e.id} className="recuerdo" style={{ '--acento-hoja': e.acento } as CSSProperties}>
                    <span className="kicker">{e.parte}</span>
                    {hojas[e.id]}
                  </p>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <>
            <motion.p className="kicker" {...aparecer(0.4)}>
              {dias === 1 ? 'Falta 1 día' : `Faltan ${dias} días`}
            </motion.p>
            <motion.h2 className="titulo" {...aparecer(0.6)}>{semilla.cerrada.titulo}</motion.h2>
            {semilla.cerrada.parrafos.map((p, i) => (
              <motion.p key={i} className="texto" {...aparecer(1 + i * 0.6)}>
                {p}
              </motion.p>
            ))}
          </>
        )}

        <motion.button className="boton" {...aparecer(1.8)} onClick={onCerrar}>
          {abierta ? 'Cerrar' : 'Guardarla'}
        </motion.button>
      </div>
    </motion.div>
  );
}
