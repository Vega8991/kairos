// src/ui/Cabecera.tsx
import { etapas } from '../contenido/etapas';
import type { Paso } from '../viaje/pasos';

interface CabeceraProps {
  paso: Paso;
  nivel: number;
  onAtras: () => void;
}

export function Cabecera({ paso, nivel, onAtras }: CabeceraProps) {
  if (paso.tipo === 'portada') return null;

  return (
    <header className="cabecera">
      <button className="boton-atras" onClick={onAtras} aria-label="Volver atrás">
        ← Volver
      </button>
      <ol className="progreso" aria-label="Etapas">
        {etapas.map((etapa, i) => {
          const actual = paso.tipo === 'etapa' && paso.etapa.id === etapa.id;
          return (
            <li
              key={etapa.id}
              className={actual ? 'actual' : i < nivel ? 'hecha' : undefined}
              aria-current={actual ? 'step' : undefined}
            >
              {etapa.numero}
            </li>
          );
        })}
      </ol>
    </header>
  );
}
