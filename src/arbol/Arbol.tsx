// src/arbol/Arbol.tsx
// El árbol que acompaña todo el viaje. Crece según `crecimiento` (0 a 4).
// Está hecho de capas apiladas para que el viento mueva cada una a su ritmo.
import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { etapas } from '../contenido/etapas';
import type { EtapaId } from '../contenido/tipos';
import type { Hojas } from '../viaje/pasos';
import { EASE } from '../ui/movimiento';
import {
  BROTE,
  FLORES,
  FRUTOS,
  HOJAS_CAYENDO,
  HOJAS_PROPIAS,
  LUCIERNAGAS,
  MADERA,
  MADERA_LUZ,
  RACIMOS,
  RADIO_MADERA,
  RADIO_RAICES,
  RAICES,
  SAVIA,
  SUELO_Y,
  type Flor,
  type Racimo,
  type Rango,
} from './geometria';
import './arbol.css';

const VISTA = '0 0 200 260';

const MODOS = {
  /** Detrás del texto, tenue */
  fondo: { opacity: 0.42, scale: 0.86 },
  /** Protagonista mientras crece */
  foco: { opacity: 1, scale: 1 },
  /** Un poco más pequeño para dejar sitio al cielo */
  final: { opacity: 1, scale: 0.9 },
};

interface ArbolProps {
  crecimiento: MotionValue<number>;
  modo: keyof typeof MODOS;
  hojas: Hojas;
  /** Solo en el final: las hojas propias se pueden tocar */
  onTocarHoja?: (id: EtapaId) => void;
}

