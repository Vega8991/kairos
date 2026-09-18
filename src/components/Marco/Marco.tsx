// src/components/Marco/Marco.tsx
import type { ReactNode } from 'react';

interface MarcoProps {
  children: ReactNode;
  acento?: string;
}

export function Marco({ children, acento }: MarcoProps) {
  return (
    <div className="marco" style={acento ? { borderColor: acento } : undefined}>
      <span className="marco-esquina esquina-tl" />
      <span className="marco-esquina esquina-tr" />
      <span className="marco-esquina esquina-bl" />
      <span className="marco-esquina esquina-br" />
      {children}
    </div>
  );
}
