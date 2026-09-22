// src/ui/movimiento.ts
// Curva y entrada escalonada compartidas por todas las pantallas.

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Props de motion para que un elemento aparezca con un pequeño retraso */
export function aparecer(retraso = 0) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: retraso, duration: 0.9, ease: EASE },
  };
}
