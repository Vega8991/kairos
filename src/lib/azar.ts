// src/lib/azar.ts
// Aleatorio con semilla fija: lo que se genera sale siempre igual.

export function azar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
