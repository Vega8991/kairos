// src/pantallas/Final.tsx
// La noche: la constelación del día, el árbol con fruto y la semilla.
import { useState, type CSSProperties } from 'react';
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
  const etapaAbierta = etapas.find((e) => e.id === hojaAbierta);
  const tras = 3.4; // cuando la constelación ya se ha dibujado

  return (
    <Pantalla arriba>
      <motion.p className="kicker inscripcion" {...aparecer(0.4)}>
        Kairos · {dia}
      </motion.p>

      <Constelacion retraso={0.8} onTocar={onAbrirHoja} />

      {final.lineas.map((linea, i) => (
        <motion.p key={i} className="linea-final" {...aparecer(tras + i * 0.8)}>
          {linea}
        </motion.p>
      ))}
      <motion.p className="linea-final destacada" {...aparecer(tras + final.lineas.length * 0.8 + 0.3)}>
        {final.destacada}
      </motion.p>
      <motion.p className="susurro" {...aparecer(tras + 2.2)}>
        {final.pista}
      </motion.p>

      <motion.div className="pie" {...aparecer(tras + 2.8)}>
        <button className="boton" onClick={() => setSemillaAbierta(true)}>
          {final.botonSemilla}
        </button>
      </motion.div>

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
