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
    imagenFondo: '/tierra.jpg',
    porQueEstaEtapa:
      'Esta etapa la pensé en ti porque lo nuestro empezó así: sin ruido, sin plan, y aun así se quedó firme desde el primer día. Me recuerdas a la raíz porque, sin buscarlo, te has vuelto la base de la que todo lo demás crece.',
    textoCompletado:
      'Antes de tener nombre, las cosas ya tiran raíces hacia abajo, a ciegas, sin saber qué buscan. Hay una que encontró tierra sin ruido, sin anuncio, como si el suelo ya estuviera esperando esa forma exacta. No hubo grieta que cruzar ni permiso que pedir: simplemente hubo sitio, y algo se quedó a vivir ahí. Lo que no tiene nombre todavía es lo que más firme se sostiene.',
  },
  {
    id: 'altura',
    numero: 'II',
    titulo: 'El Peso de la Altura',
    frase: 'No se llega arriba de un salto. Se agarra presa a presa, aunque tiemble la mano.',
    palabraClave: 'AGARRE',
    acento: '#7fa8bf',
    imagenFondo: '/mirador.jpg',
    porQueEstaEtapa:
      'Esta etapa la pensé en ti porque te he visto agarrarte fuerte a las cosas difíciles sin soltarlas, aunque te temblara la mano. Me recuerdas a la altura porque, sin buscarlo, siempre consigues que quien está cerca de ti quiera subir también.',
    textoCompletado:
      'Toda piedra que sube carga grietas de antes, marcas de caídas que no se ven desde fuera. El peso no está en subir, está en seguir agarrado cuando la mano tiembla y el hueco parece más grande que los dedos. Pero hay manos que aprendieron a sostenerse solas primero, y por eso ahora sostienen mejor. No se trata de llegar sin heridas: se trata de subir con ellas y aun así no soltar, porque arriba espera algo que ya tiene nombre propio: un propósito.',
  },
  {
    id: 'cauce',
    numero: 'III',
    titulo: 'Lo Que el Río Calla',
    frase: 'El río no mira atrás, solo sigue.',
    palabraClave: 'CAUCE',
    acento: '#5aa9a3',
    imagenFondo: '/rio.jpg',
    porQueEstaEtapa:
      'Esta etapa la pensé en ti porque contigo todo fluye sin forzarse, encuentra su cauce solo. Me recuerdas al río porque no miras atrás, sigues, y arrastras contigo a quien tiene la suerte de ir al lado.',
    textoCompletado:
      'Hay agua que lleva años buscando salida y no la encuentra, hasta que un día el terreno cede justo donde nadie esperaba. Ahí empieza a correr distinto: con dirección, con luz que antes no llegaba tan adentro. Cauces que venían de sitios distintos, cansados de perderse en tierra seca, se encuentran y de repente ya no hay sequía posible. Eso que se encontró ahí no estaba en ningún otro sitio antes: ni en otras aguas, ni en otros caminos. Solo en ese cruce exacto nació la esperanza de que esto, por fin, va a algún lugar.',
  },
];
