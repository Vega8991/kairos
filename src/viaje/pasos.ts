// src/viaje/pasos.ts
// El viaje es una lista lineal de pasos: portada, seis momentos por etapa y final.
import { etapas } from '../contenido/etapas';
import type { Etapa, EtapaId } from '../contenido/tipos';

export type Momento = 'umbral' | 'camino' | 'enigma' | 'revelacion' | 'anillo' | 'crecer';

export type Paso =
  | { tipo: 'portada' }
  | { tipo: 'etapa'; etapa: Etapa; momento: Momento }
  | { tipo: 'final' };

/** Lo que ella escribe en cada etapa; se convierte en una hoja del árbol */
export type Hojas = Partial<Record<EtapaId, string>>;

const MOMENTOS: Momento[] = ['umbral', 'camino', 'enigma', 'revelacion', 'anillo', 'crecer'];

export const PASOS: Paso[] = [
  { tipo: 'portada' },
  ...etapas.flatMap((etapa) => MOMENTOS.map((momento): Paso => ({ tipo: 'etapa', etapa, momento }))),
  { tipo: 'final' },
];

const indiceCrecer = etapas.map((etapa) =>
  PASOS.findIndex((p) => p.tipo === 'etapa' && p.etapa.id === etapa.id && p.momento === 'crecer')
);

/** Cuántas etapas han hecho crecer ya el árbol (0 a 3) */
export function nivelDelArbol(desbloqueado: number): number {
  return indiceCrecer.filter((i) => i < desbloqueado).length;
}
