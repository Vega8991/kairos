// src/contenido/textos.ts
// Textos de la portada, el final y la semilla.

export const portada = {
  saludo: 'Feliz cumpleaños',
  titulo: 'KAIROS',
  epigrafe: 'καιρός · el momento justo',
  parrafos: [
    'Los griegos tenían dos palabras para el tiempo. Chronos es el que se cuenta: horas, calendarios, años que se suman. Kairos es el que se reconoce: el instante exacto en que algo puede ocurrir y que, si no se toma, pasa.',
    'Lo pintaban con un mechón sobre la frente y la nuca desnuda: solo se le atrapa de frente, mientras llega. Hoy Chronos te suma un año. Kairos te ofrece cuatro momentos, las cuatro edades de un árbol. En cada lugar habrá una palabra que no está escrita en ninguna parte: solo aparece si estás allí.',
  ],
  boton: 'Tomar el momento',
  imagen: '/tierra.jpg',
  cielo: 'rgba(96, 84, 140, 0.2)', // antes del alba
};

export const final = {
  // Encima, las cuatro palabras del día aparecen como una constelación.
  // Estas frases se leen una a una (se pasan solas, o tocando el texto).
  lineas: [
    'Un árbol no sabe cuánto ha crecido. Solo sabe que, cada año, lleva algo más dentro.',
    'Tú has sido reflejo para quien necesitaba verse, río para quien tenía que seguir, camino para quien no quería andar solo y vela para quien necesitaba un poco de luz.',
    'Y lo más raro es que no lo notas. Lo que más sostiene es siempre lo que menos ruido hace.',
    'Chronos te suma un año. Kairos guarda el momento en que llegaste.',
  ],
  destacada: 'Feliz cumpleaños',
  pista: 'Toca una estrella, o una hoja que brille.',
  botonSemilla: 'Abrir la semilla',
};

export const semilla = {
  // Día en que la semilla se puede abrir (AAAA-MM-DD): su próximo cumpleaños.
  // Para verla abierta antes de tiempo: añade ?semilla a la URL.
  apertura: '2027-09-24',
  cerrada: {
    titulo: 'Todavía no',
    parrafos: [
      'Todo fruto guarda dentro el árbol siguiente. Esta semilla es la de este año, y no se abre hoy.',
      'A Kairos no se le puede adelantar. Vuelve en tu próximo cumpleaños.',
    ],
  },
  abierta: {
    titulo: 'La semilla',
    parrafos: [
      'Ha pasado una vuelta entera alrededor del sol.',
      'Hace un año te paraste junto a un lago, viste caer el sol desde un puente, llegaste al final del camino rodeada de los tuyos y soplaste unas velas que no sabías que venían. No sé qué habrá cambiado desde entonces, pero sé que lo de abajo sigue ahí. Las raíces no se ven; por eso duran.',
      'Feliz cumpleaños, otra vez.',
    ],
    recuerdos: 'Esto dejaste en el árbol hace un año',
  },
};
