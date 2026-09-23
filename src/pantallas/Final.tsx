// src/pantallas/Final.tsx
// La noche: la constelación del día, el árbol con fruto y la semilla.
import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { etapas } from '../contenido/etapas';
import { final } from '../contenido/textos';
import type { Etapa, EtapaId } from '../contenido/tipos';
import type { Hojas } from '../viaje/pasos';
import { Pantalla } from '../ui/Pantalla';
import { aparecer } from '../ui/movimiento';
import { Constelacion } from './Constelacion';
import { Semilla } from './Semilla';

interface FinalProps {
  hojas: Hojas;
  /** Día en que se completó el viaje (ISO) */
  fecha?: string;
  hojaAbierta: EtapaId | null;
  onAbrirHoja: (id: EtapaId) => void;
  onCerrarHoja: () => void;
}

function formatearFecha(iso?: string) {
  const fecha = iso ? new Date(iso) : new Date();
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function Final({ hojas, fecha, hojaAbierta, onAbrirHoja, onCerrarHoja }: FinalProps) {
  const [semillaAbierta, setSemillaAbierta] = useState(false);
  const [dia] = useState(() => formatearFecha(fecha));
  const [terminado, setTerminado] = useState(false);
  const etapaAbierta = etapas.find((e) => e.id === hojaAbierta);
  const tras = 3.4; // cuando la constelación ya se ha dibujado

  return (
    <Pantalla arriba>
      <motion.p className="kicker inscripcion" {...aparecer(0.4)}>
        Kairos · {dia}
      </motion.p>

      <Constelacion retraso={0.8} onTocar={onAbrirHoja} />

      <Mensaje lineas={final.lineas} retraso={tras} onTerminado={() => setTerminado(true)} />

      {terminado && (
        <>
          <motion.p className="linea-final destacada" {...aparecer(0)}>
            {final.destacada}
          </motion.p>
          <motion.p className="susurro" {...aparecer(1)}>
            {final.pista}
          </motion.p>
          <motion.div className="pie" {...aparecer(1.6)}>
            <button className="boton" onClick={() => setSemillaAbierta(true)}>
              {final.botonSemilla}
            </button>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {etapaAbierta && (
          <TarjetaEtapa
            key={etapaAbierta.id}
            etapa={etapaAbierta}
            hoja={hojas[etapaAbierta.id]}
            onCerrar={onCerrarHoja}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {semillaAbierta && <Semilla hojas={hojas} onCerrar={() => setSemillaAbierta(false)} />}
      </AnimatePresence>
    </Pantalla>
  );
}

interface MensajeProps {
  lineas: string[];
  retraso: number;
  onTerminado: () => void;
}

const SEGUNDOS_POR_FRASE = 7.8;

/** El mensaje de despedida: una frase cada vez, que se pasa sola o al tocarla */
function Mensaje({ lineas, retraso, onTerminado }: MensajeProps) {
  const [i, setI] = useState(0);
  const ultima = i === lineas.length - 1;

  useEffect(() => {
    if (ultima) {
      onTerminado();
      return;
    }
    const espera = (SEGUNDOS_POR_FRASE + (i === 0 ? retraso : 0)) * 1000;
    const t = setTimeout(() => setI((n) => n + 1), espera);
    return () => clearTimeout(t);
  }, [i, ultima, retraso, onTerminado]);

  return (
    <motion.button
      className="mensaje-final"
      {...aparecer(retraso)}
      onClick={() => !ultima && setI(i + 1)}
      aria-label={ultima ? undefined : 'Siguiente frase'}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="mensaje-linea"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.9 }}
        >
          {lineas[i]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

interface TarjetaEtapaProps {
  etapa: Etapa;
  hoja?: string;
  onCerrar: () => void;
}

/** Lo que queda de cada etapa: la palabra, el lugar y lo que ella escribió */
function TarjetaEtapa({ etapa, hoja, onCerrar }: TarjetaEtapaProps) {
  return (
    <motion.button
      className="tarjeta-hoja"
      style={{ '--acento-hoja': etapa.acento } as CSSProperties}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5 }}
      onClick={onCerrar}
      aria-label="Cerrar"
    >
      <span className="kicker">
        {etapa.numero} · {etapa.parte} · {etapa.lugar}
      </span>
      <span className="tarjeta-palabra">{etapa.claves[0]}</span>
      <span className="tarjeta-hoja-texto">{hoja ? `«${hoja}»` : etapa.frase}</span>
      <span className="susurro">toca para cerrar</span>
    </motion.button>
  );
}
