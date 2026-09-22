// src/lib/vibrar.ts
// Vibración háptica en Android. iOS no la soporta y simplemente no hace nada.

export function vibrar(patron: number | number[]) {
  if ('vibrate' in navigator) navigator.vibrate(patron);
}
