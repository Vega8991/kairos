// src/contenido/etapas.ts
// Todo lo que se lee en cada etapa. Para cambiar textos, este es el sitio.
import type { Etapa } from './tipos';

export const etapas: Etapa[] = [
  {
    id: 'raiz',
    numero: 'I',
    parte: 'Raíz',
    titulo: 'Antes del Nombre',
    frase: 'Todo lo que se sostiene empezó por esconderse.',
    lugar: 'Un bosque',
    proposito: 'detenerse',
    sentido:
      'Hay cosas que crecen hacia arriba para que se las vea, y otras que crecen hacia abajo para que lo demás pueda existir. Esta primera parada no pide hacer nada: pide quedarse quieta entre seres que llevan siglos sin moverse y que, aun así, no han dejado de crecer ni un solo día.',
    camino: {
      pregunta: '¿Qué parte de ti existía antes de que nadie supiera nombrarla?',
      indicacion: 'Habladlo de camino. En el bosque os espera una palabra que no está escrita en ninguna parte.',
      boton: 'Estamos entre los árboles',
    },
    enigma:
      'Buscad un árbol viejo y quedaos debajo. Hay algo que os está dando sin tocaros, sin moverse y sin pedir nada. Es la única parte del árbol que llega al suelo sin ser raíz.',
    claves: ['SOMBRA'],
    pistas: ['Mira al suelo, no al árbol.', 'Existe gracias a la luz, pero es lo contrario de la luz.'],
    textoCompletado:
      'La sombra es la forma que tiene un árbol de decir que está ahí sin necesidad de hablar. No la elige ni la fabrica: ocurre, simplemente, porque hay algo firme entre la luz y el suelo. Quien descansa debajo casi nunca se pregunta de dónde viene el fresco. Así funciona todo lo que sostiene de verdad: da sin anunciarse, y solo se entiende cuando uno se para. Hoy te has parado.',
    anillo: {
      pregunta: '¿Qué te ha dado sombra sin que lo pidieras?',
      placeholder: 'algo que sostuvo en silencio…',
    },
    crecer: {
      leccion:
        'Nadie aplaude a una raíz. Crece a oscuras, hacia abajo, para que algún día algo pueda atreverse a crecer hacia arriba.',
      despues: 'La raíz ya sostiene.',
    },
    acento: '#c9a35c',
    cielo: 'rgba(222, 150, 118, 0.24)', // mañana
    imagenFondo: '/tierra.jpg',
  },
  {
    id: 'tronco',
    numero: 'II',
    parte: 'Tronco',
    titulo: 'La Distancia Recorrida',
    frase: 'Solo desde arriba se entiende el camino.',
    lugar: 'Un mirador',
    proposito: 'mirar atrás',
    sentido:
      'Subir no es huir del suelo: es alejarse lo justo para poder verlo entero. Cada paso de esta cuesta pesa como un año, y el cansancio no es el precio, es la prueba. El tronco no crece esquivando el viento; crece porque lo aguanta. Arriba espera algo que abajo no se puede tener: perspectiva.',
    camino: {
      pregunta: '¿Qué te pesaba hace un año que hoy llevas sin darte cuenta?',
      indicacion: 'Habladlo mientras subís. Que la cuesta no os deje callar.',
      boton: 'Estamos arriba',
    },
    enigma:
      'Mirad lejos, lo más lejos que se pueda. Hay una línea donde termina lo que conoces y empieza lo que todavía no has visto. Nunca se alcanza: cuanto más te acercas, más se aleja.',
    claves: ['HORIZONTE'],
    pistas: ['Separa el cielo de la tierra.', 'Los barcos desaparecen detrás de ella.'],
    textoCompletado:
      'El horizonte no es un lugar: es un límite que se mueve contigo. Desde abajo parece un muro; desde arriba se descubre que siempre fue una promesa. Todo lo que has subido hoy está ahí debajo, reducido a un dibujo: las cuestas que parecían eternas, los tramos en los que casi paras. La altura no borra el peso, lo ordena. Y quien ha subido una vez aprende algo que ya no se le olvida: lo que parecía el fin del mundo era solo el borde de lo que aún no había mirado.',
    anillo: {
      pregunta: '¿Qué ves ahora que desde abajo no se veía?',
      placeholder: 'algo que la distancia aclaró…',
    },
    crecer: {
      leccion:
        'El tronco guarda cada año dentro, en un anillo. No olvida ningún invierno, y por eso no se rompe.',
      despues: 'El tronco ya aguanta.',
    },
    acento: '#7fa8bf',
    cielo: 'rgba(160, 196, 222, 0.18)', // mediodía
    imagenFondo: '/mirador.jpg',
  },
  {
    id: 'savia',
    numero: 'III',
    parte: 'Savia',
    titulo: 'Lo que Arde Despacio',
    frase: 'Lo que alimenta no se ve: se disuelve.',
    lugar: 'Una cena hecha a tres manos',
    proposito: 'agradecer',
    sentido:
      'La savia no se ve desde fuera. Corre por dentro, de la raíz a la última hoja, y lleva a cada rama lo que necesita para seguir. Cocinar juntos es lo mismo, pero a la vista: juntar cosas que por separado no eran nada, darles tiempo y calor, y sentarse a repartir lo que ha salido. Lo que se cuece despacio es lo que dura.',
    camino: {
      pregunta: '¿Qué quieres que siga corriendo por dentro el año que viene?',
      indicacion: 'Habladlo mientras cocináis, sin prisa. La palabra aparecerá en la mesa.',
      boton: 'La mesa está puesta',
    },
    enigma:
      'Está en casi todo lo que habéis cocinado y no se ve en ningún plato. Desaparece para que lo demás sepa a algo. Solo se nota cuando falta.',
    claves: ['SAL'],
    pistas: ['Viene del mar.', 'Se dice de alguien con gracia: que tiene mucha.'],
    textoCompletado:
      'La sal no se ve en el plato y, sin embargo, está en cada bocado. No añade nada nuevo: hace que lo que ya estaba se note. Hubo un tiempo en que era tan valiosa que de ella nació la palabra salario. Hay personas que son así: se disuelven en los días de otros sin hacer ruido, y solo cuando faltan se entiende que eran ellas las que daban sabor a todo. Esta noche no falta nada.',
    anillo: {
      pregunta: '¿Qué das tú sin que se vea?',
      placeholder: 'algo que se disuelve en lo demás…',
    },
    crecer: {
      leccion:
        'La savia sube en silencio desde la raíz hasta la última hoja. Nadie la ve, y todo lo verde depende de ella.',
      despues: 'La savia ha llegado arriba. La copa se abre.',
    },
    acento: '#d08a52',
    cielo: 'rgba(214, 120, 64, 0.24)', // anochecer, luz de cocina
    imagenFondo: '/rio.jpg',
  },
];
