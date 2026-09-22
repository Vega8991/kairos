// src/lib/rendimiento.ts
// Móviles modestos (poca memoria o pocos núcleos) reciben una versión con menos animación.
// Para probarlo en cualquier móvil: añade ?ligero a la URL.

const nav = navigator as Navigator & { deviceMemory?: number };

export const modoLigero =
  new URLSearchParams(window.location.search).has('ligero') ||
  (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
  (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4);

if (modoLigero) document.documentElement.classList.add('ligero');
