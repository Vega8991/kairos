// src/arbol/geometria.ts
// El árbol se genera una sola vez, con semilla fija: siempre sale el mismo.
// Lienzo de 200×260 con el suelo en y=170. Crecimiento: 0→1 raíz, 1→2 tronco, 2→3 copa, 3→4 fruto.
import type { EtapaId } from '../contenido/tipos';
import { azar } from '../lib/azar';

export type Rango = [number, number];
type P = [number, number];

export const SUELO_Y = 170;
export const BASE_X = 100;

// ---------- Generador ----------

interface Segmento {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  w0: number;
  w1: number;
}

interface Punta {
  x: number;
  y: number;
  ang: number;
  /** Puntos desde la base hasta esta punta: por aquí sube la savia */
  camino: P[];
}

interface Opciones {
  profundidad: number;
  /** Ángulo hacia el que tiende a crecer (luz o gravedad) y con qué fuerza */
  hacia: number;
  fuerza: number;
  abertura: number;
  reduccion: number;
  afinar: number;
  /** Cuánto se ensancha la base del primer tramo */
  ensanchar: number;
  /** Ángulos permitidos (para que las raíces no salgan del suelo) */
  limites?: [number, number];
}

function crecer(semilla: number, arranques: { ang: number; largo: number; ancho: number }[], o: Opciones) {
  const r = azar(semilla);
  const segmentos: Segmento[] = [];
  const puntas: Punta[] = [];
  /** Finales de ramas intermedias: también llevan hojas, para que la copa no quede hueca */
  const nudos: Punta[] = [];

  const rama = (x: number, y: number, ang: number, largo: number, ancho: number, prof: number, camino: P[]) => {
    const partes = prof < 2 ? 3 : 2;
    const fin = ancho * o.afinar;
    const giro = (r() - 0.5) * 0.5;
    let px = x;
    let py = y;
    let a = ang;
    let w = prof === 0 ? ancho * o.ensanchar : ancho;
    const cam = [...camino];

    for (let i = 0; i < partes; i++) {
      a += giro / partes + (r() - 0.5) * 0.1;
      a += (o.hacia - a) * o.fuerza;
      if (o.limites) a = Math.min(o.limites[1], Math.max(o.limites[0], a));
      const l = largo / partes;
      const nx = px + Math.cos(a) * l;
      const ny = py + Math.sin(a) * l;
      const nw = ancho + (fin - ancho) * ((i + 1) / partes);
      segmentos.push({ x0: px, y0: py, x1: nx, y1: ny, w0: w, w1: nw });
      px = nx;
      py = ny;
      w = nw;
      cam.push([nx, ny]);
    }

    if (prof >= o.profundidad) {
      puntas.push({ x: px, y: py, ang: a, camino: cam });
      return;
    }
    if (prof >= o.profundidad - 2) nudos.push({ x: px, y: py, ang: a, camino: cam });

    const n = prof === 0 || r() < 0.3 ? 3 : 2;
    const abre = o.abertura * (0.8 + r() * 0.6);
    for (let k = 0; k < n; k++) {
      const t = k / (n - 1) - 0.5;
      const central = n === 3 && k === 1;
      rama(
        px,
        py,
        a + t * 2 * abre + (r() - 0.5) * 0.15,
        largo * (o.reduccion + r() * 0.12) * (central ? 1.05 : 1),
        fin * (central ? 0.92 : 0.8),
        prof + 1,
        cam
      );
    }
  };

  for (const s of arranques) rama(0, 0, s.ang, s.largo, s.ancho, 0, [[0, 0]]);
  return { segmentos, puntas, nudos };
}

/** Escala lo generado para que ocupe exactamente el espacio disponible */
function encajar(g: ReturnType<typeof crecer>, alto: number, lado: number, sentido: 1 | -1, grueso = 1) {
  let maxAlto = 1;
  let maxLado = 1;
  for (const s of g.segmentos) {
    maxAlto = Math.max(maxAlto, s.y1 * sentido);
    maxLado = Math.max(maxLado, Math.abs(s.x1));
  }
  const e = Math.min(alto / maxAlto, lado / maxLado);
  const m = ([x, y]: P): P => [BASE_X + x * e, SUELO_Y + y * e];
  const grosor = (0.5 + 0.5 * e) * grueso;

  return {
    segmentos: g.segmentos.map((s) => {
      const [x0, y0] = m([s.x0, s.y0]);
      const [x1, y1] = m([s.x1, s.y1]);
      return { x0, y0, x1, y1, w0: s.w0 * grosor, w1: s.w1 * grosor };
    }),
    puntas: g.puntas.map((p) => {
      const [x, y] = m([p.x, p.y]);
      return { x, y, ang: p.ang, camino: p.camino.map(m) };
    }),
    nudos: g.nudos.map((p) => {
      const [x, y] = m([p.x, p.y]);
      return { x, y, ang: p.ang, camino: [] };
    }),
  };
}

