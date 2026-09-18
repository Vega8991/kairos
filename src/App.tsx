import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import './App.css';

type EtapaId = 'raiz' | 'altura' | 'cauce';

interface Etapa {
  id: EtapaId;
  claseCss: string;
  icono: string;
  iconoFinal: string;
  titulo: string;
  frase: string;
  palabraClave: string;
  imagenFondo: string;
  particula: string;
  colorConfeti: string[];
}

const NOMBRE_CORRECTO = 'CARMEN';

const etapas: Etapa[] = [
  {
    id: 'raiz',
    claseCss: 'scene-raiz',
    icono: '🌰',
    iconoFinal: '🌳',
    titulo: 'Antes del Nombre',
    frase: 'Antes de crecer, hay que echar raíces.',
    palabraClave: 'RAIZ',
    imagenFondo: '/tierra.jpg',
    particula: '🍂',
    colorConfeti: ['#8b5e3c', '#4a3728', '#d8a15c'],
  },
  {
    id: 'altura',
    claseCss: 'scene-altura',
    icono: '🪨',
    iconoFinal: '🕊️',
    titulo: 'El Peso de la Altura',
    frase: 'No se llega arriba de un salto. Se agarra presa a presa, aunque tiemble la mano.',
    palabraClave: 'AGARRE',
    imagenFondo: '/mirador.jpg',
    particula: '🕊️',
    colorConfeti: ['#5b8ba3', '#2c4a5e', '#eaf4fa'],
  },
  {
    id: 'cauce',
    claseCss: 'scene-cauce',
    icono: '💧',
    iconoFinal: '🌊',
    titulo: 'Lo Que el Río Calla',
    frase: 'El río no mira atrás, solo sigue.',
    palabraClave: 'CAUCE',
    imagenFondo: '/rio.jpg',
    particula: '💧',
    colorConfeti: ['#1e6b8c', '#0d3b4f', '#8fd8e8'],
  },
];

