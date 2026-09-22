// src/lib/almacen.ts
// localStorage con red: en modo privado o sin permisos el viaje sigue, solo que en memoria.

export function leer<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardar(clave: string, valor: unknown) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // sin almacenamiento disponible
  }
}

export function borrar(clave: string) {
  try {
    localStorage.removeItem(clave);
  } catch {
    // sin almacenamiento disponible
  }
}