// ---------- Dibujo ----------

const f = (n: number) => n.toFixed(1);

/** Cada tramo es un trapecio que se afina, con una articulación redonda al final */
function cuerpo(segmentos: Segmento[], factor = 1, desplazar = 0): string {
  return segmentos
    .map((s) => {
      const dx = s.x1 - s.x0;
      const dy = s.y1 - s.y0;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const a0 = (s.w0 * factor) / 2;
      const a1 = (s.w1 * factor) / 2;
      const ox = nx * desplazar * s.w0;
      const oy = ny * desplazar * s.w0;
      const x0 = s.x0 + ox;
      const y0 = s.y0 + oy;
      const x1 = s.x1 + ox;
      const y1 = s.y1 + oy;
      const quad =
        `M${f(x0 + nx * a0)} ${f(y0 + ny * a0)}L${f(x1 + nx * a1)} ${f(y1 + ny * a1)}` +
        `L${f(x1 - nx * a1)} ${f(y1 - ny * a1)}L${f(x0 - nx * a0)} ${f(y0 - ny * a0)}Z`;
      const junta =
        a1 > 0.2
          ? `M${f(x1 + a1)} ${f(y1)}a${f(a1)} ${f(a1)} 0 1 0 ${f(-2 * a1)} 0a${f(a1)} ${f(a1)} 0 1 0 ${f(2 * a1)} 0Z`
          : '';
      return quad + junta;
    })
    .join('');
}

function hoja(x: number, y: number, ang: number, largo: number, ancho: number): string {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const p = (u: number, v: number) => `${f(x + u * c - v * s)} ${f(y + u * s + v * c)}`;
  return (
    `M${p(0, 0)}C${p(largo * 0.3, -ancho)} ${p(largo * 0.72, -ancho)} ${p(largo, 0)}` +
    `C${p(largo * 0.72, ancho)} ${p(largo * 0.3, ancho)} ${p(0, 0)}Z`
  );
}

function circulo(x: number, y: number, r: number): string {
  return `M${f(x + r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0Z`;
}

const distancia = (x: number, y: number) => Math.hypot(x - BASE_X, y - SUELO_Y);

// ---------- El árbol ----------

const tronco = encajar(
  crecer(11, [{ ang: -Math.PI / 2, largo: 74, ancho: 12 }], {
    profundidad: 5,
    hacia: -Math.PI / 2,
    fuerza: 0.1,
    abertura: 0.44,
    reduccion: 0.7,
    afinar: 0.64,
    ensanchar: 1.7,
  }),
  146,
  82,
  -1,
  1.4
);

const raices = encajar(
  crecer(
    5,
    [0.3, 0.95, 1.57, 2.2, 2.85].map((ang, i) => ({ ang, largo: i === 2 ? 30 : 34, ancho: i === 2 ? 3.6 : 3 })),
    {
      profundidad: 3,
      hacia: Math.PI / 2,
      fuerza: 0.04,
      abertura: 0.45,
      reduccion: 0.7,
      afinar: 0.6,
      ensanchar: 1.3,
      limites: [0.18, Math.PI - 0.18],
    }
  ),
  84,
  90,
  1
);

export const MADERA = cuerpo(tronco.segmentos);
/** Brillo lateral: la luz viene de la izquierda */
export const MADERA_LUZ = cuerpo(tronco.segmentos, 0.45, -0.12);
export const RAICES = cuerpo(raices.segmentos);

const alcance = (segs: Segmento[]) => Math.max(...segs.map((s) => distancia(s.x1, s.y1)));
/** Radio que tiene que alcanzar el frente de crecimiento para revelarlo todo */
export const RADIO_MADERA = alcance(tronco.segmentos) * 1.25;
export const RADIO_RAICES = alcance(raices.segmentos) * 1.25;

export const BROTE = 'M100 170 C 100 164, 98 160, 95 156';

// ---------- Copa ----------

export interface Racimo {
  x: number;
  y: number;
  rango: Rango;
  frente: { color: string; d: string }[];
  fondo: { color: string; d: string }[];
}

const VERDES = ['#86b894', '#6aa58c', '#a8cc92', '#5c9a86'];
const SOMBRAS = ['#3d6b5f', '#4b7a66', '#5f7f4f', '#2f5a55'];

const rc = azar(23);
const maxDistancia = Math.max(...tronco.puntas.map((p) => distancia(p.x, p.y)));