function normalizar(texto: string): string {
  return texto.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function reproducirTono(tipo: 'ok' | 'error') {
  try {
    const AudioContextConstructor = window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextConstructor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    if (tipo === 'ok') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {
    //nose q nose cuantos
  }
}

function CursorEstela() {
  const [puntos, setPuntos] = useState<{ x: number; y: number; id: number }[]>([]);
  const contador = useRef(0);

  useEffect(() => {
    const mover = (e: MouseEvent) => {
      contador.current += 1;
      const id = contador.current;
      setPuntos((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id }]);
    };
    window.addEventListener('mousemove', mover);
    return () => window.removeEventListener('mousemove', mover);
  }, []);

  return (
    <div className="cursor-estela">
      {puntos.map((p, i) => (
        <span
          key={p.id}
          className="cursor-punto"
          style={{ left: p.x, top: p.y, opacity: (i + 1) / puntos.length }}
        />
      ))}
    </div>
  );
}

function LluviaParticulas({ emoji, activa }: { emoji: string; activa: boolean }) {
  const [items, setItems] = useState<{ id: number; left: number; duracion: number; retraso: number }[]>([]);

  useEffect(() => {
    if (!activa) return;
    const nuevos = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duracion: 8 + Math.random() * 8,
      retraso: Math.random() * 6,
    }));
    setItems(nuevos);
  }, [activa]);

  if (!activa) return null;

  return (
    <div className="lluvia-particulas">
      {items.map((p) => (
        <span
          key={p.id}
          className="particula-flotante"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duracion}s`,
            animationDelay: `${p.retraso}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function PuertaEntrada({ onEntrar }: { onEntrar: () => void }) {
  const [valor, setValor] = useState('');
  const [error, setError] = useState(false);

  const intentar = () => {
    if (normalizar(valor) === NOMBRE_CORRECTO) {
      onEntrar();
    } else {
      setError(true);
      reproducirTono('error');
    }
  };

  return (
    <motion.div
      className="puerta-entrada"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="puerta-contenido"
      >
        <h1 className="puerta-titulo">KAIROS</h1>
        <p className="puerta-subtitulo">Este camino solo se abre pa una persona.</p>
        <p className="puerta-instruccion">Escribe tu nombre pa empezar</p>
        <div className="input-row">
          <input
            autoFocus
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
              setError(false);
            }}
            onKeyUp={(e) => e.key === 'Enter' && intentar()}
            placeholder="Tu nombre..."
          />
          <button onClick={intentar}>Entrar</button>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              className="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Este camino no es pa ti... todavía.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Scene({
  etapa,
  estado,
  onCompletar,
}: {
  etapa: Etapa;
  estado: 'bloqueada' | 'activa' | 'completada';
  onCompletar: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [intento, setIntento] = useState('');
  const [error, setError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const opacityBg = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const escala = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const dispararConfeti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: etapa.colorConfeti,
    });
  }, [etapa.colorConfeti]);

  const verificar = () => {
    if (normalizar(intento) === normalizar(etapa.palabraClave)) {
      reproducirTono('ok');
      dispararConfeti();
      onCompletar();
      setIntento('');
      setError(false);
    } else {
      reproducirTono('error');
      setError(true);
    }
  };

  return (
    <section ref={ref} className={`scene ${etapa.claseCss} ${estado}`}>
      <motion.div
        className="scene-bg"
        style={{ y, scale: escala, opacity: opacityBg, backgroundImage: `url(${etapa.imagenFondo})` }}
      />
      <div className="scene-overlay" />
      <LluviaParticulas emoji={etapa.particula} activa={estado !== 'bloqueada'} />

      {estado === 'bloqueada' && (
        <div className="scene-content bloqueada">
          <span className="icono">🔒</span>
          <h2>???</h2>
          <p className="pista-bloqueo">Completa la etapa anterior pa desbloquear esto.</p>
        </div>
      )}

      {estado === 'activa' && (
        <motion.div
          className="scene-content"
          initial={{ opacity: 0, y: 40, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.05em' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="icono"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {etapa.icono}
          </motion.span>
          <h2>{etapa.titulo}</h2>
          <p>{etapa.frase}</p>
          <div className="input-row">
            <input
              value={intento}
              onChange={(e) => setIntento(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && verificar()}
              placeholder="Palabra clave..."
            />
            <button onClick={verificar}>Desbloquear</button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p
                className="error"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: [0, -8, 8, -8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Esa no es la clave, prueba otra vez.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {estado === 'completada' && (
        <motion.div
          className="scene-content completada"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="icono"
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            {etapa.iconoFinal}
          </motion.span>
          <h2>{etapa.titulo}</h2>
          <p className="completada-check">✓ Etapa completada</p>
        </motion.div>
      )}
    </section>
  );
}

function SendaProgreso({ completadas, activa }: { completadas: Set<EtapaId>; activa: EtapaId | null }) {
  return (
    <div className="senda-progreso">
      {etapas.map((etapa, i) => (
        <div key={etapa.id} className="senda-item">
          <div
            className={`senda-punto ${
              completadas.has(etapa.id) ? 'completado' : activa === etapa.id ? 'actual' : ''
            }`}
          >
            {completadas.has(etapa.id) ? '✓' : i + 1}
          </div>
          {i < etapas.length - 1 && (
            <div className={`senda-linea ${completadas.has(etapa.id) ? 'completada' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function FinalMessage({ visible }: { visible: boolean }) {
  const [revelado, setRevelado] = useState(false);
  const [contador, setContador] = useState(3);

  useEffect(() => {
    if (!visible || revelado) return;
    if (contador === 0) {
      setRevelado(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#d8a15c', '#5b8ba3', '#1e6b8c', '#ffffff'],
      });
      return;
    }
    const t = setTimeout(() => setContador((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [visible, contador, revelado]);

  if (!visible) return null;

  return (
    <section className="scene scene-final">
      <div className="scene-content">
        {!revelado ? (
          <motion.div key={contador} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="contador-final">{contador === 0 ? '✨' : contador}</span>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <p className="mensaje-linea">Carmen, raíz, vuelo y cauce.</p>
            <p className="mensaje-linea">Eso eres pa nosotros.</p>
            <p className="mensaje-final">Feliz cumpleaños, primita. 🎉</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function App() {
  const [dentro, setDentro] = useState(false);
  const [completadas, setCompletadas] = useState<Set<EtapaId>>(() => {
    const guardado = localStorage.getItem('kairos-progreso');
    return guardado ? new Set(JSON.parse(guardado)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('kairos-progreso', JSON.stringify([...completadas]));
  }, [completadas]);

  const { scrollYProgress } = useScroll();
  const progresoBarra = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activa = etapas.find((e) => !completadas.has(e.id))?.id ?? null;
  const todasCompletas = completadas.size === etapas.length;

  const completar = (id: EtapaId) => {
    setCompletadas((prev) => new Set(prev).add(id));
  };

  return (
    <>
      <CursorEstela />
      <AnimatePresence>
        {!dentro && <PuertaEntrada onEntrar={() => setDentro(true)} />}
      </AnimatePresence>

      {dentro && (
        <main>
          <div className="progreso-fijo">
            <motion.div className="progreso-barra" style={{ scaleX: progresoBarra }} />
          </div>

          <SendaProgreso completadas={completadas} activa={activa} />

          <section className="scene scene-portada">
            <div className="scene-content">
              <h1>KAIROS</h1>
              <p className="subtitulo">Tres momentos, un camino</p>
              <p className="scroll-hint">Desliza hacia abajo ↓</p>
            </div>
          </section>

          {etapas.map((etapa) => (
            <Scene
              key={etapa.id}
              etapa={etapa}
              estado={
                completadas.has(etapa.id)
                  ? 'completada'
                  : activa === etapa.id
                  ? 'activa'
                  : 'bloqueada'
              }
              onCompletar={() => completar(etapa.id)}
            />
          ))}

          <FinalMessage visible={todasCompletas} />
        </main>
      )}
    </>
  );
}

export default App;