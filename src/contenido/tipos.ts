// src/contenido/tipos.ts

export type EtapaId = 'raiz' | 'tronco' | 'savia' | 'fruto';

export interface Etapa {
  id: EtapaId;
  numero: string;
  /** Parte del árbol que representa */
  parte: string;
  titulo: string;
  frase: string;
  /** Qué se hace y para qué: lo único que se dice sin metáfora */
  lugar: string;
  proposito: string;
  sentido: string;
  camino: {
    /** Pregunta para hablar en voz alta antes de llegar */
    pregunta: string;
    indicacion: string;
    boton: string;
  };
  /** Adivinanza que solo se resuelve estando en el lugar */
  enigma: string;
  /** Respuestas válidas; la primera es la que se muestra */
  claves: string[];
  /** Pistas propias; después se añaden solas "Son N letras" y "Empieza por…" */
  pistas: string[];
  textoCompletado: string;
  anillo: {
    pregunta: string;
    placeholder: string;
  };
  crecer: {
    /** Se lee mientras el árbol crece */
    leccion: string;
    /** Se lee cuando ya ha crecido */
    despues: string;
  };
  acento: string;
  /** Tinte del cielo: la hora del día en la que ocurre la etapa */
  cielo: string;
  imagenFondo: string;
}
