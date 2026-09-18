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
    imagenFondo: '/tierra.jpeg',
    porQueEstaEtapa:
      'Elegí la raíz porque contigo todo empezó sin darme cuenta, como algo que ya estaba ahí antes de nombrarlo. Me recuerdas a esto porque nunca has necesitado impresionar a nadie para importar: creces desde abajo, con calma, sin prisa por demostrar nada.',
  },
  {
    id: 'altura',
    numero: 'II',
    titulo: 'El Peso de la Altura',
    frase: 'No se llega arriba de un salto. Se agarra presa a presa, aunque tiemble la mano.',
    palabraClave: 'AGARRE',
    acento: '#7fa8bf',
    imagenFondo: '/mirador.jpeg',
    porQueEstaEtapa:
      'Esta etapa la pensé en ti porque te he visto agarrarte fuerte a las cosas difíciles sin soltarlas, aunque te temblara la mano. Me recuerdas a la altura porque, sin buscarlo, siempre consigues que quien está cerca de ti quiera subir también.',
  },
  {
    id: 'cauce',
    numero: 'III',
    titulo: 'Lo Que el Río Calla',
    frase: 'El río no mira atrás, solo sigue.',
    palabraClave: 'CAUCE',
    acento: '#5aa9a3',
    imagenFondo: '/rio.jpeg',
    porQueEstaEtapa:
      'El río cierra el camino porque hay cosas que siento y que todavía no te he dicho del todo, y esta etapa es mi forma de dejarlas fluir sin forzar nada. Me recuerdas al cauce porque contigo las cosas nunca se sienten forzadas, simplemente siguen.',
  },
];
