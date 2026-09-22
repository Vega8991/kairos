// src/ui/CieloNocturno.tsx
// La noche del final: nebulosas, vía láctea, estrellas que titilan, luna y alguna fugaz.
import { azar } from '../lib/azar';

const r = azar(97);
const ESTRELLAS = Array.from({ length: 100 }, () => ({
  x: r() * 100,
  // más densas arriba, menos cerca del horizonte
  y: Math.pow(r(), 1.5) * 78,
  tam: 0.6 + r() * 1.7,
  brillo: 0.35 + r() * 0.65,
  grupo: Math.floor(r() * 3),
}));

// Las estrellas titilan por grupos: tres capas que cambian de opacidad en vez de cien animaciones
const GRUPOS = [0, 1, 2].map((g) => ESTRELLAS.filter((e) => e.grupo === g));

export function CieloNocturno() {
  return (
    <div className="cielo">
      <div className="cielo-nebulosa cielo-nebulosa-a" />
      <div className="cielo-nebulosa cielo-nebulosa-b" />
      <div className="cielo-via" />
      {GRUPOS.map((grupo, g) => (
        <div key={g} className={`cielo-estrellas titila-${g}`}>
          {grupo.map((e, i) => (
            <span
              key={i}
              className="cielo-estrella"
              style={{ left: `${e.x}%`, top: `${e.y}%`, width: e.tam, height: e.tam, opacity: e.brillo }}
            />
          ))}
        </div>
      ))}
      <span className="cielo-fugaz" />
      <div className="cielo-luna" />
      <div className="cielo-horizonte" />
    </div>
  );
}
