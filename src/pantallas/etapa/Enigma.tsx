// src/pantallas/etapa/Enigma.tsx
// Ya en el lugar: una adivinanza cuya respuesta solo se ve estando allí.
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import type { Etapa } from '../../contenido/tipos';
import { coincide, normalizar } from '../../lib/normalizar';
import { vibrar } from '../../lib/vibrar';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

interface EnigmaProps {
  etapa: Etapa;
  superado: boolean;
  onSeguir: () => void;
}

export function Enigma({ etapa, superado, onSeguir }: EnigmaProps) {
  const [intento, setIntento] = useState('');
  const [fallos, setFallos] = useState(0);
  const [error, setError] = useState(false);
  const [acierto, setAcierto] = useState(false);
  const [campo, animarCampo] = useAnimate<HTMLFormElement>();

  const pistas = useMemo(() => {
    const clave = normalizar(etapa.claves[0]);
    return [...etapa.pistas, `Son ${clave.length} letras.`, `Empieza por «${clave[0]}».`];
  }, [etapa]);
  // Una pista nueva cada dos fallos
  const pista = fallos >= 2 ? pistas[Math.min(Math.floor(fallos / 2), pistas.length) - 1] : null;

  useEffect(() => {
    if (!acierto) return;
    const t = setTimeout(onSeguir, 1600);
    return () => clearTimeout(t);
  }, [acierto, onSeguir]);

  const comprobar = () => {
    if (!intento.trim()) return;
    if (coincide(intento, etapa.claves)) {
      (document.activeElement as HTMLElement | null)?.blur();
      vibrar([20, 40, 20]);
      setAcierto(true);
    } else {
      vibrar(80);
      setFallos((f) => f + 1);
      setError(true);
      animarCampo(campo.current, { x: [0, -9, 9, -5, 5, 0] }, { duration: 0.45 });
    }
  };

  const resuelto = superado || acierto;

  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · La palabra del lugar
      </motion.p>
      <motion.p className="frase enigma" {...aparecer(0.3)}>
        {etapa.enigma}
      </motion.p>
      <motion.div className="linea" {...aparecer(0.7)} />

      <AnimatePresence mode="wait" initial={false}>
        {resuelto ? (
          <motion.div
            key="resuelto"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="clave-encontrada">{etapa.claves[0]}</p>
            {superado && (
              <button className="boton" onClick={onSeguir}>
                Seguir
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="buscando" {...aparecer(0.9)} exit={{ opacity: 0 }}>
            <form
              ref={campo}
              className="campo-clave"
              onSubmit={(e) => {
                e.preventDefault();
                comprobar();
              }}
            >
              <input
                className="campo"
                type="text"
                value={intento}
                onChange={(e) => {
                  setIntento(e.target.value);
                  setError(false);
                }}
                placeholder="la palabra que te venga"
                aria-label="Palabra"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="go"
              />
              <button className="boton" type="submit" disabled={!intento.trim()}>
                Comprobar
              </button>
            </form>
            <div className="avisos" aria-live="polite">
              {error && <p className="error">Todavía no. Mira alrededor.</p>}
              {pista && <p className="pista">{pista}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Pantalla>
  );
}
