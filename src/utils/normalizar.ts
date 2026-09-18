// src/utils/normalizar.ts

export function normalizar(texto: string): string {
  return texto
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