const racimo = (p: Punta, cuantas: number, alDelante: number): Racimo => {
  const frente = new Map<string, string>();
  const fondo = new Map<string, string>();

  for (let i = 0; i < cuantas; i++) {
    const ang = p.ang + (rc() - 0.5) * 3.4;
    const avance = rc() * 2.2;
    const x = p.x + Math.cos(p.ang) * avance;
    const y = p.y + Math.sin(p.ang) * avance;
    const largo = 5 + rc() * 4.5;
    const delante = rc() < alDelante;
    const tono = rc();
    const color = delante
      ? tono < 0.1
        ? '#e7a076'
        : tono < 0.24
          ? '#d9bd72'
          : VERDES[Math.floor(rc() * VERDES.length)]
      : SOMBRAS[Math.floor(rc() * SOMBRAS.length)];
    const capa = delante ? frente : fondo;
    capa.set(color, (capa.get(color) ?? '') + hoja(x, y, ang, delante ? largo : largo * 1.15, largo * 0.34));
  }

  const inicio = 2 + (distancia(p.x, p.y) / maxDistancia) * 0.55 + rc() * 0.12;
  const aLista = (m: Map<string, string>) => [...m].map(([color, d]) => ({ color, d }));
  return { x: p.x, y: p.y, rango: [inicio, inicio + 0.3], frente: aLista(frente), fondo: aLista(fondo) };
};

// Los racimos interiores van primero: quedan detrás de los de las puntas
export const RACIMOS: Racimo[] = [
  ...tronco.nudos.map((p) => racimo(p, 7, 0.35)),
  ...tronco.puntas.map((p) => racimo(p, 8, 0.6)),
];

export interface Flor {
  petalos: string;
  x: number;
  y: number;
  rango: Rango;
}

const rf = azar(41);
export const FLORES: Flor[] = tronco.puntas
  .filter(() => rf() < 0.2)
  .map((p) => {
    const x = p.x + (rf() - 0.5) * 4;
    const y = p.y + (rf() - 0.5) * 4;
    const petalos = Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2 + rf();
      return circulo(x + Math.cos(a) * 1.25, y + Math.sin(a) * 1.25, 0.95);
    }).join('');
    const inicio = 2.55 + rf() * 0.3;
    return { petalos, x, y, rango: [inicio, inicio + 0.2] as Rango };
  });

// ---------- Fruto, hojas propias y savia ----------

const porX = [...tronco.puntas].sort((a, b) => a.x - b.x);
const enCuantil = <T,>(lista: T[], q: number) => lista[Math.min(lista.length - 1, Math.floor(q * lista.length))];

export const FRUTOS = [0.1, 0.28, 0.46, 0.64, 0.82, 0.95].map((q, i) => {
  const p = enCuantil(porX, q);
  return { x: p.x, y: p.y + 3.2, rango: [3.1 + i * 0.12, 3.45 + i * 0.12] as Rango };
});

const masAlta = tronco.puntas.reduce((a, b) => (b.y < a.y ? b : a));
const aGrados = (rad: number) => (rad * 180) / Math.PI;

export const HOJAS_PROPIAS: Record<EtapaId, { x: number; y: number; giro: number }> = {
  raiz: { x: porX[0].x, y: porX[0].y, giro: aGrados(porX[0].ang) },
  tronco: { x: porX[porX.length - 1].x, y: porX[porX.length - 1].y, giro: aGrados(porX[porX.length - 1].ang) },
  savia: { x: masAlta.x, y: masAlta.y, giro: aGrados(masAlta.ang) },
  fruto: { x: enCuantil(porX, 0.22).x, y: enCuantil(porX, 0.22).y, giro: aGrados(enCuantil(porX, 0.22).ang) },
};

const raicesPorX = [...raices.puntas].sort((a, b) => a.x - b.x);

export const SAVIA: string[] = [0.15, 0.4, 0.62, 0.86].map((q) => {
  const abajo = [...enCuantil(raicesPorX, q).camino].reverse();
  const arriba = enCuantil(porX, q).camino;
  return [...abajo, ...arriba].map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('');
});

const rl = azar(59);
export const LUCIERNAGAS = Array.from({ length: 18 }, () => ({
  x: 8 + rl() * 184,
  y: 15 + rl() * 150,
  r: 0.7 + rl() * 0.9,
  retraso: rl() * 6,
}));

/** Hojas que caen de vez en cuando en el final */
export const HOJAS_CAYENDO = [enCuantil(porX, 0.3), enCuantil(porX, 0.75)].map((p, i) => ({
  d: hoja(p.x, p.y, 0.4, 6.5, 2.2),
  color: i ? '#d9bd72' : '#86b894',
  retraso: i * 5.5,
}));