export function Arbol({ crecimiento, modo, hojas, onTocarHoja }: ArbolProps) {
  const frenteRaices = useRef<SVGCircleElement>(null);
  const frenteMadera = useRef<SVGCircleElement>(null);
  useRadio(frenteRaices, crecimiento, [0, 1], RADIO_RAICES);
  useRadio(frenteMadera, crecimiento, [1, 2.25], RADIO_MADERA);

  const brote = useTransform(crecimiento, [0.55, 1], [0, 1]);
  const broteVisible = useTransform(crecimiento, [0.55, 0.6, 1.1, 1.35], [0, 1, 1, 0]);
  const halo = useTransform(crecimiento, [0, 1, 2, 3, 4], [0.15, 0.25, 0.3, 0.55, 0.8]);
  const savia = useTransform(crecimiento, [2.75, 3.05], [0, 1]);
  const noche = useTransform(crecimiento, [3.3, 4], [0, 1]);

  return (
    <motion.div
      className="arbol"
      initial={false}
      animate={MODOS[modo]}
      transition={{ duration: 1.4, ease: EASE }}
    >
      {/* Suelo, raíces y la luz de fondo. Aquí nada se anima solo: se pinta una vez */}
      <svg className="arbol-capa" viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden>
        <defs>
          <radialGradient id="a-revelar">
            <stop offset="0.8" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <radialGradient id="a-halo">
            <stop offset="0" stopColor="#ffd89a" stopOpacity="0.45" />
            <stop offset="0.55" stopColor="#f0b870" stopOpacity="0.12" />
            <stop offset="1" stopColor="#f0b870" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="a-semilla">
            <stop offset="0%" stopColor="#ffdf9a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e8c77a" stopOpacity="0" />
          </radialGradient>
          {/* Brillos hechos con degradados en vez de filtros: mucho más baratos de pintar */}
          <radialGradient id="a-resplandor">
            <stop offset="0" stopColor="#fff3d6" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="a-gota">
            <stop offset="0" stopColor="#fffbe8" />
            <stop offset="0.3" stopColor="#ffe3a0" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ffcf70" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="a-horizonte" x1="0" x2="1">
            <stop offset="0" stopColor="#eae6df" stopOpacity="0" />
            <stop offset="0.5" stopColor="#eae6df" stopOpacity="0.4" />
            <stop offset="1" stopColor="#eae6df" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="a-tierra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b0806" stopOpacity="0.2" />
            <stop offset="1" stopColor="#050404" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="a-raiz" x1="0" y1={SUELO_Y} x2="0" y2="258" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f0cd84" />
            <stop offset="1" stopColor="#8a6634" />
          </linearGradient>
          <linearGradient id="a-madera" x1="0" y1={SUELO_Y + 2} x2="0" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7d634c" />
            <stop offset="0.45" stopColor="#b59d82" />
            <stop offset="1" stopColor="#efe5d4" />
          </linearGradient>
          <radialGradient id="a-fruto" cx="0.35" cy="0.35">
            <stop offset="0" stopColor="#fff3cf" />
            <stop offset="0.5" stopColor="#f2c26a" />
            <stop offset="1" stopColor="#c9783c" />
          </radialGradient>
          <filter id="a-desenfoque" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <mask id="a-mascara-raices" maskUnits="userSpaceOnUse" x="-60" y="-60" width="320" height="380">
            <circle ref={frenteRaices} cx="100" cy={SUELO_Y + 1} r="0" fill="url(#a-revelar)" />
          </mask>
          <mask id="a-mascara-madera" maskUnits="userSpaceOnUse" x="-60" y="-60" width="320" height="380">
            <circle ref={frenteMadera} cx="100" cy={SUELO_Y + 2} r="0" fill="url(#a-revelar)" />
          </mask>
        </defs>

        <motion.circle cx="100" cy="92" r="105" fill="url(#a-halo)" style={{ opacity: halo }} />
        <motion.ellipse cx="100" cy={SUELO_Y} rx="95" ry="16" fill="url(#a-halo)" style={{ opacity: noche }} />
        <rect x="-60" y={SUELO_Y} width="320" height="110" fill="url(#a-tierra)" />
        <ellipse cx="100" cy={SUELO_Y + 1} rx="78" ry="6" fill="url(#a-resplandor)" opacity="0.25" />
        <rect x="8" y={SUELO_Y - 0.3} width="184" height="0.6" fill="url(#a-horizonte)" />

        <g mask="url(#a-mascara-raices)">
          <path
            className="arbol-resplandor"
            d={RAICES}
            fill="#e8b865"
            opacity="0.35"
            filter="url(#a-desenfoque)"
          />
          <path d={RAICES} fill="url(#a-raiz)" />
        </g>

        <motion.path d={BROTE} className="arbol-brote" style={{ pathLength: brote, opacity: broteVisible }} />
      </svg>

      {/* La semilla late en su propia capa, para no repintar las raíces a cada latido */}
      <svg className="arbol-capa" viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden>
        <g className="arbol-latido">
          <circle cx="100" cy={SUELO_Y + 1} r="12" fill="url(#a-semilla)" />
          <ellipse cx="100" cy={SUELO_Y + 1} rx="4.5" ry="3" fill="#f0cd84" />
        </g>
      </svg>

      {/* Copa del fondo: más oscura, se mece a otro ritmo */}
      <div className="arbol-capa arbol-viento-lejos">
        <svg viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden>
          {RACIMOS.map((racimo, i) => (
            <RacimoVivo key={i} racimo={racimo} capa="fondo" crecimiento={crecimiento} />
          ))}
        </svg>
      </div>

      {/* Madera, copa delantera, flores y frutos: quietos, solo los mece el viento */}
      <div className="arbol-capa arbol-viento">
        <svg viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <g mask="url(#a-mascara-madera)">
            <path d={MADERA} fill="url(#a-madera)" />
            <path d={MADERA_LUZ} fill="#fff6e6" opacity="0.14" />
          </g>

          {RACIMOS.map((racimo, i) => (
            <RacimoVivo key={i} racimo={racimo} capa="frente" crecimiento={crecimiento} />
          ))}
          {FLORES.map((flor, i) => (
            <FlorViva key={i} flor={flor} crecimiento={crecimiento} />
          ))}
          {FRUTOS.map((fruto, i) => (
            <Fruto key={i} {...fruto} crecimiento={crecimiento} />
          ))}
        </svg>
      </div>

      {/* Sus hojas laten: van en una capa pequeña aparte */}
      <div className="arbol-capa arbol-viento">
        <svg viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden={!onTocarHoja}>
          {etapas.map(
            (etapa) =>
              hojas[etapa.id] && (
                <HojaPropia
                  key={etapa.id}
                  id={etapa.id}
                  acento={etapa.acento}
                  crecimiento={crecimiento}
                  onTocar={onTocarHoja}
                />
              )
          )}
        </svg>
      </div>

      {/* La savia: luz que sube desde las raíces hasta la copa */}
      <div className="arbol-capa arbol-viento">
        <svg viewBox={VISTA} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <motion.g style={{ opacity: savia }}>
            {SAVIA.map((d, i) =>
              [0, 1].map((j) => {
                const dur = `${5 + i * 0.7}s`;
                const empieza = `-${j * 2.6 + i * 1.1}s`;
                return (
                  <circle key={`${i}-${j}`} r="2.2" fill="url(#a-gota)">
                    <animateMotion dur={dur} begin={empieza} repeatCount="indefinite" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.85;1"
                      dur={dur}
                      begin={empieza}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })
            )}
          </motion.g>
        </svg>
      </div>

      {/* Noche del final: luciérnagas y alguna hoja que cae */}
      <motion.svg
        className="arbol-capa"
        viewBox={VISTA}
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
        style={{ opacity: noche }}
      >
        {LUCIERNAGAS.map((l, i) => (
          <circle
            key={i}
            className="arbol-luciernaga"
            cx={l.x}
            cy={l.y}
            r={l.r * 1.7}
            fill="url(#a-gota)"
            style={{ animationDelay: `-${l.retraso}s` } as CSSProperties}
          />
        ))}
        {HOJAS_CAYENDO.map((h, i) => (
          <path
            key={i}
            className="arbol-hoja-cae"
            d={h.d}
            fill={h.color}
            style={{ animationDelay: `${h.retraso}s` }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}

/** Mueve el radio del frente de crecimiento (una máscara circular que se abre) */
function useRadio(
  ref: RefObject<SVGCircleElement | null>,
  crecimiento: MotionValue<number>,
  [desde, hasta]: Rango,
  radio: number
) {
  useEffect(() => {
    const aplicar = (v: number) => {
      const t = Math.min(1, Math.max(0, (v - desde) / (hasta - desde)));
      ref.current?.setAttribute('r', (t * radio).toFixed(2));
    };
    aplicar(crecimiento.get());
    return crecimiento.on('change', aplicar);
  }, [ref, crecimiento, desde, hasta, radio]);
}

interface RacimoVivoProps {
  racimo: Racimo;
  capa: 'frente' | 'fondo';
  crecimiento: MotionValue<number>;
}

function RacimoVivo({ racimo, capa, crecimiento }: RacimoVivoProps) {
  const scale = useTransform(crecimiento, racimo.rango, [0, 1]);
  const trazos = racimo[capa];
  if (!trazos.length) return null;

  return (
    <motion.g className="escala" style={{ scale }}>
      {trazos.map((t) => (
        <path key={t.color} d={t.d} fill={t.color} opacity={capa === 'frente' ? 0.9 : 0.75} />
      ))}
    </motion.g>
  );
}

function FlorViva({ flor, crecimiento }: { flor: Flor; crecimiento: MotionValue<number> }) {
  const scale = useTransform(crecimiento, flor.rango, [0, 1]);
  return (
    <motion.g className="escala" style={{ scale }}>
      <path d={flor.petalos} fill="#f6e1d6" opacity="0.92" />
      <circle cx={flor.x} cy={flor.y} r="0.7" fill="#f0c46a" />
    </motion.g>
  );
}

interface FrutoProps {
  x: number;
  y: number;
  rango: Rango;
  crecimiento: MotionValue<number>;
}

function Fruto({ x, y, rango, crecimiento }: FrutoProps) {
  const scale = useTransform(crecimiento, rango, [0, 1]);
  return (
    <motion.g className="escala" style={{ scale }}>
      <circle cx={x} cy={y} r="6" fill="url(#a-resplandor)" />
      <path d={`M${x} ${y - 3.2} L${x} ${y - 1.8}`} stroke="#b59d82" strokeWidth="0.5" />
      <circle cx={x} cy={y} r="2.7" fill="url(#a-fruto)" />
    </motion.g>
  );
}

interface HojaPropiaProps {
  id: EtapaId;
  acento: string;
  crecimiento: MotionValue<number>;
  onTocar?: (id: EtapaId) => void;
}

function HojaPropia({ id, acento, crecimiento, onTocar }: HojaPropiaProps) {
  const { x, y, giro } = HOJAS_PROPIAS[id];
  const scale = useTransform(crecimiento, [2.7, 3], [0, 1]);

  return (
    <g
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${giro.toFixed(0)})`}
      className={onTocar ? 'hoja-propia tocable' : 'hoja-propia'}
      onClick={onTocar && (() => onTocar(id))}
      role={onTocar ? 'button' : undefined}
      aria-label={onTocar ? 'Leer esta hoja' : undefined}
    >
      {onTocar && <circle cx="8" cy="0" r="15" fill="transparent" />}
      <motion.g className="escala" style={{ scale }}>
        <ellipse cx="8" cy="0" rx="14" ry="9" fill="url(#a-resplandor)" />
        <path d="M0 0 C4.5 -5 11.5 -5 16 0 C11.5 5 4.5 5 0 0 Z" fill={acento} />
        <path d="M1 0 L14 0" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.5" />
      </motion.g>
    </g>
  );
}
