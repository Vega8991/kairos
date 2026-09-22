// src/ui/MantenerPulsado.tsx
// Capa invisible a pantalla completa: mientras el dedo está apoyado, `valor` avanza
// de `desde` a `hasta`. Si se suelta antes, vuelve atrás.
import { useCallback, useEffect, useRef } from 'react';
import { animate, type MotionValue } from 'motion/react';
import { vibrar } from '../lib/vibrar';

interface MantenerPulsadoProps {
  valor: MotionValue<number>;
  desde: number;
  hasta: number;
  /** Segundos que hay que mantener desde cero */
  duracion?: number;
  onCompleto: () => void;
}

export function MantenerPulsado({ valor, desde, hasta, duracion = 2.8, onCompleto }: MantenerPulsadoProps) {
  const capa = useRef<HTMLDivElement>(null);
  const animacion = useRef<ReturnType<typeof animate> | null>(null);
  const terminado = useRef(false);

  useEffect(() => {
    return () => {
      // Si se sale a mitad de gesto, el árbol vuelve a como estaba
      if (terminado.current) return;
      animacion.current?.stop();
      animate(valor, desde, { duration: 0.6 });
    };
  }, [valor, desde]);

  const empezar = useCallback(() => {
    if (terminado.current) return;
    vibrar(8);
    const restante = (hasta - valor.get()) / (hasta - desde);
    animacion.current = animate(valor, hasta, {
      duration: Math.max(0.2, duracion * restante),
      ease: 'linear',
      onComplete: () => {
        if (valor.get() < hasta - 0.001) return;
        terminado.current = true;
        vibrar([25, 60, 25]);
        onCompleto();
      },
    });
  }, [valor, desde, hasta, duracion, onCompleto]);

  const soltar = useCallback(() => {
    if (terminado.current) return;
    animacion.current?.stop();
    animacion.current = animate(valor, desde, { duration: 0.7, ease: 'easeOut' });
  }, [valor, desde]);

  // El dedo va por eventos táctiles nativos y no pasivos: solo así se puede cancelar
  // la pulsación larga del sistema (vista previa de imagen en iOS, menú en Android),
  // que además interrumpiría el gesto a mitad.
  useEffect(() => {
    const el = capa.current;
    if (!el) return;

    const alTocar = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) empezar();
    };
    const alSoltar = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 0) soltar();
    };
    const sinMenu = (e: Event) => e.preventDefault();

    el.addEventListener('touchstart', alTocar, { passive: false });
    el.addEventListener('touchend', alSoltar, { passive: false });
    el.addEventListener('touchcancel', alSoltar, { passive: false });
    el.addEventListener('contextmenu', sinMenu);
    return () => {
      el.removeEventListener('touchstart', alTocar);
      el.removeEventListener('touchend', alSoltar);
      el.removeEventListener('touchcancel', alSoltar);
      el.removeEventListener('contextmenu', sinMenu);
    };
  }, [empezar, soltar]);

  return (
    <div
      ref={capa}
      className="capa-pulsar"
      role="button"
      tabIndex={0}
      aria-label="Mantén pulsado para que crezca"
      // Ratón (ordenador); el táctil se gestiona arriba
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') return;
        e.currentTarget.setPointerCapture(e.pointerId);
        empezar();
      }}
      onPointerUp={(e) => e.pointerType === 'mouse' && soltar()}
      onPointerCancel={(e) => e.pointerType === 'mouse' && soltar()}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
          e.preventDefault();
          empezar();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === ' ' || e.key === 'Enter') soltar();
      }}
    />
  );
}
