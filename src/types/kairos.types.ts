// src/types/kairos.types.ts

export type EtapaId = 'raiz' | 'altura' | 'cauce';

export interface Etapa {
  id: EtapaId;
  numero: string;
  titulo: string;
  frase: string;
  palabraClave: string;
  acento: string;
}

export type Vista = 'portada' | EtapaId | 'final';
