// src/contenido/etapas.ts
// Todo lo que se lee en cada etapa. Para cambiar textos, este es el sitio.
import type { Etapa } from './tipos';

export const etapas: Etapa[] = [
  {
    id: 'raiz',
    numero: 'I',
    parte: 'Raíz',
    titulo: 'Lo que Crece hacia Abajo',
    frase: 'El agua quieta devuelve lo que de verdad hay.',
    lugar: 'Un lago y un camino de tierra',
    proposito: 'detenerse',
    sentido:
      'Hay cosas que crecen hacia arriba para que se las vea, y otras que crecen hacia abajo para que lo demás pueda existir. Esta primera parada no pide hacer nada: pide andar despacio por la tierra, entre árboles que llevan años sin moverse, y quedarse un rato junto a un agua que solo enseña lo que tiene cuando nadie la agita.',
    camino: {
      pregunta: '¿Qué parte de ti existía antes de que nadie supiera nombrarla?',
      indicacion: 'Habladlo por el camino de tierra. Junto al agua os espera una palabra que no está escrita en ninguna parte.',
      boton: 'Estamos junto al agua',
    },
    enigma:
      'Asomaos a la orilla. Hay un bosque entero que crece bocabajo, igual que las raíces, pero no tiene ninguna. No se puede tocar: una sola piedra lo rompe y, aun así, si esperáis, vuelve a estar ahí.',
    claves: ['REFLEJO'],
    pistas: ['Mirad el agua, no los árboles.', 'Se rompe en cuanto lo tocas y se arregla solo si lo dejas en paz.'],
    textoCompletado:
      'El reflejo es lo único del árbol que crece hacia abajo sin ser raíz. No se puede coger ni guardar: solo aparece cuando el agua está en calma, y se deshace en cuanto algo la agita. Con las personas pasa lo mismo: lo que las sostiene está debajo, y solo se ve cuando se paran. Hoy te has parado, y el agua te ha devuelto lo que había.',
    anillo: {
      pregunta: '¿Qué has visto de ti al quedarte quieta?',
      placeholder: 'algo que solo aparece en calma…',
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
    titulo: 'Entre Dos Orillas',
    frase: 'Todo pasa por debajo; lo que queda es el cauce.',
    lugar: 'Un puente al atardecer',
    proposito: 'mirar atrás',
    sentido:
      'Un puente no se mueve y, sin embargo, todo pasa bajo él: el agua, la luz, las horas. Desde ahí se ve lo que ya ha quedado atrás y lo que todavía está por llegar. El tronco no crece esquivando el viento; crece porque lo aguanta. A esta hora, con el sol bajando, el año entero cabe en una sola mirada.',
    camino: {
      pregunta: '¿Qué te pesaba hace un año que hoy llevas sin darte cuenta?',
      indicacion: 'Habladlo mientras llegáis al puente. Que el sol no se ponga antes de que lo digáis.',
      boton: 'Estamos en el puente',
    },
    enigma:
      'Asomaos a la barandilla. Estáis encima de algo que nunca es igual dos veces. Pasa sin detenerse, lleva siglos yéndose y todavía no se ha ido.',
    claves: ['RÍO', 'GUADALQUIVIR'],
    pistas: ['Mirad abajo.', 'Un filósofo griego dijo que nadie se baña dos veces en el mismo.'],
    textoCompletado:
      'El río se lleva el agua a cada instante y, aun así, sigue siendo el mismo río: lo que se queda es el cauce. El tronco hace igual con los años; los deja pasar, pero guarda cada uno dentro, en un anillo. Este atardecer es un año que termina sin romperse, con la luz ordenando despacio todo lo que ha pasado. Y un puente es solo eso: aguantar entre dos orillas, la de lo que fuiste y la de lo que vas a ser. Hoy estás justo en medio, y se sostiene.',
    anillo: {
      pregunta: '¿Qué dejas que se lleve el agua?',
      placeholder: 'algo que ya puede irse…',
    },
    crecer: {
      leccion:
        'El tronco guarda cada año dentro, en un anillo. No olvida ningún invierno, y por eso no se rompe.',
      despues: 'El tronco ya aguanta.',
    },
    acento: '#7fa8bf',
    cielo: 'rgba(236, 140, 96, 0.22)', // atardecer
    imagenFondo: '/mirador.jpg',
  },
  {
    id: 'savia',
    numero: 'III',
    parte: 'Savia',
    titulo: 'Lo que Queda Detrás',
    frase: 'No se llega a ningún sitio: se va con alguien.',
    lugar: 'El final de la ruta',
    proposito: 'agradecer',
    sentido:
      'La savia no se ve desde fuera. Corre por dentro, de la raíz a la última hoja, y une cada parte del árbol con las demás. Un camino hecho con amigos funciona igual: los pasos de cada uno se mezclan hasta que ya no se sabe de quién era cada tramo. Esta última parada no está hecha para llegar, sino para darse la vuelta y ver todo lo que se ha andado juntos.',
    camino: {
      pregunta: '¿Qué momento de hoy te llevarías si solo pudieras quedarte con uno?',
      indicacion: 'Habladlo en el último tramo, sin prisa. La palabra os espera al llegar, aunque no esté delante.',
      boton: 'Hemos llegado',
    },
    enigma:
      'Ya habéis llegado, pero lo que buscáis no está aquí delante: está detrás de vosotros. Empezó junto al agua, cruzó el río y nadie lo ha hecho solx. Esta mañana no existía; lo habéis hecho vosotros al andarlo.',
    claves: ['CAMINO', 'RUTA', 'VIAJE'],
    pistas: ['Mirad por dónde habéis venido.', 'Un poeta que nació en Sevilla dijo que se hace al andar.'],
    textoCompletado:
      'El camino no estaba esperando a nadie: se ha hecho hoy, paso a paso, con los pies de todos. Llegar era lo de menos; lo que queda es lo que se habló por el camino y quién andaba a tu lado cuando el sol se fue. La savia hace lo mismo dentro del árbol: une la raíz con la última hoja sin que nadie lo vea. Lo que se disfruta despacio es lo que se queda dentro. Y quien camina contigo, aunque no lo diga, también te está sosteniendo.',
    anillo: {
      pregunta: '¿Qué ha hecho el camino más bonito?',
      placeholder: 'Lo que andaba a tu lado…',
    },
    crecer: {
      leccion:
        'La savia sube en silencio desde la raíz hasta la última hoja. Nadie la ve, y todo lo verde depende de ella.',
      despues: 'La savia ha llegado arriba. La copa se abre.',
    },
    acento: '#d08a52',
    cielo: 'rgba(120, 96, 160, 0.22)', // anochecer
    imagenFondo: '/rio.jpg',
  },
  {
    id: 'fruto',
    numero: 'IV',
    parte: 'Fruto',
    titulo: 'Lo que se Pide en Silencio',
    frase: 'Lo que madura en compañía sabe distinto.',
    lugar: 'La mesa, después de cenar',
    proposito: 'celebrar',
    sentido:
      'El fruto es lo último que da el árbol y lo primero que se comparte. No se hace en un día: es la raíz, el tronco y la savia de todo un año, reunidos en algo que cabe en la mano. Esta parada no está en ningún mapa. Es la mesa, la sobremesa que se alarga y la gente que ha querido estar aquí hoy.',
    camino: {
      pregunta: '¿Qué le dirías a quien eras hace un año, si estuviera sentada en esta mesa?',
      indicacion: 'Habladlo en la sobremesa, sin prisa. Esta vez no hay que ir a ningún sitio: la palabra vendrá sola a la mesa.',
      boton: 'Estamos en la sobremesa',
    },
    enigma:
      'No la busquéis: esta palabra llega sola. Se enciende una vez al año solo por ti, dura lo que dura una canción y se apaga con un deseo.',
    claves: ['VELA', 'TARTA'],
    pistas: ['Esperad un momento. Mirad quién llega.', 'Se apaga soplando.'],
    textoCompletado:
      'Una vela no alumbra mucho, y no le hace falta: basta con que se encienda para que todos se callen y miren hacia el mismo sitio. Se apaga en un soplo, pero lo que se pide en ese instante se queda dentro, como la semilla dentro del fruto. Esta noche no la ha encendido el azar: la ha traído gente que te quiere, que lo ha preparado a escondidas y ha esperado este momento contigo. Pide el deseo sin decirlo; lo demás ya lo sabe toda la mesa.',
    anillo: {
      pregunta: '¿Qué te gustaría encontrar cuando abras la semilla, dentro de un año?',
      placeholder: 'sin contar el deseo…',
    },
    crecer: {
      leccion:
        'El fruto es lo único que el árbol no guarda para sí. Madura despacio y, cuando está listo, se da.',
      despues: 'El árbol ha dado fruto.',
    },
    acento: '#e39b8a',
    cielo: 'rgba(240, 168, 96, 0.2)', // noche, luz de velas
    imagenFondo: '/mesa.jpg',
  },
];
