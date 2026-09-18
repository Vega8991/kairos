// src/data/etapas.data.ts
import type { Etapa } from '../types/kairos.types';

export const etapas: Etapa[] = [
  {
    id: 'raiz',
    numero: 'I',
    titulo: 'Antes del Nombre',
    frase: 'Antes de crecer, hay que echar raíces.',
    palabraClave: 'RAIZ',
    acento: '#c9a35c',
  },
  {
    id: 'altura',
    numero: 'II',
    titulo: 'El Peso de la Altura',
    frase: 'No se llega arriba de un salto. Se agarra presa a presa, aunque tiemble la mano.',
    palabraClave: 'AGARRE',
    acento: '#7fa8bf',
  },
  {
    id: 'cauce',
    numero: 'III',
    titulo: 'Lo Que el Río Calla',
    frase: 'El río no mira atrás, solo sigue.',
    palabraClave: 'CAUCE',
    acento: '#5aa9a3',
  },
];
