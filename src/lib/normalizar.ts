// src/lib/normalizar.ts

export function normalizar(texto: string): string {
  return texto
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-ZÑ ]/g, '')
    .replace(/^(EL|LA|LOS|LAS|UN|UNA|UNOS|UNAS)\s+/, '')
    .replace(/\s+/g, '');
}

/** Acepta cualquiera de las claves, con o sin artículo y en singular o plural */
export function coincide(intento: string, claves: string[]): boolean {
  const limpio = normalizar(intento);
  return claves.some((clave) => {
    const c = normalizar(clave);
    return limpio === c || limpio === `${c}S` || limpio === `${c}ES`;
  });
}
