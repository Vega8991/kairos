// src/components/Indicador/Indicador.tsx
import type { Vista, EtapaId } from '../../types/kairos.types';
import { etapas } from '../../data/etapas.data';

interface IndicadorProps {
  vista: Vista;
}

export function Indicador({ vista }: IndicadorProps) {
  if (vista === 'portada') return null;

  const indiceActual = vista === 'final' ? etapas.length : etapas.findIndex((e) => e.id === (vista as EtapaId));

  return (
    <div className="indicador">
      {etapas.map((etapa, i) => (
        <span
          key={etapa.id}
          className={`punto ${vista === etapa.id ? 'activo' : ''} ${i < indiceActual ? 'pasado' : ''}`}
          style={vista === etapa.id ? { background: etapa.acento } : undefined}
        />
      ))}
      <span className={`punto ${vista === 'final' ? 'activo' : ''}`} />
    </div>
  );
}
