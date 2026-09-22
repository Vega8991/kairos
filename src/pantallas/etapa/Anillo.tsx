// src/pantallas/etapa/Anillo.tsx
// Ella deja una línea. Se convierte en una hoja del árbol.
import { useState } from 'react';
import { motion } from 'motion/react';
import type { Etapa } from '../../contenido/tipos';
import { Pantalla } from '../../ui/Pantalla';
import { aparecer } from '../../ui/movimiento';

interface AnilloProps {
  etapa: Etapa;
  hoja?: string;
  onGuardar: (texto: string) => void;
  onSeguir: () => void;
}

export function Anillo({ etapa, hoja, onGuardar, onSeguir }: AnilloProps) {
  const [texto, setTexto] = useState(hoja ?? '');

  return (
    <Pantalla>
      <motion.p className="kicker" {...aparecer(0.1)}>
        {etapa.numero} · Un anillo
      </motion.p>
      <motion.p className="texto" {...aparecer(0.3)}>
        Un árbol no recuerda con palabras: recuerda con anillos, uno por cada vuelta al sol. Deja aquí el de hoy.
      </motion.p>
      <motion.p className="pregunta" {...aparecer(0.6)}>
        {etapa.anillo.pregunta}
      </motion.p>
      <motion.form
        {...aparecer(0.9)}
        onSubmit={(e) => {
          e.preventDefault();
          onGuardar(texto.trim());
          onSeguir();
        }}
      >
        <textarea
          className="campo campo-anillo"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={etapa.anillo.placeholder}
          aria-label={etapa.anillo.pregunta}
          rows={3}
          maxLength={180}
        />
        <button className="boton" type="submit" disabled={!texto.trim()}>
          Grabar en el árbol
        </button>
      </motion.form>
      {!hoja && (
        <motion.button className="enlace" {...aparecer(1.4)} onClick={onSeguir}>
          Prefiero guardarlo para mí
        </motion.button>
      )}
    </Pantalla>
  );
}
