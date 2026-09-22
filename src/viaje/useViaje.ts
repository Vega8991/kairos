// src/viaje/useViaje.ts
import { useCallback, useEffect, useState } from 'react';
import type { EtapaId } from '../contenido/tipos';
import { borrar, guardar, leer } from '../lib/almacen';
import { PASOS, nivelDelArbol, type Hojas } from './pasos';

interface EstadoViaje {
  /** Paso que se está viendo */
  indice: number;
  /** Paso más lejano al que se puede llegar */
  desbloqueado: number;
  hojas: Hojas;
  /** Cuándo llegó al final por primera vez (ISO) */
  fechaFinal?: string;
}

const CLAVE = 'kairos-viaje';
const INICIAL: EstadoViaje = { indice: 0, desbloqueado: 0, hojas: {} };
const ULTIMO = PASOS.length - 1;

function estadoInicial(): EstadoViaje {
  // ?reiniciar en la URL empieza de cero (para probar antes del día)
  const url = new URL(window.location.href);
  if (url.searchParams.has('reiniciar')) {
    borrar(CLAVE);
    url.searchParams.delete('reiniciar');
    window.history.replaceState(null, '', url);
    return INICIAL;
  }

  const guardado = leer<EstadoViaje>(CLAVE, INICIAL);
  return {
    indice: Math.min(guardado.indice ?? 0, ULTIMO),
    desbloqueado: Math.min(guardado.desbloqueado ?? 0, ULTIMO),
    hojas: guardado.hojas ?? {},
    fechaFinal: guardado.fechaFinal,
  };
}

export function useViaje() {
  const [estado, setEstado] = useState(estadoInicial);

  useEffect(() => {
    guardar(CLAVE, estado);
  }, [estado]);

  const avanzar = useCallback(() => {
    setEstado((e) => {
      const siguiente = Math.min(e.indice + 1, ULTIMO);
      const fechaFinal = e.fechaFinal ?? (siguiente === ULTIMO ? new Date().toISOString() : undefined);
      return { ...e, indice: siguiente, desbloqueado: Math.max(e.desbloqueado, siguiente), fechaFinal };
    });
  }, []);

  const retroceder = useCallback(() => {
    setEstado((e) => ({ ...e, indice: Math.max(e.indice - 1, 0) }));
  }, []);

  /** Marca el paso actual como superado sin moverse de él */
  const desbloquear = useCallback(() => {
    setEstado((e) => ({ ...e, desbloqueado: Math.max(e.desbloqueado, e.indice + 1) }));
  }, []);

  const guardarHoja = useCallback((id: EtapaId, texto: string) => {
    setEstado((e) => ({ ...e, hojas: { ...e.hojas, [id]: texto } }));
  }, []);

  return {
    indice: estado.indice,
    paso: PASOS[estado.indice],
    superado: estado.desbloqueado > estado.indice,
    nivel: nivelDelArbol(estado.desbloqueado),
    hojas: estado.hojas,
    fechaFinal: estado.fechaFinal,
    avanzar,
    retroceder,
    desbloquear,
    guardarHoja,
  };
}

export type Viaje = ReturnType<typeof useViaje>;
