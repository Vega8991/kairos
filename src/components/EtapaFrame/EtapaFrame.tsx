// src/components/EtapaFrame/EtapaFrame.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Etapa } from '../../types/kairos.types';
import { normalizar } from '../../utils/normalizar';
import { variantesFrame, transicionFrame } from '../frameVariants';
import { Marco } from '../Marco/Marco';

interface EtapaFrameProps {
  etapa: Etapa;
  onResuelto: () => void;
  onAtras: () => void;
}

export function EtapaFrame({ etapa, onResuelto, onAtras }: EtapaFrameProps) {
  const [intento, setIntento] = useState('');
  const [error, setError] = useState(false);
  const [mostrarPorQue, setMostrarPorQue] = useState(false);
  const [superada, setSuperada] = useState(false);

  const verificar = () => {
    if (normalizar(intento) === normalizar(etapa.palabraClave)) {
      setSuperada(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1600);
    }
  };

  return (
    <motion.div
      key={etapa.id}
      className="frame"
      variants={variantesFrame}
      initial="entra"
      animate="centro"
      exit="sale"
      transition={transicionFrame}
      style={{ '--acento': etapa.acento } as React.CSSProperties}
    >
      <div
        className="frame-fondo"
        style={{ backgroundImage: `url(${etapa.imagenFondo})` }}
      />
      <div className="frame-degradado" />

      <button className="boton-atras" onClick={onAtras} aria-label="Volver atrás">
        ← Volver
      </button>

      <Marco acento={etapa.acento}>
        <AnimatePresence mode="wait">
          {!superada ? (
            <motion.div
              key="pregunta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="kicker">Etapa {etapa.numero}</p>

              <motion.h2
                className="titulo-etapa"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {etapa.titulo}
              </motion.h2>

              <p className="frase-etapa">{etapa.frase}</p>

              <button
                className="enlace-porque"
                onClick={() => setMostrarPorQue((v) => !v)}
              >
                {mostrarPorQue ? 'Ocultar' : '¿Por qué esta etapa?'}
              </button>

              <AnimatePresence>
                {mostrarPorQue && (
                  <motion.p
                    className="texto-personal"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {etapa.porQueEstaEtapa}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                className="campo-clave"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <input
                  type="text"
                  value={intento}
                  onChange={(e) => setIntento(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && verificar()}
                  placeholder="palabra clave"
                  autoFocus
                />
                <button className="boton-minimal" onClick={verificar}>
                  Comprobar
                </button>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className="mensaje-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Todavía no. Busca mejor.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="completada"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="kicker">Etapa {etapa.numero} superada</p>

              <motion.p
                className="texto-logrado"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                {etapa.textoCompletado}
              </motion.p>

              <button className="boton-minimal" onClick={onResuelto}>
                Continuar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Marco>
    </motion.div>
  );
}
