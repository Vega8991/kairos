// src/pantallas/Constelacion.tsx
// Las cuatro palabras del día convertidas en estrellas que se unen en el cielo.
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { etapas } from '../contenido/etapas';
import type { EtapaId } from '../contenido/tipos';

const POSICION: Record<EtapaId, { x: number; y: number }> = {
  raiz: { x: 40, y: 84 },
  tronco: { x: 113, y: 30 },
  savia: { x: 187, y: 82 },
  fruto: { x: 260, y: 34 },
};

/** Estrella de cuatro puntas: rayos finos que se cierran en el centro */
function destello(x: number, y: number, r: number) {
  return `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
}

interface ConstelacionProps {
  retraso: number;
  onTocar: (id: EtapaId) => void;
}

export function Constelacion({ retraso, onTocar }: ConstelacionProps) {
  const puntos = etapas.map((etapa) => ({ etapa, ...POSICION[etapa.id] }));

  return (
    <svg
      className="constelacion"
      viewBox="0 0 300 118"
      role="group"
      aria-label={puntos.map((p) => p.etapa.claves[0].toLowerCase()).join(', ')}
    >
      <defs>
        {/* Halo suave con máscara quieta: sin filtros que recalcular */}
        <radialGradient id="c-halo">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="c-difuso" maskContentUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.5" r="0.5" fill="url(#c-halo)" />
        </mask>
      </defs>

      {puntos.slice(1).map((p, i) => (
        <motion.line
          key={p.etapa.id}
          x1={puntos[i].x}
          y1={puntos[i].y}
          x2={p.x}
          y2={p.y}
          className="constelacion-linea"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: retraso + 1.6 + i * 0.8, duration: 1.3, ease: 'easeInOut' }}
        />
      ))}

      {puntos.map(({ etapa, x, y }, i) => {
        const arriba = y < 50;
        return (
          <motion.g
            key={etapa.id}
            className="constelacion-estrella"
            style={{ '--acento-estrella': etapa.acento } as CSSProperties}
            role="button"
            aria-label={`${etapa.claves[0]}: ver ${etapa.parte.toLowerCase()}`}
            onClick={() => onTocar(etapa.id)}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: retraso + i * 0.55, duration: 1, ease: 'easeOut' }}
          >
            <circle cx={x} cy={y} r="22" fill="transparent" />
            <circle cx={x} cy={y} r="14" className="constelacion-halo" mask="url(#c-difuso)" />
            <path
              d={destello(x, y, 11)}
              className="constelacion-rayos"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
            <circle cx={x} cy={y} r="1.8" fill="#fffaf0" />
            <text x={x} y={arriba ? y - 15 : y + 24} textAnchor="middle" className="constelacion-nombre">
              {etapa.claves[0]}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
